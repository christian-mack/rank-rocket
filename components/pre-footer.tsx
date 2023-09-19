import Link from "next/link";
import { Button } from "@/components/ui/button";

const PreFooter = () => {
  return (
    <div className="flex justify-center py-28 text-center">
      <div className="max-w-screen-md flex flex-col justify-between text-purple-lightestPurple">
        <div className="mb-5">icon</div>
        <div className="flex flex-col mb-4">
          <h2>Get started with Rank Rocket today.</h2>
        </div>
        <div className="mb-8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non.
          </p>
        </div>
        <Link href="/sign-up">
          <Button variant="purplePrimary" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PreFooter;
