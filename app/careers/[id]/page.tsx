"use client";
import { useState, useRef, useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
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
import CareerCard from "@/components/cards/CareerCard";
import CareerDetailsSkeleton from "@/components/layout/skeleton/CareerDetailsSkeleton";
import { ArrowUpFromLine } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/layout/BackButton";

export const runtime = 'edge';

type Career = {
  id: number;
  position: string;
  location: string;
  jobDescription: string;
  purpose: string;
  responsibilities: string;
  qualifications: string;
  requiredSkills: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const EMPTY_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  location: '',
  resume: null,
  coverLetter: null,
};

function CareerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {

  useEffect(() => {
    if (params && typeof (params as Promise<{ id: string }>).then === "function") {
      (params as Promise<{ id: string }>).then((p) => setId(p.id));
    } else {
      setId((params as { id: string }).id);
    }
  }, [params]);

  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [career, setCareer] = useState<Career | null>(null);

  // Define state to hold a File object or null
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [formData, setFormData] = useState(EMPTY_FORM_DATA);

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

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchCareer = async () => {
      setError(null);
      try {
        const response = await fetch(`/api/careers/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Career not found");
          } else {
            setError("Failed to load career");
          }
          setCareer(null);
          return;
        }
        const data = await response.json();
        setCareer(data);
      } catch (err) {
        console.error("Error fetching career:", err);
        setError("Failed to load career");
        setCareer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/job_inquiry', {
        method: 'POST',
        body: JSON.stringify({ ...formData, position: career?.position || '' }),
      });
      if (response.ok) {
        toast.success('Job inquiry submitted successfully');
        setFormData(EMPTY_FORM_DATA);
        setResumeFile(null);
        setCoverLetter(null);
      } else {
        toast.error('Failed to submit job inquiry');
      }
    }
    catch (error) {
      console.error("Error submitting job inquiry:", error);
    }
  }

  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar isScrolled={true} />
      </header>
  
      <main className="flex flex-col lg:flex-row justify-start items-start px-8 md:px-24 xl:px-44 gap-8 py-16">
        {/* CAREER DETAILS SECTION */}
        {!loading ? (
        <section className="flex flex-col items-start justify-center space-y-8 w-full lg:w-2/3">
          
          <BackButton href="/careers" mainPageName="Careers" />
          
          <span className="flex flex-col gap-4">
            <span>
                <h1 className="text-4xl font-bold">
                  {career?.position}
                </h1>
                <p className="text-lg font-bold text-secondary">{career?.location}</p>
            </span>


            <h2 className="text-2xl font-bold">Purpose and Scope</h2>
            <p className="leading-relaxed">
                {career?.purpose}
            </p>

            <h2 className="text-2xl font-bold">
              Specific Duties and Responsibilities:
            </h2>

            <ul className="list-disc list-outside space-y-3 text-slate-800 max-w-3xl marker:text-blue-600 pl-5">
                {career?.responsibilities.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold">Qualifications:</h2>

            <ol className="list-decimal list-outside space-y-3 text-slate-800 max-w-3xl pl-5">
              {career?.qualifications.split('\n').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>

            <h2 className="text-2xl font-bold">Required Skills:</h2>
            <ul className="list-disc list-outside space-y-3 text-slate-800 max-w-3xl marker:text-blue-600 pl-5">
              {career?.requiredSkills.split('\n').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </span>

          <Dialog>
            <DialogTrigger className="flex items-center gap-2 bg-primary text-white rounded-md w-fit p-2 px-4 font-bold cursor-pointer">
              <ArrowUpFromLine className="size-5" /> Submit Application
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
                    value={career?.position || ''}
                    disabled
                  />
                </Field>
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </Field>
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Field>
                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}  />
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
                size="sm"
                variant="primary"
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
              >
                Submit Application
              </Button>
            </DialogContent>
          </Dialog>
        </section>
        ) : (
          <CareerDetailsSkeleton />
        )}

        <section className="flex flex-col items-start justify-center space-y-8 w-full lg:w-1/3">
          <div className="space-y-4 w-full">
            <h1 className="text-2xl font-bold text-primary">Latest Vacancies</h1>
            
            <div className="w-full h-px bg-border"></div>

            <div className="w-full grid grid-cols-1 gap-4">
                <CareerCard limit={3}/>
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

export default CareerDetailsPage;
