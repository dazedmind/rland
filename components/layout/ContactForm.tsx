import { useRef } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TextInput from "../ui/TextInput";
import DropSelect from "../ui/DropSelect";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateEmail, validatePhone, validateName } from "@/lib/form-validator";

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
  const [hcaptchaToken, setHcaptchaToken] = useState('');
  const captchaRef = useRef<HCaptcha>(null);

  const handleHcaptchaError = (error: any) => {
    console.error('HCaptcha error:', error);
  };

  const validateForm = () => {
    const requiredFields = [
      { value: formData.firstName && formData.lastName, label: "First and Last Name" },
      { value: formData.email, label: "Email" },
      { value: formData.phone, label: "Phone" },
      { value: formData.subject, label: "Subject" },
      { value: formData.source, label: "Where did you hear about us?" },
    ];

    const isValid = requiredFields.every((field: { value: string; label: string }) => field.value && field.value.trim() !== "");
    if (!isValid) {
      toast.error('Please fill out all required fields');
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    if (!validateName(formData.firstName)) {
      toast.error('Please enter a valid first name');
      return false;
    }

    if (!validateName(formData.lastName)) {
      toast.error('Please enter a valid last name');
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

  const handleVerification = (hcaptchaToken: string) => {
    setHcaptchaToken(hcaptchaToken);
  };

  const handleExpiration = () => {
    console.log("hCaptcha expired");
    setHcaptchaToken('');
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!hcaptchaToken) {
      toast.error('Please verify you are human');
      setLoading(false);
      return;
    }

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
        captchaRef.current?.resetCaptcha();
        setHcaptchaToken('');
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
      <h1 className="text-2xl font-bold text-primary uppercase mb-4">Contact Us</h1>
      
      <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            onChange={handleChangeInput}
            value={formData.firstName}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter Last Name"
            onChange={handleChangeInput}
            value={formData.lastName}
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleChangeInput}
            value={formData.email}
          />
 
          <TextInput
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+63 (920) 123-4567"
            onChange={handleChangeInput}
            value={formData.phone}
          />

          <DropSelect
            label="Subject"
            selectName="subject"
            selectId="subject"
            onChange={handleChangeInput}
            value={formData.subject}
          >
            <option value="" disabled>Select a subject</option>
            <option value="buying">Buying a Property</option>
            <option value="assistance">Customer Care</option>
            <option value="partnership">Business Partnership</option>
            <option value="career">Career Opportunities</option>
          </DropSelect>

        <DropSelect
            label="Where did you hear about us?"
            selectName="source"
            selectId="source"
            onChange={handleChangeInput}
            value={formData.source}
          >
            <option value="" disabled>Select a source</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="website">Website</option>
            <option value="others">Other</option>
          </DropSelect>

        <Field className="col-span-2">
          <FieldLabel className="uppercase text-xs text-primary">Message</FieldLabel>
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

        <HCaptcha
          sitekey='5f2a1b04-e718-4b58-9114-5e6ec12c87a2'
          onVerify={handleVerification}
          onExpire={handleExpiration}
          onError={handleHcaptchaError}
          ref={captchaRef}
        />

        <div className="flex justify-end items-center w-full col-span-2">
          <Button variant="default" size="sm" className="w-fit px-6" type="submit" disabled={loading} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>
            {loading ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</span> : <span className="flex items-center gap-2">Submit</span>} 
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
