/**
 * Deterministic, template-based builder assistant response generator.
 * No external AI/LLM calls - purely rule-based output.
 */

interface AppPlan {
  summary: string;
  pages: string[];
  features: string[];
  dataModel: string[];
  steps: string[];
  techStack: string[];
}

function extractKeywords(prompt: string): string[] {
  const keywords = prompt.toLowerCase().match(/\b\w{4,}\b/g) || [];
  return [...new Set(keywords)].slice(0, 5);
}

function generateAppPlan(prompt: string): AppPlan {
  const keywords = extractKeywords(prompt);
  const lowerPrompt = prompt.toLowerCase();
  
  // Feature detection
  const hasAuth = /login|auth|user|account|profile|sign/i.test(prompt);
  const hasData = /data|store|save|database|list|manage|crud/i.test(prompt);
  const hasSocial = /social|share|comment|like|follow|post|feed/i.test(prompt);
  const hasPayment = /payment|pay|buy|purchase|checkout|shop|cart/i.test(prompt);
  const hasSearch = /search|filter|find|query/i.test(prompt);
  const hasUpload = /upload|image|file|photo|media/i.test(prompt);
  const hasNotifications = /notif|alert|remind|message/i.test(prompt);
  const hasAnalytics = /analytic|dashboard|report|stat|metric/i.test(prompt);
  const hasChat = /chat|message|conversation|dm/i.test(prompt);
  const hasCalendar = /calendar|schedule|event|appointment|booking/i.test(prompt);
  
  // App type detection
  const isMarketplace = /marketplace|buy|sell|shop|store|ecommerce/i.test(prompt);
  const isSocial = /social|network|community|forum/i.test(prompt);
  const isProductivity = /task|todo|project|manage|organize/i.test(prompt);
  const isBlog = /blog|article|post|content|publish/i.test(prompt);
  const isPortfolio = /portfolio|showcase|work|project/i.test(prompt);

  const pages: string[] = ['Home Page'];
  const features: string[] = [];
  const dataModel: string[] = [];

  // Authentication
  if (hasAuth) {
    pages.push('Login/Signup Page', 'User Profile Page', 'Settings Page');
    features.push('User authentication with Internet Identity');
    features.push('User profile management');
    dataModel.push('UserProfile: { name: Text, createdAt: Time }');
  }

  // Core data management
  if (hasData || isMarketplace || isSocial || isProductivity || isBlog) {
    pages.push('Browse/List Page', 'Details Page', 'Create/Edit Page');
    features.push('CRUD operations for main entities');
    
    if (isMarketplace) {
      dataModel.push('Product: { id: Nat, title: Text, description: Text, price: Nat, seller: Principal, images: [Blob], createdAt: Time }');
      features.push('Product listing and management');
      features.push('Search and filter products');
    } else if (isBlog) {
      dataModel.push('Post: { id: Nat, title: Text, content: Text, author: Principal, tags: [Text], createdAt: Time }');
      features.push('Rich text editor for content creation');
      features.push('Tag-based organization');
    } else if (isProductivity) {
      dataModel.push('Task: { id: Nat, title: Text, description: Text, status: Status, owner: Principal, dueDate: ?Time, createdAt: Time }');
      features.push('Task status tracking');
      features.push('Due date management');
    } else {
      dataModel.push('Item: { id: Nat, title: Text, description: Text, owner: Principal, createdAt: Time }');
    }
  }

  // Social features
  if (hasSocial || isSocial) {
    features.push('Social interactions (likes, comments, shares)');
    features.push('User following/followers system');
    dataModel.push('Comment: { id: Nat, content: Text, author: Principal, itemId: Nat, timestamp: Time }');
    dataModel.push('Like: { user: Principal, itemId: Nat, timestamp: Time }');
    pages.push('User Feed Page');
  }

  // Payment
  if (hasPayment || isMarketplace) {
    pages.push('Checkout Page', 'Payment Success Page', 'Order History Page');
    features.push('Shopping cart functionality');
    features.push('Order management');
    dataModel.push('Order: { id: Nat, buyer: Principal, items: [OrderItem], total: Nat, status: OrderStatus, createdAt: Time }');
  }

  // Search
  if (hasSearch) {
    features.push('Advanced search and filtering');
    features.push('Sort by multiple criteria');
  }

  // File upload
  if (hasUpload) {
    features.push('File upload and storage');
    features.push('Image optimization and preview');
    dataModel.push('File: { id: Nat, name: Text, data: Blob, mimeType: Text, owner: Principal, uploadedAt: Time }');
  }

  // Notifications
  if (hasNotifications) {
    features.push('Real-time notifications');
    features.push('Notification preferences');
    dataModel.push('Notification: { id: Nat, user: Principal, message: Text, read: Bool, createdAt: Time }');
  }

  // Analytics
  if (hasAnalytics) {
    pages.push('Analytics Dashboard');
    features.push('Data visualization and charts');
    features.push('Export reports');
  }

  // Chat
  if (hasChat) {
    pages.push('Messages/Chat Page');
    features.push('Real-time messaging');
    features.push('Conversation history');
    dataModel.push('Message: { id: Nat, sender: Principal, recipient: Principal, content: Text, timestamp: Time }');
  }

  // Calendar
  if (hasCalendar) {
    pages.push('Calendar View');
    features.push('Event scheduling');
    features.push('Calendar integration');
    dataModel.push('Event: { id: Nat, title: Text, description: Text, startTime: Time, endTime: Time, organizer: Principal, attendees: [Principal] }');
  }

  // Always add About page
  pages.push('About Page');

  // Determine app type for summary
  let appType = 'application';
  if (isMarketplace) appType = 'marketplace';
  else if (isSocial) appType = 'social platform';
  else if (isProductivity) appType = 'productivity tool';
  else if (isBlog) appType = 'blogging platform';
  else if (isPortfolio) appType = 'portfolio website';

  const techStack = [
    'Frontend: React 19 + TypeScript',
    'Styling: Tailwind CSS + shadcn/ui components',
    'Backend: Motoko on Internet Computer',
    'State Management: React Query + Zustand',
    'Routing: TanStack Router',
    'Authentication: Internet Identity',
  ];

  return {
    summary: `A ${keywords.slice(0, 2).join(' ')} ${appType} built on the Internet Computer`,
    pages: [...new Set(pages)], // Remove duplicates
    features: features.length > 0 ? [...new Set(features)] : ['Core functionality based on your requirements'],
    dataModel: dataModel.length > 0 ? dataModel : ['Define data structures based on your needs'],
    techStack,
    steps: [
      '🏗️ Set up project structure with React + TypeScript frontend',
      '⚙️ Design and implement Motoko backend canister with data types',
      '💾 Create data models and storage logic (stable variables for persistence)',
      '🎨 Build UI components with Tailwind CSS and shadcn/ui',
      '🔐 Implement authentication with Internet Identity (if needed)',
      '🔄 Add CRUD operations and business logic',
      '🧪 Test functionality, edge cases, and error handling',
      '🚀 Deploy to Internet Computer network',
      '📊 Monitor performance and gather user feedback',
      '🔧 Iterate and add new features based on feedback',
    ],
  };
}

