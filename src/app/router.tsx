import { createHashRouter } from "react-router-dom";
import AppShell from "@/App";
import Home from "@/pages/home";
import Ships from "@/pages/ships";
import ShipDetailsPage from "@/pages/shipDetailsPage";
import Experiences from "@/pages/experiences";
import ExperiencesDetailsPage from "@/pages/experiencesDetailsPage";
import Contact from "@/pages/contact";
import Cart from "@/pages/cart";
import CheckoutSuccessPage from "@/pages/checkout";
import NotFoundPage from "@/pages/not-found";

export const router = createHashRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: "ships", element: <Ships /> },
      { path: "ships/:slug", element: <ShipDetailsPage /> },
      { path: "experiences", element: <Experiences /> },
      { path: "experiences/:slug", element: <ExperiencesDetailsPage /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "checkoutSuccess", element: <CheckoutSuccessPage /> },

      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);