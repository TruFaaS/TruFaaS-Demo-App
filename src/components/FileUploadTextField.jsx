import { useState } from "react";
import { TextField } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PropTypes from "prop-types";

const FileUploadTextField = ({ onFileUpload }) => {
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileUpload = () => {
    document.getElementById("file-upload").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFileName(file ? file.name : "");
    onFileUpload(file);
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        name="code"
        id="file-upload"
        type="file"
        accept=".py,.js,"
        onChange={handleFileChange}
      />

      <label htmlFor="file-upload">
        <TextField
          sx={{ mt: "30px" }}
          name="code"
          label="Function Code"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          type="text"
          onMouseDown={handleFileUpload}
          value={selectedFileName}
          inputProps={{ readOnly: true }}
          InputProps={{
            endAdornment: (
              <FileUploadOutlinedIcon
                style={{ cursor: "pointer" }}
                // onClick={handleFileUpload}
              />
            ),
          }}
        />
      </label>
    </>
  );
};

FileUploadTextField.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUploadTextField;
