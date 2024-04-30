import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import NotificationContainer from "./components/NotificationContainer";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./libs/firebase";
import { useAuthStore } from "./hooks/useAuth";

function App() {

  const { currentUser, isLoading, fetchUserInfo } = useAuthStore()

  console.log("current user", currentUser)

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid as string)
    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo])

  const router = createBrowserRouter([
    {
      path: "/",
      element: !currentUser ? <AuthPage /> : <Navigate to="/chat" />,
    },
    {
      path: "/chat",
      element: currentUser ? <ChatPage /> : <Navigate to="/" />,
    },
  ]);


  return (
    <>
      <div className="w-[90vw] h-[90vh] bg-blue-900/75 backdrop-blur-lg backdrop-saturate-150 rounded-xl p-4">
        {isLoading ? <div>Loading...</div> : (
          <RouterProvider router={router} />
        )}
        <NotificationContainer />
      </div>
    </>
  )
}

export default App
