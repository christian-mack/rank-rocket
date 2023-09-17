import DashboardNavbar from "@/components/dashboard-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      <div>{children}</div>
    </>
  );
};

export default DashboardLayout;
