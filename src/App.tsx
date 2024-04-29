import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";

function App() {

  const user = true



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
      <div className="w-[90vw] h-[90vh] bg-blue-900/75 backdrop-blur-lg backdrop-saturate-150 rounded-xl p-4">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
