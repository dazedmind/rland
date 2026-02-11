import { Mail, Phone, MailIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import rlandLogo from "@/public/rland_logo.png";
import Image from "next/image";


function Footer() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between h-auto lg:h-120 p-8 md:p-16 bg-primary-fg space-x-8">
      {/* LEFT */}
      <div className="flex flex-col justify-between w-full h-full p-4">
        <div className="flex flex-col gap-6">
          <Image src={rlandLogo} alt="R Land Logo" width={200} height={200} />
          <span className="flex flex-col gap-2 text-neutral-200">
            <li className="flex flex-row items-center gap-2">
              <MapPin className="w-4 h-4" />
              <p>
                5/F R-II Building, Malakas Street, Diliman, Quezon City, Metro
                Manila, Philippines
              </p>
            </li>
            <li className="flex flex-row items-center gap-2">
              <Phone className="w-4 h-4" />
              <p>(02) 7752 2789</p>
            </li>
            <li className="flex flex-row items-center gap-2">
              <Mail className="w-4 h-4" />
              <p>moreinfo@rland.ph</p>
            </li>
          </span>
        </div>

        <div className="flex flex-col gap-4 text-white list-none">
          <span className="flex flex-row items-center gap-2">
            <li>
              <a href="https://www.facebook.com/rland.ph" target="_blank">
                <FaFacebook className="w-8 h-8" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/rland.ph/" target="_blank">
                <FaInstagram className="w-8 h-8" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@rlandtv" target="_blank">
                <FaYoutube className="w-8 h-8" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/rlandph" target="_blank">
                <FaLinkedin className="w-8 h-8" />
              </a>
            </li>
          </span>

          <p>© 2026 R LAND DEVELOPMENT INC.</p>
        </div>
      </div>

      {/* SEPARATOR */}
      <div className="w-px h-full bg-primary"></div>

      {/* RIGHT */}
      <div className=" w-full h-full p-4 flex flex-col gap-8">
        {/* NEWSLETTER */}
        <div className="bg-primary rounded-md p-6 text-white flex flex-col gap-4 w-auto">
          <span>
            <h2 className="text-2xl font-bold">Subscribe to our newsletter</h2>
            <p>
              Be the first to receive news, offers, and hear about project
              updates
            </p>
          </span>

          <span className="flex gap-2">
            <div className="relative w-full">
              <MailIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 pl-10 rounded-md bg-input text-black"
              />
            </div>

            <Button
              variant="default"
              size="lg"
              className="bg-secondary text-white rounded-md"
            >
              Subscribe
            </Button>
          </span>
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-start gap-12">
          <div className="flex flex-col text-sm text-white list-none gap-1">
            <h2 className="font-bold uppercase">Company</h2>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">About Us</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">News</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Careers</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Brokers Accreditation</a>
            </li>
          </div>

          <div className="flex flex-col text-sm text-white list-none gap-1">
            <h2 className="font-bold uppercase">Projects</h2>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Arcoe Residences</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Arcoe Estates</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Brighter Mornings</a>
            </li>
          </div>

          <div className="flex flex-col text-sm text-white list-none gap-1">
            <h2 className="font-bold uppercase">Buyer</h2>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Reservation</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Contact Us</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Buyer&apos;s Guide</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Loan Calculator</a>
            </li>
          </div>

          <div className="flex flex-col text-sm text-white list-none gap-1">
            <h2 className="font-bold uppercase">Privacy</h2>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Privacy Policy</a>
            </li>
            <li className="text-neutral-300 hover:text-white">
              <a href="/">Terms of Service</a>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
