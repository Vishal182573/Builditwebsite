import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/enquiry";
import { sendEnquiryNotification } from "@/lib/EmailService";
import { isAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      type,
      name,
      email,
      phone,
      area,
      location,
      budget,
      interiorTypes,
      constructionType,
      developmentType,
      advance,
      ration,
    } = body;

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
      constructionType: type === "construction" ? constructionType : undefined,
      developmentType: type === "development" ? developmentType : undefined,
      advance: type === "development" ? advance : undefined,
      ration: type === "development" ? ration : undefined,
    });

    await newEnquiry.save();

    // // Send email notification
    // try {
    //   await sendEnquiryNotification(newEnquiry);
    // } catch (emailError) {
    //   console.error("Detailed error sending email notification:", emailError);
    //   return NextResponse.json(
    //     { error: "Error sending email notification" },
    //     { status: 500 }
    //   );
    // }

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
