"use client";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { validateEmail, validatePhone, validateName } from "@/lib/form-validator";

export const runtime = "edge";

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

  const removeResumeFile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setResumeFile(null);
    if (resumeFileInputRef.current) {
      resumeFileInputRef.current.value = "";
    }
  };

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/job_inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to submit job inquiry");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Job inquiry submitted successfully. Please keep your lines open for further details.");
      setFormData(EMPTY_FORM_DATA);
      setResumeFile(null);
      setCoverLetter(null);
      onClose();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = handleValidateForm();
    if (!isValid) return;
    submitMutation.mutate(formData);
  };

  const handleValidateForm = () => {
    const requiredFields = [
      { value: formData.firstName, label: "First Name" },
      { value: formData.lastName, label: "Last Name" },
      { value: formData.email, label: "Email" },
      { value: formData.phone, label: "Phone Number" },
    ];

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    const isValid = requiredFields.every((field: { value: string; label: string }) => field.value && field.value.trim() !== "");
    if (!isValid) {
      toast.error("Please fill out all required fields");
      return false;
    }

    if (!validateName(formData.firstName)) {
      toast.error("Please enter a valid first name");
      return false;
    }

    if (!validateName(formData.lastName)) {
      toast.error("Please enter a valid last name");
      return false;
    }

    return true;
  };

  const closeForm = () => {
    setFormData(EMPTY_FORM_DATA);
    setResumeFile(null);
    setCoverLetter(null);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm md:max-w-2xl rounded-xl" showCloseButton={false}>
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
              required
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
              required
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
              validationType="email"
              required
            />
            <TextInput
              label="Phone"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              validationType="phone"
              required
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
              onClick={closeForm}
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
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? "Submitting..." : "Submit Application"}
          </Button>
        </span>
      </DialogContent>
    </Dialog>
  );
}

export default CareerApplicationModal;
