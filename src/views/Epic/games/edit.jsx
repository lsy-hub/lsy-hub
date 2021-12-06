import React, { useState, useEffect, useCallback } from "react";
import ShareForm from "./from";
import axios from "axios";

function edit(props) {
  const getData = useCallback(async (e) => {
    const id = props.match.params.id;
    const { data } = await axios.get(`http://1.12.227.140:8081/goods/list`);
    const onedata = data.data.filter((item) => {
      return item._id == id;
    });
    const onedatas = onedata[0];
    setStatess({
      data: onedatas,
    });
  }, []);
  const [statess, setStatess] = React.useState({
    data: {},
  });
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <ShareForm data={statess.data} props={props} />
    </div>
  );
}

export default edit;
