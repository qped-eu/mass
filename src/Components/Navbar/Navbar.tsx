import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import { IconDefinition, findIconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faB, fas } from '@fortawesome/free-solid-svg-icons';
import isMobile from '../General/MobileFunctions';
import NavItem from './NavItem';
import Submenu from './SubMenu';

library.add(fas);
library.add(faB);

const barIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'bars' });
const timesIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'times' });

const Navbar = function() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [topScroll, setTopScroll] = useState(true);
    const handleMobileMenuClick = () => setShowMobileMenu(!showMobileMenu);
    const closeMobileMenu = () => setShowMobileMenu(false);

    window.addEventListener('resize', ()=>{
        if(!isMobile()){
            setShowMobileMenu(false)
        }
    });

    window.addEventListener('scroll', () => {
        setTopScroll(window.scrollY < 10);
    });
   
    return (
        <>
            <div className={showMobileMenu ? 'mobile-menu-cancel active' : 'mobile-menu-cancel'} onClick={closeMobileMenu}></div>
            <nav className={topScroll ? "navbar unscrolled" : "navbar"}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        MASS
                    </Link>
                    <div className='menu-icon' onClick={handleMobileMenuClick}>
                       <FontAwesomeIcon icon={showMobileMenu ? timesIcon : barIcon} className="mobileAwesome" color='#fff'/>
                    </div>
                    <ul className={showMobileMenu ? 'nav-menu active' : 'nav-menu'}>
                        <NavItem link='/mass' callback={closeMobileMenu}>Home</NavItem>
                        <NavItem link='/mass/configurator' callback={closeMobileMenu}>MASS Configurator</NavItem>
                        <NavItem link='/mass/documentation' callback={closeMobileMenu}>MASS Documentation </NavItem>
                        <Submenu title='MASS Checker Tutorials'>
                            <NavItem link='/mass/style' callback={closeMobileMenu}>Style</NavItem>
                            <NavItem link='/mass/semantics' callback={closeMobileMenu}>Solution Approach</NavItem>
                            <NavItem link='/mass/coverage' callback={closeMobileMenu}>Test Coverage</NavItem>
                            <NavItem link='/mass/class' callback={closeMobileMenu}>Class</NavItem>
                            <NavItem link='/mass/metrics' callback={closeMobileMenu}>Metrics</NavItem>
                        </Submenu>    
                    </ul>           
                </div>
            </nav>
        </>
    )
}

export default Navbar;