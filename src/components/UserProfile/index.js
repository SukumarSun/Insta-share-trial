/* eslint-disable camelcase */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const presentState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userData: [], posts: [], stories: [], status: presentState.initial}

  componentDidMount() {
    this.pullUserData()
  }

  pullUserData = async () => {
    this.setState({status: presentState.loading})
    const {match} = this.props
    const {params} = match
    // eslint-disable-next-line no-unused-vars
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(response, data)
    if (response.ok === true) {
      this.setState({
        userData: data.user_details,
        posts: data.user_details.posts,
        status: presentState.success,
        stories: data.user_details.stories,
      })
    } else {
      this.setState({status: presentState.failure})
    }
  }

  renderSuccess = () => {
    const {userData, posts, stories} = this.state
    const {
      followers_count,
      user_bio,
      user_id,
      user_name,
      posts_count,
      profile_pic,
      following_count,
    } = userData
    const canIrender = posts.length > 0

    return canIrender ? (
      <div>
        <div className="userprofile-box">
          <img className="profile-pic" alt="user profile" src={profile_pic} />
          <div className="profile-box-inside">
            <h3>{user_name}</h3>
            <div className="profile-box-inside-text ">
              <p className="each">
                <span className="span">{posts_count}</span> Posts
              </p>
              <p className="each">
                <span className="span">{followers_count}</span> Followers
              </p>
              <p className="each">
                <span className="span">{following_count}</span> Following
              </p>
            </div>
            <p className="user-id">{user_id}</p>
            <p className="user-bio">{user_bio}</p>
          </div>
        </div>
        <ul className="story-list">
          {stories.map(each => (
            <li key={each.id} className="story-listitem">
              <img className="story-img" alt="user story" src={each.image} />
            </li>
          ))}
        </ul>
        <hr className="line" />
        <div className="posts">
          <div className="grid">
            <BsGrid3X3 className="grid-icon" />
            <h5>POSTS</h5>
          </div>
          <ul className="posts-list">
            {posts.map(each => (
              <li className="posts-list-item" key={each.id}>
                <img alt="user post" src={each.image} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <>
        <BiCamera className="camera" />
        <h1>No Posts Yet</h1>
      </>
    )
  }

  renderLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader">
      <Loader type="ThreeDots" width={80} height={80} color="red" />
    </div>
  )

  renderFailure = () => (
    <div className="failure">
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669372541/Group_7522_uvrmys.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.pullUserData} type="button">
        Try again
      </button>
    </div>
  )

  getResult = () => {
    const {status} = this.state

    switch (status) {
      case presentState.success:
        return this.renderSuccess()
      case presentState.loading:
        return this.renderLoading()
      case presentState.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="userprofile-outside">
          <div className="userprofile-inside">{this.getResult()}</div>
        </div>
      </div>
    )
  }
}

export default UserProfile
