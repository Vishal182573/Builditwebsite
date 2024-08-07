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
  Home,
} from "lucide-react";
import IconInput from "./IconInput";
import { Toaster } from "./ui/toaster";
import { FaRupeeSign } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const interiorTypes = [
  { id: "bedroom", label: "Bedroom" },
  { id: "washroom", label: "Washroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "diningRoom", label: "Dining Room" },
  { id: "wallpaper", label: "Wallpaper" },
  { id: "livingRoom", label: "Living Room" },
];

const constructionTypes = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
];

const developmentTypes = [
  { id: "villa", label: "Villa" },
  { id: "plotting", label: "Plotting" },
  { id: "highRise", label: "High Rise" },
];

const budgetOptions = [
  { id: "classic", label: "Classic" },
  { id: "premium", label: "Premium" },
  { id: "luxury", label: "Luxury" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  area: string;
  location: string;
  budget: string;
  interiorTypes: string[];
  constructionType: string;
  developmentType: string;
  advance: string;
  ration: string;
}

const EnquiryForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "interior" | "construction" | "development"
  >("interior");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    area: "",
    location: "",
    budget: "",
    interiorTypes: [],
    constructionType: "",
    developmentType: "",
    advance: "",
    ration: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
          constructionType: "",
          developmentType: "",
          advance: "",
          ration: "",
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

  const renderCommonFields = () => (
    <>
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
        <Select
          value={formData.budget}
          onValueChange={(value) => handleSelectChange("budget", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select budget" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="h-[80vh] w-full max-w-2xl sm:dark">
      <Card className="h-full">
        <CardContent className="p-6 h-full overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "interior" | "construction" | "development")
            }
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="interior">
                <PaintBucket className="mr-2 h-4 w-4" />
                Interior
              </TabsTrigger>
              <TabsTrigger value="construction">
                <Building2 className="mr-2 h-4 w-4" />
                Construction
              </TabsTrigger>
              <TabsTrigger value="development">
                <Home className="mr-2 h-4 w-4" />
                Development
              </TabsTrigger>
            </TabsList>
            <div className="flex-grow overflow-y-auto">
              <TabsContent value="interior" className="h-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderCommonFields()}
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
                  {renderCommonFields()}
                  <div className="space-y-2">
                    <Label htmlFor="constructionType">Construction Type</Label>
                    <Select
                      value={formData.constructionType}
                      onValueChange={(value) =>
                        handleSelectChange("constructionType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select construction type" />
                      </SelectTrigger>
                      <SelectContent>
                        {constructionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Enquiry
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="development">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderCommonFields()}
                  <div className="space-y-2">
                    <Label htmlFor="developmentType">Property Type</Label>
                    <Select
                      value={formData.developmentType}
                      onValueChange={(value) =>
                        handleSelectChange("developmentType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {developmentTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="advance">Advance</Label>
                      <IconInput
                        id="advance"
                        name="advance"
                        type="number"
                        value={formData.advance}
                        onChange={handleInputChange}
                        required
                        icon={<FaRupeeSign className="h-4 w-4" />}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ratio">Ration</Label>
                      <IconInput
                        id="ration"
                        name="ration"
                        value={formData.ration}
                        onChange={handleInputChange}
                        required
                        icon={<Ruler className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Enquiry
                  </Button>
                </form>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default EnquiryForm;