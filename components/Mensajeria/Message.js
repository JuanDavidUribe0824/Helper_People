import React from 'react';
import { css } from '@emotion/react';

import {MesSage, MessageInfo, MessageContent} from '../ui/Forchat';

const Message = () => {
  return (
    <MesSage css={css`
    flex-direction: row-reverse;
  `}>
      <MessageInfo>
        <img src='https://cmsresources.elempleo.com/co/assets/backend/styles/770x513/public/2023-02/dino%20(1).jpg' /> 
        <span>Ahora Mismo</span>
      </MessageInfo>

        <MessageContent
          css={css`
            align-items: flex-end;
            p {
              background-color: #8da4f1;
              color: white;
              border-radius: 10px 0px 10px 10px;
            }
        
        `}
        >
          <p>Hello</p>
          <img src='https://cmsresources.elempleo.com/co/assets/backend/styles/770x513/public/2023-02/dino%20(1).jpg' /> 
        </MessageContent>
      </MesSage>
  )
}

export default Message