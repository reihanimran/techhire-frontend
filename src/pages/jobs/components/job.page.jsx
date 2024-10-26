import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "@/lib/services/api/Jobs";
import { createJobApplication } from "@/lib/services/api/jobApplication";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react"

function JobPage() {

  const [joblist, setJoblist] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Success alert state
  const [showErrorAlert, setShowErrorAlert] = useState(false); // Error alert state
  const params = useParams();

  useEffect(() => {
   
    getJobById(params.id).then((data) => {
      setJoblist(data);
      // console.log(data);
    }).catch((err) => {})
    .finally(() => {});
}, [params]);   

console.log(joblist);

const { isSignedIn, user, isLoaded } = useUser();

if(!isSignedIn){
  return(
    <Navigate to="/sign-in" />
  );
}

if(!isLoaded){
  return(
    <div className="flex items-center justify-center h-24">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
}


  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    createJobApplication({
      fullName: formData.fullName,
      answers:[
        formData.a1, formData.a2, formData.a3
      ],
      job: params.id,
      company: joblist.company,
      userId: user.id
    }).then(() => {
      setShowSuccessAlert(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      }); // Show success alert
      setFormData({
        fullName: "",
        a1: "",
        a2: "",
        a3: "",
      });
    })
    .catch((error) => {
      console.error("Error submitting the form", error);
      setShowErrorAlert(true); // Show error alert
    });
  };

  return (
    <div className="px-8 mt-[30%] md:mt-[10%]">
      <div>
        <h2 className="text-primary">{joblist?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4 text-black">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{joblist?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{joblist?.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{joblist?.description}</p>
      </div>

      <Separator />
        {/* Conditionally render the success alert */}
        {showSuccessAlert && (
        <Alert className="my-6 bg-green-500/50 text-green-800 border-green-800 [&>svg]:text-green-800">
          <CircleCheck className="h-4 w-4"/>
          <AlertTitle>Job Application Submitted!</AlertTitle>
          <AlertDescription>
            Your job application has been successfully submitted.
          </AlertDescription>
        </Alert>
      )}

        {/* Conditionally render the error alert */}
        {showErrorAlert && (
        <Alert className="my-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Job Appliaction Submission Failed!</AlertTitle>
          <AlertDescription>
            There was an error submitting your application. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <form className="py-8 flex flex-col gap-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <Label>Full Name</Label>
          <Input
            required
            value={formData.fullName}
            onChange={(event) =>
              setFormData({ ...formData, fullName: event.target.value })
            }
          />
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label>
              {joblist?.questions[0]}
            </Label>
            <Textarea
              required
              value={formData.a1}
              onChange={(event) =>
                setFormData({ ...formData, a1: event.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label>{joblist?.questions[1]}</Label>
            <Textarea
              required
              value={formData.a2}
              onChange={(event) =>
                setFormData({ ...formData, a2: event.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label>
            {joblist?.questions[2]}
            </Label>
            <Textarea
              required
              value={formData.a3}
              onChange={(event) =>
                setFormData({ ...formData, a3: event.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-x-4 items-center">
          <Button type="submit" className="w-fit">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() =>
              setFormData({
                fullName: "",
                a1: "",
                a2: "",
                a3: "",
              })
            }
            className="w-fit"
            variant="outline"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default JobPage;
