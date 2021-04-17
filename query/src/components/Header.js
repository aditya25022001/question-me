import React from 'react'
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { Link } from 'react-router-dom'

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
                <Nav.Link className='mr-5'>
                    <Link to='/' style={{ textDecoration:'none', color:'gray' }}>
                        <div id='nav_features' >
                            <HomeRoundedIcon id='header_icon' style={{ color:'rgb(150,21,41)', fontSize:29,padding:'1%', borderRadius:'50%' }} />
                            <div>
                                Home
                            </div>
                        </div>
                    </Link>
                </Nav.Link>
                <NavDropdown 
                    className='mr-5'
                    title={
                    <div id='nav_features'>
                        <PersonIcon id='header_icon' style={{ color:'rgb(150,21,41)', fontSize:29,padding:'1%', borderRadius:'50%' }} />
                        <div style={{ color:'gray' }}>More</div>
                    </div>
                    } 
                    id="collasible-nav-dropdown"
                >
                    {user&&<NavDropdown.Item>
                        <Link to='/profile' style={{ textDecoration:'none', color:'black' }}>
                            <div className='d-flex'>
                                <AssignmentIndIcon/>
                                <div>Profile</div>
                            </div>
                        </Link>
                    </NavDropdown.Item>}
                    {!user&&<NavDropdown.Item>
                        <Link to='/signin' style={{ color:'black', textDecoration: 'none' }}>
                            Sign In
                        </Link>
                    </NavDropdown.Item>}
                    {user&&<NavDropdown.Item className='mr-3'>
                        <Link to='/ask' style={{ color:'black', textDecoration: 'none' }}>
                            <div className='d-flex'>
                                <CreateIcon/>
                                <div>Ask Question</div>
                            </div>
                        </Link>
                    </NavDropdown.Item>}
                    {user&&<NavDropdown.Item onClick={e=>logoutHandler()}>
                        <div className='d-flex'>
                            <PowerSettingsNewIcon/>
                            <div>Log out</div>
                        </div>
                    </NavDropdown.Item>}
                </NavDropdown>
                <Nav.Link className='mr-3'>
                    <Link to='/about' style={{ color:'gray', textDecoration: 'none' }}>
                        <div id='nav_features' >
                            <InfoIcon id='header_icon' style={{ color:'rgb(150,21,41)', fontSize:29,padding:'1%', borderRadius:'50%' }} />
                            <div>
                                About
                            </div>
                        </div>
                    </Link>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}
