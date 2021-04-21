import React, { useEffect, useState } from 'react'
import { Button, ListGroup, Container } from 'react-bootstrap'
import { db } from '../firebase'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';

export const Answer = ({match}) => {

    const [answers,setAnswers] = useState([])
    const [qid,setQid] = useState('')

    useEffect(()=>{
        db.collection('questions').doc(match.params.id).get().then((doc)=>{
            if(doc.exists){
                setQid(doc.data().questionsID)
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
        db.collection('answers').onSnapshot((snapshot)=>{
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

    //  Execute < a > a b c d < / a >

    return (
        <Container>
        <ListGroup>
        <div className='px-1 mb-3' id='answer_heading'>Answers : {answers && answers.length!==0 ? answers.length : 0}</div>
         {answers && answers.length!==0 && 
            answers.map((answer,index) => (
            <div id='answer_main' key={index}>
                <ListGroup className='mr-3' id='side_votes'>
                    <Button variant='success' className='border-0 mb-3 px-3 mr-auto' id='answer_attributes_button'>
                        <div className='text-center'>
                            <div>
                                <ExpandLessIcon/>
                            </div>
                            <div>
                                {answer.data().upVotes && answer.data().upVotes.length}
                            </div>
                        </div>
                    </Button>
                    <Button variant='danger' className='border-0 mb-3 px-3 mr-auto' id='answer_attributes_button'>
                        <div className='text-center'>
                            <div>
                                {answer.data().downVotes && answer.data().downVotes.length}
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
                        <Button variant='success' className='border-0 ml-auto mr-3' id='question_upvote_button'>
                            <ExpandLessIcon/>
                            {answer.data().upVotes}
                        </Button>
                        <Button variant='danger' className='border-0 mr-3' id='question_downvote_button'>
                            <ExpandMoreIcon/>
                            {answer.data().downVotes}
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
        </Container>
    )
}
