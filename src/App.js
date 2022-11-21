import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./Detail";

import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
