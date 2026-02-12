"use client";
import { useState, useRef } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import CareerCard from "@/components/CareerCard";

export const runtime = 'edge';

function AboutUs() {
  // Define state to hold a File object or null
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Type the ref for an HTMLInputElement
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resumeFileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file removal
  const removeFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering the input click if nested
    setCoverLetter(null);

    // Reset the input value so the same file can be uploaded again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeResumeFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setResumeFile(null);
    if (resumeFileInputRef.current) {
      resumeFileInputRef.current.value = "";
    }
  };

  const jobListing = [
    {
      id: 1,
      position: "Marketing Support Associate / Site Officer",
      location: "Angeles City, Pampanga",
      description: "Responsible for over-all marketing related activities of the project — events, traditional and digital initiatives, public relations and research.",
      datePosted: "Feb 12, 2026",
    },
  ];
  
  return (
    <div className="mt-30">
      <header>
        <NavBar isScrolled={true} />
      </header>
      <PageBanner
        title="Career Details"
        description="View current and upcoming developments of distinction and innovation."
        breadcrumb="Careers / Details"
      />
      <main className="flex flex-col lg:flex-row justify-start items-start px-8 md:px-24 xl:px-44 gap-8 py-16">
        {/* ABOUT US SECTION */}
        <section className="flex flex-col items-start justify-center space-y-8 w-full lg:w-2/3">
          <span className="flex flex-col gap-4">
            <span>
                <h1 className="text-4xl font-bold">
                MARKETING SUPPORT ASSOCIATE / SITE OFFICER
                </h1>
                <p className="text-lg font-bold text-secondary">Angeles City, Pampanga</p>
            </span>


            <h2 className="text-2xl font-bold">Purpose and Scope</h2>
            <p className="leading-relaxed">
                Responsible for over-all marketing related activities of the project — events, traditional and digital initiatives, public relations and research.
   
            </p>

            <h2 className="text-2xl font-bold">
              Specific Duties and Responsibilities:
            </h2>

            <ul className="list-disc list-outside space-y-3 text-slate-800 max-w-3xl marker:text-blue-600 pl-5">
              <li>
                Leads the implementation of project marketing activities and
                sales-generating events.
              </li>
              <li>
                Assist the Marketing Support Lead in implementing marketing
                campaigns and strategies for the project.
              </li>
              <li>In-charge with local partnerships and sponsorships</li>
              <li>In-charge with local PR networks and publications</li>
              <li>
                Ensures availability of marketing materials (OOH, posters,
                flyers, brochures, digital, etc.) and selling tools of the
                project.
              </li>
              <li>
                Outsource and coordinate with suppliers for production of
                marketing materials and events
              </li>
              <li>
                Conducts competitors scan and market research for new and
                updated information.
              </li>
              <li>Responsible for all ingress / egress exhibits and events.</li>
              <li>
                Keeps accurate inventory and accountability list of all
                marketing materials and collaterals.
              </li>
              <li>
                Monitors that all marketing collaterals are correct and within
                branding guidelines prior to production and distribution to the
                sales team.
              </li>
              <li>
                Regularly check the project and activation sites if properly
                cleaned and well maintained. Arranges for repairs if necessary.
              </li>
              <li>
                Responsible for on-time processing of payments and liquidations
                to suppliers.
              </li>
              <li>
                Assists in daily administrative tasks to ensure smooth flow and
                coordination of the project's activities.
              </li>
              <li>
                Coordinates with other departments with project inquiries and
                concerns.
              </li>
              <li>
                Assists the Marketing Support Lead in monthly budget monitoring.
              </li>
            </ul>

            <h2 className="text-2xl font-bold">Qualifications:</h2>

            <ol className="list-decimal list-outside space-y-3 text-slate-800 max-w-3xl pl-5">
              <li>
                Candidate must possess at least Bachelor's/College Degree in
                Business Administration/Management/Marketing, Mass Communication
                or any related course
              </li>
              <li>
                Preferably at least I year working experience in related field
                is required for this position
              </li>
              <li>Must be residing in Angeles City, or nearby</li>
              <li>Must be willing to do fieldwork and weekend activities</li>
              <li>
                Able to effectively and timely perform tasks with minimal
                supervision
              </li>
              <li>Required Skills:</li>
              <ul className="list-disc list-outside space-y-3 text-slate-800 max-w-3xl marker:text-blue-600 pl-5">
                <li>Good communication and interpersonal skills</li>
                <li>Good written and verbal communication skills</li>
                <li>Good organizational and time management skills</li>
                <li>Good attention to detail</li>
                <li>Good problem-solving skills</li>
                <li>Good decision-making skills</li>
              </ul>
            </ol>
          </span>

          <Dialog>
            <DialogTrigger className="bg-primary text-white rounded-md w-fit p-2 px-4 font-bold cursor-pointer">
              Apply Now
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply Now</DialogTitle>
                <DialogDescription>
                  Fill out the form below to apply for the position.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <Field className="col-span-2">
                  <FieldLabel>Position</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Position"
                    value="Marketing Support Associate / Site Officer"
                    disabled
                  />
                </Field>
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input type="text" placeholder="First Name" />
                </Field>
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input type="text" placeholder="Last Name" />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" placeholder="Email" />
                </Field>
                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input type="tel" placeholder="Phone" />
                </Field>

                <Field className="col-span-2">
                  <FieldLabel>Resume / CV</FieldLabel>
                  <FileUpload
                    file={resumeFile}
                    onFileSelect={setResumeFile}
                    onFileRemove={removeResumeFile}
                  />
                </Field>

                <Field className="col-span-2">
                  <FieldLabel>Cover Letter</FieldLabel>
                  <FileUpload
                    file={coverLetter}
                    onFileSelect={setCoverLetter}
                    onFileRemove={removeFile}
                  />
                </Field>
              </div>

              <Button
                size="lg"
                className="bg-primary text-white rounded-md w-full p-2 px-4 font-bold cursor-pointer"
              >
                Submit Application
              </Button>
            </DialogContent>
          </Dialog>
        </section>


        <section className="flex flex-col items-start justify-center space-y-8 w-full lg:w-1/3">
          <div className="space-y-4 w-full">
            <h1 className="text-2xl font-bold text-primary">Latest Vacancies</h1>
            
            <div className="w-full h-px bg-border"></div>

            <div className="w-full grid grid-cols-1 gap-4">
              {jobListing.map((job) => (
                <CareerCard key={job.id} position={job.position} location={job.location} datePosted={job.datePosted} description={job.description} id={job.id} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AboutUs;
