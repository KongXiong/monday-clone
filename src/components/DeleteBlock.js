import { useTickets } from '../context.js'
import { deleteTicket } from '../services/tickets.js'

const DeleteBlock = ({ id }) => {
  const { setTickets } = useTickets()

  const handleClick = async () => {
    const response = await deleteTicket(id)
    if (response.status === 200) {
      setTickets()
    }
  }
  return (
    <div className="delete-block">
      <div className="delete-icon" onClick={handleClick}>
        X
      </div>
    </div>
  )
}

export default DeleteBlock
