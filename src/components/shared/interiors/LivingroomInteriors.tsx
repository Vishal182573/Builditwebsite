"use client";
import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaCouch, FaRulerCombined, FaPalette } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { LivingRoomItem } from "@/types/types";

const LivingRoomCard: React.FC<{ item: LivingRoomItem }> = ({ item }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const styleColors = {
    Contemporary: "bg-blue-100 text-blue-800",
    Traditional: "bg-green-100 text-green-800",
    Scandinavian: "bg-gray-100 text-gray-800",
    "Mid-Century Modern": "bg-yellow-100 text-yellow-800",
    Industrial: "bg-orange-100 text-orange-800",
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 max-w-sm h-[400px] flex flex-col">
      <CardHeader className="p-0 relative">
        <Carousel plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            {item.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={item.name}
                    width={400}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
        <Badge
          className={`absolute bottom-2 left-2 ${
            styleColors[item.style as keyof typeof styleColors]
          }`}
        >
          {item.style}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {item.name}
          </h2>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {item.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <FaCouch className="text-indigo-500 mr-1" />
              <span>{item.style}</span>
            </div>
            <div className="flex items-center">
              <FaRulerCombined className="text-green-500 mr-1" />
              <span>{item.size}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LivingRoomCatalog: React.FC = () => {
  const livingRoomItems: LivingRoomItem[] = [
    {
      id: 1,
      name: "Urban Chic Living Space",
      images: [
        "https://picsum.photos/200/300?random=43",
        "https://picsum.photos/200/300?random=44",
        "https://picsum.photos/200/300?random=45",
      ],
      description: "A modern living room with sleek lines and urban flair.",
      style: "Contemporary",
      size: "400 sq ft",
      features: [
        "Open Concept",
        "Smart Home Integration",
        "Floor-to-Ceiling Windows",
      ],
    },
    {
      id: 2,
      name: "Cozy Cottage Living Room",
      images: [
        "https://picsum.photos/200/300?random=46",
        "https://picsum.photos/200/300?random=47",
        "https://picsum.photos/200/300?random=48",
      ],
      description: "Warm and inviting cottage-style living room.",
      style: "Cottage",
      size: "350 sq ft",
      features: ["Fireplace", "Exposed Beams", "Rustic Decor"],
    },
    {
      id: 3,
      name: "Minimalist Retreat",
      images: [
        "https://picsum.photos/200/300?random=49",
        "https://picsum.photos/200/300?random=50",
        "https://picsum.photos/200/300?random=51",
      ],
      description: "Simple and serene living room with minimalist decor.",
      style: "Minimalist",
      size: "300 sq ft",
      features: ["Neutral Colors", "Clean Lines", "Hidden Storage"],
    },
    {
      id: 4,
      name: "Bohemian Loft",
      images: [
        "https://picsum.photos/200/300?random=52",
        "https://picsum.photos/200/300?random=53",
        "https://picsum.photos/200/300?random=54",
      ],
      description: "Eclectic living room with a bohemian vibe.",
      style: "Bohemian",
      size: "450 sq ft",
      features: ["Colorful Rugs", "Vintage Furniture", "Artistic Decor"],
    },
    {
      id: 5,
      name: "Industrial Living Area",
      images: [
        "https://picsum.photos/200/300?random=55",
        "https://picsum.photos/200/300?random=56",
        "https://picsum.photos/200/300?random=57",
      ],
      description: "Stylish living room with industrial elements.",
      style: "Industrial",
      size: "500 sq ft",
      features: ["Exposed Brick", "Metal Accents", "Open Space"],
    },
    {
      id: 6,
      name: "Classic Elegance",
      images: [
        "https://picsum.photos/200/300?random=58",
        "https://picsum.photos/200/300?random=59",
        "https://picsum.photos/200/300?random=60",
      ],
      description: "Elegant living room with classic decor.",
      style: "Traditional",
      size: "400 sq ft",
      features: ["Crown Molding", "Antique Furniture", "Plush Fabrics"],
    },
    {
      id: 7,
      name: "Scandinavian Simplicity",
      images: [
        "https://picsum.photos/200/300?random=61",
        "https://picsum.photos/200/300?random=62",
        "https://picsum.photos/200/300?random=63",
      ],
      description: "Bright and airy living room with Scandinavian design.",
      style: "Scandinavian",
      size: "350 sq ft",
      features: ["Light Wood", "Simple Lines", "Functional Decor"],
    },
    {
      id: 8,
      name: "Modern Farmhouse",
      images: [
        "https://picsum.photos/200/300?random=64",
        "https://picsum.photos/200/300?random=65",
        "https://picsum.photos/200/300?random=66",
      ],
      description: "Comfortable living room with modern farmhouse style.",
      style: "Farmhouse",
      size: "450 sq ft",
      features: ["Shiplap Walls", "Cozy Furniture", "Natural Textures"],
    }
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-teal-50 to-blue-50 h-screen w-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Inspiring Living Room Designs
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {livingRoomItems.map((item) => (
          <LivingRoomCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LivingRoomCatalog;