export function generateBuilderResponse(prompt: string): string {
  // Handle greeting messages
  const greetings = ['hi', 'hello', 'hey', 'greetings'];
  if (greetings.some(g => prompt.toLowerCase().trim() === g)) {
    return `Hello! 👋 I'm your AI App Builder assistant. I can help you plan and structure your Internet Computer application.

To get started, describe your app idea. For example:
• "I want to build a task management app with user authentication"
• "Create a marketplace where users can buy and sell digital art"
• "Build a social platform for sharing recipes"

I'll analyze your requirements and provide a detailed implementation plan including pages, features, data models, and step-by-step guidance.

What would you like to build today?`;
  }

  // Handle help requests
  if (/help|what can you do|how does this work/i.test(prompt)) {
    return `# How I Can Help You Build Apps 🚀

I'm a deterministic app planning assistant that helps you structure Internet Computer applications. Here's what I do:

## What I Provide:
✅ **Structured App Plans** - Pages, features, and architecture
✅ **Data Model Suggestions** - Motoko type definitions
✅ **Implementation Steps** - Step-by-step development guide
✅ **Tech Stack Recommendations** - Best practices for IC development

## What I Detect:
🔐 Authentication needs
💾 Data storage requirements
🛒 E-commerce features
💬 Social interactions
📊 Analytics and dashboards
📅 Calendar and scheduling
🔍 Search and filtering

## How to Use:
Simply describe your app idea in natural language. Be specific about:
- What the app should do
- Who will use it
- Key features you need
- Any special requirements

**Example:** "I want to build a blog platform where users can write articles, add tags, and comment on posts"

Ready to start? Describe your app idea!`;
  }

  // Generate app plan
  const plan = generateAppPlan(prompt);

  const response = `# 🎯 App Plan: ${plan.summary}

## 📋 Overview
Based on your description, here's a comprehensive plan for building your application on the Internet Computer.

## 📄 Pages (${plan.pages.length})
${plan.pages.map((page, i) => `${i + 1}. **${page}**`).join('\n')}

## ✨ Key Features (${plan.features.length})
${plan.features.map((feature, i) => `${i + 1}. ${feature}`).join('\n')}

## 🗄️ Data Model (Motoko Types)
${plan.dataModel.map((model) => `\`\`\`motoko\n${model}\n\`\`\``).join('\n\n')}

## 🛠️ Tech Stack
${plan.techStack.map((tech) => `• ${tech}`).join('\n')}

## 📝 Implementation Steps
${plan.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## 🎯 Next Steps
1. **Review & Refine** - Adjust this plan based on your specific needs
2. **Start with Backend** - Define your Motoko data structures first
3. **Build Incrementally** - Implement one feature at a time
4. **Test Thoroughly** - Test each feature before moving to the next
5. **Deploy & Iterate** - Deploy early and gather feedback

## 💡 Pro Tips
• Use stable variables in Motoko for data persistence across upgrades
• Implement proper error handling with Result types
• Keep your canister methods focused and single-purpose
• Use React Query for efficient data fetching and caching
• Follow the principle of least privilege for access control

**Need more details about any specific part?** Feel free to ask follow-up questions!`;

  return response;
}
