
import { Button } from '../components/ui/Button';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar"


import { Card, CardContent } from "../components/ui/card"

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"



export  function ProfileUi() {
         
        
return(
  <div>
        <div className="p-6 space-y-6 w-full ml-100 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 ">

              {/* Header */}
              <div className=" -mt-20">
                <h1 className="text-3xl font-bold">
                  Profile
                </h1>

                <p className="text-muted-foreground">
                  Manage your account information
                </p>
              </div>

          {/* Profile Card */}
            <Card className="rounded-2xl -ml-140 w-220">
              <CardContent className="p-6">

                <div className="flex flex-col md:flex-row items-center gap-6">

                      {/* Avatar */}
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/avatar.jpg" />

                        <AvatarFallback>
                          EC
                        </AvatarFallback>
                      </Avatar>

                  {/* User Info */}
                  <div className="flex-1">

                      <h2 className="text-2xl font-semibold">
                        Emmanuel Creed
                      </h2>

                      <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4" />
                        emmanuel@gmail.com
                      </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-600" />

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Phone
                          </p>

                          <p>
                            +234 801 234 5678
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-600" />

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Location
                          </p>

                          <p>
                            Abuja, Nigeria
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Member Since
                          </p>

                          <p>
                            May 2026
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Edit Button */}
                  <Button className="bg-black">
                      Edit Profile
                    </Button>

                </div>

              </CardContent>
            </Card>

            {/* Extra Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">
                    Account Security
                  </h3>

                  <p className="text-muted-foreground mt-2">
                    Change your password and secure your account.
                  </p>

                  <Button className="mt-4 bg-black">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">
                  Preferences
                </h3>

                <p className="text-muted-foreground mt-2">
                  Manage notifications and account settings.
                </p>

                <Button className="mt-4 bg-black">
                  Settings
                </Button>
              </CardContent>
            </Card>

      </div>

    </div>
  

            
  </div>
)
}


