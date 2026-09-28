import { customers } from '../services/mockData'

function Customers() {
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
              {customers.map((customer) => (
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