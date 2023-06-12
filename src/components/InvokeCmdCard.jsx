import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function InvokerCmdCard({ fnName, pubKey }) {
  const functionName = fnName || "{fn-name}";
  const publicKey = pubKey || "{invoker-public-key}";

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        textAlign="start"
        mb="5px"
      >
        <Grid item xs={8}>
          <Typography variant="body1" fontWeight="bold" fontSize={17}>
            CURL Command
          </Typography>
        </Grid>
      </Grid>
      <Card
        variant="outlined"
        style={{ height: "70px", backgroundColor: "#eeeeee",
        borderColor: "#bbbbbb", }}
      >
        <CardContent
          style={{ textAlign: "center", height: "100%", overflow: "auto" }}
        >
          {/* curl -X POST -H “Authorization: Bearer INSERT_TOKEN_HERE” \ -F
          “file=@./myFileLocation.txt” \ “http://www.exampleapi.com" */}
          <Typography variant="body1">
            <span style={{ color: "#28282a", fontWeight: "500" }}>curl </span>{" "}
            <span style={{ color: "#828282", fontWeight: "500" }}>-H </span>
            &ldquo;X-Invoker-Public-Key: {publicKey}&rdquo;{"  "}
            <br />
            <span style={{ color: "#28282a", fontWeight: "500" }}>
              {" "}
              http://127.0.0.1:8080/{functionName}
            </span>
            <br />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

InvokerCmdCard.propTypes = {
  fnName: PropTypes.string.isRequired,
  pubKey: PropTypes.string.isRequired,
};
