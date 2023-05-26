import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { ThemeContext } from "@emotion/react";

const CustomButton = ({ name, disabled }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={disabled}
      disableElevation
      sx={{
        borderRadius: ThemeContext.borderRadius, // Adjust the border radius as needed
        color: "white",
        backgroundColor: "#ff3366",
        margin: "0px",
      }}
    >
      {name}
    </Button>
  );
};

CustomButton.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

CustomButton.defaultProps = {
  disabled: false,
};

export default CustomButton;
