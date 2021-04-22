import { Header } from '../components/Header'
import { Question } from '../components/Question'
import { Footer } from '../components/Footer'
import { Loader } from '../components/Loader'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid' 
import { ListGroup } from 'react-bootstrap'
import axios from 'axios'
import '../App.css'

export const HomeScreen = ({history}) => {

    
    const [news,setNews] = useState([])

    const apikeys = ['8XrSXUWBhhltVgHSnBCsVEVVFeuCsVs1JeJP19y8JgZGjr3Z','iPow3cfGp7lEOVcLYiQVUB2zb3Xt-jW1HFfIdTkePISomzzU']

    const number = Math.floor(Math.random()*10)

    let api_key

    if(number%2===0){
        api_key = apikeys[1] 
    }
    else{
        api_key = apikeys[0] 
    }

    const getData = async () => {
        const { data } = await axios.get(`https://api.currentsapi.services/v1/latest-news?apiKey=${api_key}`)
        setNews(data.news);
    }

    useEffect(()=>{
        getData()
    },[])
    
    const list = [...Array(10)]
   
    return (
        <div>
            <Header history={history} />
            <div id='homescreen'>
                    {news && news.length===0
                    ?<div id='loader_div_home'>
                        <Loader/>
                    </div>
                    :<>
                        <div id='news_div'>
                            <ListGroup id='news' className='mt-0 py-3'>
                                <ListGroup.Item style={{ borderRadius:50 }} className='pb-0 mb-0 text-center h3 border-0'>
                                    Current News
                                </ListGroup.Item>
                                {news && news.length!==0 ? news.slice(0,11).map(d=>(
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
                            <Question keyword=''/>
                        </div>
                    </>
                    }
            </div>
            <Footer/>
        </div>
    )
}
