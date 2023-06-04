import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function CreateCmdCard({ fnName, env, code }) {
  const functionName = fnName || "{fn-name}";
  const environment = env || "{env}";
  const codeValue = code || "{file-name}";

  return (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        textAlign="start"
        mb="5px"
      >
        <Grid item xs={8}>
          <Typography variant="body1" fontWeight="bold" fontSize={17}>
            Fission-CLI Command
          </Typography>
        </Grid>
      </Grid>

      <Card
        variant="outlined"
        style={{ height: "50px", borderColor: "#ff3366" }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="body1">
            <span style={{ color: "#ff3366" }}>fission function create</span>{" "}
            <span style={{ color: "#A9A9A9" }}>--name </span>
            {functionName} <span style={{ color: "#A9A9A9" }}>--env </span>{" "}
            {environment} <span style={{ color: "#A9A9A9" }}>--code </span>{" "}
            {codeValue}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

CreateCmdCard.propTypes = {
  fnName: PropTypes.string.isRequired,
  env: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};
