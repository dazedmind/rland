"use client";
import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { Button } from "./ui/button";

const CookieConsentBanner = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    }
    const handleClose = () => {
        setIsOpen(false);
    }
  return (
    // <CookieConsent
    //   location="bottom"
    //   buttonText="Accept All"
    //   declineButtonText="Decline"
    //   enableDeclineButton
    //   cookieName="yourAppCookieConsent"
    //   style={{ background: "var(--background)", color: "var(--foreground)", height: "5rem" }}
    //   buttonStyle={{ backgroundColor: "var(--secondary)", color: "var(--primary)", fontSize: "14px", borderRadius: "8px" }}
    //   declineButtonStyle={{ backgroundColor: "var(--border)", color: "var(--foreground)", fontSize: "14px", borderRadius: "8px" }}
    //   expires={365}
    //   onAccept={() => {
    //     // Add functionality when user accepts cookies
    //     console.log("Cookies accepted");
    //   }}
    //   onDecline={() => {
    //     // Add functionality when user declines cookies
    //     console.log("Cookies declined");
    //   }}
    // >
    //   This website uses cookies to enhance your experience. By using our website, you consent to the use of cookies. 
    //   You can read more in our <Link href="/privacy-policy" className="text-secondary font-bold">privacy policy</Link>.
    // </CookieConsent>
    <div className={`${isOpen ? "flex" : "hidden"} flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-background border border-border rounded-lg fixed bottom-0 left-0 right-0 z-50 m-4`}>
        <span className="w-full md:w-auto">
            <p className="text-foreground text-sm">This website uses cookies to enhance your experience. By using our website, you consent to the use of cookies. You can read more in our <Link href="/privacy-policy" className="text-secondary font-bold">privacy policy</Link>.</p>
        </span>

        <span className="w-full md:w-auto flex flex-col md:flex-row items-center justify-center gap-4">
            <Button variant="ghost" className="w-full md:w-auto" onClick={handleOpen}>Customize Preference</Button>
            <Button className="w-full md:w-auto bg-secondary">Accept All</Button>
        </span>

    </div>
  );
};

export default CookieConsentBanner;