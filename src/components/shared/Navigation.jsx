import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function Navigation() {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center py-4 px-8 shadow-sm bg-white z-50">
            <div>
                <Link to={"/"}>
                    <img src="/assets/home/logo.png" alt="Techhire Logo" className="w-[50%] max-w-21 lg:max-w-50 lg:w-40"/>
                </Link>
            </div>
            <div className="hidden lg:flex justify-center gap-x-8 items-center">
                <Link to={"/"} className="text-black" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
                <Link to={"/jobs"} className="text-black" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Jobs</Link>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <Link to={"/sign-in"} className="text-black">Sign In</Link>
                    <Button asChild>
                        <Link to={"/sign-up"}>Sign Up</Link>
                    </Button>
                </SignedOut>
            </div>
            {menuActive ? (
                <div className="lg:hidden">
                    <X size={28} strokeWidth={2.5} onClick={toggleMenu} />
                </div>
            ) : (
                <div className="lg:hidden">
                    <Menu size={28} strokeWidth={2.5} onClick={toggleMenu} />
                </div>
            )}

            {menuActive && (
                <motion.div 
                    className="absolute flex justify-center items-center py-8 top-20 left-0 right-0 bg-white/30 lg:hidden"
                    initial={{ translateY: -20 }}
                    animate={{ translateY: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 backdrop-blur-lg"></div>
                    <div className="relative flex flex-col justify-center items-center gap-y-4 z-10">
                        <Link to={"/"} className="text-primary" onClick={() => (toggleMenu(), window.scrollTo({ top: 0, behavior: "smooth" }))}>Home</Link>
                        <Link to={"/jobs"} className="text-primary" onClick={() => (toggleMenu(), window.scrollTo({ top: 0, behavior: "smooth" }))}>Jobs</Link>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <Link to={"/sign-in"} className="text-primary" onClick={() => (toggleMenu(), window.scrollTo({ top: 0, behavior: "smooth" }))}>Sign In</Link>
                            <Button asChild>
                                <Link to={"/sign-up"} onClick={() => (toggleMenu(), window.scrollTo({ top: 0, behavior: "smooth" }))}>Sign Up</Link>
                            </Button>
                        </SignedOut>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}

export default Navigation;
