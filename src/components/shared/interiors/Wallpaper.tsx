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
import { FaSwatchbook, FaRulerHorizontal, FaLeaf } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { WallpaperItem } from "@/types/types";

const WallpaperCard: React.FC<{ item: WallpaperItem }> = ({ item }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const patternColors = {
    Floral: "bg-pink-100 text-pink-800",
    Geometric: "bg-blue-100 text-blue-800",
    Striped: "bg-green-100 text-green-800",
    Abstract: "bg-purple-100 text-purple-800",
    Textured: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 max-w-sm h-[480px] flex flex-col">
      <CardHeader className="p-0 relative">
        <Carousel plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            {item.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1 rounded-full hover:bg-white/40" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-1 rounded-full hover:bg-white/40" />
        </Carousel>
        <Badge
          className={`absolute bottom-2 left-2 ${
            patternColors[item.pattern as keyof typeof patternColors]
          } p-1 rounded-sm`}
        >
          {item.pattern}
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
              <FaRulerHorizontal className="text-indigo-500 mr-1" />
              <span>{item.rollSize}</span>
            </div>
            <div className="flex items-center">
              <FaLeaf className="text-green-500 mr-1" />
              <span>{item.material}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WallpaperCatalog: React.FC = () => {
  const wallpaperItems: WallpaperItem[] = [
    {
      id: 1,
      name: "Tropical Paradise",
      images: ["/wallpaper-1.jpg"
      ],
      description:
        "Vibrant tropical leaves and flowers for a bold, exotic look.",
      pattern: "Floral",
      rollSize: "20.5\" x 33'",
      material: "Non-woven",
      colors: ["green", "pink", "yellow"],
      features: ["Washable", "Pre-pasted"],
    },
    {
      id: 2,
      name: "Modern Hexagons",
      images: ["/wallpaper-2.jpg"
      ],
      description:
        "Sleek hexagonal pattern for a contemporary, minimalist interior.",
      pattern: "Geometric",
      rollSize: "20.5\" x 33'",
      material: "Vinyl",
      colors: ["gray", "white", "black"],
      features: ["Scrubbable", "Paste Required"],
    },
    {
      id: 3,
      name: "Classic Stripes",
      images: ["/wallpaper-3.jpg"
      ],
      description: "Timeless striped design perfect for any room.",
      pattern: "Striped",
      rollSize: "20.5\" x 33'",
      material: "Paper",
      colors: ["blue", "white"],
      features: ["Pre-pasted", "Washable"],
    },
    {
      id: 4,
      name: "Abstract Waves",
      images: ["/wallpaper-4.jpg"
      ],
      description: "Modern abstract waves for a dynamic, artistic touch.",
      pattern: "Abstract",
      rollSize: "20.5\" x 33'",
      material: "Vinyl",
      colors: ["blue", "gray", "white"],
      features: ["Scrubbable", "Paste Required"],
    },
    {
      id: 5,
      name: "Textured Linen",
      images: ["/wallpaper-5.jpg"
      ],
      description: "Subtle linen texture for a sophisticated, elegant look.",
      pattern: "Textured",
      rollSize: "20.5\" x 33'",
      material: "Non-woven",
      colors: ["beige", "white", "gray"],
      features: ["Washable", "Paste Required"],
    },
    {
      id: 6,
      name: "Bold Floral",
      images: ["/wallpaper-6.jpg"
      ],
      description: "Dramatic floral design to make a statement.",
      pattern: "Floral",
      rollSize: "20.5\" x 33'",
      material: "Paper",
      colors: ["red", "green", "black"],
      features: ["Pre-pasted", "Washable"],
    },
    {
      id: 7,
      name: "Chic Chevron",
      images: ["/wallpaper-7.jpg"
      ],
      description: "Stylish chevron pattern for a contemporary look.",
      pattern: "Geometric",
      rollSize: "20.5\" x 33'",
      material: "Vinyl",
      colors: ["gray", "white"],
      features: ["Scrubbable", "Paste Required"],
    },
    {
      id: 8,
      name: "Vintage Damask",
      images: ["/wallpaper-8.jpg"
      ],
      description: "Elegant damask pattern for a vintage feel.",
      pattern: "Abstract",
      rollSize: "20.5\" x 33'",
      material: "Paper",
      colors: ["blue", "gold", "white"],
      features: ["Pre-pasted",  "Washable"],
    },
    {
      id: 9,
      name: "Minimalist Lines",
      images: ["/wallpaper-7.jpg"
      ],
      description: "Clean lines for a modern, minimalist aesthetic.",
      pattern: "Striped",
      rollSize: "20.5\" x 33'",
      material: "Vinyl",
      colors: ["white", "black"],
      features: ["Scrubbable", "Paste Required"],
    },
    {
      id: 10,
      name: "Organic Leaves",
      images: ["/wallpaper-8.jpg"
      ],
      description: "Natural leaf patterns for an organic feel.",
      pattern: "Floral",
      rollSize: "20.5\" x 33'",
      material: "Non-woven",
      colors: ["green", "white"],
      features: ["Washable","Easy to Remove"],
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-yellow-50 to-red-50 h-screen w-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Exquisite Wallpaper Designs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wallpaperItems.map((item) => (
          <WallpaperCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WallpaperCatalog;
