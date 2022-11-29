import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  state = {search: ''}

  onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onSearch = event => {
    // console.log(event.target.value)
    this.setState({search: `${event.target.value}`})
  }

  onSubmitSearch = e => {
    e.preventDefault()
    const {doSearchApi} = this.props
    const {search} = this.state
    doSearchApi(search)
  }

  render() {
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
        <ul className="link-box">
          <li>
            <Link className="each-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="each-link" to="/my-profile">
              Profile
            </Link>
          </li>
        </ul>
        <form onSubmit={this.onSubmitSearch} className="search-box">
          <input
            onChange={this.onSearch}
            type="search"
            placeholder="Search Caption"
          />
          <button type="submit">
            <FaSearch className="search-icon" testid="searchIcon" />
          </button>
        </form>
        <button className="logout" type="button" onClick={this.onLogOut}>
          Logout
        </button>
      </div>
    )
  }
}

export default withRouter(Header)

// import {Component} from 'react'
// import {Link, withRouter} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import {FaSearch} from 'react-icons/fa'
// import './index.css'

// class Header extends Component {
//   state = {search: ''}

//   onLogOut = () => {
//     Cookies.remove('jwt_token')
//     const {history} = this.props
//     history.replace('/login')
//   }

//   onSearch = event => {
//     console.log(event.target.value)
//     this.setState({search: `${event.target.value}`})
//   }

//   onSubmitSearch = e => {
//     e.preventDefault()
//     const {doSearchApi} = this.props
//     const {search} = this.state
//     // console.log(search)
//     doSearchApi(search)
//   }

//   render() {
//     return (
//       <div className="header-outside">
//         <div className="img-box">
//           <Link to="/">
//             <img
//               src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669217903/Standard_Collection_8_jm9itc.png"
//               alt="website logo"
//               className="login-img"
//             />
//           </Link>
//           <h3>Insta Share</h3>
//         </div>
//         <ul className="link-box">
//           <li>
//             <Link className="each-link" to="/">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link className="each-link" to="/my-profile">
//               Profile
//             </Link>
//           </li>
//         </ul>
//         <form onSubmit={this.onSubmitSearch} className="search-box">
//           <input
//             onChange={this.onSearch}
//             type="search"
//             placeholder="Search Caption"
//           />
//           <button type="button">
//             <FaSearch className="search-icon" testid="searchIcon" />
//           </button>
//         </form>
//         <button className="logout" type="button" onClick={this.onLogOut}>
//           Logout
//         </button>
//       </div>
//     )
//   }
// }

// export default withRouter(Header)

// import {withRouter, Link} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import './index.css'

// const Header = props => {
//   const onLogout = () => {
//     const {history} = props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }
//   return (
//     <div className="head-link">
//       <Link to="/">
//         <img
//           className="header-logo"
//           src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//           alt="website logo"
//         />
//       </Link>
//       <ul className="head-mid">
//         <li className="mid-link">
//           <Link className="each-mid" to="/">
//             Home
//           </Link>
//         </li>

//         <li className="mid-link">
//           <Link className="each-mid" to="/my-profile">
//             Profile
//           </Link>
//         </li>
//       </ul>
//       <button onClick={onLogout} className="logout" type="button" alt="logout">
//         <li>Logout</li>
//       </button>
//     </div>
//   )
// }

// export default withRouter(Header)
