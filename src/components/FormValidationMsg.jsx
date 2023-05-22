import { Typography } from "@mui/material";
import PropTypes from "prop-types";

function FormValidationMsg({ msg }) {
  return (
    <Typography variant="body2" color="error.main">
      {msg}
    </Typography>
  );
}

FormValidationMsg.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default FormValidationMsg;
