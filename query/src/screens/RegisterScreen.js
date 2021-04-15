import React, { useState } from 'react'
import { Button, Form, Image, ListGroup } from 'react-bootstrap'
import '../App.css'

export const RegisterScreen = () => {
   
    const [name,setName] = useState('')
    const [userHandle,setUserHandle] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [cnfPassword,setCnfPassword] = useState('')
    const [profile,setProfile] = useState('')
    const [description,setDescription] = useState('')
   
    return (
        <div id='register_template'>
            <ListGroup id='register' style={{ width:'50vh', borderRadius:25 }}>
                <Form>
                    <ListGroup.Item style={{ fontWeight:540, borderTopRightRadius:150, borderTopLeftRadius:150 }} className='border-0 h5 mb-0'>
                        Enter your credentials
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group controlId='name'>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{borderRadius:150 }}  
                                type='name' 
                                placeholder='Enter your name' 
                                value={name} 
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group controlId='userhandle'>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{borderRadius:150 }} 
                                placeholder="Username"
                                value={userHandle}
                                onChange={e => setUserHandle(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group controlId='email'>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{borderRadius:150 }} 
                                type='email'
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group controlId='password'>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{borderRadius:150 }} 
                                type='password'
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group controlId='cnf-password'>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{borderRadius:150 }} 
                                type='password'
                                placeholder="Re-enter password"
                                value={cnfPassword}
                                onChange={e => setCnfPassword(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group controlId='profile'>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{borderRadius:150 }} 
                                type='text'
                                placeholder="Online photograph link"
                                value={profile}
                                onChange={e => setProfile(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group controlId='description'>
                            <Form.Control
                                className='py-2 border-0'
                                id='form_controls_register'
                                style={{borderRadius:10 }} 
                                type='text'
                                as='textarea'rows={4}
                                placeholder="Description of yourself..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto text-center border-0 mt-0 pt-0 pb-4' style={{ borderBottomRightRadius:50, borderBottomLeftRadius:50  }}>
                        <Button className='py-3' id='form_controls_register_submit' style={{ width:'100%', borderRadius:150, color:'black', backgroundColor:'rgb(247,247,247)', border:0 }} type='submit'>Sign Up</Button>
                        <div className='mt-3' style={{ fontWeight:500, fontSize:'1rem' }}>Already a member? Sign In</div>
                    </ListGroup.Item>
                </Form>
            </ListGroup>
            <div id='image_register_div'>
                <Image src='./logo512.png' id='image_register'/>
                <div>
                    A platform to share knowledge.
                    Have a doubt ? Worry not,
                    Just 'Query' it to the 'Master'
                </div>
            </div>
        </div>
    )
}
