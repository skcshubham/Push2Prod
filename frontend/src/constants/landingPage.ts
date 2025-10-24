export const LANDING_PAGE_CONSTANTS = {
  APP: {
    NAME: "Push2Prod",
    LOGO: "🧑🏻‍💻 Push2Prod",
    TAGLINE: "Connecting developers through code, creativity, and collaboration.",
  },

  HERO: {
    BADGE: "💕 Where Code Meets Romance",
    TITLE_LINE_1: "Find Your Perfect",
    TITLE_LINE_2: "Coding Partner",
    DESCRIPTION:
      "Swipe right on developers who share your coding passion, tech stack, and dreams. Build meaningful connections that go beyond just code.",
    PRIMARY_CTA: "Start Swiping",
    SECONDARY_CTA: "Create Profile",
    TRUST_INDICATORS: {
      FREE: "Free to join",
      VERIFIED: "Verified profiles",
      CONNECTIONS: "Real connections",
    },
  },

  FEATURES: {
    BADGE: "🚀 Powerful Features",
    TITLE: "Built for the Developer Community",
    DESCRIPTION:
      "Every feature is designed with developers in mind, from GitHub integration to tech stack matching. Experience the future of developer networking.",
    ITEMS: [
      {
        icon: "FaCode",
        title: "Tech Stack Matching",
        description:
          "Connect with developers who use the same technologies and frameworks you love. Find your perfect coding partner based on shared tech interests.",
        badge: "✨ React • Node.js • MongoDB • TypeScript",
        color: "purple",
      },
      {
        icon: "FaHeart",
        title: "Smart Compatibility",
        description:
          "Our advanced algorithm matches you based on coding preferences, project interests, and personality traits. Find developers who truly complement your style.",
        badge: "🧠 AI-Powered Matching Algorithm",
        color: "red",
      },
      {
        icon: "FaRocket",
        title: "Project Collaboration",
        description:
          "Find coding partners for hackathons, open source projects, and side hustles. Build amazing things together with like-minded developers through real-time chat and collaboration.",
        badge: "🚀 Hackathons • Open Source • Side Projects",
        color: "blue",
      },
    ],
  },

  PRICING: {
    BADGE: "💰 Pricing Plans",
    TITLE: "Simple, Transparent Pricing",
    DESCRIPTION: "Choose the plan that fits your coding journey. No hidden fees, no surprises.",
    PLANS: {
      FREE: {
        NAME: "Free",
        DESCRIPTION: "Perfect for getting started",
        PRICE: "$0",
        PERIOD: "forever",
        CTA: "Get Started Free",
        FEATURES: [
          { text: "Basic profile matching", icon: "FaCode" },
          { text: "Up to 10 matches per day", icon: "FaHeart" },
          { text: "Community access", icon: "FaUsers" },
        ],
      },
      PRO: {
        NAME: "Pro",
        BADGE: "Most Popular",
        DESCRIPTION: "For serious developers",
        PRICE: "$19",
        PERIOD: "per month",
        CTA: "Start Pro Trial",
        FEATURES: [
          { text: "Advanced matching algorithm", icon: "FaCode" },
          { text: "Unlimited matches", icon: "FaHeart" },
          { text: "Priority support", icon: "FaRocket" },
          { text: "GitHub integration", icon: "FaGithub" },
        ],
      },
      ENTERPRISE: {
        NAME: "Enterprise",
        DESCRIPTION: "For teams and companies",
        PRICE: "Custom",
        PERIOD: "contact us",
        CTA: "Contact Sales",
        FEATURES: [
          { text: "Custom matching criteria", icon: "FaCode" },
          { text: "Team collaboration tools", icon: "FaUsers" },
          { text: "Dedicated support", icon: "FaRocket" },
          { text: "API access", icon: "FaGithub" },
        ],
      },
    },
  },

  TECH_STACK: {
    TITLE: "Built With Modern Technologies",
    DESCRIPTION: "A full-stack application demonstrating current web development best practices",
    TECHNOLOGIES: [
      {
        name: "React",
        description: "Frontend Framework",
        details: "TypeScript + Vite",
        animationDelay: "0s",
      },
      {
        name: "Node.js",
        description: "Backend Runtime",
        details: "Express.js + APIs",
        animationDelay: "0.2s",
      },
      {
        name: "MongoDB",
        description: "Database",
        details: "NoSQL + Scalable",
        animationDelay: "0.4s",
      },
      {
        name: "REST APIs",
        description: "Backend Services",
        details: "Authentication & CRUD",
        animationDelay: "0.8s",
      },
    ],
  },

  CTA: {
    TITLE: "Ready to Swipe Right on Your Coding Soulmate?",
    DESCRIPTION:
      "Join thousands of developers who have already found their perfect coding partners. Your next great collaboration is just a swipe away.",
    PRIMARY_CTA: "Create Profile",
    SECONDARY_CTA: "Learn More",
    TRUST_INDICATORS: {
      FREE: "Free to swipe",
      VERIFIED: "Verified profiles",
      CONNECTIONS: "Real connections",
    },
  },

  NAVIGATION: {
    MENU_ITEMS: {
      FEATURES: "Features",
      PRICING: "Pricing",
    },
    BUTTONS: {
      SIGN_IN: "Sign In",
      CREATE_PROFILE: "Create Profile",
    },
    MOBILE_MENU_TITLE: "Menu",
  },

  FOOTER: {
    COPYRIGHT: "© 2024 Push2Prod. All rights reserved.",
    SECTIONS: {
      PRODUCT: {
        TITLE: "Product",
        LINKS: ["Features", "Pricing", "API"],
      },
      COMPANY: {
        TITLE: "Company",
        LINKS: ["About", "Blog", "Careers"],
      },
      SUPPORT: {
        TITLE: "Support",
        LINKS: ["Help Center", "Contact", "Privacy"],
      },
    },
    LEGAL_LINKS: ["Terms", "Privacy", "Cookies"],
    SOCIAL_MEDIA: {
      GITHUB: "GitHub",
      TWITTER: "Twitter",
      LINKEDIN: "LinkedIn",
    },
  },

  SIGN_IN: {
    TITLE: "Continue Your Journey",
    SUBTITLE: "Your coding soulmate awaits",
    SOCIAL_BUTTONS: {
      GOOGLE: "Continue with Google",
      GITHUB: "Continue with GitHub",
    },
    FORM: {
      EMAIL_LABEL: "Email",
      EMAIL_PLACEHOLDER: "you@example.com",
      PASSWORD_LABEL: "Password",
      PASSWORD_PLACEHOLDER: "••••••••",
      REMEMBER_ME: "Remember me",
      FORGOT_PASSWORD: "Forgot password?",
      SUBMIT_BUTTON: "Continue",
    },
    SIGN_UP_PROMPT: "New to the community?",
    SIGN_UP_LINK: "Create your profile",
  },

  SIGN_UP: {
    TITLE: "Start Your Journey",
    SUBTITLE: "Find developers who match your vibe",
    SOCIAL_BUTTONS: {
      GOOGLE: "Sign up with Google",
      GITHUB: "Sign up with GitHub",
    },
    FORM: {
      FIRST_NAME_LABEL: "First Name",
      FIRST_NAME_PLACEHOLDER: "John",
      EMAIL_LABEL: "Email",
      EMAIL_PLACEHOLDER: "you@example.com",
      PASSWORD_LABEL: "Password",
      PASSWORD_PLACEHOLDER: "Create a strong password",
      SUBMIT_BUTTON: "Create Account",
    },
    SIGN_IN_PROMPT: "Already have an account?",
    SIGN_IN_LINK: "Sign in",
    TERMS_TEXT: "By signing up, you agree to our Terms and Privacy Policy",
  },
};
