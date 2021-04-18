import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import {  Button, Form, ListGroup} from 'react-bootstrap'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { NewsScreen } from '../components/Footer'
import { db } from '../firebase'
import '../App.css'

export const ProfileEditScreen = ({history}) => {
    
    const user = useSelector(selectUser)

    const [name, setName] = useState('')
    const [handle, setHandle] = useState('')
    const [description, setDescription] = useState('')
    const [subjects, setSubjects] = useState([])
    const [profile, setProfile] = useState('')
    
    const [currentUser, setCurrentUser] = useState({})
    const [currentUserId, setCurrentUserId] = useState('')
    
    useEffect(()=>{
        if(user){
            db.collection('queryUsers').where("id","==",user.uid).get().then((docs) => {
                docs.forEach((doc) => {
                    setCurrentUserId(doc.id);
                    setCurrentUser(doc.data())
                })
            })
        }
    },[user,history])

    const submitHandler = (e) => {
        e.preventDefault()
        db.collection('queryUsers').doc(currentUserId).set({
            userName:name!=='' ? name : currentUser.userName,
            userHandle:handle!=='' ? handle : currentUser.userHandle,
            userDescription:description!=='' ? description : currentUser.userDescription,
            subjects:[...currentUser.subjects,...subjects],
            photo:profile.slice(0,4)==='http' ? profile : currentUser.photo
        },{merge:true})
        history.push('/profile')
    }

    return(
        <div>
            <Header/>
            <ListGroup id='edit' className='mx-auto'>
                <Form onSubmit={submitHandler}>
                    <ListGroup.Item className='mx-auto border-0 my-0 pb-1 pt-3' style={{ borderTopRightRadius:150,borderTopLeftRadius:150 }}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control id='edit_form_controls' className='border-0' style={{ borderRadius:150 }} type='name' placeholder={currentUser.userName} onChange={e => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto border-0 my-0 py-1'>
                        <Form.Group>
                            <Form.Label>Handle</Form.Label>
                            <Form.Control id='edit_form_controls' className='border-0' style={{ borderRadius:150 }} type='text' placeholder={currentUser.userHandle} onChange={e => setHandle(e.target.value)}></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto border-0 my-0 py-1'>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control id='edit_form_controls' className='border-0' style={{ borderRadius:10 }} type='text' as='textarea' rows={4} placeholder={currentUser.userDescription} onChange={e => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto border-0 my-0 py-1'>
                        <Form.Group>
                            <Form.Label>Subjects</Form.Label>
                            <Form.Control id='edit_form_controls' className='border-0' style={{ borderRadius:10 }} type='text' as='textarea' rows={3} placeholder='Enter comma separated values' placeholder={currentUser.subjects} onChange={e => setSubjects([...e.target.value.split(',')])}></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto border-0 my-0 py-1'>
                        <Form.Group>
                            <Form.Label>Profile ( Online link only )</Form.Label>
                            <Form.Control id='edit_form_controls' className='border-0' style={{ borderRadius:150 }} type='text' placeholder={currentUser.photo} onChange={e => setProfile(e.target.value)}></Form.Control>
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto border-0 my-0 pt-1 pb-3' style={{ borderBottomRightRadius:150,borderBottomLeftRadius:150 }}>
                        <Button type='submit' id='edit_submit' className='border-0' style={{color:'black', width:'100%', borderRadius:150 }}>Update</Button>
                    </ListGroup.Item>
                </Form>
            </ListGroup>
            <Footer/>
        </div>
        )
}
