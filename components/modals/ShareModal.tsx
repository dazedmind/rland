import React from "react";
import { 
  Facebook, 
  Linkedin, 
  Link as LinkIcon, 
  X 
} from "lucide-react";
import { toast } from "sonner"; // or your preferred toast library
import { Button } from "../ui/button";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

interface ShareModalProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ url, title, isOpen, onClose }: ShareModalProps) => {
  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600" size={20} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-blue-950" size={20} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Copy Article Link",
      icon: <LinkIcon className="text-gray-600" size={20} />,
      onClick: () => {
        navigator.clipboard.writeText(url);
        toast.success("Article link copied to clipboard!");
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleClickOutside}>
      <div className="bg-white rounded-xl p-6 w-full max-w-xs md:max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Found this article useful? Share it with your friends!</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={option.onClick}
              className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {option.icon}
              <span className="font-medium text-sm">{option.name === "Copy Article Link" ? "Copy Article Link" : `Share on ${option.name}`}</span>
            </a>
          ))}
        </div>


        <Button variant="default" className="w-full mt-4" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ShareModal;