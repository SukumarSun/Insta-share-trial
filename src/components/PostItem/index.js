/* eslint-disable camelcase */
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import './index.css'

const PostItem = props => {
  const {postDetails, like_status, onLove} = props

  const {
    comments,
    post_id,
    created_at,
    likes_count,
    post_details,
    profile_pic,
    user_id,
    user_name,
  } = postDetails
  const {caption, image_url} = post_details

  const onButtonClicked = () => {
    onLove(post_id)
  }
  const which = like_status ? (
    <FcLike onClick={onButtonClicked} className="icons" />
  ) : (
    <BsHeart onClick={onButtonClicked} className="icons" />
  )

  return (
    <div className="profile-each">
      <div className="profile-box">
        <img className="profile-img" src={profile_pic} alt="profile-pic" />
        <Link to={`/users/${user_id}`}>
          <h5>{user_name}</h5>
        </Link>
      </div>
      <img alt="main-img" className="main-img" src={image_url} />
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
export default PostItem
