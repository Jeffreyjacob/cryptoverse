import React from 'react';
import {Col,Row,Typography} from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Title} = Typography;
const LineCharts = ({currentPrice,ID,coinHistory,coinName}) => {
    const coinPrice = [];
    const coinTimestamp = []

   for( let i = 0; i < coinHistory?.history.length; i+=1){
      coinPrice.push(coinHistory.history[i].price)
      coinTimestamp.push( new Date(coinHistory.history[i].timestamp).toLocaleDateString());
    ;
   }
  
  {/* console.log(coinPrice)
   console.log(coinTimestamp)
   const data = {
     labels: coinTimestamp,
     datasets:[{
        label:"Price in USD",
        data:coinPrice,
        fill:false,
        backgroundColor:"#0071bd",
        borderColor:"#0071bd"
     }]
   }
   
   const options = {
    scales: {
      y: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };*/
}
   
const Data = coinTimestamp.map((timestamp, index) => ({
  name: timestamp,
  uv: coinPrice[index],
}));

  return (
    <div>
       <Row className='chart-header'>
           <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
           <Col className='price-container'>
              <Title level={5} className='price-change'>{coinHistory?.change}</Title>
              <Title level={5} className='current-pricee'>current{coinName} Price: ${currentPrice}</Title>
           </Col>
       </Row>
       
       <LineChart width={1000} height={550} data={Data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      
    </LineChart>

    </div>
  )
}

export default LineCharts;