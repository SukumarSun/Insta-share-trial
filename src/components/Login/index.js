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

  onLogin = async event => {
    event.preventDefault()
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

// import {Component} from 'react'
// import {Redirect} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import './index.css'

// class Login extends Component {
//   state = {username: '', password: '', errorStatus: false, errorMsg: ''}

//   onPassword = event => {
//     this.setState({password: event.target.value})
//   }

//   onUsername = event => {
//     this.setState({username: event.target.value})
//   }

//   loginSuccess = jwtToken => {
//     const {history} = this.props
//     Cookies.set('jwt_token', jwtToken, {expires: 60})
//     history.replace('/')
//   }

//   loginFailure = errorMsg => {
//     this.setState({errorStatus: true, errorMsg})
//   }

//   onLogin = async event => {
//     event.preventDefault()
//     const {username, password} = this.state
//     const url = 'https://apis.ccbp.in/login'
//     const userinput = {username, password}
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userinput),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     if (response.ok === true) {
//       this.loginSuccess(data.jwt_token)
//     } else {
//       this.loginFailure(data.error_msg)
//     }
//   }

//   render() {
//     const {username, errorStatus, errorMsg, password} = this.state
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }

//     return (
//       <div className="outside">
//         <div className="inside">
//           <form className="login-box" onSubmit={this.onLogin}>
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//               className="login-logo"
//               alt="website logo"
//             />
//             <div className="each-input">
//               <label className="each-label" htmlFor="username">
//                 USERNAME
//               </label>
//               <input
//                 id="username"
//                 placeholder="Username"
//                 className="enter"
//                 onChange={this.onUsername}
//                 type="text"
//                 value={username}
//               />
//             </div>
//             <div className="each-input">
//               <label className="each-label" htmlFor="password">
//                 PASSWORD
//               </label>
//               <input
//                 id="password"
//                 className="enter"
//                 onChange={this.onPassword}
//                 type="password"
//                 value={password}
//               />
//             </div>
//             <button className="login" type="submit">
//               Login
//             </button>
//           </form>
//           {errorStatus && <p className="error">*{errorMsg}</p>}
//         </div>
//       </div>
//     )
//   }
// }

// export default Login
