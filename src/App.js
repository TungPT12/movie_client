import './App.css'

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';
import MovieShowing from './pages/movieShowing/MovieShowing';
import BookTicket from './pages/bookTicket/BookTicket';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie-showing" element={<MovieShowing />} />
        <Route path="/movie-showing/:id" element={<BookTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
