import React,{useEffect,useCallback} from "react";
import * as echarts from 'echarts';
import axios from "axios";
console.log('echarts',echarts);



function Home() {
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

  

  const listdata = []
         for(let i = 0 ;i<= states.data.length;i++){
            listdata.push(states.data[i] )
         }
        console.log('listdata[1]',listdata);


  // const titlist = []
  //       let v = 0 
  //     for(let i = 0;i<=9;i++){
        
  //       for(let i in listdata[v]){
  //         titlist.push((listdata[v][i]))
  //       }
  //       v++;
  //       console.log('titlist',titlist);
  //     }
  


  useEffect(() => {getData();}, [getData]);
    useEffect(()=>{
          var myChart = echarts.init(document.getElementById('Home'));

          var option = echarts.init(document.getElementById('rend'));


          const category = ['《NEO II》','《Days Gone》','《战神》','《战争前线》','《Tunche》','《Chivalry 2》','《小缇娜的奇幻之地》']
          const data =['546','654','1456','420','721','605','1022']
          // for(let i =1;i<=12;i++){
          //   category.push(i+'月')
          //   data.push(parseInt(Math.random()*100))
          // }

        
          myChart.setOption({
          title: {
            text: '主要游戏销售数量'
          },
          tooltip: {},
          xAxis: {
            data: category
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: data
            }
          ]
        });
        

        option.setOption( {
          title: {
            text: '游戏销售占比'
          },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['《NEO II》','《Days Gone》','《战神》','《战争前线》','《Tunche》','《Chivalry 2》','《小缇娜的奇幻之地》']
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              emphasis: {
                show: true
              }
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: 546, name: '《NEO II》' },
              { value: 654, name: '《Days Gone》' },
              { value: 1456,name: '《战神》' },
              { value: 420, name: '《战争前线》' },
              { value: 721, name: '《Tunche》' },
              { value: 605, name:'《Chivalry 2》'},
              { value: 1022,name:'《小缇娜的奇幻之地》'}
            ]
          }
        ]
      });



        
        },[])

   return (
   <div>
    <div id='Home' style={{height:500,width:1500}}>home</div>
    <div id='rend' style={{height:500,width:800}}></div>
    </div>
    
  );
}

export default Home;
