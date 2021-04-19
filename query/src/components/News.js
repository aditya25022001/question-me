import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { v4 } from 'uuid' 
import axios from 'axios'

export const News = () => {

    const [news,setNews] = useState([])

    const api_key=process.env.REACT_APP_NEWS_API

    const data = async () => {
        const data1 = await axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}`)
        setNews(data1)
    }

    useEffect(()=>{
        // data()
    },[])
    
    const list = [...Array(10)]

    return (
        <ListGroup id='news' className='mt-0 py-3'>
            <ListGroup.Item style={{ borderRadius:50 }} className='pb-0 mb-0 text-center h3 border-0'>
                Latest News
            </ListGroup.Item>
            {Object.keys(news).length!==0 && news.data.news ? news.data.news.slice(0,11).map(d=>(
                <ListGroup.Item id='news_element' style={{ borderRadius:10 }} key={d.id} className='my-2 border-0'>
                    <a
                        rel='noreferrer noopener'
                        href={d.url} 
                        target="_blank" 
                        style={{ textDecoration: 'underline', color:'black'}}
                    >{d.title}</a>
                </ListGroup.Item>
            ))
            :<>{list.map(l=>(
                <ListGroup.Item key={v4()} id='news_element' style={{ borderRadius:10 }} className='my-2 border-0'>
                    <a href='/' style={{ textDecoration: 'underline', color:'black'}}>In publishing and graphic design, Lorem ipsum is a placeholder.</a>
                </ListGroup.Item>
            ))
                }
            </>
            }
        </ListGroup>
    )
}
