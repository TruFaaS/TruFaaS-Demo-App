import PropTypes from "prop-types";

import Button from "../components/Button";
import defer from "../defer";

function FormButtonComponent(props) {
  const { disabled, mounted, ...others } = props;
  return (
    <Button
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...others}
    />
  );
}

FormButtonComponent.propTypes = {
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
};
const FormButton = defer(FormButtonComponent);
export default FormButton;
