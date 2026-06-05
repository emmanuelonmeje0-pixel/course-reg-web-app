import { Link } from "react-router-dom";

interface LogoProps {
    variant?: 'light' | 'dark';
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
    return (
      <Link to="/" className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 pr-4">
              <img 
          src= "../src/assets/logo.svg" 
          alt="Talk Sharp Logo" 
          className="h-14 w-auto"
        />
        </div>
        <div className={`w-10 h-10 rounded-md flex flex-col items-center justify-center gap-0 -space-y-3 mt-3`}>
        <span className={`font-semibold text-2xl font-display tracking-wide ${variant === 'dark' ? 'text-white' : 'text-blue-950'}`}>Course</span>
        <span className={`font-semibold text-2xl font-display tracking-wide ${variant === 'dark' ? 'text-white' : 'text-amber-400'}`}>Hub</span>
        </div>
      </Link>
    );
  };
  
  export default Logo;
  