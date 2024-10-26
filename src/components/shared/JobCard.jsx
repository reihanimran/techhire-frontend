import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import briefcaseIcon from '../../assets/briefcase.svg';
import navigation from '../../assets/navigation.svg';

function JobCard(props) {
  return (
    <Link to={props.isAdmin ? `/admin/${props.company}/job/${props._id}` : `/job/${props._id}`} className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold -mt-4">{props.company}</CardContent>
        <CardFooter className="gap-y-4 flex-col">
          <div className="flex items-center gap-x-2">
            <img src={briefcaseIcon} alt="Briefcase" />
            <span className="font-bold">{props.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <img src={navigation} alt="Navigation" />
            <span className="font-bold">{props.location}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default JobCard;
