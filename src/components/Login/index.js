import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {password: '', username: '', error: false, errorMsg: ''}

  loginProcess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 90})
    history.replace('/')
  }

  onLogin = async e => {
    e.preventDefault()
    const {password, username} = this.state
    const input = {password, username}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(input),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(response, data)
    if (response.ok === true) {
      this.loginProcess(data.jwt_token)
    } else {
      this.setState({error: true, errorMsg: data.error_msg})
    }
  }

  onPassword = e => {
    this.setState({password: e.target.value})
  }

  onUsername = e => {
    this.setState({username: e.target.value})
  }

  render() {
    const {password, error, errorMsg, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-outside">
        <img
          src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669224715/OBJECTS_ylvhym.jpg"
          className="website-logo-img"
          alt="website login"
        />
        <div className="form-outside">
          <form onSubmit={this.onLogin} className="form-inside">
            <div className="form-img-box">
              <img
                src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669217903/Standard_Collection_8_jm9itc.png"
                alt="website logo"
                className="website-login-img"
              />
              <h3>Insta Share</h3>
            </div>
            <div className="each-input-box">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={username}
                className="password"
                onChange={this.onUsername}
                placeholder="Username"
              />
            </div>
            <div className="each-input-box">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                className="password"
                onChange={this.onPassword}
                placeholder="Password"
              />
            </div>
            <div className="error-box">{error && <p>*{errorMsg}</p>}</div>
            <button className="form-login" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
