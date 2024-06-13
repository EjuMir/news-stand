import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Layout/Pages/Home/Home";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import AllArticles from "../Layout/Pages/AllArticles/AllArticles";
import Subscription from "../Layout/Pages/Subscription/Subscription";
import AddArticle from "../Layout/Pages/AddArticle/AddArticle";
import MyArticle from "../Layout/Pages/MyArticle/MyArticle";
import PremiumArticles from "../Layout/Pages/PremiumArticles/PremiumArticles";
import UserProfile from "../Layout/Pages/UserProfile/UserProfile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Details from "../Layout/Pages/Details/Details";
import DashBoard from "../Main/DashBoard/DashBoard";
import AllArticlesAdmin from "../Layout/DashboardUtils/AllArticles/AllArticlesAdmin";
import AllUsers from "../Layout/DashboardUtils/AllUsers/AllUsers";
import AllPublishers from "../Layout/DashboardUtils/AllPublishers/AllPublishers";
import AdminRoute from "../PrivateRoute/AdminRoute";
import UpdateProfile from "../Layout/Pages/UpdateProfile/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/allArticle',
        element: <PrivateRoute><AllArticles></AllArticles></PrivateRoute>
      },
      {
        path: '/subscription',
        element: <Subscription></Subscription>
      },
      {
        path:'/addArticle',
        element: <AddArticle></AddArticle>
      },
      {
        path:'/myArticles',
        element: <MyArticle></MyArticle>
      },
      {
        path:'/premiumArticles',
        element: <PremiumArticles></PremiumArticles>
      },
      {
        path:'/userProfile',
        element:<UserProfile></UserProfile>
      },
      {
        path: '/details/:id',
        element:<PrivateRoute><Details></Details></PrivateRoute>
      },
      {
        path: '/updateProfile',
        element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashBoard></DashBoard>,
    children: [
      {
        path : "/dashboard/AllArticles",
        element: <AdminRoute><AllArticlesAdmin></AllArticlesAdmin></AdminRoute>
      },
      {
        path : "/dashboard/AllUsers",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path : "/dashboard/AddPublisher",
        element: <AdminRoute><AllPublishers></AllPublishers></AdminRoute>
      }
    ]
  }
]);