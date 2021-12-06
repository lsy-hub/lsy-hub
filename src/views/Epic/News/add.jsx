import React from "react";
import ShareForm from "./from";
import axios from "axios";
function add(props) {
  const data = [];
  return (
    <div>
      <ShareForm data={data} props={props} />
    </div>
  );
}

export default add;
