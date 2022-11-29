/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import StoryItem from '../StoryItem'
import PostItem from '../PostItem'

import './index.css'

const presentState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    storyData: [],
    shareData: [],
    searchData: [],
    searchId: 'day',
    // like_status: false,
    status: presentState.initial,
    postStatus: presentState.initial,
    searchStatus: presentState.initial,
    searchClicked: false,
  }

  componentDidMount() {
    this.pullStoriesData()
    this.pullShareData()
  }

  pullStoriesData = async () => {
    this.setState({status: presentState.loading})
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
        status: presentState.success,
        storyData: storyData.users_stories,
      })
    } else {
      this.setState({status: presentState.failure})
    }
  }

  storyLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader">
      <Loader type="ThreeDots" width={80} height={80} color="red" />
    </div>
  )

  storySuccess = () => {
    const {storyData} = this.state
    return (
      <div className="story-div">
        <ul className="story-list">
          {storyData.map(each => (
            <StoryItem key={each.user_id} storyDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  storyFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669578704/Icon_ptkmvd.png"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.pullStoriesData}>
        Try again
      </button>
    </div>
  )

  storyResult = () => {
    const {status} = this.state

    switch (status) {
      case presentState.success:
        return this.storySuccess()
      case presentState.loading:
        return this.storyLoading()
      case presentState.failure:
        return this.storyFailure()
      default:
        return null
    }
  }

  pullShareData = async () => {
    this.setState({postStatus: this.setState.loading})
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
    console.log(shareData.posts)
    if (shareResponse.ok === true) {
      this.setState({
        shareData: shareData.posts,
        postStatus: presentState.success,
      })
    } else {
      this.setState({postStatus: presentState.failure})
    }
  }

  postSuccess = () => {
    const {shareData} = this.state

    return (
      <ul className="post-list">
        {shareData.map(each => (
          <PostItem
            like_status={this.like_status}
            onLove={this.onLove}
            key={each.post_id}
            postDetails={each}
          />
        ))}
      </ul>
    )
  }

  postFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669578704/Icon_ptkmvd.png"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.pullShareData}>
        Try again
      </button>
    </div>
  )

  postLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader">
      <Loader type="ThreeDots" width={60} height={60} color="blue" />
    </div>
  )

  postResult = () => {
    const {postStatus} = this.state

    switch (postStatus) {
      case presentState.success:
        return this.postSuccess()
      case presentState.loading:
        return this.postLoading()
      case presentState.failure:
        return this.postFailure()
      default:
        return null
    }
  }

  //   onLove = id => {
  //     this.setState(
  //       prev => ({like_status: !prev.like_status}),
  //       this.pullFilterdata(id),
  //     )
  //   }

  incrementOrdecrement = (like_status, id) => {
    const {shareData, searchData, searchClicked} = this.state
    return !searchClicked
      ? this.setState(prev => ({
          shareData: prev.shareData.map(each => {
            if (each.post_id === id && like_status === true) {
              const updatedCount = each.likes_count + 1
              return {...each, likes_count: updatedCount}
            }
            if (each.post_id === id && like_status === false) {
              const updatedCount = each.likes_count - 1
              return {...each, likes_count: updatedCount}
            }
            return each
          }),
        }))
      : this.setState(prev => ({
          searchData: prev.searchData.map(each => {
            if (each.post_id === id && like_status === true) {
              const updatedCount = each.likes_count + 1
              return {...each, likes_count: updatedCount}
            }
            if (each.post_id === id && like_status === false) {
              const updatedCount = each.likes_count - 1
              return {...each, likes_count: updatedCount}
            }
            return each
          }),
        }))
  }

  onLove = async (like_status, post_id) => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${post_id}/like`
    const body = {like_status}
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const result = await fetch(url, options)
    const data = await result.json()
    console.log(result, data)
    this.incrementOrdecrement(like_status, post_id)
  }

  retryGetAgain = () => {
    const {searchId} = this.state
    console.log(searchId)
    this.doSearchApi(searchId)
  }

  doSearchApi = async id => {
    console.log(id)
    this.setState({
      searchStatus: presentState.loading,
      //   searchId: id,
      searchClicked: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const urls = `https://apis.ccbp.in/insta-share/posts?search=${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responses = await fetch(urls, options)
    const datas = await responses.json()
    if (responses.ok === true) {
      this.setState({
        searchData: datas.posts,
        searchStatus: presentState.success,
      })
    } else {
      this.setState({searchStatus: presentState.failure})
    }

    //
  }

  searchSuccess = () => {
    const {searchData} = this.state
    const render = searchData.length > 0
    return render ? (
      <>
        <h1>Search Results</h1>
        <ul className="post-list">
          {searchData.map(each => (
            <PostItem
              like_status={this.like_status}
              onLove={this.onLove}
              key={each.post_id}
              postDetails={each}
            />
          ))}
        </ul>
      </>
    ) : (
      <div>
        <img
          src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669639261/Group_jqn4c3.png"
          alt="search not found"
        />
        <h1>Search Not Found</h1>
        <p>Try different keyword or search again</p>
      </div>
    )
  }

  searchLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader">
      <Loader type="ThreeDots" width={60} height={60} color="blue" />
    </div>
  )

  searchFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669578704/Icon_ptkmvd.png"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.doSearchApi}>
        Try again
      </button>
    </div>
  )

  getSearchResults = () => {
    const {searchStatus} = this.state

    switch (searchStatus) {
      case presentState.success:
        return this.searchSuccess()
      case presentState.loading:
        return this.searchLoading()
      case presentState.failure:
        return this.searchFailure()
      default:
        return null
    }
  }

  render() {
    const {searchClicked} = this.state
    const inside = searchClicked ? (
      <div>{this.getSearchResults()}</div>
    ) : (
      <div className="home-inside">
        {this.storyResult()}
        {this.postResult()}
      </div>
    )
    return (
      <div className="home-outside">
        <Header doSearchApi={this.doSearchApi} />
        <div className="home-inside">{inside}</div>
      </div>
    )
  }
}

export default Home
