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
                element: <SurveyDetails></SurveyDetails>
            },
            {
                path: "/surveypage",
                element: <SurveyPage></SurveyPage>
            },
            {
                path: "/pricing",
                element: <Pricing></Pricing>
            },
            {
                path: "/payment",
                element: <Payment></Payment>
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
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "allpaymentdetails",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "manageusers",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "managesurveystatus",
                element: <AdminRoute><ManageSurveysStatus></ManageSurveysStatus></AdminRoute>
            },
            {
                path: "paymenthistory",
                element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
            },

            // surveyor section
            {
                path: "createsurvey",
                element: <CreateSurvey></CreateSurvey>
            },
            {
                path: "alladdedsurveys",
                element: <AllAddedSurveys></AllAddedSurveys>
            },
            {
                path: "updatecreatedsurveys/:id",
                element:<UpdateCreatedSurvejs></UpdateCreatedSurvejs>
            }
        ]
    }
]);

export default router;