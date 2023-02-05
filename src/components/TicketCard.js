import React from 'react'
import { Link } from 'react-router-dom'
import AvatarDisplay from './AvatarDisplay.js'
import DeleteBlock from './DeleteBlock.js'
import PriorityDisplay from './PriorityDisplay.js'
import ProgressDisplay from './ProgressDisplay.js'
import StatusDisplay from './StatusDisplay.js'

const TicketCard = ({ color, ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-color" style={{ backgroundColor: color }}></div>
      <Link to={`/tickets/${ticket._id}`} id="link">
        <h3>{ticket.title}</h3>
        <AvatarDisplay ticket={ticket} />
        <StatusDisplay status={ticket.status} />
        <PriorityDisplay priority={ticket.priority} />
        <ProgressDisplay progress={ticket.progress} />
      </Link>
      <DeleteBlock id={ticket._id} />
    </div>
  )
}

export default TicketCard
