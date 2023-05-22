import { useForm } from "react-hook-form";
import AppBar from "../components/AppBar";
import { CREATE_OPTION } from "../constants";
import { Button, TextField } from "@mui/material";

function Create() {
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
      <br />
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
      />
      {errors.name && <div>{errors.name.message}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
}

export default Create;
