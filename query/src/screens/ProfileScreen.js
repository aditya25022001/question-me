import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import {  Button, Container, Image, Row } from 'react-bootstrap'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { auth, db } from '../firebase'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'
import '../App.css'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

export const ProfileScreen = ({history}) => {
    
    const user = useSelector(selectUser)

    if(!user){
        history.push('/')
    }
    
    const [currentUser, setCurrentUser] = useState({})
    const [currentUserId, setCurrentUserId] = useState()
    const [display, setDisplay] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    
    const dispatch = useDispatch()

    const deleteHandler = (e) => {
        db.collection('queryUsers').doc(currentUserId).delete();
        auth.currentUser.delete().then(()=>{
            setDisplay(true)
        })
        .catch(err => {
            setDisplayError(true)
        })
    }
    
    console.log(currentUserId);
    
    useEffect(()=>{
        if(user){
            db.collection('queryUsers').where("id","==",user.uid).get().then((docs) => {
                docs.forEach((doc) => {
                    setCurrentUser(doc.data())
                    setCurrentUserId(doc.id)
                })
            })
        }
    },[user,dispatch,history])
    
    const closeSnackbar = () => {
        setDisplay(false)
        history.push('/')
    }

    const closeSnackbarError = () => {
        setDisplayError(false)
        history.push('/profile')
    }
    
    return (
        <div>
            <Header/>
            <Container className='mx-auto' id='profile_card'>
                <Row className='border-bottom pb-3 align-items-center'>
                    {currentUser.photo && currentUser.photo!=='' && currentUser.photo.slice(0,4)==='http'
                    ?<Image className='mr-2 mb-2' src={currentUser.photo} thumbnail/>
                    :<Image className='mr-2 mb-2' src='https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg' style={{ width:'40%' }} thumbnail/>
                    }
                    <div>
                        <div className='mx-auto mt-0' ><span style={{ textDecoration: 'underline'}}>Name</span> : {currentUser.userName}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>User Handle</span> : @{currentUser.userHandle}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Email</span> : {currentUser.userEmail}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Country</span> : {currentUser.country && currentUser.country[0].toUpperCase()+currentUser.country.slice(1,)}</div>
                    </div>
                </Row>
                <Row className='border-bottom py-3'>
                    <div><span style={{ textDecoration: 'underline'}}>Info</span> : {currentUser.userDescription ? currentUser.userDescription : 'Casual User'}</div>
                </Row>
                <Row className="border-bottom py-3">
                    <div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Answers</span> : {currentUser.answers ? currentUser.answers : 'Not answered'}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Questions</span> : {currentUser.questions && currentUser.questions.length!==0 ? currentUser.questions.length : 'Not asked'}</div>
                        <div className='mt-0'><span style={{ textDecoration: 'underline'}}>Subjects</span> :
                            {currentUser.subjects && currentUser.subjects.length!==0 
                            ? currentUser.subjects.map(subject => (
                                <li style={{ textDecoration:'none' }}>{subject}</li>
                            ))
                            : <span>None</span>
                            }
                        </div>
                    </div>
                </Row>
                <Row className='border-bottom d-flex justify-content-center py-3 mb-5'>
                        <div id='edit_profile'>
                            <Link to='/profile/edit'>
                                <Button variant='info' className='px-1'><CreateIcon/> Edit Account</Button>
                            </Link>
                        </div>
                    <div><Button variant='danger' onClick={deleteHandler}><DeleteIcon/> Delete Account</Button></div>
                </Row>
                <Snackbar open={display} autoHideDuration={2000} onClose={closeSnackbar}>
                    <Alert variant='filled' severity="success">Account deleted successfully</Alert>
                </Snackbar>
                <Snackbar open={displayError} autoHideDuration={2000} onClose={closeSnackbarError}>
                    <Alert variant='filled' severity="error">Error deleting account</Alert>
                </Snackbar>
            </Container>
            <Footer/>
        </div>
    )
}
