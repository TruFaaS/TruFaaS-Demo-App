import { Box, Link, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "./ToolBar";
import PropTypes from "prop-types";
import { CREATE_OPTION, INVOKE_OPTION } from "../constants";

const rightLink = {
  fontSize: 16,
  ml: 3,
};

export default function AppBar({ page }) {
  let createColor = "common.white";
  let invokeColor = "common.white";
  switch (page) {
    case INVOKE_OPTION:
      createColor = "common.white";
      invokeColor = "secondary.main";
      break;
    case CREATE_OPTION:
      createColor = "secondary.main";
      invokeColor = "common.white";
      break;
    default:
      createColor = "common.white";
      invokeColor = "common.white";
      break;
  }

  return (
    <>
      <MuiAppBar elevation={0} position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Box sx={{ flex: 2 }} flexDirection="column" align="center">
            <Box>
              <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ fontSize: 25, textTransform: "unset" }}
              >
                {"TruFaaS - Trust Verification Framework for FaaS"}
              </Link>
            </Box>
            <Box>
              <Typography variant="h6" color={"secondary.main"} align="center">
                Demo
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              variant="h6"
              underline="none"
              color={createColor}
              href="/create"
              sx={{ ...rightLink }}
            >
              {"Create"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/invoke"
              color={invokeColor}
              sx={{ ...rightLink }}
            >
              {"Invoke"}
            </Link>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </>
  );
}

AppBar.propTypes = {
  page: PropTypes.string.isRequired,
};
