import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import animationData from "@/assets/Animation-hero.json";


function Hero() {
    return (
      <section className="mt-[20%] pt-10 md:mt-28 md:py-32 md:flex md:justify-between md:items-center md:h-[80vh] px-8">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-center text-black md:text-left mb-4 leading-normal ">Connecting<br className="md:hidden"/> <span className="text-3xl md:text-5xl text-primary">Tech Companies</span><br></br> with<br className="md:hidden"/> Skilled Professionals.</h1>
          <div className="flex justify-center md:justify-start items-center gap-2">
            <Button>
              <Link to={"/job"}>Get Hired</Link>
            </Button>
            <Button variant="outline">
              <Link to={"/"}>Post A Job</Link>
            </Button>
          </div>
        </motion.div>
        <Lottie animationData={animationData}></Lottie>
      </section>
    );
  }
  
  export default Hero;