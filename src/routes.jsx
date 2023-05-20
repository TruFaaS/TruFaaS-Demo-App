import { createBrowserRouter } from "react-router-dom";
import Create from "./pages/Create";
import Invoke from "./pages/Invoke";
import Home from "./pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/invoke",
    element: <Invoke />,
  },
]);
export default router;
