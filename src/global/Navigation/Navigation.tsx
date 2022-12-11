import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from '../../pages/Auth/Auth';

export default function Navigation() {
  return (
    <Router>
        <Routes>
            <Route path={"/auth"} element={<Auth/>}/>
        </Routes>
    </Router>
  )
}