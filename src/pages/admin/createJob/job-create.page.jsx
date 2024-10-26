import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/lib/services/api/Jobs";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";


function AdminJobCreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    q1: "",
    q2: "",
    q3: "",
  });

  const AlertRef = useRef(null);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Success alert state
  const [showErrorAlert, setShowErrorAlert] = useState(false); // Error alert state

  const params = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createJob({
      title: formData.title,
      company:params.companyId,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      questions: [formData.q1, formData.q2, formData.q3],
    }).then(() => {
      setShowSuccessAlert(true);
      if (AlertRef.current) {
        AlertRef.current.scrollIntoView({ behavior: "smooth" });
      }
        setFormData({
        title: "",
        description: "",
        type: "",
        location: "",
        q1: "",
        q2: "",
        q3: "",
      });
    })
    .catch((error) => {
      console.error("Error submitting the form", error);
      setShowErrorAlert(true); // Show error alert
      if (AlertRef.current) {
        AlertRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <div className="container overflow-y-auto">
      <div className="py-8">
        <h2 ref={AlertRef}>Create A Job</h2>
      </div>
        {/* Conditionally render the success alert */}
        {showSuccessAlert && (
        <Alert className="my-6 bg-green-500/50 text-green-800 border-green-800 [&>svg]:text-green-800">
          <CircleCheck className="h-4 w-4"/>
          <AlertTitle>Job Created!</AlertTitle>
          <AlertDescription>
            Your job has been successfully created.
          </AlertDescription>
        </Alert>
      )}

        {/* Conditionally render the error alert */}
        {showErrorAlert && (
        <Alert className="my-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Job Creation Failed!</AlertTitle>
          <AlertDescription>
            There was an error creating your Job. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <form className="py-8" onSubmit={handleSubmit}>
        <div>
          <h3>Title</h3>
          <Input
            className="mt-2"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Description</h3>
          <Textarea
            className="mt-2"
            name={"description"}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Type</h3>
          <Input
            className="mt-2"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Location</h3>
          <Input
            className="mt-2"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Question 1</h3>
          <Textarea
            className="mt-2"
            name={"q1"}
            value={formData.q1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Question 2</h3>
          <Textarea
            className="mt-2"
            name={"q2"}
            value={formData.q2}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <h3>Question 3</h3>
          <Textarea
            className="mt-2"
            name={"q3"}
            value={formData.q3}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="mt-8 bg-card text-card-foreground" >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AdminJobCreatePage;
