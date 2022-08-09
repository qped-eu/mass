import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, findIconDefinition} from '@fortawesome/fontawesome-svg-core';
import isMobile from '../General/MobileFunctions';

function SubMenu({title, children}:{title:string, children:any}) {
    const [showMobile, setShowMobile] = useState(isMobile());
    const [showSubMenu, setShowSubMenu] = useState(false);
    const subMenuFoldOut: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'caret-down' });
    const subMenuFoldIn: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'caret-up' });
    const handleInfoSubMenuClick = () => setShowSubMenu(!showSubMenu);

    window.addEventListener('resize', ()=>{
        setShowMobile(isMobile());
    });

  return (
    <li className={showSubMenu ? 'nav-item active' : 'nav-item'} onClick={handleInfoSubMenuClick}>
        <div className='nav-links'>
            <div className='mobile-nav-link'>
                {showMobile ? <FontAwesomeIcon className="mobileAwesome" icon={showSubMenu ? subMenuFoldIn : subMenuFoldOut}/> : <div></div>}{title}
            </div>
        </div>
        <ul className={showSubMenu ? 'nav-sub-menu active' : 'nav-sub-menu'} >
            {children}
        </ul>
    </li>
  )
}

export default SubMenu;