// import logo from "./logo.svg";
import { useRef } from "react";
import { Button, InputItem } from "antd-mobile";

import { genReport } from "./utils/index";
// import "./App.css";

function App() {
  const fileInput = useRef(null);

  const handleClick = () => {
    console.log(fileInput.current);
    console.log(fileInput.current.inputRef.inputRef.files[0]);
    const file = fileInput.current.inputRef.inputRef.files[0];
    genReport(file);
  };

  return (
    <div>
      <InputItem type="file" ref={fileInput}></InputItem>
      <Button onClick={handleClick}>导出</Button>
    </div>
  );
}

export default App;
