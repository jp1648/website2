import { useState, useEffect, useRef, useMemo, createRef } from "react";
import "./App.css";
import { ReactTyped } from "react-typed";
import { Container, Typography, Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CursorifyProvider } from "@cursorify/react";
import CustomCursor from "./components/cursor.jsx";
import profilePic from "./assets/profile-pic.png";
import TechnologyGrid from "./components/GridComponent";
import CustomComponent from "./components/ProjectComponent";
import { getGitDetails } from "./services/getGitDetails.js";
const theme = createTheme({
  palette: {
    primary: {
      main: "#00fc00", // Set the primary color
    },
    secondary: {
      main: "#00fc00", // Set the secondary color
    },
  },
  typography: {
    fontFamily: "Press Start 2P",
  },
});

const floatUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const floatInFromRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};
const floatInFromLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

function App() {
  const [projects, setProjects] = useState([]);
  const [inViewProjects, setInViewProjects] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getGitDetails();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const refsById = useMemo(() => {
    const refs = {};
    projects.forEach((item) => {
      refs[item.id] = createRef(null);
    });
    return refs;
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { id } = entry.target.dataset;

          // Only set to true the first time it becomes visible
          if (entry.isIntersecting) {
            setInViewProjects((prev) => ({
              ...prev,
              [id]: true, // Mark the project as viewed
            }));
          }
        });
      },
      { threshold: 0.75 }
    );

    Object.values(refsById).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refsById).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refsById]);

  const [techStackTitleRef, techStackTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.75,
  });

  const [techIconsRef, techIconsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [projectTitleRef, projectTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [experienceTitleRef, experienceTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [experienceDetails, experienceDetailsInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const reactTypedRefDescription = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CursorifyProvider cursor={<CustomCursor />}>
        <Box component="header" className="App-header">
          <motion.header
            initial="hidden"
            animate="visible"
            variants={floatUpVariants}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h1"
              className="title"
              sx={{ fontSize: "100px", textAlign: "center" }}
            >
              Jay Patel
            </Typography>
          </motion.header>
        </Box>
        <Box component="div" className="main-screen">
          <Box
            component="section"
            className="about-me"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "100px",
              marginLeft: "20px",
            }}
          >
            <Box
              className="about-me-text"
              sx={{ marginLeft: "20px", marginTop: "150px", height: "200px" }}
            >
              <motion.h2
                initial="hidden"
                animate="visible"
                variants={floatUpVariants}
                transition={{ duration: 1, delay: 1 }}
              >
                <Typography variant="h2" className="subheader">
                  Driven Problem Solver
                </Typography>
              </motion.h2>

              <Typography
                variant="p"
                className="subheader-text"
                sx={{
                  display: "block",
                  whiteSpace: "normal",
                  maxWidth: "600px",
                  marginTop: "5px",
                  height: "25px",
                }}
              >
                <ReactTyped
                  strings={[
                    "I am a software engineer who likes to build cool web experiences!",
                  ]}
                  typeSpeed={7}
                  loop={false}
                  showCursor={false}
                  startDelay={2000}
                />
              </Typography>

              <Box sx={{ marginTop: "20px" }} className="view-work-button">
                <motion.button
                  initial="hidden"
                  animate="visible"
                  variants={floatUpVariants}
                  transition={{ duration: 1, delay: 2 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    href="#projects"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#00cc00",
                      },
                      "&:focus": {
                        outline: "none",
                        border: "none",
                        boxShadow: "none",
                      },
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize="15px"
                      sx={{ fontFamily: "Tahoma", color: "black" }}
                    >
                      View My Work
                    </Typography>
                  </Button>
                </motion.button>
              </Box>
            </Box>
            <Box
              component="section"
              className="about-me-image"
              sx={{
                marginRight: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
                marginTop: "50px",
              }}
            >
              <motion.img
                initial="hidden"
                animate="visible"
                variants={floatInFromRightVariants}
                transition={{ duration: 1, delay: 1 }}
                src={profilePic}
                style={{
                  width: "400px",
                  height: "400px",
                  borderRadius: "2%",
                }}
              ></motion.img>
            </Box>
          </Box>
          <Box
            component="section"
            className="teck-stack"
            sx={{ marginTop: "250px", textAlign: "center" }}
          >
            <motion.h2
              ref={techStackTitleRef}
              initial="hidden"
              animate={techStackTitleInView ? "visible" : "hidden"}
              variants={floatUpVariants}
              transition={{ duration: 1 }}
            >
              <Typography variant="h2" className="subheader">
                Tech Stack
              </Typography>
            </motion.h2>
            <Box
              component="section"
              className="tech-stack-icons"
              sx={{
                marginTop: "50px",
                marginbottom: "50px",
                textAlign: "center",
                overflow: "visible",
              }}
            >
              <motion.div
                ref={techIconsRef}
                initial="hidden"
                animate={techIconsInView ? "visible" : "hidden"}
                variants={floatUpVariants}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <TechnologyGrid />
              </motion.div>
            </Box>
          </Box>
          <Box
            component="section"
            id="projects"
            className="projects"
            sx={{ marginTop: "250px", textAlign: "center" }}
          >
            <motion.h2
              ref={projectTitleRef}
              initial="hidden"
              animate={projectTitleInView ? "visible" : "hidden"}
              variants={floatUpVariants}
              transition={{ duration: 1 }}
            >
              <Typography variant="h2" className="subheader">
                My Projects
              </Typography>
            </motion.h2>
            <Box
              component="section"
              className="project-list"
              marginTop="50px"
              sx={{
                textAlign: "center",
                overflow: "visible",
              }}
            >
              {projects.map((project, index) => {
                const ref = refsById[project.id];
                const isVisible = inViewProjects[project.id]; // Check if the project is already viewed

                return (
                  <motion.div
                    key={index}
                    ref={ref}
                    data-id={project.id}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"} // Animate only if it's the first time in view
                    variants={
                      index % 2 === 0
                        ? floatInFromRightVariants
                        : floatInFromLeftVariants
                    }
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    <Box sx={{ marginBottom: "50px" }}>
                      <CustomComponent
                        title={project.name}
                        description={project.description}
                        linkUrl={project.url}
                        isRight={index % 2 === 0}
                      />
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
          <Box
            component="section"
            id="experience"
            className="experience-section"
            sx={{ marginTop: "100px", textAlign: "center" }}
          >
            <Box
              component="h1"
              id="experience-title"
              className="experience-title"
              sx={{ textAlign: "center" }}
            >
              <motion.h2
                ref={experienceTitleRef}
                initial="hidden"
                animate={experienceTitleInView ? "visible" : "hidden"}
                variants={floatUpVariants}
                transition={{ duration: 1 }}
                onAnimationComplete={() => {
                  setStartTyping(true);
                }}
              >
                <Typography variant="h2" className="subheader">
                  My Experience
                </Typography>
              </motion.h2>
            </Box>
            <Box sx={{ marginTop: "25px" }}>
              <Typography
                variant="p"
                className="desc-subheader-text"
                sx={{
                  whiteSpace: "normal",
                  maxWidth: "300px",
                  height: "25px",
                }}
              >
                {startTyping && (
                  <ReactTyped
                    strings={[
                      "I’m always diving into tech, soaking up everything from full-stack development to machine learning, data science, and product. Tech is my playground, and I’m stoked to keep making things smarter and better for everyone.",
                    ]}
                    typeSpeed={7}
                    loop={false}
                    showCursor={false}
                  />
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
        <footer className="footer">
          <p>© 2024 Jay's Portfolio | Built with React</p>
        </footer>
      </CursorifyProvider>
    </ThemeProvider>
  );
}

export default App;
