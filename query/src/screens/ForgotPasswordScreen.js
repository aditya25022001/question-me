import { Button, Card, FormControl } from 'react-bootstrap'
import React, { useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

export const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('')

    return (
        <Card id='forgot_password_card' className='mx-auto pt-4 text-center border-0' style={{ width:'50vh', marginTop:'14%', borderRadius:25 }}>
            <Card.Title style={{ fontWeight:600, color:'rgb(150,21,41)' }}>Query Master</Card.Title>
            <Card.Title className='mb-0'>Reset Password</Card.Title>
            <Card.Body>
                <Card.Text>
                    Enter your Email address which you used to register.
                    An email will be sent to the same for further process
                </Card.Text>
                <FormControl 
                    id='form_control_forgot_password'
                    className='mt-4 border-0 py-4'
                    placeholder='Enter email address'
                    value={email}
                    onChange={e =>setEmail(e.target.value)}        
                    style={{ borderRadius: 150}}
                />
                <Button id='forgot_password_button' className='my-3 py-3 border-0' style={{ borderRadius:150, width:'100%', color:'black' }} >Send Email</Button>
                <Card.Text>Back to 
                    <Link to='/signin' style={{ color:'black' }} className='ml-2'>
                        Sign In?
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
