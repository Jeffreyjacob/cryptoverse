import React, { useEffect, useState } from 'react';
import {
  MoneyCollectOutlined, DollarCircleOutlined, FundOutlined,
  ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined,
  CheckOutlined, ThunderboltOutlined
} from "@ant-design/icons"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Col, Row, Typography, Select } from 'antd';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import LineCharts from './lineChart';



function CryptoDetail() {

  const { Title, Text } = Typography
  const { coinId } = useParams()
  const [cryptoDetails, setCryptoDetails] = useState([]);
  const [timePeriod, setTimePeriod] = useState('7d');
  const [cryptoHistory,setCryptoHisttory] = useState([]);
  console.log(coinId)
  const baseUrl = "https://coinranking1.p.rapidapi.com";
  const cryptoApiHeaders = {
    'X-RapidAPI-Key': '6dcb047229msh57985dcbe35f491p12e419jsnbc6665d3e85c',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
  useEffect(() => {
    const fetchDetail = async () => {
      const getCoinDetails = await axios.get(`${baseUrl}/coin/${coinId}`, { headers: cryptoApiHeaders })
      setCryptoDetails(getCoinDetails.data?.data.coin)
    }
    const fetchCoinHistory = async ()=>{
      const getCoinHistory = await axios.get(`${baseUrl}/coin/${coinId}/history?timePeriod=${timePeriod}`, { headers: cryptoApiHeaders })
      if (!Array.isArray(getCoinHistory.data?.data)) {
        // Convert the non-array response to an array
        const dataArray = [getCoinHistory.data?.data];
        setCryptoHisttory(dataArray);
      }
        
    }
    fetchDetail()
    fetchCoinHistory()

  }, [])

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name}({cryptoDetails.symbol}) Price
        </Title>
        <p>{cryptoDetails.name}</p> live price in US dollars.
        View value statistics, market cap and supply.
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='select Time Period'
        onChange={(value) => setTimePeriod(value)}
      >
        {
          time.map((date, i) => <option key={i}>{date}</option>)
        }
      </Select>
      {/* line chart */}
        {
          cryptoHistory.map((history,i)=>(
            <LineCharts coinHistory={history} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
          ))
        }
      
 
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-header'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} value statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>

          {
            stats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>
                  {value}
                </Text>
              </Col>

            ))
          }
        </Col>


        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-header'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>

          {
            genericStats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>
                  {value}
                </Text>
              </Col>

            ))
          }
        </Col>


      </Col>

      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details.heading'>
            what is {cryptoDetails.name}
            {typeof cryptoDetails?.description === 'string' ? (
              HTMLReactParser(cryptoDetails.description)
            ) : (
              <p>Description not available</p>
            )}
          </Title>
        </Row>
           
      </Col>
    </Col>
  )
}

export default CryptoDetail

