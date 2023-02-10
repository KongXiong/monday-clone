import { useNavigate } from 'react-router-dom'
import { useTickets } from '../context.js'
import { deleteTicket } from '../services/tickets.js'

const DeleteBlock = ({ id }) => {
  const { tickets, setTickets } = useTickets()
  const navigate = useNavigate()

  const handleClick = async () => {
    const response = await deleteTicket(id)
    if (response.status === 200) {
      setTickets([...tickets.filter((t) => t._id != id)])
      navigate('/')
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
