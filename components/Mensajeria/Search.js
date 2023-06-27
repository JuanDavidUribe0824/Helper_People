import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

import { css } from '@emotion/react';
import { useRouter } from 'next/router.js';
import {SearchUserChat, SearchInput, userChatInfo} from '../ui/Forchat'
import useValidacion from '../../hooks/useAutenticacion';

const Search = () => {
  const { usuario, firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setErr(false);

    try {
      const users = await firebase.auth().fetchSignInMethodsForEmail(username);
      if (users.length === 0) {
        setErr(true);
        return;
      }

      // Aquí puedes realizar acciones adicionales con los usuarios encontrados, como mostrar los resultados o redirigir a la página de perfil del usuario.
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };
    
  
  return (
    <div css={css`border-bottom: 1px solid gray;`}>
      <div css={css`padding: 10px;`}>
        <SearchInput type='text' placeholder='Busca un usuario' onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}/>

          <button onClick={handleSearch}>Search</button>

      </div>

      {err && <span>User not found!</span>}

      <SearchUserChat >
        <img src='https://cmsresources.elempleo.com/co/assets/backend/styles/770x513/public/2023-02/dino%20(1).jpg' /> 
        <div>
          <span css={css`  font-size: 18px;
          font-weight: 500;`}
          >{usuario.displayName}</span>
        </div>
      </SearchUserChat>

    </div>
  )
}

export default Search