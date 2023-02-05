import axios from 'axios'

export const getTickets = async () => {
  const ticket = await axios
    .get('http://localhost:8000/tickets')
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log('Show error notification!')
      return Promise.reject(error)
    })
  return ticket
}

export const deleteTicket = async (id) => {
  const response = await axios
    .delete(`http://localhost:8000/tickets/${id}`)
    .then((response) => {
      return response
    })
    .catch(function (error) {
      console.log('Show error notification!')
      return Promise.reject(error)
    })
  return response
}
