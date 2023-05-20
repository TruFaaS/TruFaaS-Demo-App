import { styled } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 200,

  [theme.breakpoints.up("md")]: {
    height: 100,
  },
}));

export default Toolbar;
