import React from "react";

import { Routes, Route } from "react-router-dom";

import IndexPage from "./pages/Index.page";
import MoviesPage from "./pages/movies/Movies.page";
import SavedMoviesPage from "./pages/movies/SavedMovies.page";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/Signup.page";
import NotFoundPage from "./pages/Notfound.page";
import ProfilePage from "./pages/Profile.page";
import ProtectedView from "./components/ProtectedView/ProtectedView";
import {useAuth} from "./components/AuthProvider/AuthProvider";



const RoutesList = [
  {path: '/', pageComponent: <IndexPage />, isPublicPage: false},

  {path: '/profile', pageComponent: <ProfilePage />, isPublicPage: true},

  // Auth
  {path: '/sign-in', pageComponent: <SignInPage />, isPublicPage: false},
  {path: '/sign-up', pageComponent: <SignUpPage />, isPublicPage: false},

  // Movies
  {path: '/movies', pageComponent: <MoviesPage />, isPublicPage: true},
  {path: '/movies-saved', pageComponent: <SavedMoviesPage />, isPublicPage: true},

  {path: '*', pageComponent: <NotFoundPage />, isPublicPage: false},
]



export default function Routing() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Routes>
        {
          RoutesList.map(i => (
              <Route
                key={i.path}
                path={i.path}
                element={
                <ProtectedView isPublicPage={i.isPublicPage} isLoggedIn={isLoggedIn}>
                  {i.pageComponent}
                </ProtectedView>}
              />
          ))
        }
      </Routes>
    </>
  )
}
