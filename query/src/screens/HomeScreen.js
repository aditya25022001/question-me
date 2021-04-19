import { Header } from '../components/Header'
import { News } from '../components/News'
import { Question } from '../components/Question'
import { Footer } from '../components/Footer'
import React from 'react'
import '../App.css'

export const HomeScreen = () => {
   
    return (
        <div>
            <Header/>
            <div id='homescreen'>
                <div id='news_div'>
                    <News/>
                </div>
                <div id='question_div'>
                    <Question/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
