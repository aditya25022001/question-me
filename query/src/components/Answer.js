import React, { useEffect, useState } from 'react'
import { Button, ListGroup, Container } from 'react-bootstrap'
import { db, auth } from '../firebase'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase'
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const Answer = ({match, history}) => {

    const [answers,setAnswers] = useState([])
    const [qid,setQid] = useState('')
    const [display,setDisplay] = useState(false)
    const [displayAgain,setDisplayAgain] = useState(false)
    const [message,setMessage] = useState('')

    const user = useSelector(selectUser)

    useEffect(()=>{
        db.collection('questions').doc(match.params.id).get().then((doc)=>{
            if(doc.exists){
                setQid(doc.data().questionsID)
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
        db.collection('answers').orderBy('addedWhen','desc').onSnapshot((snapshot)=>{
            setAnswers(snapshot.docs.filter(doc => doc.data().questionId===qid))
        })
    },[qid,match.params.id])

    const setParagraph = (string) => {
        const final = string.split('<p>')
        const show =  final.map((each,index) => (
            each.startsWith('<a>') && each.endsWith('</a>') ? <a key={index} href={each.slice(3,each.length-4)}>here</a> : <div  key={index}>{each}</div>
        ))
        return show
    }

    const upvote = (identity) => {
        if(!auth.currentUser || !user){
            setDisplay(true)
        }
        else{
            if(identity.data().downVotes.includes(auth.currentUser.uid) && identity.data().downVotes.length!==1){
                setDisplayAgain(true)
                setMessage('Can\'t upvote and downvote at same time')  
            }
            else{
                if(identity.data().upVotes.includes(auth.currentUser.uid)){
                    if(identity.data().upVotes.length===1 && identity.data().downVotes.includes(auth.currentUser.uid) && identity.data().downVotes.length===1){
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote your own answer')
                    }
                    else{
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote twice')   
                    }
                }
                db.collection('answers').doc(identity.id).update({
                    upVotes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                })
            }
        }
    }

    const downvote = (identity) => {
        if(!auth.currentUser || !user){
            setDisplay(true)
        }
        else{
            if(identity.data().upVotes.includes(auth.currentUser.uid) && identity.data().upVotes.length!==1){
                setDisplayAgain(true)
                setMessage('Can\'t upvote and downvote at same time')  
            }
            else{
                if(identity.data().downVotes.includes(auth.currentUser.uid)){
                    if(identity.data().downVotes.length===1 && identity.data().upVotes.includes(auth.currentUser.uid) && identity.data().upVotes.length===1){
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote your own answer')
                    }
                    else{
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote twice')   
                    }
                }
                db.collection('answers').doc(identity.id).update({
                    downVotes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                })
            }
        }
    }

    const closeSnackbar = () => {
        setDisplay(false)
        history.push('/signin')
    }

    const closeSnackbarAgain = () => {
        setDisplayAgain(false)
    }


    return (
        <Container>
        <ListGroup>
        <div className='px-1 mb-3' id='answer_heading'>Answers : {answers && answers.length!==0 ? answers.length : 0}</div>
         {answers && answers.length!==0 && 
            answers.map((answer,index) => (
            <div id='answer_main' key={index}>
                <ListGroup className='mr-3' id='side_votes'>
                    <Button 
                        variant='success' 
                        className='border-0 mb-3 px-3 mr-auto' 
                        id='answer_attributes_button'
                        onClick={e => upvote(answer)}
                        >
                        <div className='text-center'>
                            <div>
                                <ExpandLessIcon/>
                            </div>
                            <div>
                                {answer.data().upVotes && answer.data().upVotes.length-1}
                            </div>
                        </div>
                    </Button>
                    <Button 
                        variant='danger' 
                        className='border-0 mb-3 px-3 mr-auto' 
                        id='answer_attributes_button'
                        onClick={e => downvote(answer)}
                    >
                        <div className='text-center'>
                            <div>
                                {answer.data().downVotes && answer.data().downVotes.length-1}
                            </div>
                            <div>
                                <ExpandMoreIcon/>
                            </div>
                        </div>
                    </Button>
                </ListGroup>
                <ListGroup id='answer' style={{ width:'100%' }}>
                    <ListGroup.Item className='border-0 mb-3' id='answer_attributes'>
                        {answer.data().answerContent && setParagraph(answer.data().answerContent)}
                    </ListGroup.Item>
                    <div style={{ display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Button 
                            variant='success' 
                            className='border-0 ml-auto mr-3' 
                            id='question_upvote_button'
                            onClick={e => upvote(answer)}
                        >
                            <ExpandLessIcon/>
                            {answer.data().upVotes && answer.data().upVotes.length-1}
                        </Button>
                        <Button 
                            variant='danger' 
                            className='border-0 mr-3' 
                            id='question_downvote_button'
                            onClick={e => downvote(answer)}
                        >
                            <ExpandMoreIcon/>
                            {answer.data().downVotes && answer.data().downVotes.length-1}
                        </Button>
                        <ListGroup.Item className='border-0 mb-3' id='question_attributes'>
                            <div style={{ display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                                <Avatar src={answer.data().byUserImage} className='mr-2'/>
                                <div style={{ fontWeight:200, fontSize:12 }}>
                                    <div>Answered by-</div>
                                    <div>{answer.data().byUserName}</div>
                                    <div>{answer.data().addedWhen && answer.data().addedWhen.nanoseconds && Date(answer.data().addedWhen.nanoseconds).slice(4,15)}</div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </div>
                </ListGroup>
            </div>
            ))
         }   
        </ListGroup>
        <Snackbar open={display} autoHideDuration={2000} onClose={closeSnackbar}>
            <Alert variant='filled' severity="error">Please SignIn to vote</Alert>
        </Snackbar>
        <Snackbar open={displayAgain} autoHideDuration={2000} onClose={closeSnackbarAgain}>
            <Alert variant='filled' severity="error">{message}</Alert>
        </Snackbar>
        </Container>
    )
}
