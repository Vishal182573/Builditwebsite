// app/admin/enquiries/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

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

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchEnquiries = async () => {
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
      }
    };
    fetchEnquiries();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) {
      router.push("/admin/login");
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>All Enquiries</CardTitle>
        <button onClick={handleLogout}>Logout</button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Interior Types</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((enquiry) => (
              <TableRow key={enquiry._id}>
                <TableCell>{enquiry.type}</TableCell>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell>{enquiry.phone}</TableCell>
                <TableCell>{enquiry.area}</TableCell>
                <TableCell>{enquiry.location}</TableCell>
                <TableCell>{enquiry.budget}</TableCell>
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
      </CardContent>
    </Card>
  );
}
