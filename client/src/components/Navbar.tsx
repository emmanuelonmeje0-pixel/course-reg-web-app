
import { Button } from './ui/Button'
import Logo from './Logo';
import { Link } from "react-router-dom";
 import{
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "../components/ui/avatar"

type NavbarProps = {
  handleShowLogin?: ()=>void;
}

const Navbar = ( {handleShowLogin}: NavbarProps) => {
  const isAuth = sessionStorage.getItem("isAuth") === "true"
  return (
    <nav className="bg-[#1B1B1B]/5  text-white rounded-2xl  w-[calc(100%-2rem)] max-w-7xl py-3 px-6  top-3 left-1/2 -translate-x-1/2 z-20 relative">
      <div className="flex justify-between items-center">
          <Logo variant="light" />
      
          <nav style={{ display: "flex", gap: "30px "}} className='text-blue-900 00 font-bold' >
            <Link to="/"></Link>
            <Link to="/about"></Link>
          </nav>
      
        <div className="flex items-center gap-4">
            
                        {isAuth ? (
                          <Avatar>
                <AvatarImage src="/vite.svg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                    ) : (
                      <>
                      <Button className='bg-white text-black'
                        onClick={handleShowLogin }      >
                        Log In
                      </Button>
                

                      <Button 
                        className="bg-blue-950 text-white hover:bg-gray-800  px-2 py-2 text-base h-auto "
                        onClick={ () => window.open("https://app.talksharp.co", "_blank")}
                      >
                        Sign Up
                      </Button>
                      </>
                    )}

                  
                  </div>
                
                </div>
                
    </nav>
  )
              
   
   
    


  
};

export default Navbar;
