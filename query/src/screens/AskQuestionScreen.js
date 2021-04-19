import React, {useEffect, useState} from 'react'
import { ListGroup, Button, Form } from 'react-bootstrap'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { db } from '../firebase'
import firebase from 'firebase'

export const AskQuestionScreen = ({history}) => {

    const user = useSelector(selectUser)

    const [display, setDisplay] = useState(false)
    const [displayAdded, setDisplayAdded] = useState(false)
    const [title, setTitle] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [question, setQuestion] = useState('')
    const [keywords, setKeywords] = useState('')
    
    if(!user){
        history.push('/')
    }
    
    useEffect(()=>{
        if(user){
            db.collection('queryUsers').where("id","==",user.uid).get().then((docs) => {
                docs.forEach((doc) => {
                    setCurrentUser(doc.data())
                    setCurrentUserId(doc.id);
                })
            })
        }
    },[user,history])

    const postHandler = (e) => {
        e.preventDefault()
        if(title==='' || question==='' || keywords===''){
            setDisplay(true)
        }
        else{
            setDisplay(false)
            const uniqueID = user.uid+Date.now()
            db.collection('questions').add({
                byUserId:user.uid,
                byUserName:currentUser.userName,
                questionsID:uniqueID,
                questionTitle:title,
                questionDescription:question,
                questionKeywords:keywords.split(','),
                addedWhen:firebase.firestore.FieldValue.serverTimestamp()
            }).then(()=>{
                db.collection('queryUsers').doc(currentUserId).set({
                    questions:[...currentUser.questions,uniqueID]
                },{merge:true})
                setDisplayAdded(true)
            })
        }
    }

    const closeSnackbar = () => {
        setDisplay(false)
    }

    const closeSnackbarAdded = () => {
        setDisplayAdded(false)
        history.push('/')
    }

    return (
        <>
        <Header/>
        <ListGroup id='ask' className='mx-auto'>
            <Form onSubmit={postHandler}>
                <ListGroup.Item className='border-0 pt-4 pb-0' style={{ borderTopRightRadius: 150, borderTopLeftRadius: 150 }}>
                    <Form.Group>
                        <Form.Label>Question Title</Form.Label>
                        <Form.Control 
                            id='ask_form_controls' 
                            style={{ borderRadius:150 }} 
                            className='border-0'  
                            type='text' 
                            placeholder='Give a catchy title to your question' 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 py-2'>
                    <Form.Group>
                        <Form.Label>Describe the question</Form.Label>
                        <Form.Control 
                            id='ask_form_controls' 
                            style={{ borderRadius:10 }} 
                            className='border-0' 
                            type='text' 
                            as='textarea' 
                            rows={5} 
                            placeholder='Format it very clean, make your question very easy to understand, use full stops for paragraph change' 
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                        />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 pt-0 pb-3'>
                    <Form.Group>
                        <Form.Label>Keywords ( maximum 3 )</Form.Label>
                        <Form.Control 
                            id='ask_form_controls' 
                            style={{ borderRadius:150 }} 
                            className='border-0' 
                            type='text' 
                            placeholder='Comma separated values, best suited to your question' 
                            value={keywords}
                            onChange={e => setKeywords(e.target.value)}
                        />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='mx-auto border-0 my-0 pt-0 pb-3' style={{ borderBottomRightRadius:150,borderBottomLeftRadius:150 }}>
                        <Button onClick={postHandler} type='submit' id='edit_submit' className='border-0 py-3' style={{color:'black', width:'100%', borderRadius:150 }}>POST</Button>
                </ListGroup.Item>
            </Form>
            <Snackbar open={display} autoHideDuration={2000} onClose={closeSnackbar}>
                <Alert variant='filled' severity="error">All fields are necessary</Alert>
            </Snackbar>
            <Snackbar open={displayAdded} autoHideDuration={2000} onClose={closeSnackbarAdded}>
                <Alert variant='filled' severity="success">Question added successfully</Alert>
            </Snackbar>
        </ListGroup>
        <Footer/>
        </>
    )
}
