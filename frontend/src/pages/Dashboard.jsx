function Dashboard() {
  const metrics = [
    { label: 'Total Rooms', value: '48', detail: 'Across 3 room types', tone: 'blue' },
    { label: 'Available Rooms', value: '24', detail: '50% currently available', tone: 'green' },
    { label: 'Total Bookings', value: '126', detail: '18 check-ins this week', tone: 'orange' },
    { label: 'Total Customers', value: '312', detail: '14 new this month', tone: 'purple' },
  ]

  return (
    <>
      <header className="page-header dashboard-header">
        <div><h1>Dashboard</h1><p>Welcome back. Here is today&apos;s hotel overview.</p></div>
        <span className="dashboard-date">Saturday, September 26, 2026</span>
      </header>
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
        <div className="summary-heading"><h2>Today&apos;s overview</h2><span>Dummy operational data</span></div>
        <div className="summary-row"><span>Occupancy rate</span><strong>50%</strong></div>
        <div className="summary-row"><span>Pending check-ins</span><strong>8</strong></div>
        <div className="summary-row"><span>Pending check-outs</span><strong>5</strong></div>
      </section>
    </>
  )
}

export default Dashboard