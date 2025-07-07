import React from 'react'

const BtnList = ({ value = "", className = "", onClick }) => {
   return (
      <button className={` py-3 my-1 rounded-md w-[95%] hover:cursor-pointer active:opacity-70 ${className} border-b border-white hover:scale-103 ease-linear hover:bg-gradient-to-b from-30% from-zinc-800 to-zinc-700 `}
      onClick={onClick}
      >{value}</button>
   )
}

export default BtnList