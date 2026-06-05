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
import  DashboardUi  from "../components/DashboardUi";
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
  return (

      
        <div>
         

      <div className=" h-400 overflow-hidden ">
            <Navbar />
            <h1 className="mt-3 text-2xl">
             Welcome {user?.firstName}!
            </h1>
            
               

             
            
 
        <div className="w-180 mt-5 ml-110">
             
             <div className=" -ml-110 -mt-2">
                
            {
              dash === "dashboard" 
                ? (
                      <DashboardUi />
                ) : (
                  <ProfileUi />
                )
            }

            </div>

          <div>
            <SidebarProvider>
                      <Sidebar className="  absolute mt-32 ml-2 w-100 rounded-4xl h-300  border-r  text-slate-900 font-sans  flex-col">
              
                        {/* 1. Header Area */}
                        <SidebarHeader className="p-4 border-b border-slate-900/10">
                          <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                                  CH
                                </div>
                                <span className="font-bold tracking-tight text-lg">Course Hub</span>
                          </div>
                        </SidebarHeader>
                        
                        {/* 2. Main Navigation Links */}
                        <SidebarContent className="px-2 py-4 gap-4">
                          
                          {/* Core Section */}
                          <SidebarGroup>
                              <div className="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-800/60">
                                Core
                              </div>
                            <div className="space-y-1">
                                <Button onClick={() => handleSidebar("dashboard")}
                                  className={`${dash === "dashboard" ? "bg-black text-white" : "bg-transparent text-black"} px-3 py-2 rounded-lg text-sm font-medium transition-all `}>
                                  <span>Dashboard</span>
                                </Button>
                                <Button  onClick={() => handleSidebar("profile")}
                                    className={`${dash === "profile" ? "bg-black text-white" : "bg-transparent text-black"} px-3 py-2 rounded-lg text-sm font-medium transition-all `}>
                                    <span>My Profile</span>
                                  </Button> <br></br>
                                    { dash === "dashboard" && (
                                        <Button  onClick={() => handleSidebar("dashboard")}              
                                        className={`${dash === "dashboard" ? "bg-blue-950 text-white" : "bg-transparent text-black"} px-3 py-2 rounded-lg text-sm font-medium transition-all `}>
                                        <span>Courses</span>
                                        </Button>
                                        )}
                                    { dash === "profile" && (
                                        <Button  onClick={() => handleSidebar("profile")}              
                                        className={`${dash === "profile" ? "bg-red-600 text-white" : "bg-transparent text-black"} px-3 py-2 rounded-lg text-sm font-medium transition-all `}>
                                        <span>Log Out</span>
                                        </Button>
                                        )}
                            </div>
                          </SidebarGroup>

                                {/* Management Portals */}
                                <SidebarGroup>
                                  {/* <div className="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-800/60">
                                    Portals
                                  </div>
                                  <div className="space-y-1">
                                    <a href="/dashboard/hod" className="items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-slate-900/10 active:scale-[0.98]">
                                      <span>HOD Dashboard</span>
                                      <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-semibold">Admin</span>
                                    </a>
                                    <a href="/dashboard/student" className=" items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-slate-900/10 active:scale-[0.98]">
                                      <span>Student Portal</span>
                                    </a>
                                  </div> */}
                                </SidebarGroup>

                              </SidebarContent>
                              
                              {/* 3. Sidebar Footer */}
                              <SidebarFooter className="p-4 border-t border-slate-900/10 bg-slate-900/5">
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs font-semibold text-slate-800 truncate">
                                      Onmeje Owoicho Emmanuel
                                    </div>
                                    <div className="text-[10px] text-slate-700/80 font-mono tracking-tight truncate">
                                      AMUP/comp/sci/300/22
                                    </div>
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