import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import NotFound from './components/NotFound'

import './App.css'
import UserProfile from './components/UserProfile'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <NotFound />
  </Switch>
)

export default App
