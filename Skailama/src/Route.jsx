import { createBrowserRouter } from "react-router-dom";
import CreateProject from "./pages/CreateProject";
import ProjectList from "./pages/ProjectList";
import ProjectDetails from "./pages/ProjectDetails";
import AccountSettings from "./pages/AccountSettings";
import WidgetGeneral from "./pages/WidgetGeneral";
import EditDescription from "./pages/EditDescription";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateProject />
  },
  {
    path: "/projects",
    element: <ProjectList />
  },
  {
    path: "/project-details",
    element: <ProjectDetails />
  },
  {
    path:'/widget-configuration',
    element:<WidgetGeneral/>
  },
  {
    path:'/edit_description/:fileId',
    element:<EditDescription/>
  },
  {
    path:"/account-settings",
    element:<AccountSettings/>

  }
]);
