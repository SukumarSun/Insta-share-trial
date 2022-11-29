/* eslint-disable camelcase */
import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import './index.css'

class PostItem extends Component {
  state = {like_status: false}

  onButtonClicked = () => {
    this.setState(prev => ({like_status: !prev.like_status}), this.pullLove)
  }

  pullLove = () => {
    const {like_status} = this.state
    const {postDetails, onLove} = this.props
    const {post_id} = postDetails
    onLove(like_status, post_id)
  }

  render() {
    const {postDetails} = this.props
    const {like_status} = this.state
    const which = like_status ? (
      <button type="button">
        <FcLike
          testid="unLikeIcon"
          onClick={this.onButtonClicked}
          className="icons"
        />
      </button>
    ) : (
      <button type="button">
        <BsHeart
          testid="likeIcon"
          onClick={this.onButtonClicked}
          className="icons"
        />
      </button>
    )

    const {
      comments,
      created_at,
      likes_count,
      post_details,
      profile_pic,
      user_id,
      user_name,
    } = postDetails
    const {caption, image_url} = post_details

    return (
      <div className="profile-each">
        <div className="profile-box">
          <img
            className="profile-img"
            src={profile_pic}
            alt="post author profile"
          />
          <Link to={`/users/${user_id}`}>
            <h5>{user_name}</h5>
          </Link>
        </div>
        <img alt="post" className="main-img" src={image_url} />
        <div className="post-bottom">
          <div>
            {which}
            <FaRegComment className="icons" />
            <BiShareAlt className="icons" />
          </div>
          <p className="each likes">{likes_count} likes</p>
          <p className="each">{caption}</p>
          <ul>
            {comments.map(each => (
              <li key={each.user_id} className="each-comment">
                <div className="comment_inside">
                  <p className="span-para">
                    <span className="span">{each.user_name}:</span>
                    {each.comment}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="timeofpost">{created_at}</p>
        </div>
      </div>
    )
  }
}
export default PostItem
