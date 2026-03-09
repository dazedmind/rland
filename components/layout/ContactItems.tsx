"use client";
import { useState } from "react";
import { Phone, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function ContactCopyItems() {
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Copied to clipboard");
    setIsCopiedPhone(true);
    setTimeout(() => {
      toast.dismiss();
      setIsCopiedPhone(false);
    }, 1000);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Copied to clipboard");
    setIsCopiedEmail(true);
    setTimeout(() => {
      toast.dismiss();
      setIsCopiedEmail(false);
    }, 1000);
  };

  return (
    <ul className="flex flex-col items-start justify-start gap-2 py-2">
      <li
        onClick={() => handleCopyPhone("(02) 7752 2789")}
        className="group flex flex-row items-center justify-center gap-2 rounded-full p-1 px-3 cursor-pointer"
      >
        <span className="bg-secondary/10 border border-secondary p-2 rounded-full">
          <Phone className="size-5 text-secondary stroke-2" />
        </span>

        <span className="relative h-6 flex items-center min-w-[150px]">
          {/* Default state */}
          <span
            className={`absolute flex items-center gap-1.5 transition-all duration-300 ${isCopiedPhone ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"}`}
          >
            <p>(02) 7752 2789</p>
            <Copy
              className="size-4 shrink-0 w-0 overflow-hidden group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
              strokeWidth={2}
            />
          </span>

          {/* Copied state */}
          <span
            className={`absolute flex items-center gap-1.5 transition-all duration-300 ${isCopiedPhone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <Check className="size-4 shrink-0 text-secondary" strokeWidth={2} />
            <p>Copied!</p>
          </span>
        </span>
      </li>

      <li
        onClick={() => handleCopyEmail("moreinfo@rland.ph")}
        className="group flex flex-row items-center justify-center gap-2 rounded-full p-1 px-3 cursor-pointer"
      >
        <span className="bg-secondary/10 border border-secondary p-2 rounded-full">
          <Mail className="size-5 text-secondary stroke-2" />
        </span>

        <span className="relative h-6 flex items-center min-w-[145px]">
          {/* Default state */}
          <span
            className={`absolute flex items-center gap-1.5 transition-all duration-300 ${isCopiedEmail ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"}`}
          >
            <p>moreinfo@rland.ph</p>
            <Copy
              className="size-4 shrink-0 w-0 overflow-hidden group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
              strokeWidth={2}
            />
          </span>

          {/* Copied state */}
          <span
            className={`absolute flex items-center gap-1.5 transition-all duration-300 ${isCopiedEmail ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <Check className="size-4 shrink-0 text-secondary" strokeWidth={2} />
            <p>Copied!</p>
          </span>
        </span>
      </li>
    </ul>
  );
}
