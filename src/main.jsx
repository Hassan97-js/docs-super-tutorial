import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routesData from "./routes";

const { Root, ErrorPage, Contact, EditContact } = routesData.components;
const { getContactLoader, getContactsLoader } = routesData.loaders;
const { createContactAction, updateContactAction } = routesData.actions;

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
        path: "contacts/:id",
        element: <Contact />,
        loader: getContactLoader
      },
      {
        path: "contacts/:id/edit",
        element: <EditContact />,
        loader: getContactLoader,
        action: updateContactAction
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
