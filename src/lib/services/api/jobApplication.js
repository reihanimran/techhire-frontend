export const getJobApplicationsForJob = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`https://techhire-backend-production.up.railway.app/jobApplications?jobId=${id}`, {
    method: "GET",
    headers: {
      "Authorization":`Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const getJobApplicationById = async (id) => {
  const token = await window.Clerk.session.getToken();
  const res = await fetch(`https://techhire-backend-production.up.railway.app/jobApplications/${id}`, {
    method: "GET",
    headers: {
      "Authorization":`Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const createJobApplication = async (jobApplication) => {
    const token = await window.Clerk.session.getToken();
    await fetch("https://techhire-backend-production.up.railway.app/jobApplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`,
      },
      body: JSON.stringify(jobApplication),
    });
  };

  export const getJobApplicationsByCompanyId = async (id) => {
    const token = await window.Clerk.session.getToken();
  
    const res = await fetch(`https://techhire-backend-production.up.railway.app/jobApplications/company/${id}`, {
      method: "GET",
      headers: {
        "Authorization":`Bearer ${token}`,
      },
    });
    const job = await res.json();
    return job;
  };
  