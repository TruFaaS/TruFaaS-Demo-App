import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { ThemeContext } from "@emotion/react";

const AttackButton = ({ name, disabled }) => {
  return (
    <Button
      variant="outlined"
      color="error"
      disabled={disabled}
      disableElevation
      sx={{
        borderRadius: ThemeContext.borderRadius, // Adjust the border radius as needed
        margin: "0px",
      }}
      type="submit"
    >
      {name}
    </Button>
  );
};

AttackButton.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

AttackButton.defaultProps = {
  disabled: false,
};

export default AttackButton;
