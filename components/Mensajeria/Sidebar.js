import React from 'react';
import { SideBar } from '../ui/Forchat';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <SideBar>
      <Navbar/>
      <Search/>
      <Chats/>
    </SideBar>
  )
}

export default Sidebar