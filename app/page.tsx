"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import philecoLogo from "@/public/phileco-logo.png";
import rmrLogo from "@/public/rmr-logo.png";
import hcptLogo from "@/public/hcpt-logo.png";
import r2Logo from "@/public/r2-logo.png";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import { ArrowRight, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import NavBar from "@/components/NavBar";
import MobileNavBar from "@/components/MobileNavBar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import arcoeResidencesLogo from "@/public/project-logo/ar-logo-white.png";
import arAerialView from "@/public/ar-aerial.png";
import arcoeEstatesLogo from "@/public/project-logo/ae-logo-white.png";
import aeAerialView from "@/public/ae-aerial.png";
import arGoldUnit from "@/public/ar-gold-unit.jpg";
import arPlatinumUnit from "@/public/ar-platinum-unit.jpg";
import aeValleyUnit from "@/public/ae-valley-unit.jpg";
import aeMeadowUnit from "@/public/ae-meadow-unit.jpg";
import NewsCard from "@/components/NewsCard";
import platinumUnit from "@/public/platinum-unit-nobg.png";
import HouseSearchBar from "@/components/HouseSearchBar";
import Link from "next/link";
import contactBg from "@/public/contact-bg.png";

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
              <Link
                href="/projects"
                className="flex items-center gap-1 bg-secondary font-bold text-white px-4 py-2 rounded-full"
              >
                View More Projects <ArrowRight className="w-4 h-4" />
              </Link>
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

        <div className="flex flex-col text-center items-center justify-center py-24 gap-4 px-8 md:24 xl:px-44">
          <h1 className="text-4xl font-bold text-primary text-center lg:text-left">
            Our Bright Future Together
          </h1>
          <p className="text-lg">
            We are a real estate development company that specializes in the
            development of residential properties.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <div className="w-full lg:w-1/3 h-60 bg-linear-to-t from-primary to-blue-950 rounded-xl relative transition-all duration-300 shadow-lg cursor-pointer group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group-hover:scale-110 transition-all duration-300">
                <Image
                  src={arcoeResidencesLogo}
                  alt="Project 2"
                  width={200}
                  height={200}
                />
              </div>
              <Image
                src={arAerialView}
                alt="Project 1"
                width={100}
                height={100}
                className="w-full h-full object-cover saturate-0 rounded-xl opacity-15"
              />
            </div>

            <div className="w-full lg:w-1/3 h-60 bg-linear-to-t from-primary to-blue-950 rounded-xl relative transition-all duration-300 shadow-lg cursor-pointer group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group-hover:scale-110 transition-all duration-300">
                <Image
                  src={arcoeEstatesLogo}
                  alt="Project 2"
                  width={200}
                  height={200}
                />
              </div>
              <Image
                src={aeAerialView}
                alt="Project 1"
                width={100}
                height={100}
                className="w-full h-full object-cover saturate-0 rounded-xl opacity-15"
              />
            </div>

            <div className="w-full lg:w-1/3 h-60 bg-linear-to-t from-primary to-blue-950 rounded-xl relative transition-all duration-300 shadow-lg">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group-hover:scale-110 transition-all duration-300">
                <Image
                  src={arcoeResidencesLogo}
                  alt="Project 2"
                  width={200}
                  height={200}
                />
              </div>
              <Image
                src={arAerialView}
                alt="Project 1"
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-xl saturate-0 opacity-15"
              />
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full cursor-pointer"
          >
            View More Projects <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center h-auto lg:h-dvh">
          <div className="flex flex-col md:flex-row-reverse h-auto lg:h-dvh w-full bg-neutral-100 py-12 px-8 md:px-16 xl:px-44">
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
                thoughtfully-designed communities that lead to new opportunities
                and a promising future. <br />
                <br />
                Guided by the motto "Our Bright Future Together," R Land focuses
                on improving land and enriching lives through responsible and
                sustainable real estate projects that offer exceptional living
                experiences.
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

        <div className="flex flex-col h-auto lg:h-dvh justify-center px-8 md:px-16 xl:px-44 gap-4 py-16">
          {/* SECTION HEADER */}
          <div className="flex flex-row items-center justify-between">
            <span>
              <h1 className="text-3xl font-bold text-primary">
                Explore Our Realm
              </h1>
              <p className="text-lg leading-snug">
                Browse our diverse projects each offering a familiar and comfort
                vibes
              </p>
            </span>

            <Button
              variant="secondary"
              size="lg"
              className="bg-secondary text-white px-4 py-2 rounded-full cursor-pointer"
            >
              More <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4">
            {/* CARDS */}
            <FeaturedProjectCard
              projectImage={arGoldUnit}
              projectName="Arcoe Residences"
              projectLocation="Lipa City, Batangas"
            />
            <FeaturedProjectCard
              projectImage={arPlatinumUnit}
              projectName="Arcoe Residences"
              projectLocation="Lipa City, Batangas"
            />
            <FeaturedProjectCard
              projectImage={aeValleyUnit}
              projectName="Arcoe Estates"
              projectLocation="Angeles City, Pampanga"
            />
            <FeaturedProjectCard
              projectImage={aeMeadowUnit}
              projectName="Arcoe Estates"
              projectLocation="Angeles City, Pampanga"
            />
          </div>
        </div>

        <div className="flex px-12 md:px-16 xl:px-44 gap-4 py-24 bg-primary text-white relative">
          <Image
            src={platinumUnit}
            alt="Search Icon"
            width={700}
            height={600}
            className="mx-auto absolute bottom-0 right-0"
          />
          <div className="flex flex-col text-start gap-4 w-full lg:w-1/2 py-16">
            <span className="space-y-2 z-50">
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
        </div>

        <section className="flex flex-col justify-center px-8 md:px-16 xl:px-44 gap-4 py-16">
          {/* SECTION HEADER */}
          <div className="flex flex-row items-center justify-between">
            <span>
              <h1 className="text-3xl font-bold text-primary">
                Latest News & Blogs
              </h1>
              <p className="text-lg">
                Stay updated with the most recent news & blogs from R Land
              </p>
            </span>

            <Button
              variant="secondary"
              className="bg-secondary text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
            >
              More News <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <NewsCard
                key={article.id}
                articleImage={article.image}
                articleTitle={article.title}
                articleCategory={article.category}
                articleDate={article.date}
                articleExcerpt={article.excerpt}
                articleID={article.id}
              />
            ))}
          </div>
        </section>

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
            <div className="flex items-center justify-between">
              {/* LEFT SIDE INFO */}
              <div className="flex flex-col space-y-4">
                <span>
                  <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
                  <p className="text-lg">And we will handle the rest.</p>
                </span>

                <span>
                  <p>You can also reach us at:</p>
                  <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4 mt-2">
                    <li className="flex flex-row items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <p>(02) 7752 2789</p>
                    </li>
                    <li className="flex flex-row items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <p>moreinfo@rland.ph</p>
                    </li>
                  </ul>
                </span>
              </div>
            </div>

            {/* Contact Card */}
            <ContactForm />
          </section>
        </div>

       

        {/* BANNER */}
        <section className="flex flex-col items-center justify-center bg-primary py-24">
          <div className="flex flex-col items-center justify-center text-center gap-4 px-8 md:px-24 lg:px-44 text-white">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Ready to Settle on Your Dream Home?
            </h1>
            <p className="text-lg w-3/ text-center">
              Contact us today to learn more about our properties and how we can
              help you find your perfect home.
            </p>

            <span className="flex flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="  px-4 py-2 rounded-md"
              >
                Contact Sales
              </Button>
              <Button
                variant="default"
                size="lg"
                className="bg-secondary text-white rounded-md"
              >
                Reserve Now
              </Button>
            </span>
          </div>
        </section>

        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
}
