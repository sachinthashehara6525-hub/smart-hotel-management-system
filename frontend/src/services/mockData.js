export const rooms = [
  { number: '101', type: 'Single', price: '$85 / night', status: 'Available' },
  { number: '102', type: 'Double', price: '$120 / night', status: 'Occupied' },
  { number: '103', type: 'Single', price: '$85 / night', status: 'Available' },
  { number: '201', type: 'Deluxe', price: '$180 / night', status: 'Available' },
  { number: '202', type: 'Suite', price: '$250 / night', status: 'Maintenance' },
  { number: '203', type: 'Deluxe', price: '$180 / night', status: 'Occupied' },
  { number: '301', type: 'Double', price: '$120 / night', status: 'Occupied' },
  { number: '302', type: 'Deluxe', price: '$180 / night', status: 'Available' },
]

export const bookings = [
  { id: 'BK-1001', customer: 'Ava Johnson', room: '101', checkIn: '2026-09-26', checkOut: '2026-09-29', status: 'Confirmed' },
  { id: 'BK-1002', customer: 'Liam Williams', room: '201', checkIn: '2026-09-27', checkOut: '2026-10-02', status: 'Checked-in' },
  { id: 'BK-1003', customer: 'Sophia Brown', room: '301', checkIn: '2026-09-28', checkOut: '2026-10-01', status: 'Confirmed' },
  { id: 'BK-1004', customer: 'Noah Davis', room: '202', checkIn: '2026-09-25', checkOut: '2026-09-27', status: 'Completed' },
  { id: 'BK-1005', customer: 'Olivia Wilson', room: '102', checkIn: '2026-09-30', checkOut: '2026-10-04', status: 'Confirmed' },
  { id: 'BK-1006', customer: 'Ethan Martinez', room: '203', checkIn: '2026-10-01', checkOut: '2026-10-05', status: 'Confirmed' },
]

export const customers = [
  { id: 'CUS-001', name: 'Ava Johnson', email: 'ava.johnson@example.com', phone: '+1 (555) 014-2086' },
  { id: 'CUS-002', name: 'Liam Williams', email: 'liam.williams@example.com', phone: '+1 (555) 017-4392' },
  { id: 'CUS-003', name: 'Sophia Brown', email: 'sophia.brown@example.com', phone: '+1 (555) 012-7741' },
  { id: 'CUS-004', name: 'Noah Davis', email: 'noah.davis@example.com', phone: '+1 (555) 019-6250' },
  { id: 'CUS-005', name: 'Olivia Wilson', email: 'olivia.wilson@example.com', phone: '+1 (555) 016-3817' },
  { id: 'CUS-006', name: 'Ethan Martinez', email: 'ethan.martinez@example.com', phone: '+1 (555) 011-9463' },
]
