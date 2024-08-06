"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const InteriorCategories = () => {
  const categories = [
    {
      name: "Bedroom Design",
      href: "/interiors/bedroominterior",
      image: "/simple-bedroom-interior-designs.jpg",
    },
    {
      name: "Living Room",
      href: "/interiors/livinginterior",
      image: "/living_room_design.jpg",
    },
    {
      name: "Washroom",
      href: "/interiors/washroominterior",
      image: "/bathroom_image.avif",
    },
    {
      name: "Wallpaper",
      href: "/interiors/wallpaperinterior",
      image: "/wallpapaer_design.jpg",
    },
    {
      name: "Dining Room",
      href: "/interiors/dininginterior",
      image: "/diningroom_design.jpg",
    },
    {
      name: "Kitchen",
      href: "/interiors/kitcheninterior",
      image: "/kitchen_design.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Interior Categories
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[400px]">
              <CardHeader className="flex flex-col items-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="rounded mb-4 object-cover"
                />
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore the best designs and ideas for your{" "}
                  {category.name.toLowerCase()}.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InteriorCategories;
