import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/enquiry";
import { sendEnquiryNotification, testSend } from "@/lib/EmailService";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { type, name, email, phone, area, location, budget, interiorTypes } =
      body;

    if (!type || !name || !email || !phone || !area || !location || !budget) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEnquiry = new Enquiry({
      type,
      name,
      email,
      phone,
      area,
      location,
      budget,
      interiorTypes: type === "interior" ? interiorTypes : undefined,
    });

    await newEnquiry.save();

    // Send email notification
    try {
      await sendEnquiryNotification(newEnquiry);
    } catch (emailError) {
      console.error("Detailed error sending email notification:", emailError);
      // Consider whether you want to return an error response here
    }

    return NextResponse.json(
      { message: "Enquiry submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in enquiry route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ enquiries }, { status: 200 });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
