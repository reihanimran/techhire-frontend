import { Link } from "react-router-dom"
import Growth from "../../../../assets/Growth.svg"


function StatCard ({ link, title, count, icon, gradientClass }) {
  return (
    <Link to={link} className="flex-shrink-0 w-[280px] md:flex-1">
      <div className={`relative ${gradientClass} flex flex-col items-center justify-center rounded-md shadow-lg p-6 w-[100%]`}>
        <span className="absolute bottom-8 left-6 opacity-[5%] w-[128px]">
          <img src={Growth} alt="Background Icon" />
        </span>
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-white text-lg">{title}</h2>
            <p className="text-5xl text-white font-bold mt-2">{count}</p>
          </div>
          <div>
            <span className="text-white text-6xl">{icon}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default StatCard