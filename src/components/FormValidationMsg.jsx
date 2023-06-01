import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

function FormValidationMsg({ msg, mb }) {
  return (
    <>
      <br />
      <Box
        container
        alignItems="center"
        textAlign="start"
        sx={{
          width: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        marginBottom={mb ? mb : 0}
      >
        <Typography variant="body2" color="error.main">
          {msg}
        </Typography>
      </Box>
    </>
  );
}

FormValidationMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  mb: PropTypes.string,
};

export default FormValidationMsg;
