import React from 'react'
import {SearchUserChat} from '../ui/Forchat'
import { css } from '@emotion/react';

const Chats = () => {
  return (
    <div className="chats">
       <SearchUserChat>
        <img src='https://cmsresources.elempleo.com/co/assets/backend/styles/770x513/public/2023-02/dino%20(1).jpg' /> 
        <div>
          <span 
          css={css`font-size: 18px;
          font-weight: 500;`}
          >Juan</span>
          <p css={css`font-size: 14px;
            color: lightgray;`}
          >Hi</p>
        </div>
      </SearchUserChat>
      <SearchUserChat>
        <img src='https://cmsresources.elempleo.com/co/assets/backend/styles/770x513/public/2023-02/dino%20(1).jpg' /> 
        <div>
          <span 
          css={css`font-size: 18px;
          font-weight: 500;`}
          >Juan</span>
          <p css={css`font-size: 14px;
            color: lightgray;`}
          >Hi</p>
        </div>
      </SearchUserChat>
      <SearchUserChat>
        <img src='https://cmsresources.elempleo.com/co/assets/backend/styles/770x513/public/2023-02/dino%20(1).jpg' /> 
        <div>
          <span 
          css={css`font-size: 18px;
          font-weight: 500;`}
          >Juan</span>
          <p css={css`font-size: 14px;
            color: lightgray;`}
          >Hi</p>
        </div>
      </SearchUserChat>
    </div>
  )
}

export default Chats