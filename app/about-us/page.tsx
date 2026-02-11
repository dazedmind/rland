import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import aboutUsImage from "@/public/ae-meadow-unit.jpg";
import Image from "next/image";
import { HandHeart, HeartHandshake, Ribbon, Target } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import {
  RiHandHeartLine,
  RiHeart2Line,
  RiShakeHandsLine,
  RiStarLine,
  RiTeamLine,
  RiTrophyLine,
  RiVipCrownLine,
} from "react-icons/ri";
import { GoLaw, GoPeople, GoStar, GoTrophy } from "react-icons/go";

const companyValues = [
    {icon: <GoPeople className="w-16 h-16 text-secondary" />, title: "Teamwork", description: "We believe in the exponential power of minds working together to achieve greater outcomes."},
    {icon: <GoTrophy className="w-16 h-16 text-secondary" />, title: "Competence", description: "We constantly strive for excellence, to be the best we can be in business and in life."},
    {icon: <GoStar className="w-16 h-16 text-secondary" />, title: "Confidence", description: "We trust in our abilities and empower our people to take bold steps toward innovation."},
    {icon: <GoLaw className="w-16 h-16 text-secondary" />, title: "Integrity", description: "Honesty and transparency are at the core of everything we do, building trust with every action."},
    {icon: <HeartHandshake className="w-16 h-16 text-secondary" strokeWidth={1.5} />, title: "Commitment", description: "Our customers are our priority; we are dedicated to delivering value that exceeds expectations."},
]

function AboutUs() {
  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar isScrolled={true} />
      </header>
      <main>
        {/* PAGE BANNER */}
        <PageBanner
          title="About R Land"
          description="Learn more about R Land and our mission"
          breadcrumb="About Us"
        />

        {/* ABOUT US SECTION */}
        <section className="flex flex-col items-start p-8 md:p-16 lg:px-44 xl:px-80 justify-center py-16 space-y-12">
          <span className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              Rooted in Nature, Designed for the Future
            </h1>

            <p className="leading-relaxed">
              R Land Development Inc., a subsidiary of RMR Capital Inc., is
              dedicated to transforming landscapes into thriving centers of
              growth. The company is committed to creating thoughtfully-designed
              communities that lead to new opportunities and a promising future.
              <br />
              <br />
              Guided by the motto "Our Bright Future Together," R Land focuses
              on improving land and enriching lives through responsible and
              sustainable real estate projects that offer exceptional living
              experiences.
            </p>
          </span>

          <div className="w-full h-80 bg-neutral-200 rounded-xl">
            <Image
              src={aboutUsImage}
              alt="R Land Logo"
              width={500}
              height={500}
              className="rounded-xl object-cover h-full w-full"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-start gap-4">
              <span className="flex flex-col items-center w-1/2 text-center border-border border-2 rounded-xl p-6 bg-linear-to-t from-neutral-50 to-neutral-200">
                <Target className="w-20 h-20 text-secondary" strokeWidth={1} />
                <h1 className="text-4xl font-bold text-primary">
                  Our Mission
                </h1>
                <p className="leading-snug text-primary">
                  We provide housing arrangements that offer functionality,
                  prestige, and value for money that suit the needs,
                  aspirations, and constantly changing lifestyle of the Filipino
                  family.
                </p>
              </span>

              <span className="flex flex-col items-center w-1/2 text-center border-border border-2 rounded-xl p-6 bg-linear-to-t from-neutral-50 to-neutral-200">
                <Ribbon className="w-20 h-20 text-secondary" strokeWidth={1} />
                <h1 className="text-4xl font-bold text-primary">
                  Our Promise
                </h1>
                <p className="leading-snug text-primary">
                  We aim to be the preferred real estate developer in the
                  country by continuously providing innovative and well-designed
                  houses which entail future ties of family and community
                  together.
                </p>
              </span>
            </div>
          </div>

          <span className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              Life&apos;s Mark of Progress, Developments Echoing in Time
            </h1>

            <p className="leading-relaxed">
              Coherence of Design, Style of Simplicity, and Distinction of
              Craftsmanship, which serve as the foundation for creating refined
              living spaces, leisure areas, and commercial developments. These
              principles are central to R Land's vision for their future
              projects.
              <br />
              <br />
              R Land is characterized by its integration of green spaces and
              community harmony, offering tranquil sanctuaries with scenic
              views. The company also focuses on designing commercial spaces
              that cater to the evolving needs of modern professionals and
              growing families.
              <br />
              <br />
              Arcoe Residences located in Lipa City, offers a picturesque view
              of Mount Malarayat, and boasts of its cool climate similar to
              Baguio and Tagaytay. This unique blend of attributes makes Arcoe
              Residences a lifestyle choice that brings the charm of country
              living to the city.
            </p>
          </span>

          <div className="w-full h-80 bg-neutral-200 rounded-xl">
            <Image
              src={aboutUsImage}
              alt="R Land Logo"
              width={500}
              height={500}
              className="rounded-xl object-cover h-full w-full"
            />
          </div>

          <span className="flex flex-col gap-4">
            <p className="leading-relaxed">
              R Land aims to provide well-designed living spaces surrounded by
              nature that nurture homes, promote community bonds, and create
              lasting memories. The mission is to address the country's housing
              needs while helping individuals achieve their dream homes.
            </p>
          </span>

          {/* COMPANY VALUES */}
          <div className="flex flex-col gap-6 w-full">
            <h1 className="text-4xl font-bold">Our Values</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {companyValues.map((value) => (
                    <div key={value.title} className="group relative flex flex-col justify-end gap-2 border-border border-2 rounded-xl p-6 h-50 bg-linear-to-t from-primary to-blue-950 text-white hover:shadow-lg transition-all duration-500 cursor-default overflow-hidden">
                      {/* Icon Container */}
                      <div className="opacity-100 group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-500 ease-in-out transform">
                        {value.icon}
                      </div>
      
                      {/* Text Content */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold transition-all duration-500 group-hover:-translate-y-2">
                          {value.title}
                        </h2>
                        <p className="text-sm leading-snug opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-500 ease-in-out">
                            {value.description}
                        </p>
                      </div>
                    </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AboutUs;
