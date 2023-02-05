import React from 'react'
import { getColor } from '../utils/getColor.js'

const StatusDisplay = ({ status }) => {
  return (
    <div
      className="status-display"
      style={{ backgroundColor: getColor(status) }}
    >
      {status}
    </div>
  )
}

export default StatusDisplay
