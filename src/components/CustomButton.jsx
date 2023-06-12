import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { ThemeContext } from "@emotion/react";

const CustomButton = ({ name, disabled, onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={disabled}
      disableElevation
      sx={{
        borderRadius: ThemeContext.borderRadius, // Adjust the border radius as needed
        margin: "0px",
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

CustomButton.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

CustomButton.defaultProps = {
  disabled: false,
};

export default CustomButton;
