import React from 'react'
import style from "./Message.module.scss"
const Message = ({message}: {message: Message}) => {
  return (
    <div className={style[message.sender] + " " + style["message"]}>
      {message.message}
    </div>
  )
}

export default Message
