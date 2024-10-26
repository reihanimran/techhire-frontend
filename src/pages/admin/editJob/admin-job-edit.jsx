import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getJobById, UpdateJobById } from "@/lib/services/api/Jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";

function AdminJobEdit() {
  const params = useParams();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    q1: '',
    q2: '',
    q3: '',
  });

  // Create refs for scrolling
  const AlertRef = useRef(null);

  useEffect(() => {
    getJobById(params.id)
      .then((data) => {
        setJob(data);
        setFormData({
          title: data.title,
          description: data.description,
          type: data.type,
          location: data.location,
          q1: data.questions?.[0] || "",
          q2: data.questions?.[1] || "",
          q3: data.questions?.[2] || "",
        });
      }).catch((err) => {
        setError(true);
      }).finally(() => setLoading(false));
  }, [params.id]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await UpdateJobById({
      title: formData.title,
      company: params.companyId,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      questions: [formData.q1, formData.q2, formData.q3],
    }, params.id).then(() => {
      setShowSuccessAlert(true);
      // Scroll to the success alert ref
      if (AlertRef.current) {
        AlertRef.current.scrollIntoView({ behavior: "smooth" });
      }
    })
    .catch((error) => {
      console.error("Error submitting the form", error);
      setShowErrorAlert(true); // Show error alert
      // Scroll to the error alert ref
      if (AlertRef.current) {
        AlertRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  };
  
  return (
    <div className="bg-[#ebe9ea] px-2 md:p-8 min-h-screen overflow-x-hidden flex-1 overflow-y-auto">
      <div className="container bg-white rounded-md shadow-md">
        <div className="py-8">
          <h2 ref={AlertRef} >Edit Job</h2>
        </div>

        {/* Conditionally render the success alert */}
        {showSuccessAlert && (
          <Alert // Attach the ref to the Alert
            className="my-6 bg-green-500/50 text-green-800 border-green-800 [&>svg]:text-green-800"
          >
            <CircleCheck className="h-4 w-4"/>
            <AlertTitle>Job Updated!</AlertTitle>
            <AlertDescription>
              Your job has been successfully updated.
            </AlertDescription>
          </Alert>
        )}

        {/* Conditionally render the error alert */}
        {showErrorAlert && (
          <Alert // Attach the ref to the Alert
            className="my-6" 
            variant="destructive"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Job Update Failed!</AlertTitle>
            <AlertDescription>
              There was an error updating your Job. Please try again.
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
          <Button variant="default" type="submit" className="mt-8">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminJobEdit;
