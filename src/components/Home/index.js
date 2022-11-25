import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import StoryItem from '../StoryItem'
import PostItem from '../PostItem'
import './index.css'

class Home extends Component {
  state = {
    storyData: [],
    shareData: [],
  }

  componentDidMount() {
    this.pullStoriesData()
    this.pullShareData()
  }

  pullStoriesData = async () => {
    // this.setState({status: presentState.loading})
    const jwtToken = Cookies.get('jwt_token')
    const storyUrl = 'https://apis.ccbp.in/insta-share/stories'
    const storyOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const storyResponse = await fetch(storyUrl, storyOption)
    const storyData = await storyResponse.json()

    if (storyResponse.ok === true) {
      this.setState({
        storyData: storyData.users_stories,
      })
    }
    console.log(storyResponse, storyData)
  }

  pullShareData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const shareUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const shareResponse = await fetch(shareUrl, options)
    const shareData = await shareResponse.json()
    // console.log(shareResponse, shareData.posts)
    if (shareResponse.ok === true) {
      this.setState({shareData: shareData.posts})
    }
  }

  render() {
    const {storyData, shareData} = this.state
    return (
      <div className="home-outside">
        <Header />
        <div className="home-inside">
          <div className="story-div">
            <ul className="story-list">
              {storyData.map(each => (
                <StoryItem key={each.user_id} storyDetails={each} />
              ))}
            </ul>
          </div>
          <div>
            <ul className="post-list">
              {shareData.map(each => (
                <PostItem
                  onLove={this.onLove}
                  key={each.post_id}
                  postDetails={each}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
