import React from 'react'
import './css/Button.css'

const Button = (props) => {
  return (
    <button {...props} className={'button ' + props.className}/>
  )
}

export default Button