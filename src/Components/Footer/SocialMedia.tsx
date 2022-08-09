import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SocialMedia({label, link, icon}: {label:string, link:string, icon:IconProp}) {
  return (
    <a href={link} target='_blank' aria-label={label} rel="noreferrer" className="social-icon-link">
        <FontAwesomeIcon className='social-logo' icon={icon}/>
    </a>
  )
}

export default SocialMedia;