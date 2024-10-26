import Marquee from "react-fast-marquee";
import wso2 from "../../../assets/images/WSO2.png";
import StemLink from "../../../assets/images/StemLink.png";
import IFS from "../../../assets/images/IFS.png";

function Carosuel () {
    const images = [wso2, StemLink, IFS];

    return (
        <div>
            <h2 className="text-center mb-20">Trusted by Industry Leaders</h2>
            <div className="flex justify-center items-center mb-20">
                <Marquee className="w-[80%] flex justify-between items-center" speed={100} gradient={true} pauseOnClick={true}>
                    {images.map((image) => {
                        return (
                            <div className="my-0 mx-[30px] flex justify-center items-center" key={image}>
                                <img className="w-[50%] md:w-[80%]" src={image} alt={image}/>
                            </div>
                        )
                    })}
                </Marquee>
            </div>
        </div>
        
    );
}

export default Carosuel