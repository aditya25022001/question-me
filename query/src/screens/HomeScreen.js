import { Header } from '../components/Header'
import { News } from '../components/News'
import React from 'react'
import { Container } from '@material-ui/core'

export const HomeScreen = () => {
   
    return (
        <div>
            <Header/>
            <Container>
                <News/>
            </Container>
        </div>
    )
}
