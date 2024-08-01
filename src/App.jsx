import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"

import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import Jobs from "./pages/Jobs"
import NotFoundPage from "./pages/NotFoundPage"
import JobPage, { JobLoader } from "./pages/JobPage"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"

function App() {
  // add Job
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })

    console.log(newJob)
  }

  // delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    })
    return
  }
  // Update job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<MainLayout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path='/jobs'
          element={<Jobs />}
        />
        <Route
          path='/add-job'
          element={<AddJobPage addJobSubmit={addJob} />}
        />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={JobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={JobLoader}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
