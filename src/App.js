/* eslint-disable no-unused-vars */
import {Route, Switch} from 'react-router-dom'
// // eslint-disable-next-line no-unused-vars
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import ReactSlick from './components/ReactSlick'
import NotFound from './components/NotFound'

import './App.css'
import UserProfile from './components/UserProfile'

const App = () => (
  <>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/my-profile" component={MyProfile} />
      <ProtectedRoute exact path="/users/:id" component={UserProfile} />
      <ProtectedRoute exact path="/carousal" component={ReactSlick} />
      <NotFound />
    </Switch>
  </>
)

export default App

// import {Switch, Route} from 'react-router-dom'
// import Home from './components/Home'

// import NotFound from './components/NotFound'
// import Login from './components/Login'
// import ProtectedRoute from './components/ProtectedRoute'

// import './App.css'

// // These are the lists used in the application. You can move them to any component needed.
// const employmentTypesList = [
//   {
//     label: 'Full Time',
//     employmentTypeId: 'FULLTIME',
//   },
//   {
//     label: 'Part Time',
//     employmentTypeId: 'PARTTIME',
//   },
//   {
//     label: 'Freelance',
//     employmentTypeId: 'FREELANCE',
//   },
//   {
//     label: 'Internship',
//     employmentTypeId: 'INTERNSHIP',
//   },
// ]

// const salaryRangesList = [
//   {
//     salaryRangeId: '1000000',
//     label: '10 LPA and above',
//   },
//   {
//     salaryRangeId: '2000000',
//     label: '20 LPA and above',
//   },
//   {
//     salaryRangeId: '3000000',
//     label: '30 LPA and above',
//   },
//   {
//     salaryRangeId: '4000000',
//     label: '40 LPA and above',
//   },
// ]

// // Replace your code here
// const App = () => (
//   <div>
//     <Switch>
//       <Route path="/login" component={Login} />
//       <ProtectedRoute exact path="/" component={Home} />
//       <ProtectedRoute exact path='/'
//       <NotFound />
//     </Switch>
//   </div>
// )

// export default App
