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
        style={{
          height: "50px",
          backgroundColor: "#eeeeee",
          borderColor: "#bbbbbb",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="body1">
            <span style={{ color: "#28282a", fontWeight: "500" }}>
              fission function create
            </span>{" "}
            <span style={{ color: "#828282", fontWeight: "500" }}>--name </span>
            <span style={{ color: "#28282a", fontWeight: "500" }}>
              {functionName}
            </span>{" "}
            <span style={{ color: "#828282", fontWeight: "500" }}>--env </span>{" "}
            <span style={{ color: "#28282a", fontWeight: "500" }}>
              {environment}
            </span>{" "}
            <span style={{ color: "#828282", fontWeight: "500" }}>--code </span>{" "}
            <span style={{ color: "#28282a", fontWeight: "500" }}>
              {codeValue}
            </span>
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
