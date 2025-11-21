import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import Root from "../Root";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Departments from "../pages/Departments/Departments";
import Contact from "../pages/Contact/Contact";
import Signup from "../pages/Auth/Signup/Signup";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Profile from "../pages/Profile/Profile";
import AllNotices from "../pages/AllNotices/AllNotices";
import AllUsers from "../pages/AllUsers/AllUsers";
import AdminRoute from "../components/AdminRoute/AdminRoute";
import PostNotice from "../pages/PostNotice/PostNotice";
import ViewNotice from "../pages/ViewNotice/ViewNotice";
import SavedNotice from "../pages/SavedNotice/SavedNotice";
import EditAdminPostedNotice from "../pages/PostNotice/EditAdminPostedNotice";
import TutionFees from "../pages/TutionFees/TutionFees";
import SetTutionFees from "../pages/SetTutionFees/SetTutionFees";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentDashboard from "../pages/Dashboard/StudentDashboard/StudentDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import ProfileUpdate from "../pages/ProfileUpdate/ProfileUpdate";
import ContactMessage from "../pages/ContactMessage/ContactMessage";
import ViewMessage from "../pages/ViewMessage/ViewMessage";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import StudentPaymentHistory from "../components/StudentPaymentHistory/StudentPaymentHistory";
import Results from "../pages/Results/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "student",
            element: <StudentDashboard></StudentDashboard>,
            children: [
              {
                path: "savedNotices",
                element: <SavedNotice></SavedNotice>,
              },
              {
                path: "profile",
                element: <Profile></Profile>,
              },
              {
                path: "tution-fees",
                element: <TutionFees></TutionFees>,
              },
              {
                path: "payment-history",
                element: <StudentPaymentHistory></StudentPaymentHistory>,
              }, {
                path: 'results',
                element: <Results></Results>
              }
            ],
          },
          {
            path: "admin",
            element: (
              <AdminRoute>
                <AdminDashboard></AdminDashboard>
              </AdminRoute>
            ),
            children: [
              {
                path: "savedNotices",
                element: <SavedNotice></SavedNotice>,
              },
              {
                path: "profile",
                element: <Profile></Profile>,
              },
              {
                path: "set-tution-fees",
                element: <SetTutionFees></SetTutionFees>,
              },
              {
                path: "all-users",
                element: <AllUsers></AllUsers>,
              },
              {
                path: "contact-message",
                element: <ContactMessage></ContactMessage>,
              },
              {
                path: "payment-history",
                element: <PaymentHistory></PaymentHistory>,
              },
            ],
          },
        ],
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "departments",
        element: <Departments></Departments>,
      },
      {
        path: "all-notices",
        element: <AllNotices></AllNotices>,
      },
      {
        path: "/view-notice/:id",
        element: <ViewNotice></ViewNotice>,
      },
      {
        path: "view-message/:id",
        element: <ViewMessage></ViewMessage>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/update",
        element: (
          <PrivateRoute>
            <ProfileUpdate></ProfileUpdate>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/post-notice",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <PostNotice></PostNotice>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-notice/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <EditAdminPostedNotice></EditAdminPostedNotice>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/saved-notice",
        element: (
          <PrivateRoute>
            <SavedNotice></SavedNotice>
          </PrivateRoute>
        ),
      },
      {
        path: "/tution-fees",
        element: (
          <PrivateRoute>
            <TutionFees></TutionFees>
          </PrivateRoute>
        ),
      },
      {
        path: "/set-tution-fee",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SetTutionFees></SetTutionFees>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-failed",
        element: (
          <PrivateRoute>
            <PaymentFailed></PaymentFailed>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
