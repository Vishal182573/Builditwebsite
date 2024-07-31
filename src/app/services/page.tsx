"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Home, ArrowRight, Check } from "lucide-react";

const services = [
  {
    type: "residential",
    title: "Residential Construction",
    description: "Building your dream home from the ground up.",
    image: "/residential.avif",
    features: [
      "Custom home design",
      "Home renovations",
      "Kitchen remodeling",
      "Bathroom upgrades",
      "Energy-efficient solutions",
      "Smart home integration",
    ],
  },
  {
    type: "commercial",
    title: "Commercial Construction",
    description: "Creating spaces that drive business success.",
    image: "/commercial.jpg",
    features: [
      "Office buildings",
      "Retail spaces",
      "Industrial facilities",
      "Healthcare centers",
      "Educational institutions",
      "Sustainable construction",
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

function ServicesPage() {
  const [activeTab, setActiveTab] = useState("residential");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 className="text-6xl font-bold mb-6" variants={fadeInUp}>
            Our Services
          </motion.h1>
          <motion.p className="text-2xl mb-10" variants={fadeInUp}>
            Exceptional construction services for residential and commercial
            projects
          </motion.p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger
              value="residential"
              className="text-lg font-semibold py-4"
              onClick={() => setActiveTab("residential")}
            >
              <Home className="mr-2 h-5 w-5" /> Residential
            </TabsTrigger>
            <TabsTrigger
              value="commercial"
              className="text-lg font-semibold py-4"
              onClick={() => setActiveTab("commercial")}
            >
              <Building2 className="mr-2 h-5 w-5" /> Commercial
            </TabsTrigger>
          </TabsList>
          {services.map((service) => (
            <TabsContent key={service.type} value={service.type}>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                initial="hidden"
                animate={activeTab === service.type ? "visible" : "hidden"}
                variants={stagger}
              >
                <motion.div variants={fadeInUp}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg object-cover w-full h-[400px]"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                  <p className="text-xl text-gray-600 mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center text-lg"
                        variants={fadeInUp}
                      >
                        <Check className="mr-2 h-6 w-6 text-green-500" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <Button size="lg" className="text-lg">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <section className="mt-24">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose BuildIt?
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
                icon: "🏆",
                title: "Award-Winning Designs",
                description:
                  "Our innovative designs have won multiple industry awards.",
              },
              {
                icon: "👥",
                title: "Expert Team",
                description:
                  "Highly skilled professionals with years of experience.",
              },
              {
                icon: "🌿",
                title: "Sustainable Practices",
                description: "Committed to eco-friendly construction methods.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mt-24">
          <motion.div
            className="bg-blue-600 text-white rounded-lg p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8">
              Contact us today for a free consultation and let&rsquo;s bring
              your vision to life.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="text-black border-white hover:bg-white hover:text-blue-600"
            >
              Get in Touch
            </Button>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default ServicesPage;
