import Navbar from "../components/Navbar";
import { Button } from "../components/ui/Button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field"
import { Input } from "../components/ui/input"

import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export default function AdminDashboardPage() {

  const navigate = useNavigate();
  const handleLogout = () => {
   sessionStorage.removeItem("isAuth");
   navigate("/"); 
   }
     return (
      <div>
         <Navbar />
     
            <h1 className="mt-10 ml-7 text-3xl font-bold">
               welcome emmanuel@gmail.com
               
            </h1>
         <form  className="w-100 mt-20 ml-20">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="">First Name</FieldLabel>
                <Input className="border-blue-950"
                  id=""
                  type="string"
                  placeholder="Example: Emmanuel"
                  required
                />
              </Field>
              <Field>
            </Field>
            </FieldGroup>
         

         
            <FieldGroup className="ml-120 -mt-24 ">
              <Field>
                <FieldLabel htmlFor="">Last Name</FieldLabel>
                <Input className="border-blue-950"
                  id=""
                  type="string"
                  placeholder="Example: Onmeje"
                  required
                />
              </Field>
              <Field>
            </Field>
            </FieldGroup>     
         </form>
        <div className="-mt-15">
            <Button className="bg-blue-950 ml-260 -mt-70">
               Update
             </Button>
        </div>
        <div className="ml-20 mt-30">
            <Button className="bg-amber-600" onClick={handleLogout}>
              Log out
            </Button>
        </div>
            

    </div>
     )
}