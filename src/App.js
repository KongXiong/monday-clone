import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav.js'
import { CategoriesProvider, TicketsProvider } from './context.js'
import Dashboard from './pages/Dashboard.js'
import Ticket from './pages/Ticket.js'

const App = () => {
  return (
    <div className="app">
      <TicketsProvider>
        <CategoriesProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/ticket/:id" element={<Ticket editMode={true} />} />
            </Routes>
          </BrowserRouter>
        </CategoriesProvider>
      </TicketsProvider>
    </div>
  )
}

export default App
