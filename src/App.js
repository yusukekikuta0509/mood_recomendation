import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import History from "./pages/History"; // 履歴ページをインポート

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History />} /> {/* 履歴ページ */}
      </Routes>
    </Router>
  );
}

export default App;
