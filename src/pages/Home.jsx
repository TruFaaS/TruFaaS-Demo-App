
import { Typography, Button, Box } from "@mui/material";
import AppBar from "../components/AppBar";
import { HOME_OPTION } from "../constants";

function Home() {
  return (
    <>
      <AppBar page={HOME_OPTION} />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        p={2}
      >
        <Box maxWidth="900px" height="300px" width="100%" p={2} textAlign="center" 
        style={{ backgroundColor: "#fff5f8" }}>
            <Box height="50px" />
          <Typography variant="h4" component="p" style={{ fontWeight: "bold"}}>
            Welcome to TruFaaS Demo!
          </Typography>
          <Box height="20px" />
          <Typography variant="h5" component="h5" style={{ fontWeight: "bold"}}>
            Check Out Our GitHub Organization To Access All Repos
          </Typography>
          <Box height="20px" />
          <Button
            component="a"
            href="https://github.com/orgs/TruFaaS/repositories"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="secondary"
            size="large"
          >
            Open GitHub
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Home;
