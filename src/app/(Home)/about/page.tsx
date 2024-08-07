"use client";

import { motion } from "framer-motion";
import { Building2, Users, Trophy, Sparkles } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200"
            variants={fadeInUp}
          >
            About BUILDIT
          </motion.h1>
          <motion.p
            className="text-2xl mb-10 text-blue-100"
            variants={fadeInUp}
          >
            Building Dreams, Crafting Futures
          </motion.p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <section className="mb-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                BUILDIT was founded with a vision to revolutionize the
                construction and development industry in Hyderabad. Our journey
                began with a small team of passionate individuals who believed
                in creating spaces that inspire and endure.
              </p>
              <p className="text-lg text-gray-600">
                Today, we&rsquo;ve grown into a leading force in the industry,
                known for our innovative interior designs, sustainable
                practices, and commitment to excellence. Our projects span
                across residential, commercial, and industrial sectors, each
                reflecting our dedication to quality and client satisfaction.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Image
                src="/villa.avif"
                alt="BUILDIT team at work"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </section>

        <section className="mb-24">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Why Choose BUILDIT?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: Building2,
                title: "Expert Construction",
                description: "State-of-the-art techniques and materials",
              },
              {
                icon: Users,
                title: "Client-Centric Approach",
                description: "Your vision, our expertise",
              },
              {
                icon: Trophy,
                title: "Award-Winning Designs",
                description: "Recognized for innovation and quality",
              },
              {
                icon: Sparkles,
                title: "Sustainable Practices",
                description: "Eco-friendly solutions for a better future",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <item.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section>
          <motion.div
            className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-16 text-center shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl mb-8">
              To create exceptional spaces that enhance lives, inspire
              communities, and shape a sustainable future in Kolkata and beyond.
            </p>
            <div className="flex justify-center space-x-8">
              <div>
                <p className="text-5xl font-bold mb-2">100+</p>
                <p className="text-lg">Projects Completed</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">10+</p>
                <p className="text-lg">Years of Experience</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">500+</p>
                <p className="text-lg">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
