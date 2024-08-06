"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FaChevronRight,
  FaHardHat,
  FaBuilding,
  FaIndustry,
} from "react-icons/fa";

interface MaterialOption {
  title: string;
  steel: string;
  bricks: string;
  cement: {
    slabs: string;
    brickworks: string;
  };
  learnMoreLink: string;
}

const materialOptions: MaterialOption[] = [
  {
    title: "Classic",
    steel: "DHANALAKSHMI/KAMADHENU steel will be used",
    bricks: "RED BRICKS",
    cement: {
      slabs: "For slabs and pillars [53-Grade cement Brand: Nagarjuna / JSW]",
      brickworks:
        "For brickworks and internal works [43-Grade cement Brand: Nagarjuna, JSW, Chettinad]",
    },
    learnMoreLink: "#",
  },
  {
    title: "Premium",
    steel: "JAYRAJ/SREE TMT steel will be used",
    bricks: "LIGHTWEIGHT RED BRICKS",
    cement: {
      slabs: "For slabs and pillars [53-Grade cement Brand: BIRLA A1/BHARATHI]",
      brickworks:
        "For brickworks and internal works [43-Grade cement Brand: Nagarjuna, JSW, Chettinad]",
    },
    learnMoreLink: "#",
  },
  {
    title: "Luxury",
    steel: "JSW / VIZAG / TATA TMT steel will be used",
    bricks: "Karimnagar LIGHT WEIGHT RED BRICKS",
    cement: {
      slabs: "For slabs and pillars [53-Grade cement Brand: ultra tech]",
      brickworks:
        "For brickworks and internal works [43-Grade cement Brand: Bharathi/Birla]",
    },
    learnMoreLink: "#",
  },
];

const MaterialOptions: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Building Materials
        </motion.h1>
        <motion.p
          className="text-xl mb-10 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Select the perfect materials to bring your construction project to
          life.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {materialOptions.map((option, index) => (
            <motion.div key={option.title} variants={itemVariants}>
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="rounded-lg  bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <CardTitle className="text-2xl font-bold">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between p-6">
                  <div className="space-y-4">
                    <MaterialItem
                      icon={<FaHardHat />}
                      label="Steel"
                      value={option.steel}
                    />
                    <MaterialItem
                      icon={<FaBuilding />}
                      label="Bricks"
                      value={option.bricks}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <FaIndustry className="mr-2" /> Cement:
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>{option.cement.slabs}</li>
                        <li>{option.cement.brickworks}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const MaterialItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <div className="text-blue-500">{icon}</div>
    <div className="flex-grow">
      <span className="text-gray-600 font-medium">{label}:</span>
      <Badge variant="secondary" className="ml-2 text-sm">
        {value}
      </Badge>
    </div>
  </div>
);

export default MaterialOptions;
