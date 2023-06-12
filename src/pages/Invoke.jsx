import { Grid, TextField, Typography } from "@mui/material";
import AppBar from "../components/AppBar";
import { INVOKE_OPTION, KEY_URL, INVOKE_URL } from "../constants";
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
  const [fetchInvocError, setFetchInvocError] = useState(undefined);
  const [fetchKeyError, setFetchKeyError] = useState(undefined);

  const updateFnName = (event) => {
    setFnName(event.target.value);
  };

  const [invokerKeys, setInvokerKeys] = useState({
    publicKey: "",
    privateKey: "",
  });

  const fetchInvokerKeys = async () => {
    try {
      const response = await fetch(KEY_URL);
      const data = await response.json();
      setInvokerKeys({
        publicKey: data["public_key"],
        privateKey: data["private_key"],
      });
    } catch (error) {
      setFetchKeyError(error);
      console.error("Error fetching keys:", error);
    }
  };

  const handleNewRequest = () => {
    setStatusCode("");
    setStatusText("");
    setReqSent(true);
    setRespBody("");
    setFetchKeyError(undefined);
    setFetchInvocError(undefined);
  };

  const handleRequestComplete = () => {
    setReqSent(false);
  };

  const invokeFunction = async () => {
    handleNewRequest();
    try {
      const response = await fetch(INVOKE_URL + "/" + fnName, {
        headers: {
          public_key: invokerKeys.publicKey,
          private_key: invokerKeys.privateKey,
        },
      });
      const data = await response.json();
      setRespBody(data);
      setStatusCode(response.status);
      setStatusText(response.statusText);
      console.log(respBody);
    } catch (error) {
      setFetchInvocError(error);
      console.error("Error invoking function:", error);
    }
    handleRequestComplete();
  };

  const onSubmit = () => {
    invokeFunction();
  };

  /*
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
                      pattern: {
                        value: /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
                        message:
                          "Must only contain lowercase alphanumeric characters or '-', and must start and end with an alphanumeric character",
                      },
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

                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    textAlign="start"
                    sx={{
                      width: "400px",
                      marginTop: "30px",
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
                        Key Generation
                      </Typography>
                    </Grid>
                    <Grid item xs={3.3}>
                      <CustomButton
                        name="Generate"
                        onClick={fetchInvokerKeys}
                      />
                    </Grid>
                  </Grid>
                  {fetchKeyError != undefined ? (
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="error.main"
                    >
                      OOPS! Failed to fetch keys. Make sure the API is running.
                    </Typography>
                  ) : (
                    <></>
                  )}
                  <TextField
                    name="inv_prv_key"
                    label="Invoker Private Key"
                    value={invokerKeys.privateKey}
                    variant="outlined"
                    color="secondary"
                    sx={{ minWidth: "400px", marginBottom: "20px" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="inv_pub_key"
                    label="Invoker Public Key"
                    value={invokerKeys.publicKey}
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
                  <InvokerCmdCard
                    fnName={fnName}
                    pubKey={invokerKeys.privateKey}
                  />

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
                {fetchInvocError != undefined ? (
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="error.main"
                  >
                    OOPS! Failed to invoke function. Make sure the API is
                    running.
                  </Typography>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </FormBox>
        </Grid>
        <Grid item md={6}>
          {statusCode == 200 ? (
            <>
              <ResultBox
                title="Function Invocation Result"
                statusCode={statusCode}
                statusText={statusText}
                result={respBody["result"]}
                macVerification={respBody["mac_verification"]}
              />
              <HeaderBox
                trustValue={respBody["trust_verification"]}
                macTag={respBody["mac_tag"]}
                trufaasPubKey={respBody["ex_comp_public_key"]}
              />
            </>
          ) : (
            <>
              <ResultBox
                title="Function Invocation Result"
                statusCode={statusCode}
                statusText={statusText}
                result={respBody["error_msg"]}
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
