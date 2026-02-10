import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

function ContactForm() {
  return (
    <div className="bg-white border-2 border-neutral-200 rounded-lg p-8 grid grid-cols-2 w-4/6 gap-4">
    <Field className="grid-cols-1">
      <FieldLabel>First Name</FieldLabel>
      <Input type="text" placeholder="Enter First Name" className="w-full p-2 rounded-md text-black" />
    </Field>
    <Field className="grid-cols-1">
      <FieldLabel>Last Name</FieldLabel>
      <Input type="text" placeholder="Enter Last Name" className="w-full p-2 rounded-md text-black" />
    </Field>

    <Field className="grid-cols-1">
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="Email" className="w-full p-2 rounded-md text-black" />
    </Field>

    <Field className="grid-cols-1">
      <FieldLabel>Phone</FieldLabel>
      <Input type="tel" placeholder="+63 (920) 123-4567" className="w-full p-2 rounded-md text-black" />

    </Field>

    <Field>
      <FieldLabel>Subject</FieldLabel>
      <div className="relative">
        <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
        <select name="subject" id="subject" className="w-full h-10 text-sm text-black rounded-md px-2">
              <option className="text-sm rounded-md" value="1">General Inquiry</option>
              <option className="text-sm" value="2">Sales Inquiry</option>
              <option className="text-sm" value="3">Marketing Inquiry</option>
              <option className="text-sm" value="4">Technical Support</option>
              <option className="text-sm" value="5">Other</option>
        </select>
      </div>
    
    </Field>

    <Field>
      <FieldLabel>Where did you hear about us?</FieldLabel>
      <div className="relative">
        <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
        <select name="subject" id="subject" className="w-full h-10 text-sm text-black rounded-md px-2">
              <option className="text-sm rounded-md" value="1">Facebook</option>
              <option className="text-sm" value="2">Instagram</option>
              <option className="text-sm" value="3">Twitter</option>
              <option className="text-sm" value="4">LinkedIn</option>
              <option className="text-sm" value="5">Other</option>
        </select>
      </div>
    </Field>

    <Field className="grid-cols-1 col-span-2">
      <FieldLabel>Message</FieldLabel>
      <Textarea
        placeholder="Enter your message here..."
        className="w-full p-2 rounded-md text-black resize-none"
      />
    </Field>

    <div className="flex justify-between items-center w-full col-span-2">
      <FieldGroup className="w-full">
        <Field orientation="horizontal">
          <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
          <p className="w-full text-sm">
            I have read and agree with the website's <Link className="text-secondary font-bold" href="/privacy-policy">Privacy Policy</Link> and <Link className="text-secondary font-bold" href="/terms-of-use">Terms of use</Link>
          </p>
        </Field>
      </FieldGroup>

      <Button>
        Send Message
      </Button>
    </div>
  </div>
  )
}

export default ContactForm