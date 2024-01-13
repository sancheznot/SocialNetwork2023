import SideNav from "@/components/Dashboard/Main/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="w-full grid grid-cols-12 gap-2">
      <SideNav />
      <div className="col-span-10 lg:col-span-12 ">{children}</div>
    </div>
  );
}
