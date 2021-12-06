import React, { useCallback, useEffect } from "react";

import { Table, Button, Popconfirm, message } from "antd";
import axios from "axios";

function list(props) {
  const editItem = (id) => {
    console.log("id", id);
    const { history, match } = props;
    history.push(match.path.replace("/list", "") + "/edit/" + id);
  };
  const removeItem = async (id) => {
    const data = await axios.post("http://1.12.227.140:8081/news/delete/", {
      id,
    });
    if (data.status === 200) {
      message.success("删除成功");

      getData();
    }
  };
  const getData = useCallback(async () => {
    const {
      data: { data },
    } = await axios.get("http://1.12.227.140:8081/news/list");

    setStates({
      ...states,
      data,
    });
  }, []);

  const [states, setStates] = React.useState({
    data: [],

    columns: [
      {
        align: "center",
        title: "游戏标题",
        dataIndex: "title",
      },

      {
        title: "操作",
        width: "130px",
        render: (row) => {
          return (
            <>
              <Button
                type="primary"
                size="small"
                onClick={editItem.bind(null, row._id)}
              >
                编辑
              </Button>
              <Popconfirm
                title="是否删除"
                onConfirm={() => {
                  removeItem(row._id);
                }}
                okText="是"
                cancelText="否"
              >
                <Button danger size="small">
                  删除
                </Button>
              </Popconfirm>
              ,
            </>
          );
        },
      },
    ],
  });
  console.log("states", states);
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <Table
        columns={states.columns}
        dataSource={states.data}
        rowkey={states.data._id}
      />
    </div>
  );
}

export default list;
