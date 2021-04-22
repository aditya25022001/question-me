import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { Container, Badge, ListGroup, Button } from 'react-bootstrap'
import { db, auth } from '../firebase'
import { selectUser } from '../features/userSlice';
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Loader } from '../components/Loader'
import { Answer } from '../components/Answer';
import { PostAnswer } from '../components/PostAnswer';
import firebase from 'firebase'
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const QuestionScreen = ({match, history}) => {
    
    const questionId = match.params.id

    const user = useSelector(selectUser)

    const [question,setQuestion] = useState({})
    const [up,setUp] = useState([])
    const [down,setDown] = useState([])
    const [userFromDb,setUserFromDb] = useState({})
    const [display,setDisplay] = useState(false)
    const [displayAgain,setDisplayAgain] = useState(false)
    const [message,setMessage] = useState('')

    useEffect(()=>{
        db.collection('questions').doc(questionId).get().then((doc)=>{
            if(doc.exists){
                setQuestion(doc.data())
                setUp(doc.data().upVotes)
                setDown(doc.data().downVotes)
            }
            db.collection('queryUsers').where('id','==',doc.data().byUserId).get().then((docs)=>{
                docs.forEach((doc)=>{
                    setUserFromDb(doc.data())
                })
            })
            .catch(err=>{
                console.log(err.message);
            })      
        })
        .catch(err=>{
            console.log(err.message);
        })      
    },[questionId,question])

    const upvote = () => {
        if(!auth.currentUser && !user){
            setDisplay(true)
        }
        else{
            if(down.includes(auth.currentUser.uid) && down.length!==1){
                setDisplayAgain(true)
                setMessage('Can\'t upvote and downvote at same time')                 
            }
            else{
                if(up.includes(auth.currentUser.uid)){
                    if(up.length===1 && down.includes(auth.currentUser.uid) && down.length===1){
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote your own question')
                    }
                    else{
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote twice')   
                    }
                }
                db.collection('questions').doc(questionId).update({
                    upVotes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                })
            }
        }
    }

    const downvote = () => {
        if(!auth.currentUser && !user){
            setDisplay(true)  
        }
        else{
            if(up.includes(auth.currentUser.uid) && up.length!==1){
                setDisplayAgain(true)
                setMessage('Can\'t upvote and downvote at same time')  
            }
            else{
                if(down.includes(auth.currentUser.uid)){
                    if(down.length===1 && up.includes(auth.currentUser.uid) && up.length===1){
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote your own question')
                    }
                    else{
                        setDisplayAgain(true)
                        setMessage('Cannot Upvote or Downvote twice')   
                    }
                }
                db.collection('questions').doc(questionId).update({
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
        <>
        <Header/>
        {userFromDb && Object.keys(userFromDb).length===0
        ?<Loader/>
        :<>
        <Container className='mt-5' style={{ display: 'flex', flexDirection:'row'}} >
            <ListGroup className='mr-3' id='side_votes'>
                <Button 
                    variant='success' 
                    className='border-0 mb-3 px-3 mr-auto' 
                    id='question_attributes_button'
                    onClick={e=>upvote()}
                >
                    <div className='text-center'>
                        <div>
                            <ExpandLessIcon/>
                        </div>
                        <div>
                            {question.upVotes && question.upVotes.length-1}
                        </div>
                    </div>
                </Button>
                <Button 
                    variant='danger' 
                    className='border-0 mb-3 px-3 mr-auto' 
                    id='question_attributes_button'
                    onClick={e=>downvote()}
                >
                    <div className='text-center'>
                        <div>
                            {question.downVotes && question.downVotes.length-1}
                        </div>
                        <div>
                            <ExpandMoreIcon/>
                        </div>
                    </div>
                </Button>
            </ListGroup>
            <ListGroup style={{ width:'100%' }}>
                <ListGroup.Item className='border-0 mb-1 px-4 py-3 font-weight-bold' id='question_attributes'>{question.questionTitle}</ListGroup.Item>
                <ListGroup.Item className='border-0 my-1 p-2' id='question_attributes'>
                    <b>Keywords : </b>
                    {question.questionKeywords && question.questionKeywords.map((k,index)=>(
                        <Badge key={index} variant='dark' className='p-2 ml-1' style={{ fontSize:15 }}>{k}</Badge>
                    ))}
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mb-3 mt-1 p-4' id='question_attributes'>{question.questionDescription}</ListGroup.Item>
                <div style={{ display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Button 
                        variant='success' 
                        className='border-0 ml-auto mr-3' 
                        id='question_upvote_button'
                        onClick={e=>upvote()}
                    >
                        <ExpandLessIcon/>
                        {question.upVotes && question.upVotes.length-1}
                    </Button>
                    <Button 
                        variant='danger' 
                        className='border-0 mr-3' 
                        id='question_downvote_button'
                        onClick={e=>downvote()}
                    >
                        <ExpandMoreIcon/>
                        {question.downVotes && question.downVotes.length-1}
                    </Button>
                    <ListGroup.Item className='border-0 mb-3' id='question_attributes'>
                        <div style={{ display: 'flex', flexDirection:'row', alignItems: 'center'}}>
                            <Avatar src={userFromDb.photo} className='mr-2'/>
                            <div style={{ fontWeight:200, fontSize:12 }}>
                                <div>Asked by-</div>
                                <div>{question.byUserName}</div>
                                <div>{question.addedWhen && question.addedWhen.nanoseconds && Date(question.addedWhen.nanoseconds).slice(4,15)}</div>
                            </div>
                        </div>
                    </ListGroup.Item>
                </div>
            </ListGroup>
        </Container>
        <Answer match={match} history={history}/>
        {user && auth.currentUser &&  <PostAnswer match={match}/>}
        </>
        }
        <Snackbar open={display} autoHideDuration={2000} onClose={closeSnackbar}>
            <Alert variant='filled' severity="error">Please SignIn to vote</Alert>
        </Snackbar>
        <Snackbar open={displayAgain} autoHideDuration={2000} onClose={closeSnackbarAgain}>
            <Alert variant='filled' severity="error">{message}</Alert>
        </Snackbar>
        <Footer/>
        </>
    )
}
