/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Home,
  ArrowRight,
  Check,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import MaterialOptions from "@/components/Pacakage";
import Link from "next/link";

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
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-32 px-4 relative overflow-hidden">
        <Image
          src="/real-estate-1.jpg"
          alt="Construction background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-20"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 className="text-7xl font-bold mb-6" variants={fadeInUp}>
            Our Services
          </motion.h1>
          <motion.p
            className="text-2xl mb-10 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Exceptional construction services for residential and commercial
            projects. We bring your vision to life with precision, quality, and
            innovation.
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
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <section className="mt-32">
          <motion.h2
            className="text-5xl font-bold text-center mb-16"
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
                <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="text-5xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mt-32">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-8">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Contact us today for a free consultation and let's bring your
              vision to life. Our team of experts is ready to turn your ideas
              into reality.
            </p>
            <Link href={"/about"}>
              <Button size="lg" variant="outline" className="mr-4 text-black">
                Know About Us
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section className="mt-32">
          <motion.h2
            className="text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Material Options
          </motion.h2>
          <motion.div
            className="rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MaterialOptions />
          </motion.div>
        </section>

        <section className="mt-32">
          <motion.h2
            className="text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
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
                icon: <Phone className="h-10 w-10" />,
                title: "Phone",
                info: "+1 (555) 123-4567",
              },
              {
                icon: <Mail className="h-10 w-10" />,
                title: "Email",
                info: "info@buildit.com",
              },
              {
                icon: <MapPin className="h-10 w-10" />,
                title: "Address",
                info: "123 Construction Ave, Building City, 12345",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="flex justify-center mb-6 text-blue-600">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.info}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BuildIt</h3>
              <p>Building dreams, one project at a time.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>Residential Construction</li>
                <li>Commercial Construction</li>
                <li>Renovations</li>
                <li>Consulting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2024 BuildIt Construction. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ServicesPage;
