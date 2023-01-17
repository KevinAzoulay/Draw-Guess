import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css'
import DrawingRoom from "./pages/DrawingRoom/DrawingRoom";
import GuessingRoom from "./pages/GuessingRoom/GuessingRoom";
import WaitingRoom from "./pages/WaitingRoom/WaitingRoom";
import WelcomeBoard from "./pages/WelcomeBoard/WelcomeBoard";
import WordChoosing from "./pages/WordChoosing/WordChoosing";
import { SocketProvider } from "./Helpers/SocketContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<WelcomeBoard />} />
            <Route path="/waiting" element={<WaitingRoom />} />
            <Route path="/choose" element={<WordChoosing />} />
            <Route path="/guess" element={<GuessingRoom />} />
            <Route path="/draw" element={<DrawingRoom />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
