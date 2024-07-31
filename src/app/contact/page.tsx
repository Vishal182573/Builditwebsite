"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
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
            Contact BUILDIT
          </motion.h1>
          <motion.p
            className="text-2xl mb-10 text-blue-100"
            variants={fadeInUp}
          >
            We&rsquo;re here to help and answer any question you might have
          </motion.p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Get in Touch
            </h2>
            <form className="space-y-6">
              <div>
                <Input placeholder="Your Name" className="w-full" />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="w-full"
                />
              </div>
              <div>
                <Input placeholder="Subject" className="w-full" />
              </div>
              <div>
                <Textarea placeholder="Your Message" className="w-full h-32" />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Contact Information
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content:
                    "10-2-289/83,Mehar Mansion ,Shanti Nagar Colony, Masab Tank, Hyderabad, Telangana 500028",
                },
                { icon: Phone, title: "Phone", content: "+91 9652631186" },
                {
                  icon: Mail,
                  title: "Email",
                  content: "builditdreamz@gmail.com",
                },
                {
                  icon: Globe,
                  title: "Website",
                  content: "www.buildit.com",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="flex items-center p-4">
                    <item.icon className="h-6 w-6 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Find Us on the Map
          </motion.h2>
          <motion.div
            className="aspect-w-16 aspect-h-9"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4143162844397!2d78.45109671487477!3d17.39587198807922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97dcc6a34d4f%3A0x8800e2e5d1ee13d1!2s10-2-289%2F83%2C%20Shanti%20Nagar%20Colony%2C%20Masab%20Tank%2C%20Hyderabad%2C%20Telangana%20500028!5e0!3m2!1sen!2sin!4v1627984635173!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
