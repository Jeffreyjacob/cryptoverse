import React, { useEffect, useState } from 'react';
import {Collapse,Row,Col,Typography, Avatar} from  'antd';
import axios from 'axios';
import millify from 'millify';

function Exchanges() {
  const {Panel} =  Collapse;
  const {Text} = Typography;
   const [crytoInfo,setcrytoInfo] = useState([]);
   const baseUrl = "https://coinranking1.p.rapidapi.com";
    const cryptoApiHeaders = {
        'X-RapidAPI-Key': '6dcb047229msh57985dcbe35f491p12e419jsnbc6665d3e85c',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
   useEffect(()=>{
      const fetchData = async ()=>{
          const getcrytoInfo = await axios.get(`${baseUrl}/coins`,{headers:cryptoApiHeaders})
          console.log(getcrytoInfo.data)
          setcrytoInfo(getcrytoInfo.data?.data?.coins)
      }
      fetchData()
   },[])
  return (
    <div>
     <Row>
      <Col span={6}>Exchanges</Col>
      <Col span={6}>24 Trade Volume </Col>
      <Col span={6}>Markets</Col>
      <Col span={6}>Change</Col>
     </Row>
    <Row>
       {
        crytoInfo.map((exchange)=> (
          <Col span={24}>
            <Collapse>
          <Panel
           key={exchange.uuid}
           showArrow={false}
           header = {(
             <Row key={exchange.uuid}>
               <Col span={6}>
                <Text><strong>{exchange.rank}</strong></Text>
                <Avatar className='exchange-image' src={exchange.iconUrl}/>
                <Text>{exchange.name}</Text>
               </Col>
               <Col span={6}>
                <Text>${}</Text>
               </Col>
               <Col span={6}>
                <Text>
                   ${millify(exchange.marketCap)}
                </Text>
               </Col>
               <Col span={6}>
                {exchange.change}%
               </Col>
             </Row>
           )}
          >
             
          </Panel>
           </Collapse>
          </Col>
          
        ))
       }
    </Row>
    </div>
  )
}

export default Exchanges;