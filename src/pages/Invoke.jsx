import { Box, Grid, TextField, Typography } from "@mui/material";
import AppBar from "../components/AppBar";
import { INVOKE_OPTION, KEY_URL, INVOKE_URL, ATTACK_URL } from "../constants";
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
import AttackButton from "../components/AttackButton";
export default function Invoke() {
  const form1 = useForm();
  const form2 = useForm();

  const [fnName, setFnName] = useState("");
  const [attackFnName, setAttackFnName] = useState("");

  const [reqSent, setReqSent] = useState(false);
  const [statusCode, setStatusCode] = useState("");
  const [statusText, setStatusText] = useState("");
  const [respBody, setRespBody] = useState("");
  const [fetchInvocError, setFetchInvocError] = useState(undefined);
  const [fetchKeyError, setFetchKeyError] = useState(undefined);
  const [attackMsg, setAttackMsg] = useState("");

  const updateFnName = (event) => {
    setFnName(event.target.value);
  };

  const updateAttackFnName = (event) => {
    setAttackFnName(event.target.value);
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

  const runAttack = async () => {
    try {
      if (!attackFnName) {
        throw new Error("Function Name is Empty");
      }

      await fetch(ATTACK_URL + "/" + attackFnName);
      setAttackMsg("Mock Attack Done!!");
      setTimeout(() => {
        setAttackMsg("");
      }, 2000);
    } catch (error) {
      setAttackMsg(error.toString());
      console.error("Error during mock:", error);
      setTimeout(() => {
        setAttackMsg("");
      }, 2000);
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

  const onSubmitInvocation = () => {
    invokeFunction();
  };
  const onSubmitAttack = () => {
    setReqSent(true);
    runAttack();
    setReqSent(false);
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
                <form onSubmit={form1.handleSubmit(onSubmitInvocation)}>
                  <TextField
                    name="fn_name"
                    label="Function Name"
                    {...form1.register("fnName", {
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
                  {form1.errors?.fnName && (
                    <FormValidationMsg msg={form1.errors?.fnName.message} />
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
                  {form1.errors?.invPubKey && (
                    <FormValidationMsg msg={form1.errors?.invPubKey.message} />
                  )}
                  <InvokerCmdCard
                    fnName={fnName}
                    pubKey={invokerKeys.publicKey}
                  />

                  <FormButton
                    sx={{ mt: 2, mb: 2 }}
                    disabled={form1.submitting || reqSent}
                    size="large"
                    color="secondary"
                    fullWidth
                  >
                    {form1.submitting || reqSent
                      ? "In progress…"
                      : "Invoke Function"}
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
          <FormBox>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTypography
                  variant="h6"
                  fontSize={20}
                  gutterBottom
                  marked="center"
                >
                  Mock Attack Scenario
                </CustomTypography>
              </Grid>
              <br />
              <Grid item xs={12}>
                <form onSubmit={form2.handleSubmit(onSubmitAttack)}>
                  <TextField
                    name="attack_fn_name"
                    label="Function Name"
                    {...form2.register("attackfnName", {
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
                    onChange={updateAttackFnName}
                  />
                  {form2.errors?.fnName && (
                    <FormValidationMsg
                      msg={form2.errors?.attackfnName.message}
                    />
                  )}

                  <Box height={20} />

                  <AttackButton name="Mock Attack!" />
                  <Box height={20} />
                  <Typography style={{ fontWeight: "bold" }}>
                    {attackMsg}
                  </Typography>
                </form>
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
