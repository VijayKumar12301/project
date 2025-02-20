"use client";
import Banner from "@/components/Banner";
import Reviews from "@/components/Reviews";
import ResumeTips from "@/components/ResumeTips";
import StepByStepGuidance from "@/components/StepByStepGuidance";
import Dashboard from "./dashboard/page";
import JobSearchForm from "./dashboard/jobdescription/page";
import SecondHeader from "@/components/SecondHeader";

export default function Home() {
  return (
    <div>
     
      <Banner />
      <StepByStepGuidance />
      <ResumeTips />
      <Reviews />
    </div>
  );
}
