import { PricingPlan, AthleteTestimonial } from "./types";

export const SERVICES_DATA = [
  {
    icon: "fitness_center",
    title: "Strength & Power",
    description: "Advanced hypertrophy and Olympic lifting programs designed for maximum force output.",
    themeClass: "accent-bar-forest bg-white dark:bg-white/5 hover:bg-forest-tint dark:hover:bg-forest-vibrant/20",
    color: "text-forest-vibrant"
  },
  {
    icon: "monitor_weight",
    title: "Weight Optimization",
    description: "Metabolic conditioning and nutritional protocols for sustainable fat loss.",
    themeClass: "accent-bar-coral bg-white dark:bg-white/5 hover:bg-coral-tint dark:hover:bg-coral-punch/20",
    color: "text-coral-punch"
  },
  {
    icon: "groups",
    title: "Personal Coaching",
    description: "1-on-1 sessions with world-class trainers focusing on your unique biomechanics.",
    themeClass: "accent-bar-amber bg-white dark:bg-white/5 hover:bg-amber-tint dark:hover:bg-amber-energy/20",
    color: "text-amber-energy"
  },
  {
    icon: "sports_gymnastics",
    title: "Mobility & Flow",
    description: "Yoga and dynamic stretching to improve range of motion and injury resilience.",
    themeClass: "border-l-4 border-l-secondary bg-white dark:bg-white/5 hover:bg-navy-tint dark:hover:bg-secondary/20",
    color: "text-secondary"
  },
  {
    icon: "sprint",
    title: "HIIT Intervals",
    description: "High-intensity cardiovascular training to spike your VO2 max and stamina.",
    themeClass: "accent-bar-forest bg-white dark:bg-white/5 hover:bg-forest-tint dark:hover:bg-forest-vibrant/20",
    color: "text-forest-vibrant"
  },
  {
    icon: "restaurant",
    title: "Sports Nutrition",
    description: "Precision meal mapping for fueling performance and muscle recovery.",
    themeClass: "accent-bar-coral bg-white dark:bg-white/5 hover:bg-coral-tint dark:hover:bg-coral-punch/20",
    color: "text-coral-punch"
  },
  {
    icon: "medical_services",
    title: "Physiotherapy",
    description: "Rehabilitative services to get you back to the platform safely and faster.",
    themeClass: "accent-bar-amber bg-white dark:bg-white/5 hover:bg-amber-tint dark:hover:bg-amber-energy/20",
    color: "text-amber-energy"
  },
  {
    icon: "psychology",
    title: "Mental Performance",
    description: "Mindset coaching and stress management for the modern high-performer.",
    themeClass: "border-l-4 border-l-secondary bg-white dark:bg-white/5 hover:bg-navy-tint dark:hover:bg-secondary/20",
    color: "text-secondary"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basics",
    price: 8500,
    billing: "mo",
    features: [
      "24/7 Gym Access",
      "Group Class Entry",
      "Locker Facilities"
    ],
    colorTheme: "forest",
    pkrPrice: "PKR 8,500"
  },
  {
    name: "Commit",
    price: 15000,
    billing: "mo",
    features: [
      "All Basics Features",
      "4 PT Sessions/Mo",
      "ForgeOS Performance App"
    ],
    isPopular: true,
    colorTheme: "navy",
    pkrPrice: "PKR 15,000"
  },
  {
    name: "Elite",
    price: 28000,
    billing: "mo",
    features: [
      "Unlimited PT Sessions",
      "3D Body Scanning",
      "Specialized Workshops"
    ],
    colorTheme: "amber",
    pkrPrice: "PKR 28,000"
  },
  {
    name: "Lifestyle",
    price: 45000,
    billing: "mo",
    features: [
      "Concierge Coaching",
      "Meal Delivery Support",
      "Spa & Recovery access"
    ],
    colorTheme: "coral",
    pkrPrice: "PKR 45,000"
  }
];

