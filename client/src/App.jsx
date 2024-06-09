import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import PageLayout from "./layout/PageLayout.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function App() {
  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <Router>
        <PageLayout>
          <Routes>
            {/* PUBLIC */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            
            {/* PRIVATE */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="tasks" element={<HomePage />} />
            </Route>

            Change I made!

            {/* ERROR 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </PageLayout>        
      </Router>
    </>
  );
}

export default App;
