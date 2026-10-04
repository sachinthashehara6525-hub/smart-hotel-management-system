import { useEffect, useState } from 'react'
import api from '../services/api'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await api.get('/customers')

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid customers response')
        }

        setCustomers(response.data)
      } catch {
        setErrorMessage('Unable to load customers. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCustomers()
  }, [])

  return (
    <>
      <header className="page-header">
        <h1>Customers</h1>
        <p>View guest contact details and customer records.</p>
      </header>
      <section className="table-card customers-card">
        <div className="table-heading"><h2>Customer directory</h2><span>{customers.length} customers listed</span></div>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
            <tbody>
              {isLoading && <tr><td colSpan="3">Loading customers...</td></tr>}
              {!isLoading && errorMessage && <tr><td colSpan="3">{errorMessage}</td></tr>}
              {!isLoading && !errorMessage && customers.length === 0 && <tr><td colSpan="3">No customers found.</td></tr>}
              {!isLoading && !errorMessage && customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="customer-name">{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Customers