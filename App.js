import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AgentDashboard from './pages/AgentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/agent" element={<AgentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
