import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';


function CallToAction () {
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.2,    // Percentage of the element visible to trigger animation
      });

    return (
        <>
            <div className="overflow-x-hidden flex flex-col md:flex-row justify-between items-center bg-custom-gradient h-[70vh] mb-20 shadow p-4 md:p-8">
                <motion.div className="flex flex-col gap-y-8 justify-start h-[80%] self-start max-w-[90%]"
                      ref={ref}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}                
                >
                    <h1 className="text-white md:text-4xl lg:text-5xl">Find Your Dream Job & <br className="hidden md:flex"/>
                        Get Hired with TechHire!</h1>
                    <Button variant="secondary" className="self-start">
                        <Link to={"/"}>Get Hired</Link>
                    </Button>     
                </motion.div>
                <motion.div className="flex flex-col gap-y-8 justify-end h-[80%] self-end max-w-[90%]"
                    ref={ref}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay : 0.5}}
                                   
                >
                    <h1 className="text-primary text-right md:text-4xl lg:text-5xl">Partner with TechHire to <br className="hidden md:flex"/>
                        Discover Top Talent</h1>
                    <Button className="self-end">
                        <Link to={"/"}>Post A Job</Link>
                    </Button>     
                </motion.div>
            </div>
        </>
    )
    
}
export default CallToAction

