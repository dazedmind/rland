"use client";
import React, { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import aboutUsImage from "@/public/ae-meadow-unit.jpg";
import Image from "next/image";
import { Ribbon, Target, ArrowRight } from "lucide-react";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CountUp from "@/components/ui/CountUp";
import ValuesPieSection from "./ValuesPieSection";
import { Separator } from "@/components/ui/separator";

const stats = [
  { value: 3, label: "Active Projects" },
  { value: 500, label: "Families Housed" },
  { value: 10, label: "Years in Service" },
  { value: 2, label: "Cities Served" },
];

function AboutUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <div>
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main className="flex flex-col">
        <section className=" min-h-[90dvh] flex items-center justify-center lg:justify-start overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] xl:rounded-b-[6rem] mx-5 md:mx-10 bg-linear-to-r from-primary to-blue-950 pt-20">
          <div className="container px-8 md:px-16 xl:px-44 z-10 flex gap-12 items-center relative">
            <ScrollReveal>
              <div className="py-12 lg:py-24 text-center lg:text-left flex flex-col gap-8">
                <span className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl font-medium text-white">
                    About{" "}
                    <span className="text-secondary font-bold">R Land</span>
                  </h1>
                  <p className="leading-relaxed text-neutral-200 max-w-xl mx-auto lg:mx-0">
                    Everything you need to know about purchasing your dream home
                    with R Land.
                  </p>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── HERO INTRO ── */}
        <section className="px-8 md:px-16 xl:px-44 py-20 lg:pt-30">
          <ScrollReveal>
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
              {/* Text */}
              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <span className="flex flex-col gap-2">
                  <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                    Who We Are
                  </p>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Rooted in Nature, <br /> Designed for the Future
                  </h1>
                </span>

                <p className="leading-relaxed text-neutral-600">
                  R Land Development Inc., a subsidiary of RMR Capital Inc., is
                  dedicated to transforming landscapes into thriving centers of
                  growth. The company is committed to creating
                  thoughtfully-designed communities that lead to new
                  opportunities and a promising future.
                </p>
                <p className="leading-relaxed text-neutral-600">
                  Guided by the motto{" "}
                  <span className="font-semibold text-primary">
                    "Our Bright Future Together,"
                  </span>{" "}
                  R Land focuses on improving land and enriching lives through
                  responsible and sustainable real estate projects that offer
                  exceptional living experiences.
                </p>
                <Link href="/projects">
                  <Button size="sm" variant="default">
                    Explore Our Projects <ArrowRight className="size-5" />
                  </Button>
                </Link>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2 relative">
                <div className=" w-full h-full rounded-xl" />
                <Image
                  src={aboutUsImage}
                  alt="R Land Property"
                  width={700}
                  height={500}
                  className="rounded-xl object-cover w-full h-96 relative z-10 shadow-xl"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── STATS BAND ── */}
        <section className="bg-linear-to-r from-neutral-100 mx-8 md:mx-20 mb-10 rounded-xl md:rounded-full to-neutral-200 p-12 px-8 md:px-16">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white relative">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-primary">
                    <CountUp
                      from={0}
                      to={stat.value}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                  </span>
                  <span className="text-xs md:text-sm text-foreground/70 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ── MISSION & PROMISE ── */}
        <section className="px-8 md:px-16 xl:px-44 py-20 bg-neutral-50">
          <ScrollReveal>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  Our Foundation
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  What Drives Us
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission */}
                <div className="group flex flex-col gap-4 rounded-2xl p-8 bg-linear-to-br from-primary to-blue-950 text-white overflow-hidden relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full">
                    <Target
                      className="size-12 text-secondary"
                      strokeWidth={1}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                  <p className="leading-relaxed text-white/85 text-sm md:text-base">
                    We provide housing arrangements that offer functionality,
                    prestige, and value for money that suit the needs,
                    aspirations, and constantly changing lifestyle of the
                    Filipino family.
                  </p>
                </div>

                {/* Promise */}
                <div className="group flex flex-col gap-4 rounded-2xl p-8 bg-linear-to-br from-primary to-blue-950 text-white overflow-hidden relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full">
                    <Ribbon
                      className="size-12 text-secondary"
                      strokeWidth={1}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Promise</h3>
                  <p className="leading-relaxed text-white/85 text-sm md:text-base">
                    We aim to be the preferred real estate developer in the
                    country by continuously providing innovative and
                    well-designed houses which entail future ties of family and
                    community together.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── STORY SECTION ── */}
        <section className="px-8 md:px-16 xl:px-44 py-20">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Text */}
              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  Our Story
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  Life&apos;s Mark of Progress, <br /> Developments Echoing in
                  Time
                </h2>
                <p className="leading-relaxed text-neutral-600">
                  Coherence of Design, Style of Simplicity, and Distinction of
                  Craftsmanship serve as the foundation for creating refined
                  living spaces, leisure areas, and commercial developments.
                  These principles are central to R Land's vision for future
                  projects.
                </p>
                <p className="leading-relaxed text-neutral-600">
                  R Land is characterized by its integration of green spaces and
                  community harmony, offering tranquil sanctuaries with scenic
                  views. The company also focuses on designing commercial spaces
                  that cater to the evolving needs of modern professionals and
                  growing families.
                </p>
                <p className="leading-relaxed text-neutral-600">
                  Arcoe Residences, located in Lipa City, offers a picturesque
                  view of Mount Malarayat and boasts a cool climate similar to
                  Baguio and Tagaytay — a lifestyle choice that brings the charm
                  of country living to the city.
                </p>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2 relative">
                <div className="rounded-xl" />
                <Image
                  src={aboutUsImage}
                  alt="R Land Community"
                  width={700}
                  height={500}
                  className="rounded-xl object-cover w-full h-96 relative z-10 shadow-xl"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── VALUES (pie) ── */}
        <section className="py-16 px-6 md:px-16 xl:px-44 overflow-hidden bg-neutral-100">
          <ScrollReveal className="flex flex-col md:flex-row-reverse  items-center">
            <div className="mb-12 text-center md:text-start md:mb-16  w-full lg:w-1/2">
              <div className="flex flex-col gap-2 mb-2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  Our Values
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  Values We Build On
                </h2>
              </div>
              <div className="mx-auto md:mx-0 h-1.5 w-20 rounded-full bg-secondary" />
              <p className="mx-auto mt-4  text-sm text-muted-foreground md:text-base">
                Five principles that form one whole—each slice is part of how we
                build communities together. Teamwork, Competence, Confidence,
                Integrity, and Commitment.
              </p>
              <p className="mt-4 text-xs text-neutral-400">
                Tap or hover a slice to explore each value.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <ValuesPieSection />
            </div>
          </ScrollReveal>
        </section>

        {/* ── CTA BAND ── */}
        <section className="px-8 md:px-16 xl:px-44 py-20">
          <ScrollReveal>
            <div className="p-6 md:p-8 rounded-xl bg-primary text-white flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="relative z-10 space-y-2 w-full lg:w-2/3">
                <h3 className="text-2xl font-bold">
                  Ready to find your place in our community?
                </h3>
                <p className="text-primary-foreground/80">
                  Contact us today to learn more about our properties and how we
                  can help you find your perfect home.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:w-auto text-white hover:bg-white/10 hover:text-white shadow-lg"
                  onClick={() => router.push("/projects")}
                >
                  Explore Projects
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="lg:w-auto text-white transition-colors shadow-lg"
                  onClick={() => router.push("/contact-us")}
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AboutUs;
