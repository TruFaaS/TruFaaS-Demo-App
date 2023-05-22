import { Box, Container } from "@mui/material";
import Paper from "./Paper";
import PropTypes from "prop-types";

function FormBox(props) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 12 }}>
          <Paper
            background="light"
            sx={{
              py: { xs: 4, md: 8 },
              px: { xs: 3, md: 6 },
              background: "#fff5f8",
            }}
          >
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

FormBox.propTypes = {
  children: PropTypes.node,
};

export default FormBox;
