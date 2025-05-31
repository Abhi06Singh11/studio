
import {
  MessageCircleIcon,
  BriefcaseIcon,
  UserCheckIcon,
  FileTextIcon,
  BarChart3Icon,
  type LucideIcon,
} from "lucide-react";

export interface PremiumModule {
  id: string;
  icon: LucideIcon;
  name: string;
  shortDescription: string;
  longDescription: string; // Made non-optional
  features: string[];
  priceMonthly: string;
  priceYearly: string; // Made non-optional for toggle consistency
}

export const premiumModulesData: PremiumModule[] = [
  {
    id: "messaging",
    icon: MessageCircleIcon,
    name: "Messaging+",
    shortDescription: "Enhanced chat features for seamless communication.",
    longDescription: "Unlock unlimited 1:1 messages, get smart message suggestions based on context, see message read receipts & delivery status, and get priority message support. Perfect for staying on top of all your professional conversations.",
    features: [
      "Unlimited 1:1 messages",
      "Smart message suggestions (AI-powered)",
      "Message read receipts & delivery status",
      "Priority message support",
    ],
    priceMonthly: "₹99",
    priceYearly: "₹990", // Approx 2 months free
  },
  {
    id: "jobBoard",
    icon: BriefcaseIcon,
    name: "Job Board Pro",
    shortDescription: "Advanced tools for job seekers and recruiters.",
    longDescription: "Gain a competitive edge in your job search or hiring process. Access recruiter insights, boost the visibility of your job or project postings, and see who has viewed your profile in a professional context. Apply to unlimited featured jobs.",
    features: [
      "Access exclusive recruiter insights",
      "Boost your job/project post visibility",
      "See who viewed your profile (professional context)",
      "Advanced job search filters & alerts",
    ],
    priceMonthly: "₹199",
    priceYearly: "₹1990", // Approx 2 months free
  },
  {
    id: "profileBoost",
    icon: UserCheckIcon,
    name: "Profile Boost",
    shortDescription: "Get noticed more by recruiters and connections.",
    longDescription: "Increase your visibility across the platform. Get your profile highlighted in search results, access detailed analytics on your profile views, and receive AI-powered suggestions to optimize your professional presence and stand out.",
    features: [
      "Enhanced profile visibility in search",
      "Top placement in connection suggestions",
      "Detailed profile view analytics",
      "AI-powered profile optimization tips",
    ],
    priceMonthly: "₹149",
    priceYearly: "₹1490", // Approx 2 months free
  },
  {
    id: "contentPlus",
    icon: FileTextIcon,
    name: "Content Plus",
    shortDescription: "Create richer content and expand your reach.",
    longDescription: "Elevate your content strategy with advanced creation tools (like polls and rich formatting), wider distribution options to reach a larger audience, detailed analytics on your content's performance, and the ability to schedule posts in advance.",
    features: [
      "Advanced content creation tools (polls, rich formatting)",
      "Wider content distribution options",
      "Content performance & engagement analytics",
      "Schedule posts in advance",
    ],
    priceMonthly: "₹129",
    priceYearly: "₹1290", // Approx 2 months free
  },
  {
    id: "connectionInsights",
    icon: BarChart3Icon,
    name: "Connection Insights",
    shortDescription: "Understand and grow your professional network.",
    longDescription: "Dive deep into your network with detailed analytics on your connections, receive intelligent suggestions for network growth, identify key influencers and potential collaborators, and track relationship strength (conceptual).",
    features: [
      "Detailed connection analytics & demographics",
      "Personalized network growth suggestions",
      "Identify key influencers in your network",
      "Track relationship strength (conceptual)",
    ],
    priceMonthly: "₹179",
    priceYearly: "₹1790", // Approx 2 months free
  },
];

export const bundlePlanData = {
  name: "All-in-One Premium",
  priceMonthly: "₹399", // Discounted from sum of individuals (99+199+149+129+179 = 755)
  priceYearly: "₹3990", // Approx 2 months free compared to monthly bundle
  description:
    "Unlock the full power of CodeHinge across all modules at one unbeatable price. Get every premium feature from Messaging+, Job Board Pro, Profile Boost, Content Plus, and Connection Insights.",
  includedModuleHighlights: premiumModulesData.map((m) => ({
    name: m.name,
    icon: m.icon,
    keyFeature: m.features[0], 
  })),
  allFeatures: premiumModulesData.reduce((acc, module) => {
    acc.push(...module.features.map(f => `${module.name}: ${f}`));
    return acc;
  }, [] as string[]), // For a comprehensive list if needed
};
