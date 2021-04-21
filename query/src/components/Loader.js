import React from 'react'
import { Image } from 'react-bootstrap'
import '../styles/loader.css'

export const Loader = () => {
    return (
        <div className='text-center mx-auto' id='loader'>
            <Image src='../logo512.png' id='loader_image'/>
            <div id='loader_external_div' className='mx-auto'>
                <div id='loader_internal_div'></div>
            </div>
        </div>
    )
}
