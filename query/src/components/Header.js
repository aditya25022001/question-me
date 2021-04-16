import React from 'react'
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';

export const Header = () => {
    
    const user = useSelector(selectUser)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar id='header' sticky='top' className='rounded' collapseOnSelect expand="lg" bg="white" variant="light">
        <Navbar.Brand href="/" className='ml-3' style={{ color:'rgb(150,21,41)', fontWeight:600, fontSize:30 }}>Query Master</Navbar.Brand>
        <Navbar.Toggle className="border-0" aria-controls="responsive-navbar-nav">
            <span>
                <MenuOpenIcon style={{ fontSize:25 }}/>
            </span>
        </Navbar.Toggle>
        <div id='header_form_control'>
            <Form className='ml-auto d-flex flex-direction-row'>
                <Form.Control 
                    id='header_form_control_input' 
                    style={{ borderRadius:150 }}
                    className='ml-auto mr-3' 
                    type='text'
                    placeholder='Search keywords or questions'
                />
                <Button style={{ color:'white', backgroundColor:'rgb(150,21,41)', borderRadius: 150}} className='border-0' id='header_button' type='submit'>Search</Button>
            </Form>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='ml-auto'>
                {user&&<Nav.Link className='mr-4' href="/ask" >
                    <div id='nav_features' >
                        <CreateIcon id='header_icon' style={{ color:'rgb(150,21,41)', fontSize:29.5,padding:'1%', borderRadius:'50%' }} />
                        <div>
                            Ask Question
                        </div>
                    </div>
                </Nav.Link>}
                <NavDropdown 
                    style={{ borderradius:100 }}
                    className='mr-5'
                    title={
                    <div id='nav_features'>
                        <PersonIcon id='header_icon' style={{ color:'rgb(150,21,41)', fontSize:29,padding:'1%', borderRadius:'50%' }} />
                        <div>More</div>
                    </div>
                    } 
                    id="collasible-nav-dropdown"
                >
                    {user&&<NavDropdown.Item style={{ borderTopRightRadius:100, borderTopLeftRadius:100 }} href="/profile">
                            <div className='d-flex'>
                                <AssignmentIndIcon/>
                                <div>Profile</div>
                            </div>
                            </NavDropdown.Item>}
                    {!user&&<NavDropdown.Item style={{ borderTopRightRadius:100, borderTopLeftRadius:100 }} href="/signin">Sign In</NavDropdown.Item>}
                    <NavDropdown.Item style={{ borderBottomRightRadius:100, borderBottomLeftRadius:100 }} onClick={e=>logoutHandler()}>
                        <div className='d-flex'>
                            <PowerSettingsNewIcon/>
                            <div>Log out</div>
                        </div>
                    </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className='mr-3' href="/about">
                    <div id='nav_features' >
                        <InfoIcon id='header_icon' style={{ color:'rgb(150,21,41)', fontSize:29,padding:'1%', borderRadius:'50%' }} />
                        <div>
                            About
                        </div>
                    </div>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}
