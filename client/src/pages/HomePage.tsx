
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from '../components/ui/Button';
import { AppDialog } from "../components/AppDialog";
import  LoginForm  from "../components/login-form";
import { useNavigate } from "react-router-dom";



type credentialProps = {
  email?: string;
  password?: string;
}

export default function HomePage() {
    
    const navigate = useNavigate()
    
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [credential, setCredential] = useState<credentialProps>({email:"", password:""})
    const handleShowLogin = () => {
        setShowLogin( !showLogin)

    }
    

    useEffect(()=> {
        const isAuth = sessionStorage.getItem("isAuth")
        const userType = sessionStorage.getItem("userType")
        if(isAuth == "true") {
            if(userType == "hod") {
                navigate("/dashboard/hod")
            } else {
                navigate("/dashboard/student")
            }
        }
    },[])

    
    return (
       
        <div className="bg">
            <Navbar  handleShowLogin={ handleShowLogin} />
            <div > 
                <h1 className="mt-20 ml-20 text-6xl font-bold  text-blue-950"> Unlock Your Potential<br>
                    </br>
                    with Our Courses
                </h1> 
                <p className="mt-7 ml-20 text-3xl text-amber-500">Find the best courses to boost your skills <br>
                    </br>
                    and advance your career.
                </p>
            </div>
            <div>
                <Button className="mt-10 ml-15 bg-blue-950 hover:bg-gray-400">
                    Browse Courses
                </Button>
                <Button className="ml-2 bg-amber-500 text-white">
                    Get Started
                </Button>
            </div>

            <AppDialog
                open={showLogin}
                onOpenChange={handleShowLogin}
            >
                
                    <LoginForm
                     credential={credential} 
                    setCredential={setCredential}
                    
                    />
                
            </AppDialog>   
        </div>
        
    )
}