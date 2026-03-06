"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import philecoLogo from "@/public/phileco-logo.png";
import rmrLogo from "@/public/rmr-logo.png";
import hcptLogo from "@/public/hcpt-logo.png";
import r2Logo from "@/public/r2-logo.png";
import FeaturedProjectCard from "@/components/cards/FeaturedProjectCard";
import { ArrowRight, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/layout/ContactForm";
import NavBar from "@/components/layout/NavBar";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import arGoldUnit from "@/public/ar-gold-unit.jpg";
import arPlatinumUnit from "@/public/ar-platinum-unit.jpg";
import aeValleyUnit from "@/public/ae-valley-unit.jpg";
import aeMeadowUnit from "@/public/ae-meadow-unit.jpg";
import NewsCard from "@/components/cards/NewsCardList";
import platinumUnit from "@/public/platinum-unit-nobg.png";
import HouseSearchBar from "@/components/cards/HouseSearchBar";
import Link from "next/link";
import contactBg from "@/public/contact-bg.png";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectList from "@/components/cards/ProjectList";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past the video hero section (100vh)
      const heroHeight = 200;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      const handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      handleScrollToTop();
    });
  }, []);

  const newsArticles = [
    {
      id: 1,
      category: "Announcements",
      title: "R Land Breaks Ground on New Eco-Friendly Residential Project",
      date: "Feb 10, 2026",
      excerpt:
        "The latest development aims to integrate sustainable architecture with modern living...",
      image: aeMeadowUnit,
    },
    {
      id: 2,
      category: "Events",
      title: "R Land Breaks Ground on New Eco-Friendly Residential Project",
      date: "Feb 14, 2026",
      excerpt:
        "The latest development aims to integrate sustainable architecture with modern living...",
      image: aeValleyUnit,
    },
    {
      id: 3,
      category: "Blog",
      title: "R Land Breaks Ground on New Eco-Friendly Residential Project",
      date: "Feb 14, 2026",
      excerpt:
        "The latest development aims to integrate sustainable architecture with modern living...",
      image: aeMeadowUnit,
    },
    // Add more mock items here...
  ];

  const accentColor = {
    primary: "bg-linear-to-t from-primary to-blue-950",
    secondary: "bg-linear-to-t from-secondary to-yellow-600",
    amber: "bg-linear-to-t from-amber-800 to-amber-950",
    orange: "bg-linear-to-t from-orange-600 to-orange-950",
    green: "bg-linear-to-t from-green-600 to-green-950",
    blue: "bg-linear-to-t from-blue-600 to-blue-950",
    purple: "bg-linear-to-t from-purple-600 to-purple-950",
    red: "bg-linear-to-t from-red-600 to-red-950",
    pink: "bg-linear-to-t from-pink-600 to-pink-950",
    brown: "bg-linear-to-t from-brown-600 to-brown-950",
    gray: "bg-linear-to-t from-gray-600 to-gray-950",
    black: "bg-linear-to-t from-black to-black-950",
    white: "bg-linear-to-t from-white to-white-950",
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans w-full">
      <header>
        <NavBar
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main>
        <section className="bg-neutral-400 h-screen ">
          {/* VIDEO HERO SECTION */}
          <div className="h-screen w-full gradient-overlay">
            <div className="bg-black/50 z-20 w-full absolute top-0 left-0 h-screen flex flex-col text-center lg:text-left items-center lg:items-start justify-center text-white px-8 md:px-44 py-16 gap-4">
              <span className="w-full lg:w-1/2 space-y-2">
                <h1 className="text-5xl font-bold">Live The Experience</h1>
                <p className="text-lg leading-tight">
                  We are a real estate development company that specializes in
                  the development of residential properties.
                </p>
              </span>
              <Button
                size="lg"
                variant="default"
                asChild
              >
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </div>
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/home-video-bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <ScrollReveal>
          <div className="flex flex-col items-center justify-center py-24 gap-16 px-8 md:24 xl:px-44">
            <span className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-primary text-center lg:text-left">
                Our Bright Future Together
              </h1>
              <p className="text-lg">
                We are a real estate development company that specializes in the
                development of residential properties.
              </p>
            </span>

            <div className="w-full flex flex-col items-center gap-6">
              <ProjectList limit={3} />

              {/* <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-accent-foreground"
            >
              View More Projects <ArrowRight className="w-4 h-4" />
            </Button> */}
            </div>

          
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col items-center justify-center h-auto">
            <div className="flex flex-col md:flex-row-reverse h-auto w-full bg-neutral-100 py-12 px-8 md:px-16 xl:px-44">
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="h-100 bg-neutral-300 rounded-xl">
                  <Image
                    src={aeValleyUnit}
                    alt="R Land Logo"
                    className="rounded-xl object-cover h-full"
                  />
                </div>
              </div>

              {/* Text */}
              <span className="flex flex-col gap-4 p-4 md:p-8 w-full lg:w-1/2 ">
                <span>
                  <h1 className="text-4xl font-bold text-primary">
                    About R Land
                  </h1>
                  <p>Rooted in Nature, Designed for the Future</p>
                </span>

                <p>
                  R Land Development Inc., a subsidiary of RMR Capital Inc., is
                  dedicated to transforming landscapes into thriving centers of
                  growth. The company is committed to creating
                  thoughtfully-designed communities that lead to new
                  opportunities and a promising future. <br />
                  <br />
                  Guided by the motto "Our Bright Future Together," R Land
                  focuses on improving land and enriching lives through
                  responsible and sustainable real estate projects that offer
                  exceptional living experiences.
                </p>
              </span>
            </div>

            <div className="w-full">
              <div className="bg-primary p-3 w-full text-center text-white">
                <h1 className="text-3xl font-bold">
                  Partners & Affiliated Companies
                </h1>
              </div>

              <div className="flex flex-row items-center justify-center gap-8 md:gap-24 lg:gap-32 px-8 md:px-16 xl:px-44 py-8">
                <Image
                  src={rmrLogo}
                  alt="RMR Logo"
                  width={100}
                  height={100}
                  className="saturate-0 hover:saturate-100 transition-all w-12 md:w-16 lg:w-24 duration-300 cursor-pointer"
                />
                <Image
                  src={philecoLogo}
                  alt="Phileco Logo"
                  width={160}
                  height={100}
                  className="saturate-0 hover:saturate-100 transition-all w-24 md:w-28 lg:w-32 duration-300 cursor-pointer"
                />
                <Image
                  src={hcptLogo}
                  alt="HCPT Logo"
                  width={100}
                  height={100}
                  className="saturate-0 hover:saturate-100 transition-all w-12 md:w-16 lg:w-24 duration-300 cursor-pointer"
                />
                <Image
                  src={r2Logo}
                  alt="R2 Logo"
                  width={100}
                  height={100}
                  className="saturate-0 hover:saturate-100 transition-all w-12 md:w-16 lg:w-24 duration-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col h-auto justify-center px-8 md:px-16 xl:px-44 gap-4 py-24">
            {/* SECTION HEADER */}
            <div className="flex flex-row items-center justify-between">
              <span>
                <h1 className="text-3xl font-bold text-primary">
                  Explore Our Realm
                </h1>
                <p className="text-sm md:text-base lg:text-lg leading-snug">
                  Browse our diverse projects each offering a familiar and
                  comfort vibes
                </p>
              </span>
            </div>

            {/* Featured Projects Card*/}
            <FeaturedProjectCard />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col lg:flex-row px-12 md:px-16 xl:px-44 gap-4 pt-12 lg:py-24 bg-primary text-white relative">
            {/* DETAILS SECTION */}
            <div className="flex flex-col text-start gap-4 w-full lg:w-1/2 py-16">
              <span className="space-y-2 z-10">
                <h1 className="text-3xl lg:text-4xl font-bold">
                  Let's Find Available Home Near You
                </h1>
                <p className="text-md lg:text-lg z-100 leading-tight">
                  Discover your dream home with our comprehensive listing of
                  available properties across the Philippines.
                </p>
              </span>

              <HouseSearchBar />
            </div>

            {/* HOUSE IMAGE HERO SECTION */}
            <Image
              src={platinumUnit}
              alt="Search Icon"
              width={700}
              height={600}
              className="mx-auto w-full lg:w-1/2 lg:absolute bottom-0 right-0"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section className="flex flex-col justify-center px-8 md:px-16 xl:px-44 gap-4 py-24">
            {/* SECTION HEADER */}
            <div className="flex flex-row items-center justify-between">
              <span>
                <h1 className="text-3xl font-bold text-primary">
                  Latest News & Blogs
                </h1>
                <p className="text-sm md:text-base lg:text-lg">
                  Stay updated with the most recent news & blogs from R Land
                </p>
              </span>

              <Link href="/news">
                <Button
                  variant="ghost"
                  className="text-secondary hover:bg-none hover:text-secondary-fg border-secondary/30 font-bold rounded-full transition-all ease-in-out duration-300"
                >
                  More News <ArrowRight className="size-5" strokeWidth={2} />
                </Button>
              </Link>
            </div>

            <NewsCard />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={contactBg}
                alt="Contact Us"
                width={1920}
                height={1080}
                className="absolute w-full h-full object-cover"
              />
              {/* Gradient Overlay - blends to white on the left */}
              <div className="absolute inset-0 bg-linear-to-b from-white via-white/90 to-white" />
            </div>

            <section className="relative z-10 flex flex-col lg:flex-row justify-between items-start px-8 md:px-16 xl:px-44 gap-8 py-16">
              {/* SECTION HEADER */}
              <div className="flex flex-col lg:flex-row items-start w-full gap-4">
                <div className="flex flex-col space-y-4 w-full lg:w-1/2">
                  <span>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                      Your next step in owning{" "}
                      <span className="text-secondary font-serif italic">
                        your dream home
                      </span>{" "}
                      starts{" "}
                      <span className="text-secondary font-bold">here</span>
                    </h1>
                    <p className="text-base md:text-lg">
                      Get in touch, and we'll handle the rest.
                    </p>
                  </span>

                  <span>
                    <p>You may also reach us at:</p>
                    <ul className="flex flex-wrap items-start justify-start gap-2 space-y-2 py-2 ">
                      <li className="flex flex-row items-center justify-center gap-2 bg-neutral-100 rounded-full p-1 px-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <p>(02) 7752 2789</p>
                      </li>
                      <li className="flex flex-row items-center justify-center gap-2 bg-neutral-100 rounded-full p-1 px-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <p>moreinfo@rland.ph</p>
                      </li>
                    </ul>
                  </span>
                </div>

                {/* Contact Card */}
                <div className="w-full lg:w-1/2">
                  <ContactForm />
                </div>
              </div>
            </section>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* BANNER */}
          <section className="flex flex-col items-center justify-center bg-primary py-24">
            <div className="flex flex-col items-center justify-center text-center gap-4 px-8 md:px-24 lg:px-44 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold">
                Ready to Settle on Your Dream Home?
              </h1>
              <p className="text-lg w-3/ text-center">
                Contact us today to learn more about our properties and how we
                can help you find your perfect home.
              </p>

              <span className="flex flex-row items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link href="/contact-us">Contact Sales</Link>
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  asChild
                >
                  <Link href="/reservation">Reserve Now</Link>
                </Button>
              </span>
            </div>
          </section>
        </ScrollReveal>

        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
}
