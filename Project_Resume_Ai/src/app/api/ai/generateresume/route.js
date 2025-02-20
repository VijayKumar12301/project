import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
export async function POST(req) {
   // console.log("api called");
  try {
    const resumeData = await req.json(); // Get user input
    // Define the schema for AI response
    const schema = z.object({
      correctedResume: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        mobileNumber: z.string(),
        dateOfBirth: z.string(),
        gender: z.string(),
        presentAddress: z.string(),
        profile: z.string(),
        branch: z.string(),
        college: z.string(),
        percentage: z.string(),
        passingYear: z.string(),
        skills: z.string(),
        technicalCertifications: z.string(),
        internshipCertifications: z.string(),
        yearsOfExperience: z.string(),
        experienceDetails: z.string(),
        linkedinProfile: z.string(),
        project: z.string(),
        hobbies: z.string(),
      }),
    });
    // Construct AI prompt
    const prompt = `
      The following is a user's resume data. Please check the grammar and improve it.
      Return the corrected fields while maintaining the original structure.
      Resume Data:
      ${JSON.stringify(resumeData, null, 2)}
    `;
    // Call AI model
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema,
      prompt,
    });
    console.log(object.correctedResume);
    return NextResponse.json({ data: object.correctedResume }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 });
  }
}






