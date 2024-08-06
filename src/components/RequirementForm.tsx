"use client";
import React, { useState, ChangeEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import IconInput from "@/components/IconInput";
import { Toaster } from "@/components/ui/toaster";
import { Mail, Phone, User, MapPin, Ruler, FileText } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";

interface FormData {
  fullName: string;
  email: string;
  contactNumber: string;
  city: string;
  projectArea: string;
  budget: string;
  requirements: string;
}

const RequirementsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    contactNumber: "",
    city: "",
    projectArea: "",
    budget: "",
    requirements: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/requirement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Form Submitted",
          description: data.message,
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          city: "",
          projectArea: "",
          budget: "",
          requirements: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full bg-white sm:bg-black sm:bg-opacity-50 p-4 sm:p-6 rounded-xl shadow-2xl lg:max-w-2xl">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 sm:text-white mb-4 sm:mb-6 text-center">Connect With Our Designer
      To Get Started</h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="fullName" className="text-gray-700 sm:text-white mb-1 sm:mb-2 block">Full Name</Label>
              <IconInput
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                icon={<User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                className="bg-gray-100 sm:bg-gray-800 text-gray-800 sm:text-white border-gray-300 sm:border-gray-700 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 sm:text-white mb-1 sm:mb-2 block">Email</Label>
              <IconInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                className="bg-gray-100 sm:bg-gray-800 text-gray-800 sm:text-white border-gray-300 sm:border-gray-700 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="contactNumber" className="text-gray-700 sm:text-white mb-1 sm:mb-2 block">Contact Number</Label>
              <IconInput
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                icon={<Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                className="bg-gray-100 sm:bg-gray-800 text-gray-800 sm:text-white border-gray-300 sm:border-gray-700 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="city" className="text-gray-700 sm:text-white mb-1 sm:mb-2 block">City</Label>
              <IconInput
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                className="bg-gray-100 sm:bg-gray-800 text-gray-800 sm:text-white border-gray-300 sm:border-gray-700 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="projectArea" className="text-gray-700 sm:text-white mb-1 sm:mb-2 block">Project Area</Label>
              <IconInput
                id="projectArea"
                name="projectArea"
                value={formData.projectArea}
                onChange={handleInputChange}
                required
                icon={<Ruler className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                className="bg-gray-100 sm:bg-gray-800 text-gray-800 sm:text-white border-gray-300 sm:border-gray-700 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="budget" className="text-gray-700 sm:text-white mb-1 sm:mb-2 block">Budget</Label>
              <IconInput
                id="budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleInputChange}
                required
                icon={<FaRupeeSign className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />}
                className="bg-gray-100 sm:bg-gray-800 text-gray-800 sm:text-white border-gray-300 sm:border-gray-700 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="requirements" className="text-gray-700 sm:text-white mb-1 sm:mb-2 block">Requirements</Label>
            <div className="relative">
              <select
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                required
                className="block w-full p-2 sm:p-3 bg-gray-100 sm:bg-gray-800 text-gray-800 sm:text-white border-gray-300 sm:border-gray-700 rounded-md focus:border-blue-500 appearance-none"
              >
                <option value="" disabled>Select Requirements</option>
                <option value="Office Design and Build">Office Design and Build</option>
                <option value="Hospitality Design & Build">Hospitality Design & Build</option>
                <option value="Retail Design and Build">Retail Design and Build</option>
                <option value="Renovation">Renovation</option>
                <option value="Refurbishment">Refurbishment</option>
                <option value="Others">Others</option>
              </select>
              <FileText className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-md transition duration-300">
            Submit Requirements
          </Button>
          </form>
      <Toaster />
    </div>
  );
};

export default RequirementsForm;