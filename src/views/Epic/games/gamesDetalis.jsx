import React ,{ useCallback, useEffect }from "react";
import { Table,Button, message,Popconfirm,Descriptions} from 'antd'
import axios from "axios";
import Item from "antd/lib/list/Item";

// class gamesDetalis extends React.Component{ 

// const id ='618a1b92b3af506c52df7912'

function gamesDetalis() {
  // const [states,setStates] = useState([])
  const getData = useCallback(async (e) => {
      const {
        data: { data },
      } = await axios.get("http://1.12.227.140:8081/goods/list").then((data) => {
        return data;
      });

      setStates({
        ...states,
        data,
      });
    }, []);




 const [states, setStates] = React.useState({data: [],});
 
//  console.log("states", states);
//  console.log("datalist", (states.data[0]));
// datalist = states.data[0]
// console.log('datalist',datalist);
//  console.log(states.title);
  useEffect(() => {getData();}, [getData]);

  const datalist = []
  for(let i in states.data[0]){
    datalist.push((states.data[0])[i])
  }

  const msg = []
   for(let i in datalist[4]){
    msg.push((datalist[4])[i])
  }

  const img = []
   for(let i in datalist[6]){
    img.push((datalist[6])[i])
  }

  const img1 = []
   for(let i in img[1]){
    img1.push((img[1])[i])
  }

  const img2 = []
   for(let i in img[2]){
    img2.push((img[2])[i])
  }

   const msg1 = []
   for(let i in datalist[5]){
    msg1.push((datalist[5])[i])
  }


  console.log('datalist[4]',datalist[4]);
  console.log('datalist',datalist);
  console.log('msg',(msg[0]));
  console.log('img',img[2]);
  console.log(msg1);
  return (
    <div>
      <div>
          <h4 style={{fontSize:20}}>游戏详情</h4>
      </div>

      <div>
        <p style={{fontSize:30}}>{datalist[1]}</p>
        <p>{datalist[3]}</p>
      </div>
      <div>
        <p style={{fontSize:20,}}>开发商{msg1[0]}</p>
        <p style={{fontSize:20,}}>发行日期{msg1[2]}</p>
        <p style={{fontSize:20,}}>支持平台{msg1[3]}</p>
      </div>
      <div style={{textAlign:"center"}} >
        <img style={{height:500,width:750,padding:20}} src={img1[2]} alt="" />
        <img style={{height:500,width:750,padding:20}} src={img2[2]} alt="" />
      </div>
        
    </div>
  );
}

    // render() {
    // const id = (this.props.location.search).slice(4)
    //     return(
    //     <div>
    //       <h4>商品详情</h4>
    //       {id}
    //     </div>
    //     );
    // }
// }

 export default gamesDetalis;