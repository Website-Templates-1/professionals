import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";

// Secondary pages are code-split so each route ships only its own JS.
// vite-react-ssg awaits these dynamic imports during prerender.
const ServicePage = lazy(() => import("./pages/ServicePage"));
const ServicesIndex = lazy(() => import("./pages/ServicesIndex"));
const CaseStudiesIndex = lazy(() => import("./pages/CaseStudiesIndex"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { services, caseStudies, caseStudyRedirects } from "./config/siteConfig";
import { getAllPosts } from "./config/blog";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      { path: "services", element: <ServicesIndex /> },

      ...services.map((service) => ({
        path: service.slug,
        element: <ServicePage slug={service.slug} />,
      })),

      { path: "case-studies", element: <CaseStudiesIndex /> },
      ...caseStudies.map((study) => ({
        path: `case-studies/${study.slug}`,
        element: <CaseStudyDetail slug={study.slug} />,
      })),

      { path: "blog", element: <BlogIndex /> },
      ...getAllPosts().map((post) => ({
        path: `blog/${post.slug}`,
        element: <BlogPost slug={post.slug} />,
      })),

      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },

      // Legacy path -> canonical case studies URL.
      { path: "past-work", element: <Navigate to="/case-studies" replace /> },

      // Renamed case study slugs -> new canonical URLs.
      ...caseStudyRedirects.map((r) => ({
        path: `case-studies/${r.from}`,
        element: <Navigate to={`/case-studies/${r.to}`} replace />,
      })),

      { path: "*", element: <NotFound /> },
    ],
  },
];
