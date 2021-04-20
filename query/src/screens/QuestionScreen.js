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

export const QuestionScreen = ({match, history}) => {
    
    const questionId = match.params.id

    const user = useSelector(selectUser)

    const [question,setQuestion] = useState({})
    const [userFromDb,setUserFromDb] = useState({})

    useEffect(()=>{
        db.collection('questions').doc(questionId).get().then((doc)=>{
            if(doc.exists){
                setQuestion(doc.data())
            }
            db.collection('queryUsers').where('id','==',doc.data().byUserId).get().then((docs)=>{
                docs.forEach((doc)=>{
                    setUserFromDb(doc.data())
                })
            })
        })
    },[questionId])

    return (
        <>
        <Header/>
        <Container className='mt-5' style={{ display: 'flex', flexDirection:'row'}} >
            <ListGroup className='mr-3' id='side_votes'>
                <Button variant='success' className='border-0 mb-3 px-3 mr-auto' id='question_attributes_button'>
                    <div className='text-center'>
                        <div>
                            <ExpandLessIcon/>
                        </div>
                        <div>
                            {question.upVotes}
                        </div>
                    </div>
                </Button>
                <Button variant='danger' className='border-0 mb-3 px-3 mr-auto' id='question_attributes_button'>
                    <div className='text-center'>
                        <div>
                            {question.upVotes}
                        </div>
                        <div>
                            <ExpandMoreIcon/>
                        </div>
                    </div>
                </Button>
            </ListGroup>
            <ListGroup>
                <ListGroup.Item className='border-0 mb-1 px-4 py-3 font-weight-bold' id='question_attributes'>{question.questionTitle}</ListGroup.Item>
                <ListGroup.Item className='border-0 my-1 p-2' id='question_attributes'>
                    <b>Keywords : </b>
                    {question.questionKeywords && question.questionKeywords.map((k,index)=>(
                        <Badge key={index} variant='dark' className='p-2 ml-1' style={{ fontSize:15 }}>{k}</Badge>
                    ))}
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mb-3 mt-1 p-4' id='question_attributes'>{question.questionDescription}</ListGroup.Item>
                <div style={{ display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Button variant='success' className='border-0 ml-auto mr-3' id='question_upvote_button'>
                        <ExpandLessIcon/>
                        {question.upVotes}
                    </Button>
                    <Button variant='danger' className='border-0 mr-3' id='question_downvote_button'>
                        <ExpandMoreIcon/>
                        {question.downVotes}
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
        <Footer/>
        </>
    )
}
