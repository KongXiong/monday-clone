import { createContext, useContext, useEffect, useState } from 'react'
import { getTickets } from './services/tickets.js'

const CategoriesContext = createContext()
const TicketsContext = createContext()

export const useCategories = () => {
  return useContext(CategoriesContext)
}

export const useTickets = () => {
  return useContext(TicketsContext)
}

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([])

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const res = async () => {
      const tickets = await getTickets()
      setTickets(tickets)
    }
    res()
  }, [])

  return (
    <TicketsContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketsContext.Provider>
  )
}
