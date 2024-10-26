export const getAllJobs = async () => {
  const res = await fetch("https://techhire-backend-production.up.railway.app/jobs", {
    method: "GET",
  });
  const jobs = await res.json();
  return jobs;
};

export const getJobById = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`https://techhire-backend-production.up.railway.app/jobs/${id}`, {
    method: "GET",
    headers: {
      "Authorization":`Bearer ${token}`,
    },
  });
  const job = await res.json();
  return job;
};

export const createJob = async (job) => {
    const token = await window.Clerk.session.getToken();

    await fetch("https://techhire-backend-production.up.railway.app/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(job),
  });
};

export const getJobsByCompanyId = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`https://techhire-backend-production.up.railway.app/jobs/company/${id}`, {
    method: "GET",
    headers: {
      "Authorization":`Bearer ${token}`,
    },
  });
  const job = await res.json();
  return job;
};

export const deleteJobById = async (id) => {
  const token = await window.Clerk.session.getToken();

  const res = await fetch(`https://techhire-backend-production.up.railway.app/jobs/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete the job");
  }

  return { message: "Job deleted successfully" };
};

export const UpdateJobById = async (job, id) => {
  const token = await window.Clerk.session.getToken();

  await fetch(`https://techhire-backend-production.up.railway.app/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(job),
});
};