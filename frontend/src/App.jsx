import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage.jsx";
import Callpage from "./pages/Callpage.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
  const { isSignedIn, isLoaded } = useAuth();

  console.log('App render - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);

  if (!isLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        backgroundColor: '#121212'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#9333ea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginLeft: '20px', color: 'white' }}>Loading...</p>
      </div>
    );
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
