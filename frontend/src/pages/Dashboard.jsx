import { useEffect, useState } from 'react'
import api from '../services/api'

function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await api.get('/dashboard/summary')

        if (!response.data || typeof response.data !== 'object') {
          throw new Error('Invalid dashboard summary response')
        }

        setSummary(response.data)
      } catch {
        setErrorMessage('Unable to load dashboard summary. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadSummary()
  }, [])

  const displayValue = (value) => {
    if (isLoading) return '...'
    if (errorMessage || value === undefined || value === null) return '—'
    return value
  }

  const metrics = [
    { label: 'Total Rooms', value: displayValue(summary?.totalRooms), detail: 'Live room inventory', tone: 'blue' },
    { label: 'Available Rooms', value: displayValue(summary?.availableRooms), detail: 'Currently available', tone: 'green' },
    { label: 'Total Bookings', value: displayValue(summary?.totalBookings), detail: 'All reservations', tone: 'orange' },
    { label: 'Total Customers', value: displayValue(summary?.totalCustomers), detail: 'Registered customers', tone: 'purple' },
  ]

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <header className="page-header dashboard-header">
        <div><h1>Dashboard</h1><p>Welcome back. Here is today&apos;s hotel overview.</p></div>
        <span className="dashboard-date">{today}</span>
      </header>
      {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
      <section className="metric-grid" aria-label="Hotel summary metrics">
        {metrics.map((metric) => (
          <article className={`metric-card ${metric.tone}`} key={metric.label}>
            <span className="metric-label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <span className="metric-detail">{metric.detail}</span>
          </article>
        ))}
      </section>
      <section className="dashboard-summary">
        <div className="summary-heading"><h2>Today&apos;s overview</h2><span>Live operational data</span></div>
        <div className="summary-row"><span>Occupancy rate</span><strong>{displayValue(summary?.occupancyRate)}{!isLoading && !errorMessage && summary?.occupancyRate !== undefined ? '%' : ''}</strong></div>
        <div className="summary-row"><span>Pending check-ins</span><strong>{displayValue(summary?.pendingCheckIns)}</strong></div>
        <div className="summary-row"><span>Pending check-outs</span><strong>{displayValue(summary?.pendingCheckOuts)}</strong></div>
      </section>
    </>
  )
}

export default Dashboard