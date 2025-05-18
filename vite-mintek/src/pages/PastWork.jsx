import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";

const projectsContent = {
  title: "Past Work",
  subtitle: "Showcasing innovative solutions that drive real business results",
  projects: [
    {
      title: "Google Sheets Powered Website",
      shortDescription:
        "A dynamic comedy club website powered by Google Sheets, enabling non-technical team members to manage content through spreadsheets.",
      fullDescription: `In 2023, I developed a fully dynamic website for LaaL Button, a rising comedy club and production house based in Toronto. Unlike traditional CMS solutions, this website fetches and renders content directly from Google Sheets, giving non-technical team members full control over everything — from show lineups and performer bios to background images, footers, and more.

        Key Features:
        • Event Listings & Lineups: All shows, dates, venues, and artist details are pulled live from Google Sheets
        • Fully Dynamic Content: From banners to bios, images to footer text — every inch of the site is configurable through a spreadsheet
        • Instant Updates: No rebuilds or logins. Just update the sheet, and the next site visitor sees the changes
        • No Backend Needed: All content is retrieved client-side via the Google Sheets API, keeping the site lightweight and fast
        • User Analytics: Integrated Amplitude to track how users interact with the schedule, lineup, and ticket links

        Impact & Results:
        • Saved the LaaL Button team hours of frustration compared to their old WordPress setup
        • Enabled non-developers to control the website entirely
        • Provided a smoother user experience across devices, resulting in higher engagement
        • Reduced operational overhead — no plugins, no logins, no content freezes

        Technical Challenges:
        Making a spreadsheet behave like a CMS meant accounting for inconsistent data types, missing fields, and load-time errors — all solved through intelligent parsing, data normalization, and fallback logic. Despite having no backend, the site handles rich, dynamic content seamlessly.

        Reflections:
        LaaL Button is a great example of how powerful a no-code/data-driven backend can be when paired with a modern frontend. The creative team was able to ship events quickly without worrying about tech — and I delivered a robust, self-sustaining system that looks and feels great on any device.

        This project represents the kind of practical, clever engineering I love: elegant, low-maintenance, and tailored to the people who use it.`,
      techStack: ["React", "Google Sheets API", "Amplitude"],
      status: "Live",
      githubUrl: null,
      liveUrl: "https://laalbutton.com",
    },
    {
      title: "Map - First Marketplace",
      shortDescription:
        "A map-first parking rental marketplace enabling users to rent out their unused parking spaces, built with modern tech stack and sophisticated mapping integration.",
      fullDescription: `
        In 2024, I designed and built Rent a Parking, a location-based marketplace that lets everyday people rent out their unused driveways, garages, or parking spots. Inspired by platforms like Airbnb, but purpose-built for parking, this app prioritized a map-first user experience, allowing users to explore listings visually and connect directly with space owners.

        Key Features:
        • Map-First UX: Dynamic Mapbox-powered map interface with real-time filter updates
        • Listing Portal for Hosts: Easy-to-use interface for posting parking spaces with detailed information
        • Robust Search & Filters: Advanced filtering system including location proximity and space type
        • Off-Platform Messaging: Streamlined communication between renters and hosts
        • Responsive, Mobile-Optimized Design: Seamless experience across all devices

        Technical Challenges:
        • Complex UI coordination between map events, search filters, and component reactivity
        • Sophisticated state management for data flow between listings and map markers
        • Edge case handling for overlapping listings and geolocation inaccuracies
        • Performance optimization for smooth map interactions

        Impact & Results:
        • 100+ listings across major urban neighborhoods
        • 10 daily active users at its early peak
        • Zero marketing spend — all growth was organic
        • Built with enterprise-grade care and strong foundation for future scaling

        Reflections:
        Rent a Parking represents the pinnacle of my full-stack development capabilities, combining thoughtful architecture, clean code, and strong UX sensibility. The project demonstrates my ability to build sophisticated, production-ready applications that solve real-world problems.
      `,
      techStack: [
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "Mapbox GL JS",
      ],
      status: "Live",
      liveUrl: "http://rentaparking.ca",
    },
    {
      title: "Online Ordering System",
      shortDescription:
        "A fully custom online ordering system with integrated payments, real-time order management, and SMS marketing capabilities.",
      fullDescription: `
        In 2022, I partnered with Airport Sweets and Tandoori a local restaurant in Brampton, Ontario. The restaurant was struggling to find a robust online ordering system for their business. I built a fully custom online ordering system that eliminated third-party commissions and gave the restaurant full control over their digital storefront. This project empowered the business to accept direct payments, manage orders in real-time, and run SMS-based marketing—all with a clean, mobile-first design.

        Key Features:
        • Real-Time Online Ordering: Dynamic menu with cart functionality, order tracking, and payment processing
        • Secure Stripe Integration: Enabled one-time purchases and promo code handling with seamless checkout
        • Customer Behavior Analytics: Leveraged Google call history to track caller frequency and repeat engagement
        • SMS Retargeting Campaigns: Wrote custom scripts to identify top-callers and target them with promotions
        • Admin Dashboard: Allowed staff to manage menu items, view order history, and adjust offers

        Impact & Results:
        • 684 customer calls in November alone, up from an average of 523 prior to October
        • ROI of up to 705% in November, depending on profit-per-order scenario
        • 323 customers placed at least one order, with 18 ordering 3+ times
        • 173 out of 290 orders occurred during promotional periods
        • Loyalty analysis identified 68 customers who ordered 2+ times in one month

        Client Feedback:
        While the restaurant has since closed, the system played a key role in increasing sales during its operational peak. SMS campaigns based on internal call data directly correlated with spikes in order volume during active promotion weeks.

        Reflections:
        This project was a full-cycle solution—from system design to data-driven marketing execution. I particularly enjoyed bridging tech and business strategy, building tools that delivered real results while sharpening my full-stack and analytics capabilities.
      `,
      techStack: [
        "React",
        "Node.js",
        "Express",
        "SQL",
        "Stripe",
        "SMS API",
        "Google Analytics",
      ],
      status: "Completed",
      githubUrl: null,
      liveUrl: null,
    },
  ],
};

