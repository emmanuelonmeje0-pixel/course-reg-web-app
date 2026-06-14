import Navbar from "../components/Navbar";
import { Button } from '../components/ui/Button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "../components/ui/sidebar"
import {
  IconLayoutDashboard,
  IconUser,
  IconBook,
  IconLogout,
  IconSchool,
} from "@tabler/icons-react";
import  AdminDashboardUi  from "../components/AdminDashboardUi";
import { ProfileUi } from "../components/ProfileUi";
import { useState } from "react";


type AdminProps = {
   isLoading?: boolean
   user?: {
    firstName : string
   } | null;
}

export default function Admin({isLoading, user} : AdminProps) {
    const [dash, setDash] = useState<string>("dashboard")
   
        const handleSidebar = (value : string) => {
          setDash(value)
        }

        const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";
};
  return (

      
    <div>
                                
      <div className=" h-400 overflow-hidden ">
                      <Navbar />

                      <h1 className="mt-5 ml-110 text-4xl font-bold text-slate-800">
                        Welcome back, {user?.firstName}! 👋
                      </h1>

                        <p className="ml-110 text-slate-500">
                          Here's an overview of academic performance.
                        </p>
                                      
                                      
              <div className="w-180 mt-5 ml-110">
                                      
              <div className=" -ml-110 -mt-2">
                        
                {
                  dash === "dashboard" 
                    ? (
                          <AdminDashboardUi />
                    ) : (
                      <ProfileUi />
                  )
                }

              </div>

                  <div>
                    <SidebarProvider>
                        <Sidebar className="absolute mt-24 ml-4 w-72 h-[85vh] rounded-3xl bg-white border shadow-sm">

                              {/* Logo */}
                              <SidebarHeader className="p-6 border-b">
                                <div className="flex items-center gap-3">
                                  <div className="bg-blue-100 p-2 rounded-xl">
                                    <IconSchool
                                      size={28}
                                      className="text-blue-700"
                                    />
                                  </div>

                                  <div>
                                    <h2 className="text-xl font-bold text-blue-950">
                                      Course
                                    </h2>

                                    <p className="-mt-1 text-orange-500 font-semibold">
                                      Hub
                                    </p>
                                  </div>
                                </div>
                              </SidebarHeader>

                              {/* Menu */}
                            <SidebarContent className="px-4 py-5">

                                <p className="text-xs uppercase text-gray-400 font-bold mb-3">
                                  Core
                                </p>

                                <div className="space-y-3">

                                  {/* Dashboard */}
                                  <Button
                                    onClick={() => handleSidebar("dashboard")}
                                    className={`
                                      w-full justify-start gap-3 rounded-xl py-6
                                      ${
                                        dash === "dashboard"
                                          ? "bg-blue-900 text-white"
                                          : "bg-transparent text-slate-700 hover:bg-slate-100"
                                      }
                                    `}
                                  >
                                    <IconLayoutDashboard size={20} />
                                    Dashboard
                                  </Button>

                                  {/* Profile */}
                                  <Button
                                    onClick={() => handleSidebar("profile")}
                                    className={`
                                      w-full justify-start gap-3 rounded-xl py-6
                                      ${
                                        dash === "profile"
                                          ? "bg-blue-900 text-white"
                                          : "bg-transparent text-slate-700 hover:bg-slate-100"
                                      }
                                    `}
                                  >
                                    <IconUser size={20} />
                                    My Profile
                                  </Button>

                                  {/* Courses */}
                                  <Button
                                    className="
                                    w-full justify-start gap-3 rounded-xl py-6
                                    bg-transparent text-slate-700
                                    hover:bg-slate-100
                                    "
                                  >
                                    <IconBook size={20} />
                                    Courses
                                  </Button>
                                </div>

                                {/* Bottom Card */}
                              <div className="mt-12 bg-slate-50 border rounded-2xl p-5">

                                  <div className="bg-blue-100 w-fit p-3 rounded-xl">
                                    <IconSchool
                                      size={32}
                                      className="text-blue-700"
                                    />
                                    </div>

                                      <h3 className="font-bold text-blue-950 mt-4">
                                        Unlock Your Potential
                                      </h3>

                                      <p className="text-sm text-gray-500 mt-2">
                                        Explore courses, track progress and
                                        achieve your academic goals.
                                      </p>

                                    <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
                                      Browse Courses
                                    </Button>
                              </div>
                            </SidebarContent>

                              {/* Footer */}
                            <SidebarFooter className="border-t p-4">

                              <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
                                {user?.firstName?.charAt(0)}
                              </div>

                                  <div className="flex-1">
                                      <p className="font-semibold text-sm">
                                        {user?.firstName}
                                      </p>

                                      <p className="text-xs text-gray-500">
                                        Administrator
                                      </p>
                                  </div>

                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={handleLogout}
                                  >
                                    <IconLogout size={18} />
                                  </Button>

                              </div>

                            </SidebarFooter>

                              </Sidebar>

                        </SidebarProvider>
                                                    
                      </div>

                    </div>

                  </div>

                </div>

              )

            }