export const createCompany = async ({company}) => {
    const token = await window.Clerk.session.getToken();
  
    await fetch("https://techhire-backend.vercel.app/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
        company
      }),
    });
}

export const getCompanyById = async ({id}) => {
  const token = await window.Clerk.session.getToken();

  await fetch(`https://techhire-backend.vercel.app/company/${id}`, {
      method: "GET",
      headers: {
        "Authorization":`Bearer ${token}`,
      },
    });
  const data = await res.json();
  return data;
};
