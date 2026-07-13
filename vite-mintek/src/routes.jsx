import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import CaseStudiesIndex from "./pages/CaseStudiesIndex";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { services, caseStudies } from "./config/siteConfig";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      ...services.map((service) => ({
        path: service.slug,
        element: <ServicePage slug={service.slug} />,
      })),

      { path: "case-studies", element: <CaseStudiesIndex /> },
      ...caseStudies.map((study) => ({
        path: `case-studies/${study.slug}`,
        element: <CaseStudyDetail slug={study.slug} />,
      })),

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      // Legacy path -> canonical case studies URL.
      { path: "past-work", element: <Navigate to="/case-studies" replace /> },

      { path: "*", element: <NotFound /> },
    ],
  },
];
