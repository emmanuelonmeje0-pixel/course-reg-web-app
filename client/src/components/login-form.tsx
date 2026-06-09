import { Button } from "./ui/Button"
import {
  Field,
  FieldDescription,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"

import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useState } from "react"
import { Switch } from "./ui/switch"

type credentialProps = {
  email?: string
  password?: string
}
type LoginFormProps = {
  credential: credentialProps
  setCredential: React.Dispatch<React.SetStateAction<credentialProps>>
}
 
export default function LoginForm({
  credential,
  setCredential,

}:LoginFormProps) {
  const isActive = credential.email !== "" && credential.password !== ""
  
  const navigate = useNavigate();
  const [isHod, setIsHod] = useState(false)
   
  const handleLogin = async (e: any) => {
    e.preventDefault();

      if (credential.email && credential.password ){
        if(!credential.email?.includes("@") || !credential.email?.includes(".com") || (!credential.email.endsWith(".com"))  ) { //email do not contain @
            toast.error("Email is not correct")
            

        } else if(credential.password.length < 8) { //if the password is less than 8 characters
            toast.error("Password is too short")
           

        }else if(!(/[\/';[@]/.test(credential.password ))) { //if the password do not contain these --> /';[@
               toast.error("The password should contain this special characters (/';[@)")
           

        }else if (!/[A-Z]/.test(credential.password)) { //the password should contain at least one upper case
             toast.error("Must contain one upper case")
           

        } else{
        
           const cred: {email: string, password: string} = {
              "email": credential.email as string ,
              "password": credential.password as string 
            }
             const response = await fetch(`http://localhost:8000/${isHod ? "hod-login" : "student-login"} `, {
               method: "POST",
             headers: {
               "content-type": "application/json"
               },
               body:JSON.stringify(cred)
              
             })
            
             const data = await response.json() 
              if (response.status === 200) {
                console.log("This what my backend sent:", data);
              sessionStorage.setItem("isAuth", "true"),
              sessionStorage.setItem("user_type", data.data.user_type)
              sessionStorage.setItem("user_id", data.data.user_id)
               if (data.data.user_type === "hod") {
                navigate("/dashboard/hod")
               } else  if (data.data.user_type === "student") {
                navigate("/dashboard/student")
              }
              
           } else {
               navigate("/login")
           }
           
        
                }
          
         
         
          
          
          //  sessionStorage.setItem(
          //   "isAuth", "true");
          //   console.log("Redirecting...");
            
          
    }  
         
        

    //sessionStorage == persist on browser tab, will store data in the browser tab
    //localStorage === persist on browser, will store data in the browser
    // read about to store data in sessionStorage

    //sessionStorage.setItem("isAuth", "true")
    //email: credential.email

    // store this in session storage: isAuth: "true"
}

//sonner in

// const handleLogout = () => {
//     sessionStorage.removeItem(isAuth)
//     sessionStorage.removeItem(email)
// }

//bellow your login button or show it in the sonner

  return(
    
    <div className="flex justify-center items-center  flex-col">
      <h1>
        Login Form
      </h1>
       <div className="flex items-center gap-2">
      <Switch
        checked={isHod}
        onCheckedChange={setIsHod}
      />
      <span>{isHod ? "student Login" : "HOD Login"}</span>
    </div>
  

       <form className=" w-full" onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value= {credential.email}
                  onChange={(e) =>
                    setCredential({ ...credential, email: e.target.value})
                      
                  }
                  
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required 
                  value= {credential.password}
                   onChange={(e) =>
                    setCredential({ ...credential, password: e.target.value})
                   }
                   
                />
              </Field>
              <Field>
                <Button

                disabled={!isActive}
                className= {`${isActive ? "bg-black" : "bg-gray-400"}`} type="submit" >Login</Button>
                <Button variant="outline" type="button">
                   
                  Login with Google
                   
                </Button>
                
                
                
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
           
    </div>
  )
  }
