import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  source: '',
};

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM_DATA);
  const [checkbox, setCheckbox] = useState(false);

  const validateForm = () => {
    const requiredFields = [
      { value: formData.firstName && formData.lastName, label: "First and Last Name" },
      { value: formData.email, label: "Email" },
      { value: formData.phone, label: "Phone" },
      { value: formData.subject, label: "Subject" },
      { value: formData.source, label: "Where did you hear about us?" },
    ];
  
    const missingField = requiredFields.find(field => !field.value || field.value.trim() === "");
    
    if (missingField) {
      toast.error(`${missingField.label} is required`);
      return false;
    }
  
    if (!checkbox) {
      toast.error('You must agree to the terms and conditions');
      return false;
    }
  
    return true;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // This requires the input to have a name="firstName" attribute
    }));
  };

  const handleChangeCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Inquiry submitted successfully');
        setFormData({
          ...EMPTY_FORM_DATA,
        });
      } else {
        toast.error('Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 md:p-6 w-full gap-4">
      <div className="grid grid-cols-2 gap-4">
          <Field className="col-span-2 md:col-span-1">
            <FieldLabel>First Name</FieldLabel>
            <Input
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              className="w-full p-2 rounded-md text-black"
              onChange={handleChangeInput}
              value={formData.firstName}
            />
          </Field>
          <Field className="col-span-2 md:col-span-1">
            <FieldLabel>Last Name</FieldLabel>
            <Input
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              className="w-full p-2 rounded-md text-black"
              onChange={handleChangeInput}
              value={formData.lastName}
            />
          </Field>

          <Field className="col-span-2 md:col-span-1">
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-md text-black"
              onChange={handleChangeInput}
              value={formData.email}
            />
          </Field>

          <Field className="col-span-2 md:col-span-1">
            <FieldLabel>Phone</FieldLabel>
            <Input
              name="phone"
              type="tel"
              placeholder="+63 (920) 123-4567"
              className="w-full p-2 rounded-md text-black"
              onChange={handleChangeInput}
              value={formData.phone}
            />
          </Field>

          <Field className="col-span-2 md:col-span-1">
            <FieldLabel>Subject</FieldLabel>
            <div className="relative">
              <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
              <select
                name="subject"
                id="subject"
                className="w-full h-10 text-sm text-black rounded-md px-2"
                onChange={handleChangeInput}
                value={formData.subject}
              >
                <option value="" disabled>Select a subject</option>
                <option className="text-sm" value="buying">
                  Buying a Property
                </option>
                <option className="text-sm" value="assistance">
                  Customer Care
                </option>
                <option className="text-sm" value="partnership">
                  Business Partnership
                </option>
                <option className="text-sm" value="career">
                  Career Opportunities
                </option>
              </select>
            </div>
          </Field>

          <Field className="col-span-2 md:col-span-1">
            <FieldLabel>Where did you hear about us?</FieldLabel>
            <div className="relative">
              <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
              <select
                name="source"
                id="source"
                className="w-full h-10 text-sm text-black rounded-md px-2"
                onChange={handleChangeInput}
                value={formData.source}
              >
                <option value="" disabled>Select a source</option>
                <option className="text-sm rounded-md" value="facebook">
                  Facebook
                </option>
                <option className="text-sm" value="instagram">
                  Instagram
                </option>
                <option className="text-sm" value="linkedin">
                  LinkedIn
                </option>
                <option className="text-sm" value="youtube">
                  YouTube
                </option>
                <option className="text-sm" value="website">
                  Website
                </option>
                <option className="text-sm" value="others">
                  Other
                </option>
              </select>
            </div>
          </Field>

        <Field className="col-span-2">
          <FieldLabel>Message</FieldLabel>
          <Textarea
            name="message"
            placeholder="Enter your message here..."
            className="w-full p-2 rounded-md text-black resize-none"
            onChange={handleChangeInput}
            value={formData.message}
          />
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" checked={checkbox} onCheckedChange={handleChangeCheckbox} />
              <p className="w-full text-xs md:text-sm">
                I have read and agree with the website's{" "}
                <Link
                  className="text-secondary font-bold"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  className="text-secondary font-bold"
                  href="/privacy-policy"
                >
                  Terms of use
                </Link>
              </p>
            </Field>
        </Field>

        <div className="flex justify-end items-center w-full col-span-2">
          <Button variant="default" size="sm" className="w-fit px-6" type="submit" disabled={loading} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>
            {loading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Sending...</span> : <span className="flex items-center gap-2">Send Message</span>} 
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
