// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Report from './pages/Report';
import Photo from './pages/Photo'; // Import the new Photo component

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/report" element={<Report />} />
        <Route path="/photo" element={<Photo />} /> {/* Add the new route */}
      </Routes>
    </BrowserRouter>
  );
}