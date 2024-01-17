import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card,Row,Col,Input} from 'antd';
import axios from 'axios';

const Cryptocurrencies = ({simplified})=> {
    const count = simplified ? 10:100;
    const [crypto,setCrypto] = useState([]);
    const [apiData,setApiData] = useState(([]))
    const [searchTerm,setSearchTerm] = useState("");
    const baseUrl = "https://coinranking1.p.rapidapi.com";
    const cryptoApiHeaders = {
        'X-RapidAPI-Key': '6dcb047229msh57985dcbe35f491p12e419jsnbc6665d3e85c',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }

    useEffect(() => {
        const fetchData = async () => {
          const coin = await axios.get(`${baseUrl}/coins?limit=${count}`, { headers: cryptoApiHeaders });
          setApiData(coin.data?.data?.coins);
          setCrypto(coin.data?.data?.coins);
        };
    
        fetchData();
      }, []);
     
      useEffect(() => {
        const filteredData = apiData.filter((coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCrypto(filteredData);
      }, [searchTerm, apiData]);
    
    
  return (
    <>
    <div className='search-crypto'>
       <Input placeholder='Search Crypttocurrency' onChange={(e)=> setSearchTerm(e.target.value)}/>
    </div>
      <Row gutter={[32,32]} className='crypto-card-container'>
         {
            crypto.map((currency)=>(
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                    <Link to={`/crypto/${currency.uuid}`}>
                        <Card title={`${currency.rank}. ${currency.name}`}
                         extra={<img className='crypto-image' src={currency.iconUrl}/>}
                         hoverable
                        >
                           <p>Price: {millify(currency.price)}</p>
                           <p>Market cap: {millify(currency.marketCap)}</p>
                           <p>Daily Change: {millify(currency.change)}%</p>
                        </Card>
                    </Link>
                </Col>
            ))
         }
      </Row> 
    </>
  )
}

export default Cryptocurrencies