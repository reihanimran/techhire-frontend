import * as React from "react";
import { Home, Settings, CirclePlus, ChevronsUpDown, LogOut } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar, SidebarContent,SidebarTrigger, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarInset } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, Outlet } from "react-router-dom";

export default function AdminSidebar() {
  const { user } = useUser(); // Ensure this is defined correctly in your context
  const { state, isMobile } = useSidebar(); // Call useSidebar here, it needs to be within the SidebarProvider

  const data = {
    navMain: [
      {
        title: "Home",
        url: `/admin/${user?.publicMetadata?.companyId}`,
        icon: Home,
      },
      {
        title: "Settings",
        url: `/admin/${user?.publicMetadata?.companyId}`,
        icon: Settings,
      },
      {
        title: "Create Job",
        url: `/admin/${user?.publicMetadata?.companyId}/job/create`,
        icon: CirclePlus,
      },
    ],
  };

  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState("Home");


  const handleClick = (url, title) => {
    setActiveItem(title); // Set clicked item as active
    navigate(url);        // Navigate to the selected URL
  };

  return (
    <div className="bg-[#ebe9ea]">
      <Sidebar collapsible="icon">
          <SidebarHeader className={`flex flex-row items-center ${(state === "expanded") ? "justify-between" : "justify-center"}`}>
            <SidebarMenu className={`transition-all ${(state === "expanded") ? "w-32" : "hidden"}`}>
              <SidebarMenuItem className="flex justify-start items-center">
                <img
                  src="/assets/home/logo.png"
                  className="w-32"
                  alt="Logo"
                />
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarTrigger/>
          </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={(activeItem === item.title)} tooltip={item.title} onClick={() => handleClick(item.url, item.title)}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarTrigger className={`ml-4 pt-4 ${isMobile ? "w-7" : "hidden"}`} />
    </div>
  );
}
