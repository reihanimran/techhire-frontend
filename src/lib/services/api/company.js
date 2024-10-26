export const createCompany = async ({company}) => {
    const token = await window.Clerk.session.getToken();
  
    await fetch("http://localhost:8000/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
        job
      }),
    });
}

export const getCompanyById = async ({id}) => {
  const token = await window.Clerk.session.getToken();

  await fetch(`http://localhost:8000/company/${id}`, {
      method: "GET",
      headers: {
        "Authorization":`Bearer ${token}`,
      },
    });
  const data = await res.json();
  return data;
};
