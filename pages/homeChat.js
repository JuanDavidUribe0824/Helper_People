import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Error404 from '../components/layout/404';

import { Home, Container } from '../components/ui/Forchat';
import Sidebar from '../components/Mensajeria/Sidebar';
import Chat from '../components/Mensajeria/Chat';


const homeChat = () => {

    //Context con las operaciones crud de firebase
    const { usuario } = useContext(FirebaseContext);
    
  return (
      <Home>
      {!usuario ? <Error404/> : (
        <Container>
          <Sidebar/>
          <Chat/>
        </Container>
          ) }
      </Home>
     
        
  )
}

export default homeChat