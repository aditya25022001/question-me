import React, { useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { db, auth } from '../firebase'
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer'
import '../App.css'
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';

export const RegisterScreen = ({history}) => {
    
    const dispatch = useDispatch()

    const [message,setMessage] = useState('')
    const [display,setDisplay] = useState(false)
    const [displayCreated,setDisplayCreated] = useState(false)
    const [name, setName] = useState('')
    const [userHandle, setUserHandle] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profile, setProfile] = useState('')
    const [country, setCountry] = useState('')
    const [subjects, setSubjects] = useState([])
    const [description, setDescription] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(name==='' || userHandle==='' || email ==='' || password==='' || subjects===''){
            setDisplay(true)
            setMessage("Name, Email, Userhandle, Password are necessary")
        }
        else{
            setMessage('')
            auth.createUserWithEmailAndPassword(email,password)
            .then((userAuth) => {
                    userAuth.user.updateProfile({
                    displayName:name,
                    photoURL:profile
                })
                .then(()=>{
                    db.collection('queryUsers').add({
                        userName:name,
                        userHandle:userHandle,
                        userEmail:userAuth.user.email,
                        userDescription:description,
                        photo:profile,
                        country:country,
                        subjects:subjects.split(','),
                        id:userAuth.user.uid,
                        questions:[],
                        answers:[]
                    })
                    dispatch(login({
                        email:userAuth.email,
                        uid:userAuth.uid,
                        displayName:name,
                    }))
                    setDisplayCreated(true)
                })
                .catch(error => {
                    setDisplay(true)
                    setMessage(error.message)
                })
            })
            .catch(error => {
                setDisplay(true)
                setMessage(error.message)
            })
        }
        console.log({name, userHandle, email, password, profile, description});
    }

    const closeSnackbar = () => {
        setDisplay(false)
    }

    const closeSnackbarCreated = () => {
        setDisplayCreated(false)
        history.push('/signin')
    }

    return (
        <>
            <ListGroup id='register' className='mx-auto'>
                <Form onSubmit={submitHandler}>
                    <ListGroup.Item style={{ fontWeight: 'bold', color:'rgb(150,21,41)', borderTopRightRadius: 150, borderTopLeftRadius: 150 }} className='border-0 h3 mb-0 pb-0 mx-auto text-center'>
                        <span className='h1'>Q</span>UERY <span className='h1'>M</span>ASTER
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 mb-0 mt-3'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 150 }}
                                type='name'
                                placeholder='Enter your name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 150 }}
                                placeholder="Username"
                                value={userHandle}
                                onChange={e => setUserHandle(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 150 }}
                                type='email'
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 150 }}
                                type='password'
                                placeholder="Set Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 150 }}
                                type='text'
                                placeholder="Subjects Interested ( comma separated ) "
                                value={subjects}
                                onChange={e => setSubjects(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 150 }}
                                type='text'
                                placeholder="Online photograph link"
                                value={profile}
                                onChange={e => setProfile(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-4 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 150 }}
                                type='text'
                                placeholder="Country"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 mx-auto py-1 my-0'>
                        <Form.Group>
                            <Form.Control
                                className='py-2 border-0'
                                id='form_controls_register'
                                style={{ borderRadius: 10 }}
                                type='text'
                                as='textarea' 
                                rows={5}
                                placeholder="Description of yourself..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className='mx-auto text-center border-0 mt-0 pt-0 pb-4' style={{ borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}>
                        <Button className='py-3' id='form_controls_register_submit' style={{ width: '100%', borderRadius: 150, color: 'black', border: 0 }} type='submit' onClick={e => submitHandler(e)}>Sign Up</Button>
                        <div className='mt-3' style={{ fontWeight: 500, fontSize: '1rem' }}>Already a member? 
                            <Link to='/signin' style={{ color:'black', textDecoration: 'underline' }} className='ml-1'>
                                Sign In
                            </Link>
                        </div>
                    </ListGroup.Item>
                </Form>
                <Snackbar open={display} autoHideDuration={4000} onClose={closeSnackbar}>
                    <Alert variant='filled' severity="error">{message}</Alert>
                </Snackbar>
                <Snackbar open={displayCreated} autoHideDuration={4000} onClose={closeSnackbarCreated}>
                    <Alert variant='filled' severity="success">Account created successfully</Alert>
                </Snackbar>
            </ListGroup>
            <Footer/>
            </>
    )
}
