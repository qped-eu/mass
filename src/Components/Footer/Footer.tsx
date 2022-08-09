import {Link} from 'react-router-dom';
import './Footer.css';
import FooterItem from './FooterItem';
import SocialMedia from './SocialMedia';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-links'>
            <FooterItem label='About Us'>
                <a target="_blank" rel="noreferrer" aria-label="QPED Website Link" href='https://qped.eu'>QPED Website</a>
            </FooterItem>
        </div>
        <section className='social-media'>
            <div className="social-media-wrap">
                <div className="footer-logo">
                    <Link to='/' className="social-logo">
                        MASS
                    </Link>
                </div>
                <small className='website-rights'>QPED © 2022</small>
                <div className="social-icons">
                    <SocialMedia label='Twitter' link='https://www.linkedin.com/company/qped' icon={faLinkedin}/>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer