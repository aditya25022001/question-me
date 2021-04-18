import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
import { db } from '../firebase'

export const News = () => {
    
    const user = useSelector(selectUser)

    const [currentUser,setCurrentUser] = useState({})

    const [news,setNews] = useState([])

    const data = async () => {        
        const data1 = await axios.get(`http://api.mediastack.com/v1/news?access_key=353652bf291628856b51a67b23a1d27b&countries=us&limit=10&languages=en`)
        setNews(data1)
    }

    useEffect(()=>{
        if(user){
            db.collection('queryUsers').where('id','==',user.uid).get().then((docs) => {
                docs.forEach((doc)=>{
                    setCurrentUser(doc.data())
                })
            })
            // data()
        }
    },[user])
    
    console.log(currentUser);
    console.log(news);
    const list = [...Array(10)]
    console.log(list)

    return (
        <ListGroup id='news' className='mt-2 py-5'>
            {Object.keys(news).length!==0 ? news.data.data.map(d=>(
                <ListGroup.Item>
                    <a href={d.url} target="_blank" style={{ textDecoration: 'underline', color:'black'}}>{d.title}</a>
                </ListGroup.Item>
            ))
            :<>{list.map(l=>(
                <ListGroup.Item>
                    <a href='/' style={{ textDecoration: 'underline', color:'black'}}>In publishing and graphic design, Lorem ipsum is a placeholder.</a>
                </ListGroup.Item>
            ))
                }
            </>
            }
        </ListGroup>
    )
}
