import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="flex flex-col justify-between items-center gap-y-4">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between gap-8">
        {/* First Column */}
        <div className="flex flex-col items-start">
            <Link to={"/"} className="text-4xl font-medium">
                <img src="/assets/home/logo.png" alt="Techhire Logo" className="w-40" onClick={scrollToTop}/>
            </Link>          
            <p className="text-sm mb-4">Whether you're looking to find your dream job or hire the best talent, 
              TechHire is here to help.<br /> Our AI-powered platform connects job seekers with top IT opportunities and helps employers discover the perfect candidates.<br />
              Join us today and take the next step towards success</p>
            <div className="flex justify-start items-center gap-2">
                <Button>
                <Link to={"/job"}>Get Hired</Link>
                </Button>
                <Button variant="outline">
                <Link to={"/"}>Post A Job</Link>
                </Button>
            </div>
        </div>

        {/* Second Column: Navigation */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><Link to={"/"} className="text-black">Home</Link></li>
            <li><Link to={"/jobs"} className="text-black">Jobs</Link></li>
          </ul>
        </div>

        {/* Third Column: Personal Details */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">29/A Nihal Silva Mawatha,<br />Kirulapone</p>
          <p className="text-sm">Email: <a href="mailto:info@techhire.com">info@techhire.com</a></p>
          <p className="text-sm">Phone: +94 77 8343 211</p>
        </div>
      </div>
      <div className="container bg-primary flex justify-center items-center py-4">
        <p className="text-white">&copy; 2024 TechHire. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
