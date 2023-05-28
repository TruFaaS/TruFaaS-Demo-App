import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function InvokerCmdCard({ fnName, pubKey }) {
  const functionName = fnName || "<fn-name>";
  const publicKey = pubKey || "<pub-key>";

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Card
        variant="outlined"
        style={{ height: "70px", borderColor: "#ff3366" }}
      >
        <CardContent style={{ textAlign: "center" }}>
          {/* curl -X POST -H “Authorization: Bearer INSERT_TOKEN_HERE” \ -F
          “file=@./myFileLocation.txt” \ “http://www.exampleapi.com" */}
          <Typography variant="body1">
            <span style={{ color: "#ff3366" }}>curl </span>{" "}
            <span style={{ color: "#A9A9A9" }}>-H </span>
            &ldquo;X-invoker-publick-key: {publicKey}&rdquo;{"  "}
            <span style={{ color: "#A9A9A9" }}> \ </span>
            <br />
            <span style={{ color: "#ff3366" }}>
              {" "}
              &ldquo;http://127.0.0.1:8080/{functionName}&rdquo;
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
