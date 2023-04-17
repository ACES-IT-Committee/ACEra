import React from 'react'
import style from "./Message.module.scss"
import { motion } from 'framer-motion'
import parse from "html-react-parser"
const Message = ({message}: {message: Message}) => {
  return (
    <motion.div
      whileInView={{ x: [message.sender == "user" ? -100 : 100, 0], scale: [0.5, 1.0], opacity: [0.3, 1.0] }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05}}
      viewport={{once: true}}
      className={style[message.sender] + " " + style["message"]}

    >
      {parse(message.message)}
    </motion.div>
  )
}

export default Message
