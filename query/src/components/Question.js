import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { db } from '../firebase'
import FlipMove from 'react-flip-move'
import { Link } from 'react-router-dom'
import { Loader } from './Loader'

export const Question = ({ keyword }) => {

    const [questions,setQuestions] = useState([])

    useEffect(()=>{
        if(keyword===''){
            db.collection('questions').orderBy('addedWhen','desc').onSnapshot(snapshot=>{
                setQuestions(snapshot.docs.map(doc=>({id:doc.id, data:doc.data()})))
            })
        }
        else{
            db.collection('questions').orderBy('addedWhen','desc').onSnapshot(snapshot=>{
                setQuestions(snapshot.docs.map(doc=>({id:doc.id, data:doc.data()})).filter(each => each.data.questionKeywords.includes(keyword)))
            })
        }
    },[keyword])

    return (
        <ListGroup id='questions' className='mt-0 py-3'>
            <ListGroup.Item style={{ borderRadius:50 }} className='pb-0 mb-2 text-center h3 border-0'>
                Questions
            </ListGroup.Item>
                {questions && questions.length===0 && keyword==='' && <Loader/>}
                {questions && questions.length===0 && keyword!=='' && <h5 style={{ textAlign: 'center', marginTop:'2%'}}>{`No questions found for "${keyword}" search something else instead`}</h5>}    
            <FlipMove>
                {questions && questions.length!==0 && questions.map(question=>(
                    <ListGroup.Item id='question_element' key={question.id} style={{ borderRadius:10}} className='mb-3 border-0'>
                        <Link to={`/question/${question.id}`} style={{ textDecoration:'none', color:'black' }}>
                            {question.data.questionTitle}
                        </Link>
                    </ListGroup.Item>
                ))}
            </FlipMove>
        </ListGroup>
    )
}