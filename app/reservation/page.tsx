"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import MobileNavBar from "@/components/MobileNavBar";
import { useState } from "react";
import arcoeResidencesLogo from "@/public/project-logo/ar-logo.png";
import Image from "next/image";
import arcoeEstatesLogo from "@/public/project-logo/ae-logo.png";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

function ReservationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleSelectProject = (project: string) => {
    setSelectedProject(project);
  };

  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      {/* PAGE BANNER */}
      {/* <PageBanner
        title="Reservation"
        description="Limited availability. Start your reservation and lock in pre-construction advantages.."
        breadcrumb="Reservation"
      /> */}

      <main className="flex flex-col gap-8 py-16">
        {/* RESERVATION SECTION */}
        <section className="flex flex-col items-start px-8 md:px-16 lg:px-24 xl:px-64 justify-center space-y-8">
          <span>
            <Link
              href="/"
              className="flex items-center gap-2 text-primary"
            >
              {" "}
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
          </span>
          <span className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-primary">Reserve your dream home today</h1>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Limited availability. Start your reservation and lock in pre-construction advantages.
            </p>
          </span>
          <div className="flex flex-col gap-4 w-full rounded-lg p-6">
            {/* 1st STEP: PROJECT SELECTION */}
            <div className="flex items-center gap-2">
              <span className="bg-primary p-2 rounded-full text-white text-2xl font-bold w-10 h-10 flex items-center justify-center">
                1
              </span>
              <span>
                <h2 className="text-2xl font-bold text-primary">
                  Select Project
                </h2>
                <p className="text-sm text-gray-500">
                  Select the project you want to reserve.
                </p>
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-around items-center gap-4">
              <button
                onClick={() => handleSelectProject("arcoe-residences")}
                className="flex items-center justify-center w-full h-50 focus:bg-blue-400/50 focus:border-blue-900 bg-neutral-100 border border-border rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src={arcoeResidencesLogo}
                  alt="Arcoe Residences Logo"
                  width={150}
                  height={150}
                  className="object-contain group-hover:scale-110 transition-all duration-300"
                />
              </button>

              <button
                onClick={() => handleSelectProject("arcoe-estates")}
                className="flex items-center justify-center w-full h-50 focus:bg-amber-400/50 focus:border-amber-900 bg-neutral-100 border border-border rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src={arcoeEstatesLogo}
                  alt="Arcoe Estates Logo"
                  width={150}
                  height={150}
                  className="object-contain group-hover:scale-110 transition-all duration-300"
                />
              </button>

              <button
                onClick={() => handleSelectProject("hero-town")}
                className="flex items-center justify-center w-full h-50 focus:bg-orange-400/50 focus:border-orange-900 bg-neutral-100 border border-border rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src={arcoeEstatesLogo}
                  alt="Arcoe Estates Logo"
                  width={150}
                  height={150}
                  className="object-contain group-hover:scale-110 transition-all duration-300"
                />
              </button>
            </div>

            {selectedProject && (
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Select Model</FieldLabel>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
                    <select
                      name="project"
                      id="project"
                      className="w-full h-10 text-sm text-black rounded-md px-2"
                    >
                      <option className="text-sm rounded-md" value="1">
                        Arcoe Residences
                      </option>
                      <option className="text-sm" value="2">
                        Arcoe Estates
                      </option>
                      <option className="text-sm" value="3">
                        Hero's Town
                      </option>
                    </select>
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Select Block</FieldLabel>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
                    <select
                      name="project"
                      id="project"
                      className="w-full h-10 text-sm text-black rounded-md px-2"
                    >
                      <option className="text-sm rounded-md" value="1">
                        Arcoe Residences
                      </option>
                      <option className="text-sm" value="2">
                        Arcoe Estates
                      </option>
                      <option className="text-sm" value="3">
                        Hero's Town
                      </option>
                    </select>
                  </div>
                </Field>

                <Field>
                  <FieldLabel>Select Lot</FieldLabel>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
                    <select
                      name="project"
                      id="project"
                      className="w-full h-10 text-sm text-black rounded-md px-2"
                    >
                      <option className="text-sm rounded-md" value="1">
                        Arcoe Residences
                      </option>
                      <option className="text-sm" value="2">
                        Arcoe Estates
                      </option>
                      <option className="text-sm" value="3">
                        Hero's Town
                      </option>
                    </select>
                  </div>
                </Field>
              </div>
            )}
          </div>
        </section>

        <section className="flex flex-col items-start px-8 md:px-16 lg:px-24 xl:px-64 justify-center space-y-8">
          <div className="flex flex-col gap-4 w-full p-6">
            {/* 2nd STEP: RESERVATION FORM */}
            <div className="flex items-center gap-2">
              <span className="bg-primary p-2 rounded-full text-white text-2xl font-bold w-10 h-10 flex items-center justify-center">
                2
              </span>
              <span>
                <h2 className="text-2xl font-bold text-primary">
                  Reservation Form
                </h2>
                <p className="text-sm text-gray-500">
                  Fill out the form below to reserve your dream home.
                </p>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <span className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter First Name"
                    className="w-full p-2 rounded-md text-black"
                  />
                </Field>

                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter Last Name"
                    className="w-full p-2 rounded-md text-black"
                  />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full p-2 rounded-md text-black"
                  />
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input
                    type="tel"
                    placeholder="(0920) 123-4567"
                    className="w-full p-2 rounded-md text-black"
                  />
                </Field>
              </span>
              <span>
                <Field className="h-full">
                  <FieldLabel>Message</FieldLabel>
                  <Textarea
                    placeholder="Enter Message"
                    className="w-full h-full p-2 rounded-md text-black resize-none"
                  />
                </Field>
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-start px-8 md:px-16 lg:px-24 xl:px-64 justify-center space-y-8">
          <div className="flex justify-between items-center w-full">
            <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <p className="w-full text-xs md:text-sm">
                I have read and agree with the website's{" "}
                <Link
                  className="text-secondary font-bold"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  className="text-secondary font-bold"
                  href="/privacy-policy"
                >
                  Terms of use
                </Link>
              </p>
            </Field>
            {/* 
            <span>
              <Button>Submit Reservation</Button>
            </span> */}

            <Dialog>
              <DialogTrigger className="bg-secondary text-white rounded-md w-fit p-2 px-8 font-bold cursor-pointer">
                Submit
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review Details</DialogTitle>
                  <DialogDescription>
                    Review the details below and submit your reservation.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 text-neutral-500">
                  <Table>
                    <TableBody className="w-full">
                      {/* COLUMN 1 HEADER */}
                      <TableRow>
                        <TableCell className="w-1/2 font-bold text-primary">
                          Project Details
                        </TableCell>
                      </TableRow>

                      {/* COLUMN 1 */}
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Project
                        </TableCell>
                        <TableCell className="">Arcoe Residences</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Model
                        </TableCell>
                        <TableCell className="">Model 1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Block
                        </TableCell>
                        <TableCell className="">Block 1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Lot
                        </TableCell>
                        <TableCell className="">Lot 1</TableCell>
                      </TableRow>

                      {/* COLUMN 2 HEADER */}
                      <TableRow className="">
                        <TableCell className="font-bold text-primary">
                          Contact Details
                        </TableCell>
                      </TableRow>

                      {/* COLUMN 2 */}
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          First Name
                        </TableCell>
                        <TableCell className="">John</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Last Name
                        </TableCell>
                        <TableCell className="">Doe</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Email
                        </TableCell>
                        <TableCell className="">john.doe@example.com</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Phone
                        </TableCell>
                        <TableCell className="">(0920) 123-4567</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-1/2 font-medium text-black">
                          Message
                        </TableCell>
                        <TableCell className="">
                          Hello, I want to reserve this lot.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Button className="bg-secondary text-white rounded-md w-full p-2 px-8 font-bold cursor-pointer">
                  Confirm Reservation
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ReservationPage;
