/* eslint-disable camelcase */
import './index.css'

const StoryItem = props => {
  const {storyDetails} = props
  const {story_url, user_name} = storyDetails

  return (
    <div>
      <div className="story-each">
        <img alt="user story" className="story-img" src={story_url} />
        <p className="story-name">{user_name}</p>
      </div>
    </div>
  )
}

export default StoryItem
