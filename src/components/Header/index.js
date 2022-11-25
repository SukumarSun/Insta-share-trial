import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-outside">
      <div className="img-box">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669217903/Standard_Collection_8_jm9itc.png"
            alt="website logo"
            className="login-img"
          />
        </Link>
        <h3>Insta Share</h3>
      </div>

      <div className="link-box">
        <Link className="each-link" to="/">
          Home
        </Link>
        <Link className="each-link" to="/my-profile">
          Profile
        </Link>
      </div>
      <button className="logout" type="button" onClick={onLogOut}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
