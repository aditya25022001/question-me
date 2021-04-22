import { Container } from '@material-ui/core'
import React from 'react'
import { Header } from '../components/Header'
import { Question } from '../components/Question'

export const SearchScreen = ({match, history}) => {

    const key = match.params.keyword

    return (
        <>
        <Header history={history}/>
        <Container>
            <Question keyword={key}/>
        </Container>            
        </>
    )
}
