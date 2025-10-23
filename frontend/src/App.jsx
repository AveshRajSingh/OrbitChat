import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage.jsx";
import Callpage from "./pages/Callpage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Loader from "./components/PageLoader.jsx";

export default function App() {
  const { isSignedIn, isLoaded } = useAuth();

  console.log('App render - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);

  if (!isLoaded) {
    return <Loader />; // Show a loading indicator while auth state is loading
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />
          }
        />
        <Route
          path="/auth"
          element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/call/:id"
          element={
            isSignedIn ? <Callpage /> : <Navigate to={"/auth"} replace />
          }
        />
        <Route
          path="*"
          element={
            isSignedIn ? (
              <Navigate to={"/"} replace />
            ) : (
              <Navigate to={"/auth"} replace />
            )
          }
        />
      </Routes>
    </>
  );
}
