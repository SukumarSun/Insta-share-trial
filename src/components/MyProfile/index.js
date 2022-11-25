/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import '../UserProfile/index.css'

const presentState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {myData: [], posts: [], stories: [], status: presentState.initial}

  componentDidMount() {
    this.pullProfile()
  }

  pullProfile = async () => {
    this.setState({status: presentState.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
        myData: data.profile,
        posts: data.profile.posts,
        status: presentState.success,
        stories: data.profile.stories,
      })
    } else {
      this.setState({status: presentState.failure})
    }
  }

  renderSuccess = () => {
    const {myData, posts, stories} = this.state
    const {
      followers_count,
      user_bio,
      user_id,
      user_name,
      posts_count,
      profile_pic,
      following_count,
    } = myData
    const canIrender = posts.length > 0

    return canIrender ? (
      <div>
        <div className="userprofile-box newprofile-box">
          <img className="profile-pic" alt="my profile" src={profile_pic} />
          <div className="profile-box-inside">
            <h1>{user_name}</h1>
            <div className="profile-box-inside-text new-inside">
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
                <img alt="my post" src={each.image} />
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
      <Loader type="ThreeDots" width={80} height={80} color="orange" />
    </div>
  )

  renderFailure = () => (
    <div className="failure">
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669372541/Group_7522_uvrmys.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.pullProfile} type="button">
        Try again
      </button>
    </div>
  )

  getprofileResult = () => {
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
          <div className="userprofile-inside">{this.getprofileResult()}</div>
        </div>
      </div>
    )
  }
}

export default MyProfile
