import { Grid, Paper, Typography } from "@mui/material";
import FormBox from "./FormBox";
import CustomTypography from "./CustomTypography";
import PropTypes from "prop-types";

function ResultBox({
  statusCode,
  statusText,
  result,
  title,
  macVerification,
  error,
}) {
  return (
    <>
      <FormBox>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTypography variant="h6" gutterBottom marked="center">
              {title}
            </CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              style={{
                backgroundColor: "white",
                padding: "20px",
                textAlign: "start",
              }}
            >
              {error == undefined ? (
                <>
                  <Typography variant="body1" fontWeight="bold">
                    Status Code:{" "}
                  </Typography>
                  <Typography
                    variant="body1"
                    color={
                      statusCode == 200 || statusCode == 201
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {" "}
                    {statusCode + " " + statusText || ""}
                  </Typography>
                  <br />
                  <br />

                  <Typography variant="body1" fontWeight="bold">
                    Resp Body:
                  </Typography>
                  <br />
                  <Typography
                    variant="body1"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {result}
                  </Typography>

                  {macVerification !== null ? (
                    <>
                      <br />

                      <Typography variant="body1" fontWeight="bold">
                        MAC Verification:
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ whiteSpace: "pre-wrap" }}
                        color={
                          macVerification === "true"
                            ? "success.main"
                            : "error.main"
                        }
                        fontWeight="bold"
                      >
                        {"  "}{" "}
                        {macVerification === "true" ? "Successful" : "Failed"}
                      </Typography>
                    </>
                  ) : null}
                </>
              ) : (
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="error"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {error}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </FormBox>
    </>
  );
}

ResultBox.propTypes = {
  statusCode: PropTypes.number.isRequired,
  statusText: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  macVerification: PropTypes.string,
  error: PropTypes.string,
};

ResultBox.defaultProps = {
  macVerification: null, // Set the default value for the 'name' prop
};
export default ResultBox;
