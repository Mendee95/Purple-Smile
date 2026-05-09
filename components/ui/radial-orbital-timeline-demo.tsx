"use client";

import { Sparkles, Zap, Clock, Check, Star } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Бэлтгэл",
    date: "1-р алхам",
    content:
      "Шүдээ угааж, гадаргууг сайн хатааж бэлд. Хуурай гадаргуу дээр судал хамгийн сайн наалддаг.",
    category: "Бэлтгэл",
    icon: Sparkles,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Нааж хийх",
    date: "2-р алхам",
    content:
      "Хальсыг хуулж дээд доод шүдэндээ нааж хийнэ. Ердөө 30 секунд — PAP+ томъёо ажиллаж эхэлнэ.",
    category: "Хэрэглээ",
    icon: Zap,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "30 минут",
    date: "3-р алхам",
    content:
      "30 минут хүлээнэ. Утасгаа харж, кофе бус ус уугаад бэлдэж бай. Судлууд ажлаа хийнэ.",
    category: "Хүлээлт",
    icon: Clock,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Хуулах",
    date: "4-р алхам",
    content:
      "Судлыг хуулж аваад зайлна. Шүдний гадаргуу тэр даруй цэвэрхэн, гөлгөр мэдрэгдэнэ.",
    category: "Дуусгалт",
    icon: Check,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Үр дүн",
    date: "7-р өдөр",
    content:
      "3 дахь өдрөөс гэрэлтэж эхэлнэ. 7 хоногт мэдэгдэхүйц цайруулна. Илүү цэвэр, илүү итгэлтэй инээмсэглэл.",
    category: "Үр дүн",
    icon: Star,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default { RadialOrbitalTimelineDemo };
