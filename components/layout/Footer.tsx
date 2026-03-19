import { Mail, Phone, MailIcon, Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import rlandLogo from "@/public/rland-logo-white.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateEmail } from "@/lib/form-validator";
import { useQuery } from "@tanstack/react-query";

function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data: socialLinks, isLoading: isSocialLinksLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => data.data as {
        facebookUrl: string;    // Changed from facebook
        instagramUrl: string;   // Changed from instagram
        youtubeUrl: string;     // ...and so on
        linkedinUrl: string;
        tiktokUrl: string;
      }),
  });

  if (isSocialLinksLoading) {
    return <div>Loading...</div>;
  }

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        toast.success('Subscribed to newsletter successfully');
        setEmail('');
      } else {
        const error = await response.json();
        toast.error(error.error);
      }
    }
    catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error('Failed to subscribe to newsletter');
    }
    finally {
      setLoading(false);
    }
  }
  
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  const footerLinks = [
    {category: "Company", links: [
      {name: "About Us", href: "/about-us"},
      {name: "News", href: "/news"},
      {name: "Careers", href: "/careers"},
      {name: "Brokers Accreditation", href: "/brokers-accreditation"},
    ]},
    {category: "Projects", links: [
      {name: "Arcoe Residences", href: "/projects/arcoe-residences"},
      {name: "Arcoe Estates", href: "/projects/arcoe-estates"},
      {name: "Brighter Mornings", href: "/projects/brighter-mornings"},
    ]},
    {category: "Buyer", links: [
      {name: "Contact Us", href: "/contact-us"},
      {name: "Buyer's Guide", href: "/buyer-guide"},
      {name: "Loan Calculator", href: "/loan-calculator"},
    ]},
    {category: "Privacy", links: [
      {name: "Privacy Policy", href: "/privacy-policy"},
      {name: "Terms of Use", href: "/privacy-policy"},
    ]},
  ]
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between h-auto lg:h-120 p-6 md:p-16 bg-primary-fg gap-8">
      {/* LEFT */}
      <div className="flex flex-col justify-between w-full h-full p-4">
        <div className="flex flex-col gap-6">
          <Image src={rlandLogo} alt="R Land Logo" width={200} height={200} />
          <span className="flex flex-col gap-2 text-neutral-200">
            <li className="flex flex-row items-start md:items-center gap-2">
              {/* <MapPin className="size-4 shrink-0" /> */}
              <p className="text-neutral-300">
                5/F R-II Building, Malakas Street, Diliman, Quezon City, Metro
                Manila, Philippines
              </p>
            </li>
            <li className="flex flex-row items-center gap-2">
              <Phone className="size-4" />
              <p className="text-neutral-300">(02) 7752 2789</p>
            </li>
            <li className="flex flex-row items-center gap-2">
              <Mail className="size-4" />
              <p className="text-neutral-300">moreinfo@rland.ph</p>
            </li>
          </span>
        </div>

        <div className="flex flex-col gap-4 text-white list-none pt-8">
          <span className="flex flex-row items-center gap-4">
            <li>
              <a href={socialLinks?.facebookUrl} target="_blank">
                <FaFacebook className="size-6" />
              </a>
            </li>
            <li>
              <a href={socialLinks?.instagramUrl} target="_blank">
                <FaInstagram className="size-6" />
              </a>
            </li>
            <li>
              <a href={socialLinks?.youtubeUrl} target="_blank">
                <FaYoutube className="size-6" />
              </a>
            </li>
            <li>
              <a href={socialLinks?.linkedinUrl} target="_blank">
                <FaLinkedin className="size-6" />
              </a>
            </li>
            <li>
              <a href={socialLinks?.tiktokUrl} target="_blank">
                <FaTiktok className="size-6" />
              </a>
            </li>
          </span>
          <p>© 2026 R LAND DEVELOPMENT INC.</p>
        </div>
      </div>

      {/* SEPARATOR */}
      <div className="w-full md:w-px h-px md:h-full bg-primary"></div>

      {/* RIGHT */}
      <div className=" w-full h-full flex flex-col gap-8">
        {/* NEWSLETTER */}
        <div className="bg-primary rounded-md p-6 mt-4 md:mt-0 text-white flex flex-col gap-4 w-auto">
          <span>
            <h2 className="text-xl font-bold">Subscribe to our newsletter</h2>
            <p className="text-sm leading-relaxed text-neutral-200">
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
                className="w-full p-2 pl-10 h-12 rounded-md bg-slate-200 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              variant="default"
              size="sm"
              className="text-white h-12"
              onClick={handleSubscribe}
            >{loading ? <Loader2 className="size-5 animate-spin" /> : (isMobile ? <Bell className="size-5" strokeWidth={2}/> : <span>Subscribe</span>)}
              {/* {isMobile ? <Bell className="size-5" strokeWidth={2}/> : <span>Subscribe</span>} */}
            </Button>
          </span>
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-start gap-12 p-4">
          {footerLinks.map((link) => (
            <div key={link.category} className="flex flex-col text-sm text-white list-none gap-1">
              <h2 className="font-bold uppercase">{link.category}</h2>
              {link.links.map((link) => (
                <li key={link.name} className="text-neutral-300 hover:text-white">
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
