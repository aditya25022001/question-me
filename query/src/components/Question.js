import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { v4 } from 'uuid' 
import { db } from '../firebase'
import FlipMove from 'react-flip-move'

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
                    <ListGroup.Item id='question_element' style={{ borderRadius:10}} key={question.id} className='mb-3 border-0'>
                        {question.data.questionTitle}
                    </ListGroup.Item>
                ))}
            </FlipMove>
        </ListGroup>
    )
}