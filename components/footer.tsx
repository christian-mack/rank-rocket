import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const routes = [
  {
    name: "Features",
    path: "/features",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "About",
    path: "/about",
  },
];

const Footer = () => {
  return (
    <div className="flex justify-center my-16">
      <div className="max-w-screen-xs md:max-w-screen-xl w-full flex justify-between text-purple-lightestPurple flex-col md:flex-row md:mx-8 items-center">
        <div className="w-full md:w-7/12">
          <h3 className="font-medium text-white mb-4">Logo</h3>
          <p className="mb-3">
            Lorem ipsum dolor sit amet, consec adipiscing elit ut ali, purus sit
            ame elit ut aliqu ipsum dolor sit.
          </p>
          <div className="flex items-center mb-10">
            <Link href="/">
              <Facebook className="mr-4 cursor-pointer" />
            </Link>
            <Link href="/">
              <Twitter className="mr-4 cursor-pointer" />
            </Link>
            <Link href="/">
              <Instagram className="mr-4 cursor-pointer" />
            </Link>
            <Link href="/">
              <Linkedin className="mr-4 cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/12">
          <h2 className="font-medium text-white mb-4">Navigation</h2>
          <ul>
            {routes.map((link) => (
              <li
                key={link.name}
                className="hover:text-violet-50 font-light flex">
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
