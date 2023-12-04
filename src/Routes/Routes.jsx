import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/AuthenticateUser/Login";
import Register from "../Pages/AuthenticateUser/Register";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../Pages/Dashboard/AdminPart/ManageUsers/ManageUsers";
import CreateSurvey from "../Pages/Dashboard/SurveyorPart/CreateSurvey/CreateSurvey";
import AllAddedSurveys from "../Pages/Dashboard/SurveyorPart/AllAddedSurveys/AllAddedSurveys";
import ManageSurveysStatus from "../Pages/Dashboard/AdminPart/ManageSurveysStatus/ManageSurveysStatus";
import SurveyDetails from "../Pages/GeneralPages/SurveyDetails";
import SurveyPage from "../Pages/GeneralPages/SurveyPage";
import Pricing from "../Pages/GeneralPages/Pricing";
import Payment from "../Pages/GeneralPages/Payment/Payment";
import AdminRoute from "./AdminRoute";
import PaymentHistory from "../Pages/Dashboard/AdminPart/PaymentHistory/PaymentHistory";
import UpdateCreatedSurvejs from "../Pages/Dashboard/SurveyorPart/UpdateCreatedSurveys/UpdateCreatedSurvejs";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";
import SurveyorRoute from "./SurveyorRoute";
import AdminSurveyResponses from "../Pages/Dashboard/AdminPart/AdminSurveyResponses/AdminSurveyResponses";
import SurveyorSurveyResponses from "../Pages/Dashboard/SurveyorPart/SurveryorSurveyResponses/SurveyorSurveyResponses";
import AdminResponse from "../Pages/Dashboard/SurveyorPart/AdminResponse/AdminResponse";
import UsersResponses from "../Pages/Dashboard/SurveyorPart/UsersResponses/UsersResponses";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/surveydetails/:id",
                element: <PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>
            },
            {
                path: "/surveypage",
                element: <SurveyPage></SurveyPage>
            },
            {
                path: "/pricing",
                element: <PrivateRoute><Pricing></Pricing></PrivateRoute>
            },
            {
                path: "/payment",
                element: <UserRoute><Payment></Payment></UserRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [

            // admin section
            {
                path: "manageusers",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "managesurveys",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "allpaymentdetails",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "manageusers",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "managesurveystatus",
                element: <AdminRoute><ManageSurveysStatus></ManageSurveysStatus></AdminRoute>
            },
            {
                path: "paymenthistory",
                element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
            },
            {
                path: "adminsurveyresponses",
                element: <AdminRoute><AdminSurveyResponses></AdminSurveyResponses></AdminRoute>
            },

            // surveyor section
            {
                path: "createsurvey",
                element: <SurveyorRoute><CreateSurvey></CreateSurvey></SurveyorRoute>
            },
            {
                path: "alladdedsurveys",
                element: <SurveyorRoute><AllAddedSurveys></AllAddedSurveys></SurveyorRoute>
            },
            {
                path: "updatecreatedsurveys/:id",
                element: <SurveyorRoute><UpdateCreatedSurvejs></UpdateCreatedSurvejs></SurveyorRoute>
            },
            {
                path: "surveyorsurveyresponses",
                element: <SurveyorRoute><SurveyorSurveyResponses></SurveyorSurveyResponses></SurveyorRoute>
            },
            {
                path: "adminfeedback",
                element: <SurveyorRoute><AdminResponse></AdminResponse></SurveyorRoute>
            },
            {
                path: "usersfeedback",
                element: <SurveyorRoute><UsersResponses></UsersResponses></SurveyorRoute>
            }
        ]
    }
]);

export default router;