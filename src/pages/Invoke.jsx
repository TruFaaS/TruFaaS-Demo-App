import { Grid, TextField, Typography } from "@mui/material";
import AppBar from "../components/AppBar";
import { INVOKE_OPTION } from "../constants";
import CustomTypography from "../components/CustomTypography";
import FormBox from "../components/FormBox";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FormValidationMsg from "../components/FormValidationMsg";
import CustomButton from "../components/CustomButton";
import InvokerCmdCard from "../components/InvokeCmdCard";
import FormButton from "../components/FormButton";
import ResultBox from "../components/ResultsBox";
import HeaderBox from "../components/HeaderBox";
export default function Invoke() {
  const {
    register,
    handleSubmit,
    formState: { errors, submitting },
  } = useForm();

  const [fnName, setFnName] = useState("");
  const [reqSent, setReqSent] = useState(false);
  const [statusCode, setStatusCode] = useState("");
  const [statusText, setStatusText] = useState("");
  const [respBody, setRespBody] = useState("");

  const onSubmit = (data) => {
    console.log(data);

    setReqSent(true);
  };

  const updateFnName = (event) => {
    setFnName(event.target.value);
  };

  /*
  avishka
  1. get  the key pair from the api and populate the textfields
  2. invocation and populate the result and headers, change colors if needed refer headerbox and resultbox
  */
  return (
    <>
      <AppBar page={INVOKE_OPTION} />
      <Grid container>
        <Grid item md={6}>
          <FormBox>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTypography
                  variant="h6"
                  gutterBottom
                  marked="center"
                  fontSize={22}
                >
                  Function invocation
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
                    sx={{ minWidth: "400px", marginBottom: "20px" }}
                    onChange={updateFnName}
                  />
                  {errors.fnName && (
                    <FormValidationMsg msg={errors.fnName.message} />
                  )}
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    textAlign="start"
                    sx={{
                      width: "400px",
                      marginBottom: "20px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Grid item xs={8.7}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        fontSize={18}
                      >
                        ECDH key Generation
                      </Typography>
                    </Grid>
                    <Grid item xs={3.3}>
                      <CustomButton name="Generate" />
                    </Grid>
                  </Grid>

                  <TextField
                    name="inv_prv_key"
                    label="Invoker Private Key"
                    {...register("invPrvKey", {})}
                    variant="outlined"
                    color="secondary"
                    sx={{ minWidth: "400px", marginBottom: "20px" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {errors.invPrvKey && (
                    <FormValidationMsg msg={errors.invPrvKey.message} />
                  )}
                  <TextField
                    name="inv_pub_key"
                    label="Invoker Public Key"
                    {...register("invPubKey", {})}
                    variant="outlined"
                    color="secondary"
                    sx={{ minWidth: "400px", marginBottom: "20px" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {errors.invPubKey && (
                    <FormValidationMsg msg={errors.invPubKey.message} />
                  )}
                  <InvokerCmdCard fnName={fnName} pubKey="" />

                  <FormButton
                    sx={{ mt: 2, mb: 2 }}
                    disabled={submitting || reqSent}
                    size="large"
                    color="secondary"
                    fullWidth
                  >
                    {submitting || reqSent ? "In progress…" : "Invoke Function"}
                  </FormButton>
                </form>
              </Grid>
            </Grid>
          </FormBox>
        </Grid>
        <Grid item md={6}>
          <ResultBox
            title="Function Invocation Result"
            statusCode={statusCode}
            statusText={statusText}
            result={respBody.result}
            macVerification={"true"}
          />
          <HeaderBox trustValue="true" macTag="skhsjsh" trufaasPubKey="skhs" />
        </Grid>
      </Grid>
    </>
  );
}
