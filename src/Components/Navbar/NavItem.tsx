import React, { MouseEventHandler } from 'react';
import {Link} from 'react-router-dom';

function NavItem({link, children, callback}:{link:string, children:any, callback:MouseEventHandler}) {
  return (
    <li className='nav-item'>
        <Link to={link} className='nav-links' onClick={callback}>
            <div className='mobile-nav-link'>
              {children}
            </div>
        </Link>
    </li>
  )
}

export default NavItem;