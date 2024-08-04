// app/admin/enquiries/EnquiriesContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface Enquiry {
  _id: string;
  type: "interior" | "construction";
  name: string;
  email: string;
  phone: string;
  area: number;
  location: string;
  budget: number;
  interiorTypes?: string[];
  createdAt: string;
}

export default function EnquiriesContent() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/enquiries");
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data.enquiries);
      } else {
        throw new Error("Failed to fetch enquiries");
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) {
      router.push("/admin/login");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-100 p-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Enquiries Dashboard
          </CardTitle>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="flex items-center space-x-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="text-center py-10">
              <div className="spinner"></div>
              <p className="mt-2 text-gray-600">Loading enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <p className="text-center py-10 text-gray-600">
              No enquiries found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold">Area</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Budget</TableHead>
                    <TableHead className="font-semibold">
                      Interior Types
                    </TableHead>
                    <TableHead className="font-semibold">Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enquiries.map((enquiry) => (
                    <TableRow key={enquiry._id} className="hover:bg-gray-50">
                      <TableCell className="capitalize">
                        {enquiry.type}
                      </TableCell>
                      <TableCell>{enquiry.name}</TableCell>
                      <TableCell>{enquiry.email}</TableCell>
                      <TableCell>{enquiry.phone}</TableCell>
                      <TableCell>{enquiry.area} sqft</TableCell>
                      <TableCell>{enquiry.location}</TableCell>
                      <TableCell>₹{enquiry.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        {enquiry.interiorTypes?.join(", ") || "N/A"}
                      </TableCell>
                      <TableCell>
                        {new Date(enquiry.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
