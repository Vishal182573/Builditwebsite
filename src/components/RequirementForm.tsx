"use client";
import React, { useState, ChangeEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import IconInput from "@/components/IconInput";
import { Toaster } from "@/components/ui/toaster";
import { Mail, Phone, User, MapPin, Ruler } from "lucide-react";
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
    <div className="w-full flex justify-start mt-8">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <IconInput
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                icon={<User className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <IconInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                icon={<Mail className="h-4 w-4" />}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <IconInput
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                icon={<Phone className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <IconInput
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectArea">Project Area</Label>
            <IconInput
              id="projectArea"
              name="projectArea"
              value={formData.projectArea}
              onChange={handleInputChange}
              required
              icon={<Ruler className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <IconInput
              id="budget"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleInputChange}
              required
              icon={<FaRupeeSign className="h-4 w-4" />}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <select
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              required
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select Requirements
              </option>
              <option value="Office Design and Build">
                Office Design and Build
              </option>
              <option value="Hospitality Design & Build">
                Hospitality Design & Build
              </option>
              <option value="Retail Design and Build">
                Retail Design and Build
              </option>
              <option value="Renovation">Renovation</option>
              <option value="Refurbishment">Refurbishment</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default RequirementsForm;