export const TESTIMONIALS_DATA: AthleteTestimonial[] = [
  {
    name: "Zain Ahmed",
    role: "POWERLIFTER",
    feedback: "The ForgeOS app changed how I view progress. I'm hitting PRs every week because the data tells us exactly when to push and when to de-load.",
    rating: 5,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBETPYbNu076AutxyItkG40mYJNqkpBsyklt-l6IHmvzyJvz1dt7IQQj3H3rmNck1IXA9fIZa9K3Xojd7DfsIukWVBEk1Qf12mS1vDwm4mWbdC6Q-LUjxtGSUX4x4Le0tYqFp5G84kV-B8aoabgiFEeFslZWVUbZrxhonUbrnGvJo5dDrzA_dZ1wKVUReaiL5ReU3XTmG2in6xq225iGzwtGQf-OIYgXqEm35lEHa6wS7UnSXrzl3op89AqhLdsWRA7iVHhevoK5kUx",
    accent: "text-forest-vibrant"
  },
  {
    name: "Sana Malik",
    role: "MARATHON RUNNER",
    feedback: "FitForge isn't just a gym; it's a high-performance lab. The coaches here understand biomechanics better than anyone I've ever worked with.",
    rating: 5,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmXmnMULBfD9b8oxGPOFzv9FonhwxiPPXBJQFXtPkbqkGAnD9VF98CNvnG4why_IwdqnZV70cnnVDpul-LgLZBFJOF7Q-LvkR-uPNz5VlR40NqPkaZKKYWc_kCNXCqHYOHb76tDdFE2bw8C6AzECtDKDfvjAusSAh3zscJdPElCvI08wAPADRLMH4qS_CgPdA4-PcwmU12Agoj03JM4uf9ALq25M9YZLJDKO184CL5wiSvOsJrIc7WEZTDyiUtZ13xAd-qMyFfidgI",
    accent: "text-coral-punch"
  },
  {
    name: "Omar Farooq",
    role: "CEO / AMATEUR BOXER",
    feedback: "I've tried every gym in the city, but the culture at the Piplan branch is unmatched. It's serious training for serious results. Best investment ever.",
    rating: 5,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHwg4BKO3F9evXpfgHx0EGeejG_QAawFqgtoCNNIfDp9iXvNwYTW7o8HgZTWX7tUf8yPDpUosR61A1skbxpcq7g9Pf6ie-lwRH1-qUr8KH35heAk0uHNAVVWVkG_SOvEU8UO4mcnWex0T4wLCmWFCHeUHMK4iWj-UVmxE4E1g8aUyJLNKrRLmd8l2eO1Y1boa07xuD7GPtmPgaC-TjYMCu-C5OGEuOgs1jYwvG4VXhiEkqhB7Jwr9I-fs3KFQz9f5U_EBKg_yL3YD1",
    accent: "text-amber-energy"
  }
];

export const BARBALL_GYM_MEMBER_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCorIUaOLZ2zs_Rm-OHpHi8paazzNVNt2xfT6jiXBa-MbhrrQp-G29Yl8ukEUZhrMaokPcMcNlcias_PlViUXJLDJaXQo7_rgu1toJGnlNJKacbh9i2s_0MP2SiWgZ6NmEib9V8Gc0J0uYRZwtKZCJgSx79l8_ZUTrkF8nza44JnxGvCdk3YuORXtKaCCDjvn8TP8LMZ-4sMGctI23xBSKh5R_sy6wZJiWbQJX_3Ag_tNarTV4Pnv8bALNEzrgDRldXGyktrqvL6UIK";

export const TRAINERS_IMAGE = "https://lh3.googleusercontent.com/aida/AP1WRLtvrf4LEo9zfRITmXq1dtrM9SMeVfpeAEYWSYuQsT_j9HabnnF3PstS03Yf1QNC_fqApzVWofHaqv_DJ9dxGKMQrZtaqDt4NXKMvWdiiSm811aQvHG9zoXGv4pz3V2jddYGjKO6rofQFMbmnhzS-SzcEk1x7Yp-7lM1Rzdi72qVTVs3EktMNjRI9ZSsI8CZ2ZAXPfdM6YVcTuw3w04FmIAqOYe4_7vLSdeX0ABsg68emb5ntgn90fx6B3G2";

export const ABOUT_GALL_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDnCWWJKqGZTWMUbG1Yz0GAyCQI-hN4njOum77Q2sn1BVLg44dNgI6Sm9-_W3RT_-_XzSgWVbk7fVd2qNuQnNhRneVwHH_7ZLc2LUYewQsVQlD3h2W4nppJfsJkTCLzvtY9ZdMjfL8c5maFy3_8ZFk6SLCWqaZUMPoyhe-OOmmu1HWKkIj5yLnb33XHk9DH63bw7NQuL7EpdZOogSwmiECrAWJ6L0uRtaSRTi1nKNLlnHsq9VdnFP24DUvJ0TcrkovG3YPkrR2UmlbT";
