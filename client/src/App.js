import React from 'react';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Rooms from './components/Rooms';
import Register from './screens/Register';
import Login from './screens/Login';
import Account from './screens/Account';
import BookRoom from './components/BookRoom'; 
import Facilities from './screens/Facilities';
import Contact from './screens/Contact';
import AdminPanel from './screens/AdminPanel';
import RoomDetails from './components/RoomDetails';

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes> 
        <Route path='/' element={<HomeScreen />} />
        <Route path='/rooms' element={<Rooms />} /> 
        <Route path='/rooms/:id' element={<BookRoom />} /> 
        <Route path='/register' element={<Register />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='/account' element={<Account />} /> 
        <Route path='/facilities' element={<Facilities />} /> 
        <Route path='/contact' element={<Contact />} /> 
        <Route path='/admin' element={<AdminPanel />} /> 
        <Route path='/rooms/:id' element={<RoomDetails/>}/>
      </Routes>
    </div>
  );
};

export default App;
