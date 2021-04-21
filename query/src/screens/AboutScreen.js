import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import '../App.css'

export const AboutScreen = () => {
    return (
        <div>
            <Header/>
            <div className='p-5'>
                <div id='about_headings' style={{ fontWeight:700 }}>Overview</div>
                <p id='about_para'>
                    It is a basic project, more of a quora clone 
                    where in any user can sign-in, sign-up and ask their doubts or questions to the people across the globe.
                    The question can be related to any topic may it be academics or future related.    
                    This is a very basic version that will be launched, will be adding more functionalities and enhancing the UI and UX of the web application.
                </p>
                <div id='about_headings' style={{ fontWeight:700, marginTop:'6vh' }}>How to use?</div>
                <p id='about_para'>
                    Just three easy steps! to get your solution:
                    <ul>
                        <li>Sign In / Sign Up using email address and password</li>
                        <li>Post your question in well formatted manner</li>
                        <li>Check for your answer when you get one</li>
                    </ul>
                    Best practice is to upvote an answer if you find it useful ( you may downvote it too if not useful ).
                </p>
                <div id='about_headings' style={{ fontWeight:700, marginTop:'6vh' }}>How to write answers?</div>
                <p id='about_para'>
                    Follow tips given below to make your answer more understandable and an easy read.
                    <ul>
                        <li>Write each paragraph in {"<p>...</p>"} if more than one paragraph are there </li>
                        <li>If only one paragraph no need to write {"<p></p>"}</li>
                        <li>If links are there enclose them in {"<a>..</a>"} tags </li>
                        <li>If there is code present in your answer enclose them in {"<code>..</code>"} tags </li>
                    </ul>
                </p>
                <div id='about_headings' style={{ fontWeight:700, marginTop:'6vh' }}>Developer Side</div>
                <p id='about_para'>
                    The technology stack used in this project is very powerful ReactJS, Material UI, React Bootstrap, Firebase, Firebase Authentication and Firebase Firestore.
                    The source code to the project can be found out on my <a 
                        href='https://github.com/aditya25022001/question-me' 
                        target='_blank' 
                        style={{ textDecoration:'underline', color:'black' }}
                        rel='noreferrer noopener'
                    >GitHub</a> account repository.
                    Any feature or bug you think can be added or is there respectively are open to discuss.
                </p>
                <div id='about_headings' style={{ fontWeight:700, marginTop:'6vh' }}>Developer</div>
                <p id='about_para'>
                    Hi, I am Aditya, check out my <a 
                        href='https://adityaudayubale.web.app' 
                        target='_blank' 
                        style={{ textDecoration:'underline', color:'black' }}
                        rel='noreferrer noopener'
                    >portfolio</a> if found it useful and good enough and want to work with or work on a project.
                    <p>CHEERS!</p>
                </p>
            </div>
            <Footer/>
        </div>
    )
}
