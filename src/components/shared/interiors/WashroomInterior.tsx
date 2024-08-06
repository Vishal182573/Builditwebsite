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
import { FaBath, FaStar, FaTint } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { WashroomItem } from "@/types/types";

const WashroomCard: React.FC<{ item: WashroomItem }> = ({ item }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

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
              <FaBath className="text-indigo-500 mr-1" />
              <span>{item.bathType}</span>
            </div>
            <div className="flex items-center">
              <FaTint className="text-blue-500 mr-1" />
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

const WashroomInterior: React.FC = () => {
  const washroomItems: WashroomItem[] = [
    {
      id: 1,
      name: "Spa Sanctuary",
      price: "$3,500",
      images: ["/washroom-1.jpg"
      ],
      description: "Luxurious washroom with spa-like amenities.",
      features: ["Jacuzzi Tub", "Heated Floors", "Rain Shower"],
      bathType: "Full Bath",
      theme: "Modern",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Rustic Haven",
      price: "$2,800",
      images: ["/washroom-2.jpg"
      ],
      description: "Charming washroom with rustic elements.",
      features: ["Stone Sink", "Wooden Vanity", "Antique Fixtures"],
      bathType: "Half Bath",
      theme: "Rustic",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Minimalist Retreat",
      price: "$3,000",
      images: ["/washroom-3.jpg"
      ],
      description: "Simple and clean washroom design.",
      features: ["Floating Vanity", "Glass Shower", "Subway Tiles"],
      bathType: "Full Bath",
      theme: "Minimalist",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Bohemian Bliss",
      price: "$2,700",
      images: ["/washroom-4.jpg"
      ],
      description: "Eclectic washroom with bohemian flair.",
      features: ["Patterned Tiles", "Freestanding Tub", "Macramé Decor"],
      bathType: "Full Bath",
      theme: "Bohemian",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Coastal Escape",
      price: "$3,200",
      images: ["/washroom-5.jpg"
      ],
      description: "Light and airy washroom with coastal elements.",
      features: ["Shell Decor", "Blue Accents", "Pebble Flooring"],
      bathType: "Full Bath",
      theme: "Coastal",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Elegant Powder Room",
      price: "$2,500",
      images: ["/washroom-6.jpg"
      ],
      description: "Sophisticated powder room with luxurious touches.",
      features: ["Marble Vanity", "Gold Fixtures", "Chandelier"],
      bathType: "Half Bath",
      theme: "Modern",
      rating: 4.9,
    },
    {
      id: 7,
      name: "Vintage Charm",
      price: "$2,900",
      images: ["/washroom-7.jpg"
      ],
      description: "Charming washroom with vintage elements.",
      features: ["Clawfoot Tub", "Pedestal Sink", "Hexagon Tiles"],
      bathType: "Full Bath",
      theme: "Rustic",
      rating: 4.6,
    },
    {
      id: 8,
      name: "Contemporary Clean",
      price: "$3,300",
      images: ["/washroom-8.jpg"
      ],
      description: "Sleek and modern washroom design.",
      features: ["Wall-mounted Toilet", "LED Mirrors", "Floating Shelves"],
      bathType: "Full Bath",
      theme: "Modern",
      rating: 4.8,
    }
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-50 to-teal-50 h-screen w-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Luxurious Washroom Interiors
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {washroomItems.map((item) => (
          <WashroomCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WashroomInterior;
