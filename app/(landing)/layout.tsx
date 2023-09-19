import Footer from "@/components/footer";
import LandingNavbar from "@/components/landing-navbar";
import PreFooter from "@/components/pre-footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      <div>{children}</div>
      <PreFooter />
      <Footer />
    </>
  );
};

export default LandingLayout;
