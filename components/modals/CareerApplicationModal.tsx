"use client";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import TextInput from "@/components/ui/TextInput";

export const runtime = "edge";

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
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  location: "",
  resume: null,
  coverLetter: null,
};

function CareerApplicationModal({
  isOpen,
  onClose,
  jobPosition,
}: {
  isOpen: boolean;
  onClose: () => void;
  jobPosition: string;
}) {
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [career, setCareer] = useState<Career | null>(null);

  // Define state to hold a File object or null
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: jobPosition || "",
    location: "",
  });

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
      const response = await fetch("/api/job_inquiry", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Job inquiry submitted successfully. Please keep your lines open for further details.");
        setFormData(EMPTY_FORM_DATA);
        setResumeFile(null);
        setCoverLetter(null);
        onClose();
      } else {
        toast.error("Failed to submit job inquiry");
      }
    } catch (error) {
      console.error("Error submitting job inquiry:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm md:max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Apply Now</DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for the position.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full gap-4 space-y-4">
          <TextInput
            label="Position"
            name="position"
            type="text"
            placeholder="Position"
            value={jobPosition}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            disabled={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
            <TextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <TextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />

            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextInput
              label="Phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <Field className="col-span-2">
            <FieldLabel>Resume / CV</FieldLabel>
            <FileUpload
              file={resumeFile}
              onFileSelect={setResumeFile}
              onFileRemove={removeResumeFile}
            />
          </Field>
        </div>
        <span className="flex gap-4 w-full">
          <DialogClose asChild>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 hover:text-primary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            variant="primary"
            className="flex-1"
            onClick={(e) =>
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
            }
          >
            Submit Application
          </Button>
        </span>
      </DialogContent>
    </Dialog>
  );
}

export default CareerApplicationModal;
