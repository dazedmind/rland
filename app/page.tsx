"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import philecoLogo from "@/public/phileco-logo.png";
import rmrLogo from "@/public/rmr-logo.png";
import hcptLogo from "@/public/hcpt-logo.png";
import r2Logo from "@/public/r2-logo.png";
import FeaturedProjectList from "@/components/cards/FeaturedProjectList";
import { ArrowRight, MapPin } from "lucide-react";
import NavBar from "@/components/layout/NavBar";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import aeValleyUnit from "@/public/ae-valley-unit.jpg";
import NewsCard from "@/components/cards/NewsCard";
import platinumUnit from "@/public/platinum-unit-nobg.png";
import HouseSearchBar from "@/components/cards/HouseSearchBar";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectList from "@/components/cards/ProjectList";
import ContactSection from "@/components/layout/ContactSection";

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

  return (
    <div className="min-h-screen bg-zinc-50 font-sans w-full overflow-x-hidden overflow-y-hidden">
      <header>
        <NavBar
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main>
        <section className="bg-neutral-400 h-screen">
          {/* VIDEO HERO SECTION */}
          <div className="h-screen w-full gradient-overlay">
            <div className="bg-black/50 z-20 w-full absolute top-0 left-0 h-screen flex flex-col text-center lg:text-left items-center lg:items-start justify-center text-white px-8 md:px-44 py-16 gap-4">
              <span className="w-full lg:w-1/2 space-y-2">
                <h1 className="text-5xl font-bold">Live The Experience</h1>
                <p className="leading-relaxed">
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
              <p className="leading-relaxed text-neutral-600 text-center">
                We are a real estate development company that specializes in the
                development of residential properties.
              </p>
            </span>

            <div className="w-full flex flex-col items-center gap-6">
              <ProjectList type="carousel" />
            </div>

          
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col items-center justify-center h-auto">
            <div className="flex flex-col gap-8 md:flex-row-reverse h-auto w-full bg-neutral-100 py-12 px-8 md:px-16 xl:px-44">
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
              <span className="flex flex-col gap-4 px-4 w-full lg:w-1/2 ">
                <span>
                  <h1 className="text-4xl font-bold text-primary">
                    About R Land
                  </h1>
                  <p className="uppercase text-secondary font-medium">Rooted in Nature, Designed for the Future</p>
                </span>

                <p className="leading-relaxed text-neutral-600">
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
                <h1 className="text-2xl md:text-3xl font-bold">
                  Partners & Affiliated Companies
                </h1>
              </div>

              {/* Desktop: static centered */}
              <div className="flex flex-row items-center justify-center gap-8 md:gap-24 lg:gap-32 px-8 md:px-16 xl:px-44 py-8">
                <Image src={rmrLogo} alt="RMR Logo" width={100} height={100} className="saturate-0 hover:saturate-100 transition-all  w-12 md:w-16 lg:w-24 duration-300 cursor-pointer" />
                <Image src={philecoLogo} alt="Phileco Logo" width={160} height={100} className="saturate-0 hover:saturate-100 transition-all w-28 lg:w-32 duration-300 cursor-pointer" />
                <Image src={hcptLogo} alt="HCPT Logo" width={100} height={100} className="saturate-0 hover:saturate-100 transition-all w-12 md:w-16 lg:w-24 duration-300 cursor-pointer" />
                <Image src={r2Logo} alt="R2 Logo" width={100} height={100} className="saturate-0 hover:saturate-100 transition-all w-12 md:w-16 lg:w-24 duration-300 cursor-pointer" />
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
                  Featured Units
                </h1>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Browse our diverse projects each offering a familiar and
                  comfort vibes
                </p>
              </span>
            </div>

            {/* Featured Projects Card*/}
            <FeaturedProjectList />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col lg:flex-row px-12 md:px-16 xl:px-44 gap-4 pt-12 lg:py-24 bg-primary text-white relative overflow-hidden">
            {/* Background subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* DETAILS SECTION */}
            <div className="flex flex-col text-start gap-4 w-full lg:w-2xl pt-8 md:py-16">
              <span className="space-y-2 z-10">
                <h1 className="text-4xl font-bold">
                  Let's Find Available Home Near You
                </h1>
                <p className="text-sm md:text-base leading-relaxed text-neutral-200">
                  Discover your dream home with our comprehensive listing of
                  available properties across the Philippines.
                </p>
              </span>

              <HouseSearchBar />
            </div>

            {/* HOUSE IMAGE HERO SECTION — desktop */}
            <div className="hidden lg:block lg:absolute bottom-0 right-0 w-1/2 h-full pointer-events-none">

              {/* Soft glow behind the house */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[280px] rounded-full bg-white/10 blur-3xl" />

              {/* Floating badge: Starting price */}
              <div
                className="absolute top-12 left-8 z-20 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[6px] px-4 py-3 shadow-xl"
                style={{ animation: "floatBadge 4s ease-in-out infinite" }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/60 leading-none mb-1">
                    Starting at
                  </span>
                  <span className="text-base font-bold text-white leading-none">₱1.2M</span>
                </div>
              </div>

              {/* Floating badge: Units available */}
              <div
                className="absolute top-1/2 right-6 z-20 flex items-center gap-2 bg-[#c9a84c] rounded-[6px] px-4 py-3 shadow-xl"
                style={{ animation: "floatBadge 4s ease-in-out 0.8s infinite" }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/80 leading-none mb-1">
                    Available
                  </span>
                  <span className="text-base font-bold text-white leading-none">24 Units</span>
                </div>
              </div>

              {/* Floating badge: Location */}
              <div
                className="absolute bottom-18 left-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-[6px] px-4 py-3 shadow-xl"
                style={{ animation: "floatBadge 4s ease-in-out 1.6s infinite" }}
              >
                <MapPin className="size-4 text-secondary" />
                <span className="text-sm font-medium text-white">Batangas, PH</span>
              </div>

              {/* House image */}
              <Image
                src={platinumUnit}
                alt="Featured Property"
                width={700}
                height={600}
                className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>

            {/* Mobile image + badges */}
            <div className="block lg:hidden relative w-full h-[300px]">
              {/* Soft glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[160px] rounded-full bg-white/10 blur-3xl pointer-events-none" />

              {/* Floating badge: Starting price */}
              <div
                className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[6px] px-3 py-2 shadow-xl"
                style={{ animation: "floatBadge 4s ease-in-out infinite" }}
              >
                <div className="flex flex-col">
                  <span className="text-[9px] tracking-[0.15em] uppercase text-white/60 leading-none mb-1">Starting at</span>
                  <span className="text-sm font-bold text-white leading-none">₱1.2M</span>
                </div>
              </div>

              {/* Floating badge: Units available */}
              <div
                className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#c9a84c] rounded-[6px] px-3 py-2 shadow-xl"
                style={{ animation: "floatBadge 4s ease-in-out 0.8s infinite" }}
              >
                <div className="flex flex-col">
                  <span className="text-[9px] tracking-[0.15em] uppercase text-white/80 leading-none mb-1">Available</span>
                  <span className="text-sm font-bold text-white leading-none">24 Units</span>
                </div>
              </div>

              {/* Floating badge: Location */}
              <div
                className="absolute bottom-8 left-4 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-[6px] px-3 py-2 shadow-xl"
                style={{ animation: "floatBadge 4s ease-in-out 1.6s infinite" }}
              >
                <div className="w-2 h-2 rounded-full bg-[#c9a84c] shrink-0" />
                <span className="text-xs font-medium text-white">Batangas, PH</span>
              </div>

              <Image
                src={platinumUnit}
                alt="Featured Property"
                width={700}
                height={600}
                className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section className="flex flex-col justify-center px-8 md:px-16 xl:px-44 gap-4 py-24">
            {/* SECTION HEADER */}
            <div className="flex flex-row items-center justify-between">
              <span>
                <h1 className="text-3xl font-bold text-primary">
                  Latest News
                </h1>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                  Stay updated with the most recent news & blogs from R Land
                </p>
              </span>

              <Link href="/news">
                <Button
                  variant="ghost"
                  className="text-secondary hover:text-secondary-fg font-bold rounded-full transition-all ease-in-out duration-300"
                >
                  More <ArrowRight className="size-5" strokeWidth={2} />
                </Button>
              </Link>
            </div>

            <NewsCard limit={3} />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>

          {/* BANNER */}
          <section className="flex flex-col items-center justify-center bg-primary py-24">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center text-center gap-4 px-8 md:px-24 lg:px-44 text-white">
                <span className="flex flex-col gap-2 w-full text-center">
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    Ready to Settle on Your Dream Home?
                  </h1>
                  <p className="leading-relaxed text-neutral-200">
                    Contact us today to learn more about our properties and how we
                    can help you find your perfect home.
                  </p>
                </span>
        
                <span className="flex flex-row items-center justify-center gap-4 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit text-white hover:bg-white hover:text-primary"
                    asChild
                  >
                    <Link href="/buyer-guide">Your Buying Guide</Link>
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="w-fit"
                  >
                    <Link href="/contact-us">Contact Sales</Link>
                  </Button>
                </span>
              </div>
            </ScrollReveal>
          </section>

        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
}
