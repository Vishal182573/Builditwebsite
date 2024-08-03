// components/EnquiryForm.tsx
"use client";
import React, { useState, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Ruler,
  PaintBucket,
  Building2,
} from "lucide-react";
import IconInput from "./IconInput";
import { Toaster } from "./ui/toaster";
import { FaRupeeSign } from "react-icons/fa";

const interiorTypes = [
  { id: "bedroom", label: "Bedroom" },
  { id: "washroom", label: "Washroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "diningRoom", label: "Dining Room" },
  { id: "wallpaper", label: "Wallpaper" },
  { id: "livingRoom", label: "Living Room" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  area: string;
  location: string;
  budget: string;
  interiorTypes: string[];
}

const EnquiryForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"interior" | "construction">(
    "interior"
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    area: "",
    location: "",
    budget: "",
    interiorTypes: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interiorTypes: prev.interiorTypes.includes(id)
        ? prev.interiorTypes.filter((type) => type !== id)
        : [...prev.interiorTypes, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: activeTab }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Enquiry Submitted",
          description: data.message,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          area: "",
          location: "",
          budget: "",
          interiorTypes: [],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit enquiry");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit enquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardContent className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "interior" | "construction")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="interior">
              <PaintBucket className="mr-2 h-4 w-4" />
              Interior
            </TabsTrigger>
            <TabsTrigger value="construction">
              <Building2 className="mr-2 h-4 w-4" />
              Construction
            </TabsTrigger>
          </TabsList>
          <TabsContent value="interior">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <IconInput
                    id="name"
                    name="name"
                    value={formData.name}
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
                  <Label htmlFor="phone">Phone</Label>
                  <IconInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    icon={<Phone className="h-4 w-4" />}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sqft)</Label>
                  <IconInput
                    id="area"
                    name="area"
                    type="number"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    icon={<Ruler className="h-4 w-4" />}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <IconInput
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  icon={<MapPin className="h-4 w-4" />}
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
                <Label>Interior Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {interiorTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={formData.interiorTypes.includes(type.id)}
                        onCheckedChange={() => handleCheckboxChange(type.id)}
                      />
                      <label htmlFor={type.id}>{type.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Submit Enquiry
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="construction">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <IconInput
                    id="name"
                    name="name"
                    value={formData.name}
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
                  <Label htmlFor="phone">Phone</Label>
                  <IconInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    icon={<Phone className="h-4 w-4" />}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sqft)</Label>
                  <IconInput
                    id="area"
                    name="area"
                    type="number"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    icon={<Ruler className="h-4 w-4" />}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <IconInput
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  icon={<MapPin className="h-4 w-4" />}
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
              <Button type="submit" className="w-full">
                Submit Enquiry
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <Toaster />
    </Card>
  );
};

export default EnquiryForm;
