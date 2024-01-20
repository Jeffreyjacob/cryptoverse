import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';


const { Title } = Typography

const News = ({ simplified}) => {
  const count = simplified ? 6 : 20;
  const [news, SetNews] = useState([]);
  const [cryptoName,setCryptoName] = useState([])
  const baseUrl = "https://cryptocurrency-news2.p.rapidapi.com/v1"
  const cryptoNewsHeader = {
    'X-RapidAPI-Key': '6dcb047229msh57985dcbe35f491p12e419jsnbc6665d3e85c',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
  }
  useEffect(() => {
    const fetchNews = async () => {
      const getNews = await axios.get(`${baseUrl}/coindesk`, { headers: cryptoNewsHeader })
      if (Array.isArray(getNews.data.data)) {
        const selectedNews = getNews.data.data.slice(0, count);
        console.log(selectedNews)
        SetNews(selectedNews);
      }

    }
    const FetchData = async()=>{
      const coinname = await axios.get("https://coinranking1.p.rapidapi.com/coins",{headers:{
        'X-RapidAPI-Key': '6dcb047229msh57985dcbe35f491p12e419jsnbc6665d3e85c',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }})
       setCryptoName(coinname.data?.data.coins)
    }


    fetchNews()
    FetchData()

  }, [news])
  const demoImageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
  return (
    <div>
      <Row gutter={[24, 24]}>
        {
          !simplified && (
            <Col span={24}>
              <Select
                showSearch
                className='select-news'
                placeholder="Select a news category"
                optionFilterProp='chiildren'
                onChange={(value) => SetNews(value)}
                filterOption = {(Input,option) => option.children.toLowerCase().indexOf(Input.toLowerCase()) >= 0}
              >
                <option value="Cryptocurrency">Cryptocurrency</option>
                {cryptoName.map((coin,i)=>(
                   <option value={coin.name} key={i}>{coin.name}</option>
                ))}
              </Select>
            </Col>
          )
        }
        {
          news.map((newsContent, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={newsContent.url} target='_blank' rel='noreferrer'>
                  <div className='news-image-container'>
                    <Title className="news-title" level={5}>{newsContent.title}</Title>
                    <img src={newsContent.thumbnail || demoImageUrl} style={{ width: '120px', height: "100px" }} />
                  </div>
                  <p>
                    {newsContent.description > 100 ? `${newsContent.description.substring(0, 100)}....` : newsContent.description}
                  </p>
                  <div className='provider-container'>
                    <div>
                      <Avatar
                        style={{
                          backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                      />
                    </div>
                    <p>{newsContent.createdAt}</p>
                  </div>
                </a>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default News