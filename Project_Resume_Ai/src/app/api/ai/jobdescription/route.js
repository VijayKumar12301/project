import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req) {
  try {
    // Extract resume and job description from request body
    const { extractedText, jobDescription } = await req.json();

    // Construct the prompt for the AI model
    const prompt = `
      Compare the following resume with the job description and provide an analysis.

      For each key field in the resume (such as "Experience", "Skills", "Education", etc.),
      provide:
      1. Field Name.
      2. A score out of 100 reflecting how well the resume matches the job description.
      3. Specific optimization suggestions for improvement.

      Also include:
      - A grammar analysis with a score out of 100 and suggestions for improvement.
      - An ATS (Applicant Tracking System) compatibility(based on relevance and frequency of your keywords, the layout and readability of your resume, and the consistency and accuracy of your information) analysis with a score out of 100 and suggestions.
      - An overall match percentage between the resume and the job description.

      Resume:
      ${extractedText}

      Job Description:
      ${jobDescription}
    `;

    // Define the expected schema using Zod
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
      overallMatch: z.number().min(0).max(100),
    });

    // Generate the object using your AI model
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema,
      prompt,
    });

    // Return the validated response
    return NextResponse.json({ data: object }, { status: 200 });
  } catch (error) {
    console.error("Error in job analysis API:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume against job description" },
      { status: 500 }
    );
  }
}
