import React, { useState, useEffect } from 'react'
import { Button, Container, Form, ListGroup } from 'react-bootstrap'
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import firebase from 'firebase'

export const PostAnswer = ({history, match}) => {

    const [answer,setAnswer] = useState('')
    const [qid,setQid] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [currentUserId, setCurrentUserId] = useState('')

    useEffect(()=>{
        db.collection('questions').doc(match.params.id).get().then((doc)=>{
            if(doc.exists){
                setQid(doc.data().questionsID)
            }
        })
        db.collection('queryUsers').where('id','==',auth.currentUser.uid).get().then((docs)=>{
            docs.forEach((doc)=>{
                setCurrentUser(doc.data())
                setCurrentUserId(doc.id)
            })
        })
    },[match,qid])

    const submitHandler = (e) => {
        const uniqueID = auth.currentUser.uid+Date.now()
        db.collection('queryUsers').doc(currentUserId).set({
            answers:[...currentUser.answers,uniqueID]
        },{merge:true})
        setAnswer('')
        db.collection('answers').add({
            addedWhen:firebase.firestore.FieldValue.serverTimestamp(),
            byUserId:auth.currentUser.uid,
            byUserName:auth.currentUser.displayName,
            answerContent:answer,
            byUserImage:auth.currentUser.photoURL,
            answerID:uniqueID,
            upVotes:[],
            downVotes:[],
            questionId:qid
        })
    }

    return (
        <Container className='my-5'>
            <ListGroup>
                <ListGroup.Item className='border-0 mb-2 d-flex ' id='answer_attributes'>
                    <div>
                        Your Answer
                    </div>
                    <div className='ml-auto'>
                        <Link to='/about' style={{ textDecoration:'none', color:'black' }}>
                            <InfoTwoToneIcon style={{fontSize:20, cursor:'pointer'}} />
                        </Link>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item className='p-0 border-0' id='answer_attributes'>
                    <Form onSubmit={submitHandler}>
                        <Form.Control 
                            id='answer_form_controls'
                            className='border-0'
                            as='textarea' 
                            rows={5} 
                            value={answer} 
                            style={{ borderRadius:25 }}
                            onChange={e=>setAnswer(e.target.value)}
                            placeholder='Your answer goes here, click info icon to know how to write answers'
                        />
                    </Form>
                </ListGroup.Item>
                <Button id='submit_button' className='mt-2 px-5 mr-auto border-0' onClick={e=>submitHandler(e)} type='submit' variant='light'>Post </Button>
            </ListGroup>
        </Container>
    )
}
