import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import RequirementsForm from "@/models/requirements";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      fullName,
      email,
      contactNumber,
      city,
      projectArea,
      budget,
      requirements,
    } = body;

    if (
      !fullName ||
      !email ||
      !contactNumber ||
      !city ||
      !projectArea ||
      !budget ||
      !requirements
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newForm = new RequirementsForm({
      fullName,
      email,
      contactNumber,
      city,
      projectArea,
      budget,
      requirements,
    });

    await newForm.save();

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in form route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const forms = await RequirementsForm.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ forms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
