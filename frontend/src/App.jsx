import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Availability from './pages/Availability';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Availability />} />
                <Route path='/admin' element={<AdminDashboard />} />
            </Routes>
        </>
    )
}

export default App;
