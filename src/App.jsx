import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Typography } from "@mui/material";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
};

const App = () => {
  const [resizable, setResizable] = useState(true);

  // Add event listener to check window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setResizable(window.innerWidth > 750); // Set resizable to false if width is smaller than
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

  return (
    <>
      {resizable ? null : (
        <Typography variant="body1" style={overlayStyle}>
          Cannot make the window smaller than this!
        </Typography>
      )}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
