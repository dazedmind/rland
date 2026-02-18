"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const CookieConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem("cookieConsent");
        if (!hasAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsVisible(false);
    }
    
    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setIsVisible(false);
    }

    if (!isMounted || !isVisible) return null;

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-background border border-border rounded-lg fixed bottom-0 left-0 right-0 z-50 m-4 shadow-lg">
            <span className="w-full md:w-auto">
                <p className="text-foreground text-sm">
                    This website uses cookies to enhance your experience. By using our website, you consent to the use of cookies. 
                    You can read more in our <Link href="/privacy-policy" className="text-secondary font-bold">privacy policy</Link>.
                </p>
            </span>

            <span className="w-full md:w-auto flex flex-col md:flex-row items-center justify-center gap-4">
                <Button variant="ghost" className="w-full md:w-auto" onClick={handleDecline}>Decline</Button>
                <Button className="w-full md:w-auto bg-secondary text-white" onClick={handleAccept}>Accept All</Button>
            </span>
        </div>
    );
};

export default CookieConsentBanner;