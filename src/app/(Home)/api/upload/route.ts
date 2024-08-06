import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/Cloudinary";

type UploadResponse =
  | { success: true; result?: any }
  | { success: false; error: any };

const uploadToCloudinary = (
  fileUri: string,
  fileName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "blog_images", // Update this to match your desired folder in Cloudinary
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    const uploadResult = await uploadToCloudinary(fileUri, file.name);

    if (uploadResult.success && uploadResult.result) {
      return NextResponse.json(
        { imageUrl: uploadResult.result.secure_url },
        { status: 200 }
      );
    } else {
      throw new Error("Upload to Cloudinary failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
