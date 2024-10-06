import { useState, useEffect } from "react";
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

  const [techStackTitleRef, techStackTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.75,
  });

  const [techIconsRef, techIconsInView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const [projectTitleRef, projectTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getGitDetails();
      setProjects(data);
    };

    fetchProjects();
  }, []);

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
                transition={{ duration: 1 }}
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
                return (
                  // <motion.div
                  //   initial="hidden"
                  //   animate={inView ? "visible" : "hidden"}
                  //   variants={
                  //     index % 2 === 0
                  //       ? floatInFromLeftVariants
                  //       : floatInFromRightVariants
                  //   }
                  //   transition={{ duration: 1 }}
                  // >
                  <Box key={index} sx={{ marginBottom: "50px" }}>
                    <CustomComponent
                      // imageUrl={imageUrl}
                      title={project.name}
                      description={project.description}
                      linkUrl={project.url}
                      isRight={index % 2 === 0}
                    />
                  </Box>
                  // </motion.div>
                );
              })}
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
