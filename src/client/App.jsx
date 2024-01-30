import './App.css';
import Login from './components/login';
import Register from './components/Register';
import CreateMovie from './components/movies/MoviesPage';
import MovieList from './components/movies/MovieCreated';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';


function App() {


  return (
    <div className="flex flex-col h-screen ">
       <Header />
       <div className="flex-1 overflow-y-auto">
          <Routes>  
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movie-list" element={<MovieList />} />
              <Route path="/create-movie" element={<CreateMovie  />} />
          </Routes>
       </div>
       <Footer />
    </div>
  )
}

export default App;
