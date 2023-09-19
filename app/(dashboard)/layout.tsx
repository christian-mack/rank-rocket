import DashboardNavbar from "@/components/dashboard-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      <>{children}</>
    </>
  );
};

export default DashboardLayout;
