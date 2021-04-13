// import logo from "./logo.svg";
import { Button } from "antd-mobile";
import { genReport } from "./utils/index";
// import "./App.css";

function App() {
  return <Button onClick={genReport}>导出</Button>;
}

export default App;
