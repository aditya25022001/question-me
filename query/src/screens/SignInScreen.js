import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React, { useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css'
import { login } from '../features/userSlice'
import { auth } from '../firebase'

export const SignInScreen = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')
    const [display,setDisplay] = useState(false)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then(userAuth => {
            setDisplay(false)
            setMessage('')
            dispatch(login({
                email:userAuth.user.email,
                uid:userAuth.user.uid,
                displayName:userAuth.user.displayName,
                photoUrl:userAuth.user.profileURL
            }))
            history.push('/')
        })
        .catch(error => {             
            setDisplay(true)
            setMessage(error.message)
        })
    }

    const closeSnackbar = () => {
        setDisplay(false)
    }

    return (
            <ListGroup id='signin' style={{ marginTop:'12%' }} className='mx-auto'>
                <Form onSubmit={submitHandler}>
                    <ListGroup.Item style={{ fontWeight: 'bold', color:'rgb(150,21,41)', borderTopRightRadius: 150, borderTopLeftRadius: 150 }} className='border-0 h3 mb-0 pb-0 mx-auto text-center'>
                        <span className='h1'>Q</span>UERY <span className='h1'>M</span>ASTER
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 mb-0 mt-3'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_signin'
                                style={{ borderRadius: 150 }}
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_signin'
                                style={{ borderRadius: 150 }}
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto text-center mt-0 pt-0 pb-1 mb-2'>
                        <Link to='/resetpassword' style={{ color:'black' }} className='ml-1'>
                            Forgot Password?
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto text-center border-0 mt-0 pt-0 pb-4' style={{ borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}>
                        <Button className='py-3' id='form_controls_signin_submit' style={{ width: '100%', borderRadius: 150, color: 'black', border: 0 }} type='submit'>Sign In</Button>
                        <div className='mt-3' style={{ fontWeight: 500, fontSize: '1rem' }}>New to Query Master? 
                            <Link to='/register' className='ml-1' style={{ color:'black' }} >  
                                Sign Up
                            </Link>
                        </div>
                    </ListGroup.Item>
                </Form>
                <Snackbar open={display} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant='filled' severity="error">{message}</Alert>
                </Snackbar>
        </ListGroup>
    )
}
