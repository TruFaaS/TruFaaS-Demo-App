import { useForm } from "react-hook-form";
import AppBar from "../components/AppBar";
import { CREATE_OPTION } from "../constants";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormBox from "../components/FormBox";
import FormValidationMsg from "../components/FormValidationMsg";
import { useState } from "react";
import FileUploadTextField from "../components/FileUploadTextField";
import CmdCard from "../components/CmdCard";

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [lang, setLang] = useState("");
  const [fnName, setFnName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleLangSelection = (event) => {
    setLang(event.target.value);
  };

  const updateFnName = (event) => {
    setFnName(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(lang);
    console.log(uploadedFile);
  };

  return (
    <>
      <AppBar page={CREATE_OPTION} />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="fn_name"
            label="Function Name"
            {...register("fnName", {
              required: "This field is required",
            })}
            placeholder="Enter function name"
            variant="outlined"
            color="secondary"
            required
            sx={{ minWidth: "400px" }}
            onChange={updateFnName}
          />
          {errors.fnName && <FormValidationMsg msg={errors.fnName.message} />}
          <FormControl
            required
            sx={{ mt: "30px", minWidth: "400px" }}
            color="secondary"
          >
            <InputLabel id="select-lang-label">Language</InputLabel>
            <Select
              labelId="select-lang-label"
              id="lang-value"
              value={lang}
              label="Language *"
              onChange={handleLangSelection}
              fullWidth
            >
              <MenuItem value={"python"}>Python</MenuItem>
              <MenuItem value={"node"}>JavaScript</MenuItem>
            </Select>
          </FormControl>

          <FileUploadTextField onFileUpload={handleFileUpload} />

          <CmdCard fnName={fnName} env={lang} code={uploadedFile?.name} />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </FormBox>
    </>
  );
}

export default Create;
