import { generateProposal } from "@/lib/langchain";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { APIResponse } from "@/lib/types";

const requestSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  projectScope: z.string().min(10, "Project scope must be at least 10 characters"),
  budget: z.string().min(1, "Budget information is required"),
  model: z.enum(["gpt-3.5-turbo", "gpt-4"], {
    errorMap: () => ({ message: "Invalid model selection" }),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    // Validate request body
    const validatedData = requestSchema.safeParse(body);
    
    if (!validatedData.success) {
      console.error('Validation errors:', validatedData.error.errors);
      return NextResponse.json(
        { 
          error: "Invalid request data",
          details: validatedData.error.errors
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const proposal = await generateProposal(validatedData.data);

    return NextResponse.json({ proposal });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      },
      { status: 500 }
    );
  }
}