import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
 
export async function POST(req) {
  try {
    const resumeData = await req.json(); // Get the resume data from the request body
 
    // Define the schema for resume analysis, now including grammar and ATS compatibility
    const schema = z.object({
      analysis: z.array(
        z.object({
          fieldName: z.string(),
          score: z.number().min(0).max(100),
          suggestions: z.string(),
        })
      ),
      grammar: z.object({
        score: z.number().min(0).max(100),
        suggestions: z.string(),
      }),
      atsCompatibility: z.object({
        score: z.number().min(0).max(100),
        suggestions: z.string(),
      }),
    });
 
    // Construct the prompt for the AI model, now asking for grammar and ATS compatibility
    const prompt = `
      Analyze this resume for compatibility with an applicant tracking system (ATS).
      For ATS Compatibility(based on relevance and frequency of your keywords, the layout and readability of your resume, and the consistency and accuracy of your information
      for each field provide:
      1. The field name.
      2. The score out of 100.
      3. Any optimization suggestions for that field.
 
      Resume Data:
      ${JSON.stringify(resumeData, null, 2)}
    `;
 
    // Call the AI model with generateObject and pass the schema
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema,
      prompt,
    });
    
 
    // Return the analysis result
    return NextResponse.json({ data: object }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}