import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await replicate.run(
      "fofr/potat:8554b887aac683eff0efaa634b7000e3acfb49c479178deb9228e43aee937f21",
      {
        input: {
          prompt
        },
      }
    );

    return NextResponse.json(response)
    
  } catch (error) {
    console.log("[VIDEO_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
