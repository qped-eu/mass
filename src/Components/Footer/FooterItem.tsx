import './Footer.css';
function FooterItem({children, label}:{children:any, label:string}) {
  return (
    <div className="footer-link-wrapper">
        <div className="footer-link-items">
            <h2>{label}</h2>
            {children}
        </div>
    </div>
  )
}

export default FooterItem