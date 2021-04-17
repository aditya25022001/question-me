import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import {  Button, Container, Image, Row } from 'react-bootstrap'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { db } from '../firebase'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'
import '../App.css'

export const ProfileScreen = ({history}) => {
    
    const user = useSelector(selectUser)
    
    const [currentUser, setCurrentUser] = useState({})
    
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user){
            db.collection('queryUsers').where("id","==",user.uid).get().then((docs) => {
                docs.forEach((doc) => {
                    setCurrentUser(doc.data())
                })
            })
        }
    },[user,dispatch,history])
    
    return (
        <div>
            <Header/>
            <Container className='mx-auto' id='profile_card'>
                <Row className='border-bottom pb-3 align-items-center'>
                    <Image className='mr-2' src={currentUser.photo} thumbnail/>
                    <div>
                        <div className='mx-auto mt-0' ><span style={{ textDecoration: 'underline'}}>Name</span> : {currentUser.userName}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>User Handle</span> : @{currentUser.userHandle}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Email</span> : {currentUser.userEmail}</div>
                    </div>
                </Row>
                <Row className='border-bottom py-3'>
                    <div><span style={{ textDecoration: 'underline'}}>Info</span> : {currentUser.userDescription ? currentUser.userDescription : 'Casual User'}</div>
                </Row>
                <Row className="border-bottom py-3">
                    <div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Answers</span> : {currentUser.answers ? currentUser.answers : 'Not answered'}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Questions</span> : {currentUser.questions ? currentUser.questions : 'Not asked'}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Subjects</span> : {currentUser.subjects ? currentUser.subjects : 'None'}</div>
                    </div>
                </Row>
                <Row className='border-bottom d-flex justify-content-center py-3 mb-5'>
                        <div id='edit_profile'>
                            <Link to='/profile/edit'>
                                <Button variant='info' className='px-1'><CreateIcon/> Edit Account</Button>
                            </Link>
                        </div>
                    <div><Button variant='danger'><DeleteIcon/> Delete Account</Button></div>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}
