import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import { AdminPanel, Createissue, Dashboard, Home , IssueDetails, Login, MyIssues, SignUp, TrackStatus, Unauthorized, UpdateIssue } from '../Pages';
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import AdminPrivateRoute from '../AdminPrivateRoute/AdminPrivateRouter';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/admin",
                element: <AdminPrivateRoute><AdminPanel /></AdminPrivateRoute>
            },
            {
                path: "/my-issues",
                element: <PrivateRoute><MyIssues /></PrivateRoute>
            },
            {
                path: "/post-issue",
                element:<PrivateRoute><Createissue /></PrivateRoute>
            },
            {
                path: "/dashboard",
                element:<AdminPrivateRoute><Dashboard /></AdminPrivateRoute>
            },
            {
                path: "edit-issue/:id",
                element:<PrivateRoute><UpdateIssue /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://help-desk-backend-6ob3.onrender.com/all-issues/${params.id}`)
            },
            {
                path: "/issues/:id",
                element: <IssueDetails />,
            },
            {
                path: "/track-status/:id",
                element: <TrackStatus />,
            },

        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    }
]);

export default router;
