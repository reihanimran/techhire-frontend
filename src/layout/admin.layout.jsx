import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "@/pages/admin/jobPosts/components/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Ensure correct import

function AdminMainLayout() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return navigate("/sign-in");
    }

    if (user?.publicMetadata?.role !== "admin") {
      return navigate("/");
    }

    navigate(`/admin/${user?.publicMetadata?.companyId}`);
  }, [isLoaded, isSignedIn, navigate, user]);

  return (
    <div className="flex h-screen">
      <SidebarProvider className="flex flex-col md:flex-row"> {/* Wrap AdminSidebar with SidebarProvider */}
        <AdminSidebar />
        <div className="flex-1 overflow-x-hidden">        
          <Outlet/> 
        </div>
      </SidebarProvider>
    </div>
  );
}

export default AdminMainLayout;