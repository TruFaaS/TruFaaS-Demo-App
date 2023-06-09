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
      <Container
        // maxWidth="sm"
        sx={{
          width: "750px",
        }}
      >
        <Box sx={{ mb: 2, mt: 4 }}>
          <Paper
            background="light"
            sx={{
              py: { xs: 4, md: 6 },
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
