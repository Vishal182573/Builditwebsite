"use client";

import Link from "next/link";
import {
  FaBed,
  FaCouch,
  FaBath,
  FaPaintRoller,
  FaUtensils,
  FaConciergeBell,
} from "react-icons/fa";
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
      icon: <FaBed />,
      href: "/interiors/bedroominterior",
    },
    {
      name: "Living Room",
      icon: <FaCouch />,
      href: "/interiors/livinginterior",
    },
    { name: "Washroom", icon: <FaBath />, href: "/interiors/washroominterior" },
    {
      name: "Wallpaper",
      icon: <FaPaintRoller />,
      href: "/interiors/wallpaperinterior",
    },
    {
      name: "Dining Room",
      icon: <FaUtensils />,
      href: "/interiors/dininginterior",
    },
    {
      name: "Kitchen",
      icon: <FaConciergeBell />,
      href: "/interiors/kitcheninterior",
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
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader className="flex flex-col items-center">
                <div className="text-blue-600 text-4xl mb-4">
                  {category.icon}
                </div>
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
