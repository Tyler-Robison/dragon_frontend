import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// import GlobalContext from "../context/GlobalContext";
import { Navbar, Container } from "react-bootstrap";
import '../css/NavBar.css'

/** NavBar is always visible, allows quick navigation between the site's main features
 * 
 * loggedOutView - dispays login/sign-up and continue as guest button
 * 
 * loggedInView - displays the four main features of the site (Find Recipes, Saved Recipes, Mealplan, Calculate Points) and logout button
  */
const NavBar: React.FC = () => {
    // const { currentUser } = useContext(GlobalContext)



    return (
        <Navbar className="NavBar" expand="lg">

            <Navbar.Brand className="NavBar-Brand">
                <NavLink className="nav-link" to="/home">
                    DnD Character Creator
                </NavLink>
            </Navbar.Brand>

            <Container className="NavBar-Container">

                <NavLink className="nav-link" to="/character/new">
                    Character Creator
                </NavLink>

                <NavLink className="nav-link" to="/characters">
                    Character List
                </NavLink>

                <NavLink className="nav-link" to="/monsters">
                    Monster List
                </NavLink>

                <NavLink className="nav-link" to="/items">
                    Item List
                </NavLink>

                <NavLink className="nav-link" to="/creation">
                    Creation
                </NavLink>



            </Container>
        </Navbar>
    )
}

export default NavBar;