import AppBar from "../components/AppBar";
import { HOME_OPTION } from "../constants";

function Home() {
  return (
    <>
      <AppBar page={HOME_OPTION} />

      <div>home</div>
    </>
  );
}

export default Home;
