import React from 'react'
import blankAvatar from '../images/avatar.jpeg'

const AvatarDisplay = ({ ticket }) => {
  return (
    <div className="avatar-container">
      <div className="img-container">
        <img src={ticket.avatar ? ticket.avatar : blankAvatar} alt="avatar" />
      </div>
    </div>
  )
}

export default AvatarDisplay
