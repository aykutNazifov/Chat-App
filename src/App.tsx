import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";

function App() {

  const user = false



  const router = createBrowserRouter([
    {
      path: "/",
      element: !user ? <AuthPage /> : <Navigate to="/chat" />,
    },
    {
      path: "/chat",
      element: user ? <ChatPage /> : <Navigate to="/" />,
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
