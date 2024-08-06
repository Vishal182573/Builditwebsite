"use client";
import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaBed, FaStar, FaPalette } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BedroomItem } from "@/types/types";

const BedroomCard: React.FC<{ item: BedroomItem }> = ({ item }) => {
  const themeColors = {
    Modern: "bg-slate-100 text-slate-800",
    Rustic: "bg-amber-100 text-amber-800",
    Minimalist: "bg-gray-100 text-gray-800",
    Bohemian: "bg-rose-100 text-rose-800",
    Coastal: "bg-cyan-100 text-cyan-800",
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 max-w-sm h-[400px] flex flex-col">
      <CardHeader className="p-0 relative">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.name}
            width={400}
            height={200}
            className="object-cover"
          />
        </div>
        <Badge
          className={`absolute bottom-2 left-2 ${
            themeColors[item.theme as keyof typeof themeColors]
          }`}
        >
          {item.theme}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {item.name}
          </h2>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {item.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <FaBed className="text-indigo-500 mr-1" />
              <span>{item.bedSize}</span>
            </div>
            <div className="flex items-center">
              <FaPalette className="text-pink-500 mr-1" />
              <span>{item.theme}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">{item.price}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < item.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BedroomInterior: React.FC = () => {
  const bedroomItems: BedroomItem[] = [
    {
      id: 1,
      name: "Serene Oasis Bedroom",
      price: "$4,200",
      images: [
        "/bedroom-1.jpg"
      ],
      description:
        "Tranquil bedroom design with calming colors and plush textures.",
      features: ["Walk-in Closet", "En-suite Bathroom", "Smart Lighting"],
      bedSize: "King",
      theme: "Modern",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Rustic Retreat",
      price: "$3,800",
      images: [
        "/bedroom-2.jpg"
      ],
      description: "Cozy bedroom with rustic charm and natural elements.",
      features: ["Exposed Beams", "Fireplace", "Vintage Furniture"],
      bedSize: "Queen",
      theme: "Rustic",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Minimalist Haven",
      price: "$3,500",
      images: [
        "/bedroom-3.jpg"
      ],
      description: "Simple and clean bedroom with a minimalist aesthetic.",
      features: ["Built-in Storage", "Simple Lines", "Neutral Colors"],
      bedSize: "Queen",
      theme: "Minimalist",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Bohemian Rhapsody",
      price: "$3,900",
      images: [
        "/bedroom-4.jpg",
      ],
      description: "Eclectic and colorful bedroom with a bohemian vibe.",
      features: ["Tapestries", "Vintage Rugs", "Bold Colors"],
      bedSize: "Queen",
      theme: "Bohemian",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Coastal Breeze",
      price: "$4,000",
      images: [
        "/bedroom-5.jpg"
      ],
      description: "Bright and airy bedroom with coastal decor.",
      features: ["Ocean Views", "Whitewashed Wood", "Sea-Inspired Colors"],
      bedSize: "King",
      theme: "Coastal",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Industrial Loft",
      price: "$4,500",
      images: [
        "/bedroom-6.jpg",
      ],
      description: "Chic bedroom with an industrial loft design.",
      features: ["Exposed Brick", "Metal Fixtures", "Open Space"],
      bedSize: "King",
      theme: "Industrial",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Glamorous Suite",
      price: "$5,200",
      images: [
        "/bedroom-7.jpg",
      ],
      description: "Luxurious bedroom suite with glamorous details.",
      features: ["Chandelier", "Plush Fabrics", "Gold Accents"],
      bedSize: "King",
      theme: "Glamorous",
      rating: 4.8,
    },
    {
      id: 8,
      name: "Modern Elegance",
      price: "$4,600",
      images: [
        "/bedroom-8.jpg"
      ],
      description: "Elegant bedroom with modern touches and sleek design.",
      features: [
        "Floor-to-Ceiling Windows",
        "Marble Finishes",
        "Contemporary Furniture",
      ],
      bedSize: "King",
      theme: "Modern",
      rating: 4.9,
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-purple-50 to-indigo-50 h-screen w-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Dreamy Bedroom Interiors
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {bedroomItems.map((item) => (
          <BedroomCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default BedroomInterior;