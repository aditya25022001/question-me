import React from 'react'
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PersonIcon from '@material-ui/icons/Person';
import HelpIcon from '@material-ui/icons/Help';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export const Header = () => {
    
    const user = useSelector(selectUser)

    return (
        <Navbar id='header' fixed='top' className='rounded' collapseOnSelect expand="lg" bg="white" variant="light">
        <Navbar.Brand href="/" className='ml-3' style={{ color:'rgb(150,21,41)', fontWeight:600, fontSize:30 }}>Query Master</Navbar.Brand>
        <Navbar.Toggle className="border-0" aria-controls="responsive-navbar-nav">
            <span>
                <MenuOpenIcon style={{ fontSize:25 }}/>
            </span>
        </Navbar.Toggle>
        <div id='header_form_control'>
            <Form className='ml-auto d-flex flex-direction-row'>
                <Form.Control id='header_form_control_input' style={{ borderRadius:150 }} className='ml-auto mr-3' type='text'/>
                <Button style={{ color:'white', backgroundColor:'rgb(150,21,41)', borderRadius: 150}} className='border-0' id='header_button' type='submit'>Search</Button>
            </Form>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='ml-auto'>
                <NavDropdown 
                    style={{ borderradius:100 }}
                    className='mr-5'
                    title={<PersonIcon style={{ color:'rgb(150,21,41)', fontSize:35 }} />} 
                    id="collasible-nav-dropdown"
                >
                    {user&&<NavDropdown.Item style={{ borderTopRightRadius:100, borderTopLeftRadius:100 }} href="/profile"><AssignmentIndIcon/></NavDropdown.Item>}
                    {!user&&<NavDropdown.Item style={{ borderTopRightRadius:100, borderTopLeftRadius:100 }} href="/signin">Sign In</NavDropdown.Item>}
                    <NavDropdown.Item style={{ borderBottomRightRadius:100, borderBottomLeftRadius:100 }} ><PowerSettingsNewIcon/></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className='mr-5' href="/how"><HelpIcon style={{ color:'rgb(150,21,41)', fontSize:30 }} /></Nav.Link>
                <Nav.Link className='mr-5' href="/about"><InfoIcon style={{ color:'rgb(150,21,41)', fontSize:30 }} /></Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}
