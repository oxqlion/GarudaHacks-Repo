import react from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import "./App.css";

import HomeView from './HomeView'
import RegisterView from './RegisterView'
import LoginView from './LoginView'
import JoinRoomView from './JoinRoomView'
import VideoCallView from './VideoCallView'
import TeacherRegister from "./pages/TeacherRegister";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateCourse from "./pages/CreateCourse";
import CourseDetail from "./pages/CourseDetail";

const App = () => {
  return (
    <Router>
      <div></div>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/join/:callId" element={<JoinRoomView />} />
        <Route path="/call" element={<VideoCallView />} />
        <Route path="/register-teacher" element={<TeacherRegister />} />
        <Route path="/dashboard-teacher" element={<TeacherDashboard />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/meeting/:meetingId" element={<VideoCallView />} />
      </Routes>
    </Router>
  );
};

export default App;
