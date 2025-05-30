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
  longDescription?: string;
  features: string[];
  priceMonthly: string;
  priceYearly?: string;
}

export const premiumModulesData: PremiumModule[] = [
  {
    id: "messaging",
    icon: MessageCircleIcon,
    name: "Messaging+",
    shortDescription: "Enhanced chat features for seamless communication.",
    longDescription: "Unlock unlimited 1:1 messages, get smart message suggestions based on context, and see when your messages have been delivered and read. Perfect for staying on top of your conversations.",
    features: [
      "Unlimited 1:1 messages",
      "Smart message suggestions",
      "Message read receipts & delivery status",
      "Priority message support",
    ],
    priceMonthly: "₹99",
    priceYearly: "₹990",
  },
  {
    id: "jobBoard",
    icon: BriefcaseIcon,
    name: "Job Board Pro",
    shortDescription: "Advanced tools for job seekers and recruiters.",
    longDescription: "Gain a competitive edge in your job search or hiring process. Access recruiter insights, boost the visibility of your job or project postings, and see who has viewed your profile in a professional context.",
    features: [
      "Access recruiter insights",
      "Boost your job/project visibility",
      "See who viewed your post/profile (professional context)",
      "Advanced job search filters",
    ],
    priceMonthly: "₹199",
    priceYearly: "₹1990",
  },
  {
    id: "profileBoost",
    icon: UserCheckIcon,
    name: "Profile Boost",
    shortDescription: "Get noticed more by recruiters and connections.",
    longDescription: "Increase your visibility across the platform. Get your profile highlighted in search results, access detailed analytics on your profile views, and receive suggestions to optimize your professional presence.",
    features: [
      "Enhanced profile visibility in search",
      "Top placement in connection suggestions",
      "Detailed profile view analytics",
      "AI-powered profile optimization tips",
    ],
    priceMonthly: "₹149",
    priceYearly: "₹1490",
  },
  {
    id: "contentPlus",
    icon: FileTextIcon,
    name: "Content Plus",
    shortDescription: "Create richer content and expand your reach.",
    longDescription: "Elevate your content strategy with advanced creation tools, wider distribution options to reach a larger audience, and detailed analytics on your content's performance and engagement.",
    features: [
      "Advanced content creation tools (e.g., polls, richer formatting)",
      "Wider content distribution options",
      "Content performance analytics",
      "Schedule posts in advance",
    ],
    priceMonthly: "₹129",
    priceYearly: "₹1290",
  },
  {
    id: "connectionInsights",
    icon: BarChart3Icon,
    name: "Connection Insights",
    shortDescription: "Understand and grow your professional network.",
    longDescription: "Dive deep into your network with detailed analytics on your connections, receive intelligent suggestions for network growth, and identify key influencers and potential collaborators within your sphere.",
    features: [
      "Detailed connection analytics & demographics",
      "Personalized network growth suggestions",
      "Identify key influencers in your network",
      "Track relationship strength (conceptual)",
    ],
    priceMonthly: "₹179",
    priceYearly: "₹1790",
  },
];

export const bundlePlanData = {
  name: "CodeHinge All-in-One Premium",
  priceMonthly: "₹399",
  priceYearly: "₹3990", // e.g., "Save 20%"
  description:
    "Unlock the full power of CodeHinge across all modules at one unbeatable price. Get every premium feature from Messaging+, Job Board Pro, Profile Boost, Content Plus, and Connection Insights.",
  // For BundlePlanView, we might list module names and a key feature from each.
  includedModuleHighlights: premiumModulesData.map((m) => ({
    name: m.name,
    icon: m.icon,
    keyFeature: m.features[0], // Taking the first feature as a highlight
  })),
};
