"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  DollarSign,
  ArrowRight,
  Square,
  Building2,
  Trees,
  Home,
  Star,
  TrendingUp,
} from "lucide-react";
import { FaHandPointUp } from "react-icons/fa";
import Link from "next/link";

const propertyCategories = [
  {
    name: "Development Sites",
    icon: Building2,
    properties: [
      {
        id: 1,
        title: "Urban Renewal Project",
        location: "Downtown Cityville",
        price: 10000000,
        area: 50000,
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
  },
  {
    name: "Land for Sale",
    icon: Trees,
    properties: [
      {
        id: 1,
        title: "Scenic Hilltop Plot",
        location: "Greenville Outskirts",
        price: 500000,
        area: 10000,
        image:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
      },
    ],
  },
  {
    name: "Flats for Sale",
    icon: Home,
    properties: [
      {
        id: 1,
        title: "Luxury Penthouse",
        location: "Skyline Towers",
        price: 2000000,
        area: 3000,
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PropertiesPage() {
  const [activeCategory, setActiveCategory] = useState("Development Sites");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Tabs defaultValue="Development Sites" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-3 gap-4 bg-transparent p-2">
            {propertyCategories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="text-lg font-semibold py-6 px-4 rounded-xl bg-white shadow-md hover:bg-blue-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
                onClick={() => setActiveCategory(category.name)}
              >
                <category.icon className="mr-2 h-6 w-6" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={stagger}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {propertyCategories
                .find((cat) => cat.name === activeCategory)
                ?.properties.map((property) => (
                  <motion.div key={property.id} variants={fadeInUp}>
                    <Card className="overflow-hidden hover:shadow-2xl transition duration-300 rounded-2xl">
                      <CardContent className="p-0 relative">
                        <Image
                          src={property.image}
                          alt={property.title}
                          width={400}
                          height={300}
                          className="w-full h-[250px] object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-3 m-4 rounded-full text-lg font-semibold shadow-lg">
                          ${property.price.toLocaleString()}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-8">
                        <h3 className="text-2xl font-bold mb-3 text-gray-800">
                          {property.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex items-center text-lg">
                          <MapPin className="mr-2" size={20} />
                          {property.location}
                        </p>
                        <div className="flex justify-between w-full text-gray-600 mb-6">
                          <span className="flex items-center text-lg">
                            <Square className="mr-2" size={20} />
                            {property.area.toLocaleString()} sqft
                          </span>
                          <span className="flex items-center text-lg">
                            <DollarSign className="mr-2" size={20} />$
                            {(property.price / property.area).toFixed(2)}/sqft
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <section className="bg-gradient-to-b from-gray-100 to-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Invest with BuildIt?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Star,
                title: "Expert Market Knowledge",
                description:
                  "Our team of professionals has in-depth knowledge of local and global real estate markets.",
              },
              {
                icon: MapPin,
                title: "Prime Locations",
                description:
                  "We offer properties in the most desirable and high-growth potential areas.",
              },
              {
                icon: TrendingUp,
                title: "Tailored Investment Strategies",
                description:
                  "We work closely with you to develop investment strategies that align with your goals.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                variants={fadeInUp}
              >
                <item.icon className="h-16 w-16 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-16 text-center shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-8">
              Ready to Invest in Your Future?
            </h2>
            <p className="text-2xl mb-10 text-blue-100">
              Contact our team of experts to start your property investment
              journey today.
            </p>
            <Link href={"gallery-interior"}>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300 py-8 px-12 text-xl font-semibold rounded-full shadow-lg transform hover:scale-105"
            >
              See our gallery to view more properties 
              <FaHandPointUp className="ml-2 h-6 w-6" />
            </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
