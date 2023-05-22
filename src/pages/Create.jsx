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

function Create() {
  const [lang, setLang] = useState("");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.name); // You can access the name value here
  };

  return (
    <>
      <AppBar page={CREATE_OPTION} />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="fn_name"
            label="Function Name"
            {...register("name", {
              required: "This field is required",
            })}
            placeholder="Enter your name"
            variant="outlined"
            color="secondary"
            required
            fullWidth
          />
          {errors.name && <FormValidationMsg msg={errors.name.message} />}

          <FormControl required fullWidth sx={{ mt: "30px" }} color="secondary">
            <InputLabel id="select-lang-label">Language</InputLabel>
            <Select
              labelId="select-lang-label"
              id="lang-value"
              value={lang}
              label="Language *"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={"python"}>Python</MenuItem>
              <MenuItem value={"node"}>JavaScript</MenuItem>
            </Select>
          </FormControl>
          {/* get file upload working */}
          <TextField
            sx={{ mt: "30px" }}
            name="code"
            label="Function Code"
            {...register("code", {
              required: "This field is required",
            })}
            placeholder="Enter your name"
            variant="outlined"
            color="secondary"
            required
            fullWidth
            type="file"
          />

          {/* <Button type="submit" variant="contained" color="primary">
            Submit
          </Button> */}
        </form>
      </FormBox>
    </>
  );
}

export default Create;
