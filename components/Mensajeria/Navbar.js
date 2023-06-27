import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from '../../firebase';
import { NavBar, User } from '../ui/Forchat';
import { css } from '@emotion/react';
import Link from 'next/link';


const Navbar = () => {

  //Context con las operaciones crud de firebase
  const { usuario } = useContext(FirebaseContext);

    
  return (
    <NavBar>
      <span>Chat</span>
      <User>
        <span>{usuario.displayName}</span>
        <Link legacyBehavior href="/">
          <button>Volver</button>
        </Link>
      </User>
    </NavBar>
  )
}

export default Navbar