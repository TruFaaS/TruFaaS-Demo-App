import { Grid, Paper, Typography } from "@mui/material";
import FormBox from "./FormBox";
import CustomTypography from "./CustomTypography";
import PropTypes from "prop-types";

function HeaderPaper({ children }) {
  return (
    <Paper
      elevation={0}
      style={{
        backgroundColor: "white",
        padding: "20px",
        textAlign: "start",
        marginBottom: "12px",
      }}
    >
      {children}
    </Paper>
  );
}
HeaderPaper.propTypes = {
  children: PropTypes.any,
};

function HeaderBox({ trustValue, macTag, trufaasPubKey }) {
  return (
    <>
      <FormBox>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTypography variant="h6" gutterBottom marked="center">
              Trust Protocol Headers
            </CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <HeaderPaper>
              <Typography variant="body1" fontWeight="bold">
                Trust Verifcation -
              </Typography>
              <Typography
                variant="body1"
                color={trustValue == "true" ? "success.main" : "error.main"}
                textTransform="uppercase"
              >
                {" "}
                {trustValue}
              </Typography>
            </HeaderPaper>
            <HeaderPaper>
              <Typography variant="body1" fontWeight="bold">
                MAC Tag -
              </Typography>
              <br />
              <Typography
                variant="body1"
                style={{ overflowWrap: "break-word" }}
              >
                {macTag}
              </Typography>
            </HeaderPaper>
            <HeaderPaper>
              <Typography variant="body1" fontWeight="bold">
                TruFaaS Public Key -
              </Typography>
              <br />
              <Typography
                variant="body1"
                style={{ overflowWrap: "break-word" }}
              >
                {trufaasPubKey}
              </Typography>
            </HeaderPaper>
          </Grid>
        </Grid>
      </FormBox>
    </>
  );
}

HeaderBox.propTypes = {
  trustValue: PropTypes.string.isRequired,
  macTag: PropTypes.string.isRequired,
  trufaasPubKey: PropTypes.string.isRequired,
};

export default HeaderBox;
