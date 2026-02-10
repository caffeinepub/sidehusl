import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface BuilderMessage {
    id: bigint;
    content: string;
    role: Variant_user_assistant;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export interface Opportunity {
    id: bigint;
    remote: boolean;
    barrierLevel: bigint;
    title: string;
    link: string;
    createdAt: Time;
    description: string;
    score: bigint;
    company: string;
    isFeatured: boolean;
    category: string;
    reason: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_user_assistant {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    addXerisMiningOpportunity(): Promise<void>;
    appendBuilderMessage(sessionId: string, role: Variant_user_assistant, content: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBuilderSession(): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOpportunity(id: bigint): Promise<Opportunity>;
    getSessionMessages(sessionId: string): Promise<Array<BuilderMessage>>;
    getTotalOpportunityCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listFeaturedOpportunities(): Promise<Array<Opportunity>>;
    listOpportunities(remoteFilter: boolean | null, categoryFilter: string | null, barrierLevelFilter: bigint | null): Promise<Array<Opportunity>>;
    listUserSessions(): Promise<Array<string>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitOpportunity(title: string, company: string, description: string, link: string, remote: boolean, category: string, barrierLevel: bigint): Promise<bigint>;
}
