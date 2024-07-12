import react from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import "./App.css";

import HomeView from './HomeView'
import RegisterView from './RegisterView'
import LoginView from './LoginView'
import JoinRoomView from './JoinRoomView'
import VideoCallView from './VideoCallView'
import TeacherRegister from "./pages/TeacherRegister";

const App = () => {
  return (
    <Router>
      <div></div>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/join" element={<JoinRoomView />} />
        <Route path="/call" element={<VideoCallView />} />
        <Route path="/register-teacher" element={<TeacherRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
