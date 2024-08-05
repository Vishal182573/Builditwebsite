import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, content, author, imageUrl } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPost = new Blog({
      title,
      content,
      author,
      imageUrl,
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Blog post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
