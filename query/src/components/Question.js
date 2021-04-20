import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { db } from '../firebase'
import FlipMove from 'react-flip-move'
import { Link } from 'react-router-dom'

export const Question = () => {

    const [questions,setQuestions] = useState([])

    useEffect(()=>{
        db.collection('questions').orderBy('addedWhen','desc').onSnapshot(snapshot=>{
            setQuestions(snapshot.docs.map(doc=>({id:doc.id, data:doc.data()})))
        })
    },[])

    return (
        <ListGroup id='questions' className='mt-0 py-3'>
            <ListGroup.Item style={{ borderRadius:50 }} className='pb-0 mb-2 text-center h3 border-0'>
                Questions
            </ListGroup.Item>
            <FlipMove>
                {questions.length!==0 && questions && questions.map(question=>(
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