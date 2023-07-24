import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status: 400 }
    );
  }
  try {
    const option = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 200, height: 200, crop: "scale" }],
    };
    const result = await cloudinary.uploader.upload(path,option)
    return NextResponse.json(result, {status : 200})
  } catch (error) {
    return NextResponse.json({message : error}, {status : 500})
  }
}
