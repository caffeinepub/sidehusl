import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Types for the builder assistant
  public type BuilderMessage = {
    id : Nat;
    role : { #user; #assistant };
    content : Text;
    timestamp : Time.Time;
  };

  public type BuilderSession = {
    id : Text;
    owner : Principal;
    messages : List.List<BuilderMessage>;
    createdAt : Time.Time;
  };

  // Opportunity types
  public type Opportunity = {
    id : Nat;
    title : Text;
    company : Text;
    description : Text;
    link : Text;
    remote : Bool;
    category : Text;
    barrierLevel : Nat;
    isFeatured : Bool;
    score : Nat;
    reason : Text;
    createdAt : Time.Time;
  };

  public type Category = {
    #tech;
    #crypto;
    #finance;
    #marketing;
    #design;
    #other;
  };

  module Opportunity {
    public func compareMode(a : Opportunity, b : Opportunity) : Order.Order {
      Nat.compare(b.score, a.score);
    };

    public func compareByCreatedAt(a : Opportunity, b : Opportunity) : Order.Order {
      Int.compare(a.createdAt, b.createdAt);
    };
  };

  let opportunities = Map.empty<Nat, Opportunity>();
  var nextId = 1;

  // Builder assistant state
  let builderSessions = Map.empty<Text, BuilderSession>();
  let userSessions = Map.empty<Principal, List.List<Text>>();
  var nextMessageId = 1;
  var nextMessageIdBuilderAssistant = 1;

  // Builder Assistant Methods

  public shared ({ caller }) func createBuilderSession() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create builder sessions");
    };

    let sessionId = "session_" # Time.now().toText();
    let session : BuilderSession = {
      id = sessionId;
      owner = caller;
      messages = List.empty<BuilderMessage>();
      createdAt = Time.now();
    };
    builderSessions.add(sessionId, session);

    let sessions = switch (userSessions.get(caller)) {
      case (null) { List.empty<Text>() };
      case (?existing) { existing };
    };
    sessions.add(sessionId);
    userSessions.add(caller, sessions);

    sessionId;
  };

  public shared ({ caller }) func appendBuilderMessage(sessionId : Text, role : { #user; #assistant }, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can append messages");
    };

    switch (builderSessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        // Verify ownership
        if (session.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only append messages to your own sessions");
        };

        let message : BuilderMessage = {
          id = nextMessageId;
          role;
          content;
          timestamp = Time.now();
        };
        nextMessageId += 1;

        session.messages.add(message);
        builderSessions.add(sessionId, session);
      };
    };
  };

  public query ({ caller }) func listUserSessions() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list sessions");
    };

    switch (userSessions.get(caller)) {
      case (null) { [] };
      case (?sessions) { sessions.toArray() };
    };
  };

  public query ({ caller }) func getSessionMessages(sessionId : Text) : async [BuilderMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view session messages");
    };

    switch (builderSessions.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        // Verify ownership
        if (session.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own session messages");
        };
        session.messages.toArray();
      };
    };
  };

  // Opportunity Methods
  public shared ({ caller }) func submitOpportunity(
    title : Text,
    company : Text,
    description : Text,
    link : Text,
    remote : Bool,
    category : Text,
    barrierLevel : Nat,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit opportunities");
    };

    let { score; reason } = evaluateOpportunity(title, description, barrierLevel);
    let opportunity = {
      id = nextId;
      title;
      company;
      description;
      link;
      remote;
      category;
      barrierLevel;
      isFeatured = false;
      score;
      reason;
      createdAt = Time.now();
    };
    opportunities.add(nextId, opportunity);
    nextId += 1;
    opportunity.id;
  };

  public query ({ caller }) func getOpportunity(id : Nat) : async Opportunity {
    switch (opportunities.get(id)) {
      case (null) { Runtime.trap("Opportunity not found") };
      case (?opportunity) { opportunity };
    };
  };

  public query ({ caller }) func listOpportunities(
    remoteFilter : ?Bool,
    categoryFilter : ?Text,
    barrierLevelFilter : ?Nat
  ) : async [Opportunity] {
    var filtered = opportunities.values();

    switch (remoteFilter) {
      case (?remote) {
        filtered := filtered.filter(
          func(opportunity) { opportunity.remote == remote }
        );
      };
      case (null) {};
    };

    switch (categoryFilter) {
      case (?category) {
        filtered := filtered.filter(
          func(opportunity) {
            opportunity.category == category;
          }
        );
      };
      case (null) {};
    };

    switch (barrierLevelFilter) {
      case (?level) {
        filtered := filtered.filter(
          func(opportunity) {
            opportunity.barrierLevel == level;
          }
        );
      };
      case (null) {};
    };

    filtered.toArray().sort(Opportunity.compareByCreatedAt);
  };

  public query ({ caller }) func listFeaturedOpportunities() : async [Opportunity] {
    opportunities.values().filter(
      func(opportunity) { opportunity.isFeatured }
    ).toArray();
  };

  func evaluateOpportunity(
    _title : Text,
    _description : Text,
    barrierLevel : Nat,
  ) : { score : Nat; reason : Text } {
    var score = 100;
    var reason = "Valid opportunity";

    if (barrierLevel >= 0 and barrierLevel <= 2) {
      score += 50;
    } else if (barrierLevel >= 3 and barrierLevel <= 5) {
      score += 25;
    };

    if (score > 100) { score := 100 };

    { score; reason };
  };

  public shared ({ caller }) func addXerisMiningOpportunity() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add featured opportunities");
    };

    let existing = opportunities.values().filter(
      func(opportunity) { opportunity.title == "Xeris Mining" }
    ).toArray();
    if (existing.size() > 0) { Runtime.trap("Xeris Mining opportunity already exists") };

    let opportunity = {
      id = nextId;
      title = "Xeris Mining";
      company = "Xeris";
      description = "Cloud mining platform";
      link = "https://xerisweb.com/";
      remote = true;
      category = "Crypto";
      barrierLevel = 1;
      isFeatured = true;
      score = 95;
      reason = "Trusted and verified";
      createdAt = Time.now();
    };
    opportunities.add(nextId, opportunity);
    nextId += 1;
  };

  public query ({ caller }) func getTotalOpportunityCount() : async Nat {
    opportunities.size();
  };
};
