"use client";
import React, { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import aboutUsImage from "@/public/ae-meadow-unit.jpg";
import Image from "next/image";
import {
  HeartHandshake,
  Ribbon,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  ArrowRight,
} from "lucide-react";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CountUp from '@/components/ui/CountUp'

const companyValues = [
  {
    icon: <Users className="size-10" strokeWidth={1.5} />,
    title: "Teamwork",
    description:
      "We believe in the exponential power of minds working together to achieve greater outcomes.",
  },
  {
    icon: <Trophy className="size-10" strokeWidth={1.5} />,
    title: "Competence",
    description:
      "We constantly strive for excellence, to be the best we can be in business and in life.",
  },
  {
    icon: <Star className="size-10" strokeWidth={1.5} />,
    title: "Confidence",
    description:
      "We trust in our abilities and empower our people to take bold steps toward innovation.",
  },
  {
    icon: <ShieldCheck className="size-10" strokeWidth={1.5} />,
    title: "Integrity",
    description:
      "Honesty and transparency are at the core of everything we do, building trust with every action.",
  },
  {
    icon: <HeartHandshake className="size-10" strokeWidth={1.5} />,
    title: "Commitment",
    description:
      "Our customers are our priority; we are dedicated to delivering value that exceeds expectations.",
  },
];

const stats = [
  { value: 3, label: "Active Projects" },
  { value: 500, label: "Families Housed" },
  { value: 10, label: "Years of Experience" },
  { value: 2, label: "Cities Served" },
];

function AboutUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="pt-15 md:pt-25">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <main className="flex flex-col">
        {/* ── HERO INTRO ── */}
        <section className="px-8 md:px-16 xl:px-44 py-20 lg:py-30">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Text */}
              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  Who We Are
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                  Rooted in Nature,{" "}
                  <span className="text-secondary">
                    Designed for the Future
                  </span>
                </h1>
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
                <div className=" w-full h-full rounded-md" />
                <Image
                  src={aboutUsImage}
                  alt="R Land Property"
                  width={700}
                  height={500}
                  className="rounded-md object-cover w-full h-96 relative z-10 shadow-xl"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── STATS BAND ── */}
        <section className="bg-linear-to-r from-primary to-blue-950 py-14 px-8 md:px-16 xl:px-44">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-4xl md:text-5xl font-black text-secondary">
                    {/* <CountUp end={stat.value} /> */}
                    <CountUp
                      from={0}
                      to={stat.value}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                  </span>
                  <span className="text-sm text-white/70 uppercase tracking-wider">
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
                <h2 className="text-4xl font-bold text-primary">
                  What Drives Us
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mission */}
                <div className="group flex flex-col gap-4 rounded-md p-8 bg-linear-to-br from-primary to-blue-950 text-white overflow-hidden relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20">
                    <Target
                      className="size-7 text-secondary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-secondary">
                    Our Mission
                  </h3>
                  <p className="leading-relaxed text-white/85 text-sm">
                    We provide housing arrangements that offer functionality,
                    prestige, and value for money that suit the needs,
                    aspirations, and constantly changing lifestyle of the
                    Filipino family.
                  </p>
                </div>

                {/* Promise */}
                <div className="group flex flex-col gap-4 rounded-md p-8 bg-linear-to-br from-primary to-blue-950 text-white overflow-hidden relative">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20">
                    <Ribbon
                      className="size-7 text-secondary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-secondary">
                    Our Promise
                  </h3>
                  <p className="leading-relaxed text-white/85 text-sm">
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
                <h2 className="text-4xl font-bold text-primary">
                  Life&apos;s Mark of Progress,{" "}
                  <span className="text-secondary">
                    Developments Echoing in Time
                  </span>
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
                <div className="rounded-md" />
                <Image
                  src={aboutUsImage}
                  alt="R Land Community"
                  width={700}
                  height={500}
                  className="rounded-md object-cover w-full h-96 relative z-10 shadow-xl"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── VALUES ── */}
        <section className="px-8 md:px-16 xl:px-44 py-20 bg-neutral-50">
          <ScrollReveal>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  What We Stand For
                </p>
                <h2 className="text-4xl font-bold text-primary">Our Values</h2>
                <p className="text-neutral-600 max-w-xl">
                  These five pillars define how we operate, build, and serve our
                  communities every day.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {companyValues.map((value) => (
                  <div
                    key={value.title}
                    className="group relative flex flex-col justify-between gap-4 border border-border rounded-md p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default overflow-hidden"
                  >
                    {/* Decorative bg icon */}
                    <span className="absolute -bottom-4 -right-4 text-neutral-100 group-hover:text-primary/10 transition-colors duration-300">
                      <div className="size-20 [&>svg]:size-20 [&>svg]:stroke-[0.5] opacity-60">
                        {value.icon}
                      </div>
                    </span>

                    {/* Icon circle */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/5 border border-secondary text-secondary shrink-0">
                      <div className="[&>svg]:size-6 [&>svg]:stroke-[1.5] [&>svg]:text-secondary">
                        {value.icon}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 z-10">
                      <h3 className="text-xl font-bold text-primary">
                        {value.title}
                      </h3>
                      <p className="text-sm leading-snug text-neutral-500">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── CTA BAND ── */}
        <section className="px-8 md:px-16 xl:px-44 py-20">
          <ScrollReveal>
            <div className="p-8 md:p-12 rounded-md bg-primary text-white flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden relative">
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
