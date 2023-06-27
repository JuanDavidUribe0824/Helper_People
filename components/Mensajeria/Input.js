import React from 'react';
import { InpuT, Send } from '../ui/Forchat';
import Img from "./attach.png";


const input = () => {
  return (
    <InpuT>
      <input type='text' placeholder='Escribe Algo...' />
      <Send>
        <img src='https://cdn-icons-png.flaticon.com/512/3342/3342137.png' alt='' />
        <input type='file' style={{ display: "none" }} id="file" />
        <label htmlFor='file'>
          <img src='https://d1k5j68ob7clqb.cloudfront.net/processed/meta/t25nbt1YN679gOGv5B.png' alt='' />
        </label>
        <button>Enviar</button>
      </Send>
    </InpuT>
  )
}

export default input