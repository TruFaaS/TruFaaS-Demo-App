import AppBar from "../components/AppBar";
import { INVOKE_OPTION } from "../constants";

export default function Invoke() {
  return (
    <>
      <AppBar page={INVOKE_OPTION} />
      <div>invoke</div>
    </>
  );
}
