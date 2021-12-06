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
    const data = await axios.post("http://1.12.227.140:8081/goods/delete/", {
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
    } = await axios.get("http://1.12.227.140:8081/goods/list");

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
        width: "200px",
      },
      {
        align: "center",
        title: "售价",
        dataIndex: "price",
        width: "200px",
        render: (text) => {
          return (
            <>
              {text.originalPrice
                ? "原价 " + text.originalPrice + "￥"
                : "免费"}

              {text.discountPrice === text.originalPrice
                ? ""
                : " / 现价 " +
                  (text.discountPrice ? text.discountPrice + "￥" : "免费")}
            </>
          );
        },
      },
      {
        ellipsis: true,
        align: "center",
        title: "介绍",
        dataIndex: "describe",
      },
      // {
      //   title: "上线时间",
      //   dataIndex: "customAttributes",
      //   width: "140px",
      //   render: (text) => {
      //     return text.Issuedate;
      //   },
      // },
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
      rowkey="_id" 
      onRow={record => {
                  return {
                    onClick: event => {
                    props.history.push(
                    `gamesDetalis?id=${states.data[0]._id}`
                    )
                    console.log('states',states.data[0]._id);
                    }, 
                  };
              }}/>
    </div>
  );
}

export default list;
