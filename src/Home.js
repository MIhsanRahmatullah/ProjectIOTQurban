import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/Layout/sideBar';
import TestPublisherReceiver from './container/Pages/TestPublisherReceiver';
import TestConnectionSubcription from './container/Pages/TestConnectionSubcription';
import EnergyMonitoringPage from './container/Pages/EnergyMonitoring';
import Dashboard from './container/Pages/Dashboard'
import SideBarDrawer from './components/Layout/Drawer';
import Footer from './components/Layout/Footer';
import Test from './container/Pages/Test';
import CattleData from './container/Pages/CattleData';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
      <BrowserRouter>
      <SideBarDrawer/>
        <Routes>
          <Route path='/cattle-data' element={<CattleData/>}/>
          <Route path='/testpr' element={<TestPublisherReceiver/>}/>
          <Route path='/testcs' element={<TestConnectionSubcription/>}/>
          <Route path='/sidebar' element={<SideBar/>}/>
          <Route path='/energymonitoring' element={<EnergyMonitoringPage/>}/>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
      
  )
}

export default App;
