import { Header } from '../components/Header'
import { Question } from '../components/Question'
import { Footer } from '../components/Footer'
import { Loader } from '../components/Loader'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid' 
import { ListGroup } from 'react-bootstrap'
import axios from 'axios'
import '../App.css'

export const HomeScreen = () => {

    
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
        <div>
            <Header/>
            <div id='homescreen'>
                    {news && Object.keys(news).length!==0
                    ?<div id='loader_div_home'>
                        <Loader/>
                    </div>
                    :<>
                        <div id='news_div'>
                            <ListGroup id='news' className='mt-0 py-3'>
                                <ListGroup.Item style={{ borderRadius:50 }} className='pb-0 mb-0 text-center h3 border-0'>
                                    Current News
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
                        </div>
                        <div id='question_div'>
                            <Question/>
                        </div>
                    </>
                    }
            </div>
            <Footer/>
        </div>
    )
}
