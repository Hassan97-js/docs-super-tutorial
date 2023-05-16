import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routesData from "./routes";

const { Root, IndexRoute, ErrorPage, Contact, EditContact } = routesData.components;
const { getContactLoader, getContactsLoader } = routesData.loaders;
const {
  createContactAction,
  updateContactAction,
  deleteContactAction,
  addToFavouriteAction
} = routesData.actions;

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContactsLoader,
    action: createContactAction,
    children: [
      {
        index: true,
        element: <IndexRoute />
      },
      {
        path: "contacts/:id",
        element: <Contact />,
        loader: getContactLoader,
        action: addToFavouriteAction
      },
      {
        path: "contacts/:id/edit",
        element: <EditContact />,
        loader: getContactLoader,
        action: updateContactAction
      },
      {
        path: "/contacts/:id/destroy",
        action: deleteContactAction,
        errorElement: <div>Oops! There was an error.</div>
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
  </StrictMode>
);
