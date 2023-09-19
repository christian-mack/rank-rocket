import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

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

const LandingNavbar = () => {
  const { userId } = auth();

  return (
    <div className="flex justify-center text-white">
      <div className="max-w-screen-xl w-full flex justify-between items-center  mx-4 md:mx-8 my-4 md:mt-6">
        <div className="flex">logo</div>
        <div className="flex items-center">
          <div className="mr-4">
            {routes.map((link) => (
              <Link
                href={link.path}
                key={link.name}
                className="hover:text-white text-purple-lightestPurple mr-4">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex">
            {userId ? (
              <Link href="/dashboard">
                <Button variant="purplePrimary" size="lg">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-in" className="mr-3">
                  <Button variant="purpleMuted" size="lg">
                    Log in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="purplePrimary" size="lg">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
