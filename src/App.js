import React from "react";
import "./styles.css";
import List from "./List";
import MY_ENDLESS_LIST from "./Constants";

export default function App() {
  return (
    <div className="App">
      <List list={MY_ENDLESS_LIST} height={190} />
    </div>
  );
}
