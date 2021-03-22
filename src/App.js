import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import Upload from './components/Upload/Upload'
import Profile from './components/Profile/Profile'
import AdminHome from './components/AdminHome/AdminHome'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import AdminAllCerts from './components/AdminAllCerts/AdminAllCerts'
import Users from './components/Users/Users'
import UserCertificates from './components/UserCertificates/UserCertificates'
// import SendMail from './components/SendMail/SendMail'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import AdminRoute from './routes/AdminRoute'
import AdminExpired from './components/AdminExpired/AdminExpired'
import AdminExpiring from './components/AdminExpiring/AdminExpiring'
import QuizHome from './components/UserQuiz/QuizHome'
import Quiz from './components/UserQuiz/Quiz'
import AdminFeedback from './components/AdminFeedback/AdminFeedback'
import AddNewQuestions from './components/AdminQuiz/AddNewQuestions'
import SetQuestions from './components/AdminQuiz/SetQuestions'
import NewQuiz from './components/AdminQuiz/NewQuiz'
import UserFeedback from './components/UserFeedback/UserFeedback'
import QuizRankings from './components/QuizRankings/QuizRankings'
import QuizHistory from './components/QuizHistory/QuizHistory'
import ListQuiz from './components/AdminQuiz/ListQuiz'
import QuizStats from './components/QuizStats/QuizStats'
import QuizCharts from './components/QuizStats/QuizCharts'
import ForgotPW from './components/ForgotPW/ForgotPW'


const App = () => {
  return (
    <Router>
      <PublicRoute restricted={false} component={Home} path="/" exact />
      <PublicRoute restricted={true} component={Register} path="/register" exact />
      <PublicRoute restricted={true} component={Login} path="/login" exact />
      <PublicRoute restricted={true} component={ForgotPW} path="/forgotpw" exact />
      <AdminRoute component={AdminHome} path="/admin" exact />
      <AdminRoute component={AdminDashboard} path="/admindash" exact />
      <AdminRoute component={AdminAllCerts} path="/adminallcerts" exact />
      <AdminRoute component={AdminExpired} path="/adminexpired" exact />
      <AdminRoute component={AdminExpiring} path="/adminexpiring" exact />
      <AdminRoute component={Users} path="/users" exact />
      <AdminRoute component={UserCertificates} path="/usercerts/:userid" exact />
      <AdminRoute component={NewQuiz} path="/quizsetquiz" exact />
      <AdminRoute component={AddNewQuestions} path="/quizaddnewquests" exact />
      <AdminRoute component={SetQuestions} path="/quizsetnewquests" exact />
      <AdminRoute component={AdminFeedback} path="/quizfeedback" exact />
      <AdminRoute component={QuizRankings} path="/quizadminrankings" exact />
      <AdminRoute component={ListQuiz} path="/quizlist" exact />
      <AdminRoute component={QuizStats} path="/quizstats" exact />
      <AdminRoute component={QuizCharts} path="/quizcharts/:id" exact />
      {/* <AdminRoute component={SendMail} path="/sendmail" exact /> */}
      <PrivateRoute component={Dashboard} path="/dashboard" exact />
      <PrivateRoute component={Upload} path="/upload" exact />
      <PrivateRoute component={Profile} path="/profile" exact />
      <PrivateRoute component={QuizHome} path="/quizhome" exact />
      <PrivateRoute component={Quiz} path="/quiz/:id" exact />
      <PrivateRoute component={UserFeedback} path="/userquizfeedback" exact />
      <PrivateRoute component={QuizRankings} path="/quizrankings" exact />
      <PrivateRoute component={QuizHistory} path="/quizhistory" exact />
    </Router>
  )
}

export default App