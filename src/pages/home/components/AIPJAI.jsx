// AI-Powered Job Application Insights
import AIscanCV from "../../../assets/images/AI-Scanning-CV.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function AIPJAI () {
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.2,    // Percentage of the element visible to trigger animation
      });

    return (
        <div className="px-8 overflow-x-hidden">
            <h2 className="text-center mb-10 md:mb-20">AI-Powered Job Application Insights</h2>
            <div className="md:flex md:items-center space-y-4 md:gap-x-4 mb-20 md:space-y-0">
                <motion.div className="space-y-4"
                    ref={ref}
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: inView ? 1 : 0,  x: inView ? 0: -200 }}
                    transition={{ duration: 1 }}
                >
                    <p>At TechHire, we leverage cutting-edge AI technology to analyze and rate job applications with precision. 
                        Our AI-powered system evaluates key factors, providing actionable insights that help employers make informed
                        hiring decisions faster. Discover top talent with ease as our platform highlights the most
                        promising candidates based on your specific needs. Let TechHire’s AI be your strategic partner
                        in building a winning team.</p>
                    <Button>
                        <Link to={"/"}>Post A Job</Link>
                    </Button>
                </motion.div>
                <motion.img 
                className="md:w-[50%] rounded-lg" src={AIscanCV} alt="AI-Scanning-CV"
                ref={ref}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: inView ? 1 : 0,  x: inView ? 0: 200 }}
                transition={{ duration: 1 }} />
            </div>
        </div>
    )
}

export default AIPJAI