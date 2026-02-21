"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import CampaignCard from "@/components/campaign/CampaignCard";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Verified Influencers",
      description: "Connect with authentic creators vetted for quality and engagement.",
    },
    {
      icon: TrendingUp,
      title: "Real Growth",
      description: "Drive measurable results with data-driven campaign tracking.",
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "Smart algorithms pair brands with the perfect influencers in seconds.",
    },
  ];

  const mockCampaigns = [
    {
      id: "1",
      title: "Summer Skincare Launch Review",
      brand: "Glow Cosmetics",
      platform: "instagram" as const,
      reward: "Product + $200",
      image: "https://picsum.photos/seed/glow/400/300",
      category: "Beauty",
    },
    {
      id: "2",
      title: "Tech Gadget Unboxing",
      brand: "TechNova",
      platform: "youtube" as const,
      reward: "Product + $500",
      image: "https://picsum.photos/seed/tech/400/300",
      category: "Tech",
    },
    {
      id: "3",
      title: "Healthy Meal Kit Experience",
      brand: "FreshEats",
      platform: "blog" as const,
      reward: "Free Subscription",
      image: "https://picsum.photos/seed/food/400/300",
      category: "Food",
    },
    {
      id: "4",
      title: "Luxury Hotel Staycation",
      brand: "Grand Hotels",
      platform: "instagram" as const,
      reward: "2 Night Stay",
      image: "https://picsum.photos/seed/hotel/400/300",
      category: "Travel",
    },
  ];

  return (
    <div>Hello World</div>
  );
}
