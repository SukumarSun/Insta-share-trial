// import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-outer">
    <div className="notfound-inner">
      <img
        src="https://res.cloudinary.com/dsvdiwazh/image/upload/v1669288971/Layer_2_tcv1wr.png"
        alt="page not found"
      />
      <h1>PAGE NOT FOUND</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <Link to="/">
        <button type="button">Home Page</button>
      </Link>
    </div>
  </div>
)

export default NotFound
