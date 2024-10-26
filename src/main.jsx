import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home/home.page.jsx';
import './index.css';
import RootLayout from './layout/root.layout.jsx';
import JobPage from './pages/jobs/components/job.page.jsx';
import JobsPage from './pages/jobs/jobspage.jsx';
import SignInPage from './pages/sign-in.page.jsx';
import SignUpPage from './pages/sign-up.page.jsx';
import MainLayout from './layout/main.layout.jsx';
import AdminMainLayout from './layout/admin.layout.jsx';
import AdminJobPostsPage from "./pages/admin/jobPosts/admin-job-posts.page";
import AdminJobCreatePage from "./pages/admin/createJob/job-create.page";
import AdminJobPage from "./pages/admin/job/admin-job.page";
import AdminJobApplicationPage from "./pages/admin/jobApplication/admin-job-application.page";
import { ClerkProvider } from '@clerk/clerk-react'
import JobPostsSection from './pages/admin/jobPosts/components/JobPostsSection.jsx';
import DailyChart from './pages/admin/jobApplication/admin-total-applications.jsx';
import AdminJobEdit from './pages/admin/editJob/admin-job-edit.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout/>,
        children: [
          {
            path:"/",
            element: <HomePage />,
          },
          {
            path:"/jobs",
            element: <JobsPage />,
          },
          {
            path:"/job/:id",
            element: <JobPage />,
          },
        ]
      },
      {
        path: "admin",
        element: <AdminMainLayout />,
        children: [
          {
            path: ":companyId",
            element: <AdminJobPostsPage />,
          },
          {
            path: ":companyId/jobs",
            element: <JobPostsSection />,
          },
          {
            path: ":companyId/jobapplications",
            element: <DailyChart />,
          },        
          {
            path: ":companyId/job/create",
            element: <AdminJobCreatePage />,
          },
          {
            path: ":companyId/job/:id",
            element: <AdminJobPage />,
          },
          {
            path: ":companyId/job/:id/application/:applicationId",
            element: <AdminJobApplicationPage />,
          },
          {
            path: ":companyId/job/edit/:id/",
            element: <AdminJobEdit />,
          },
        ],
      },
      {
        path:"/sign-in",
        element: <SignInPage />,
      },
      {
        path:"/sign-up",
        element: <SignUpPage />,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
