import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Layout/Pages/Home/Home";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import ErrorPage from "../ErrorPage/ErrorPage";
import AllArticles from "../Layout/Pages/AllArticles/AllArticles";
import Subscription from "../Layout/Pages/Subscription/Subscription";
import AddArticle from "../Layout/Pages/AddArticle/AddArticle";
import MyArticle from "../Layout/Pages/MyArticle/MyArticle";
import PremiumArticles from "../Layout/Pages/PremiumArticles/PremiumArticles";
import UserProfile from "../Layout/Pages/UserProfile/UserProfile";

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
        element: <AllArticles></AllArticles>
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
      }
    ]
  },
]);