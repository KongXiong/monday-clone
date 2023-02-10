import axios from 'axios'

export const getTickets = async () => {
  const ticket = await axios
    .get('http://localhost:8000/tickets')
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log('Error getting Tickets!')
      return Promise.reject(error)
    })
  return ticket
}

export const getTicket = async (id) => {
  const ticket = await axios
    .get(`http://localhost:8000/tickets/${id}`)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      console.log(`Error getting ticket! ${id}`)
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
    .catch((error) => {
      console.log(`Error deleting ticket! ${id}`)
      return Promise.reject(error)
    })
  return response
}