const PastWork = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const ProjectDetails = ({ project }) => (
    <Box sx={{ p: 2 }}>
      {/* Status Badge */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          mb: 4,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor:
            project.status === "Completed" ? "success.light" : "info.light",
          color: project.status === "Completed" ? "success.dark" : "info.dark",
          border: "1px solid",
          borderColor:
            project.status === "Completed" ? "success.main" : "info.main",
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor:
              project.status === "Completed" ? "success.main" : "info.main",
            mr: 1,
          }}
        />
        <Typography variant="subtitle2">{project.status}</Typography>
      </Box>

      {/* Project Sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Overview Section */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "background.default",
            border: "1px solid",
            borderColor: "divider",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 4px 20px -5px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::before": {
                content: '""',
                width: 4,
                height: 20,
                bgcolor: "primary.main",
                borderRadius: 1,
              },
            }}
          >
            Overview
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            {project.fullDescription.split("\n\n")[0]}
          </Typography>
        </Box>

        {/* Key Features Section */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "background.default",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::before": {
                content: '""',
                width: 4,
                height: 20,
                bgcolor: "secondary.main",
                borderRadius: 1,
              },
            }}
          >
            Key Features
          </Typography>
          <Grid container spacing={2}>
            {project.fullDescription
              .split("\n\n")
              .find((section) => section.includes("Key Features:"))
              ?.split("\n")
              .filter((line) => line.includes("•"))
              .map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "secondary.main",
                      },
                    }}
                  >
                    <Typography variant="body2">
                      {feature.replace("•", "").trim()}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>

        {/* Impact & Results Section */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "background.default",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::before": {
                content: '""',
                width: 4,
                height: 20,
                bgcolor: "success.main",
                borderRadius: 1,
              },
            }}
          >
            Impact & Results
          </Typography>
          <Grid container spacing={2}>
            {project.fullDescription
              .split("\n\n")
              .find((section) => section.includes("Impact & Results:"))
              ?.split("\n")
              .filter((line) => line.includes("•"))
              .map((result, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "success.main",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {result.replace("•", "").trim()}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>

        {/* Tech Stack Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&::before": {
                content: '""',
                width: 4,
                height: 20,
                bgcolor: "info.main",
                borderRadius: 1,
              },
            }}
          >
            Tech Stack
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {project.techStack.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                variant="outlined"
                color="primary"
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {project.liveUrl && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<OpenInNewIcon />}
              href={project.liveUrl}
              target="_blank"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px -4px rgba(108, 85, 249, 0.3)",
                },
              }}
            >
              View Live
            </Button>
          )}
          {project.githubUrl && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<GitHubIcon />}
              href={project.githubUrl}
              target="_blank"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              View Code
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        py: { xs: 8, md: 16 },
        bgcolor: "background.paper",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {projectsContent.title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto" }}
          >
            {projectsContent.subtitle}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {projectsContent.projects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px -10px rgba(108, 85, 249, 0.2)",
                  },
                }}
                onClick={() => handleProjectClick(project)}
              >
                <CardContent
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box sx={{ mb: "auto" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      {project.shortDescription}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        variant="outlined"
                        color="secondary"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        sx={{
          "& .MuiDialog-paper": {
            m: 2,
            borderRadius: 2,
          },
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            zIndex: 1,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="h2">
            {selectedProject?.title}
          </Typography>
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ color: "text.secondary" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {selectedProject && (
          <Box sx={{ p: 2 }}>
            <ProjectDetails project={selectedProject} />
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default PastWork;
