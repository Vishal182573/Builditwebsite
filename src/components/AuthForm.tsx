"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, Lock, User, ArrowRight, Globe } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function LoginRegisterPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <motion.div
        className="max-w-md w-full"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome to <span className="text-blue-600">BuildIt</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Your premier destination for property investments
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="backdrop-blur-sm bg-white/30 shadow-xl rounded-3xl overflow-hidden">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  onClick={() => setActiveTab("register")}
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="login" className="mt-0">
                      <form className="space-y-4">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Email"
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            type="password"
                            placeholder="Password"
                            className="pl-10"
                          />
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Login <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="register" className="mt-0">
                      <form className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Full Name" className="pl-10" />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Email"
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            type="password"
                            placeholder="Password"
                            className="pl-10"
                          />
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Register <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Globe className="mr-2 h-4 w-4" /> Login with Google
                </Button>
              </CardFooter>
            </Tabs>
          </Card>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-8 text-center text-gray-600"
        >
          By continuing, you agree to BuildIt&rsquo;s Terms of Service and
          Privacy Policy.
        </motion.p>
      </motion.div>
    </div>
  );
}
