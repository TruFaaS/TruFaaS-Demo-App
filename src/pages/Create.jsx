import { useForm } from "react-hook-form";
import AppBar from "../components/AppBar";
import { CREATE_OPTION, CREATE_URL } from "../constants";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormBox from "../components/FormBox";
import FormValidationMsg from "../components/FormValidationMsg";
import { useState } from "react";
import FileUploadTextField from "../components/FileUploadTextField";
import CreateCmdCard from "../components/CreateCmdCard";
import FormButton from "../components/FormButton";
import CustomTypography from "../components/CustomTypography";
import ResultBox from "../components/ResultsBox";

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors, submitting },
  } = useForm();

  const [lang, setLang] = useState("");
  const [fnName, setFnName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [statusCode, setStatusCode] = useState("");
  const [statusText, setStatusText] = useState("");
  const [reqSent, setReqSent] = useState(false);
  const [respBody, setRespBody] = useState("");

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleLangSelection = (event) => {
    setLang(event.target.value);
  };

  const updateFnName = (event) => {
    setFnName(event.target.value);
  };

  const handleNewRequest = () => {
    setStatusCode("");
    setStatusText("");
    setReqSent(true);
    setRespBody("");
  };

  const handleRequestComplete = () => {
    setReqSent(false);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("fn_name", fnName);
    formData.append("env", lang);
    formData.append("code", uploadedFile);
    handleNewRequest();
    try {
      console.log(CREATE_URL);
      const response = await fetch(CREATE_URL, {
        method: "POST",
        body: formData,
      });

      const responseBody = await response.text();
      setRespBody(JSON.parse(responseBody));
      setStatusCode(response.status);
      setStatusText(response.statusText);

      if (response.status == 201) {
        console.log("Request sent successfully");
      } else {
        console.log("Request failed:", responseBody);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    handleRequestComplete();
  };

  return (
    <>
      <AppBar page={CREATE_OPTION} />

      <Grid container>
        <Grid item md={7}>
          <FormBox>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTypography
                  variant="h6"
                  gutterBottom
                  marked="center"
                  fontSize={22}
                >
                  Function Creation
                </CustomTypography>
              </Grid>
              <Grid item xs={12}>
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
                  {errors.fnName && (
                    <FormValidationMsg msg={errors.fnName.message} />
                  )}
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
                      <MenuItem value={"nodejs"}>JavaScript</MenuItem>
                    </Select>
                  </FormControl>

                  <FileUploadTextField onFileUpload={handleFileUpload} />

                  <CreateCmdCard
                    fnName={fnName}
                    env={lang}
                    code={uploadedFile?.name}
                  />
                  <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    disabled={submitting || reqSent}
                    size="large"
                    color="secondary"
                    fullWidth
                  >
                    {submitting || reqSent ? "In progress…" : "Create Function"}
                  </FormButton>
                </form>
              </Grid>
            </Grid>
          </FormBox>
        </Grid>
        <Grid item md={5}>
          <ResultBox
            title="Function Creation Result"
            statusCode={statusCode}
            statusText={statusText}
            result={respBody.result}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Create;
