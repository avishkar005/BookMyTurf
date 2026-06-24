export const kpis = [
  {
    label: 'Total Turfs',
    value: '8',
    change: '+2 this month',
    tone: 'emerald',
  },
  {
    label: 'Active Bookings',
    value: '42',
    change: '+18% from last week',
    tone: 'cyan',
  },
  {
    label: 'Revenue',
    value: 'Rs. 2.48L',
    change: '+24% this month',
    tone: 'emerald',
  },
  {
    label: 'Customers',
    value: '1,284',
    change: '+96 new users',
    tone: 'teal',
  },
  {
    label: 'Occupancy Rate',
    value: '78%',
    change: '+9% vs last month',
    tone: 'cyan',
  },
  {
    label: 'Average Rating',
    value: '4.8',
    change: '312 reviews',
    tone: 'emerald',
  },
]

export const revenueData = [
  { name: 'Mon', revenue: 18000 },
  { name: 'Tue', revenue: 24000 },
  { name: 'Wed', revenue: 21000 },
  { name: 'Thu', revenue: 31000 },
  { name: 'Fri', revenue: 42000 },
  { name: 'Sat', revenue: 59000 },
  { name: 'Sun', revenue: 52000 },
]

export const bookingTrendData = [
  { name: 'Week 1', bookings: 112 },
  { name: 'Week 2', bookings: 148 },
  { name: 'Week 3', bookings: 132 },
  { name: 'Week 4', bookings: 176 },
]

export const peakHoursData = [
  { hour: '6 AM', bookings: 8 },
  { hour: '9 AM', bookings: 14 },
  { hour: '12 PM', bookings: 10 },
  { hour: '3 PM', bookings: 19 },
  { hour: '6 PM', bookings: 36 },
  { hour: '9 PM', bookings: 28 },
]

export const utilizationData = [
  { name: 'Football', value: 86 },
  { name: 'Cricket', value: 74 },
  { name: 'Badminton', value: 68 },
  { name: 'Pickleball', value: 52 },
]

export const turfs = [
  {
    id: 1,
    name: 'Emerald Football Arena',
    sport: 'Football',
    price: 'Rs. 1,500/hr',
    status: 'Active',
    occupancy: 86,
    image: '/images/football.jpg',
  },
  {
    id: 2,
    name: 'Prime Cricket Box',
    sport: 'Cricket',
    price: 'Rs. 1,200/hr',
    status: 'Active',
    occupancy: 74,
    image: '/images/cricket.jpg',
  },
  {
    id: 3,
    name: 'Smash Badminton Court',
    sport: 'Badminton',
    price: 'Rs. 650/hr',
    status: 'Maintenance',
    occupancy: 58,
    image: '/images/badminton.jpg',
  },
  {
    id: 4,
    name: 'Urban Pickleball Hub',
    sport: 'Pickleball',
    price: 'Rs. 800/hr',
    status: 'Active',
    occupancy: 63,
    image: '/images/pickleball.jpg',
  },
]

export const bookings = [
  {
    id: 101,
    customer: 'Rahul Sharma',
    turf: 'Emerald Football Arena',
    time: 'Today, 7:00 PM',
    amount: 'Rs. 1,500',
    status: 'Pending',
  },
  {
    id: 102,
    customer: 'Aman Verma',
    turf: 'Prime Cricket Box',
    time: 'Today, 8:00 PM',
    amount: 'Rs. 1,200',
    status: 'Confirmed',
  },
  {
    id: 103,
    customer: 'Sneha Patel',
    turf: 'Smash Badminton Court',
    time: 'Yesterday, 6:00 PM',
    amount: 'Rs. 650',
    status: 'Completed',
  },
  {
    id: 104,
    customer: 'Nikhil Rao',
    turf: 'Urban Pickleball Hub',
    time: 'Tomorrow, 9:00 PM',
    amount: 'Rs. 800',
    status: 'Cancelled',
  },
]

export const calendarSlots = [
  { time: '06:00', title: 'Football training', status: 'Confirmed' },
  { time: '09:00', title: 'School cricket batch', status: 'Confirmed' },
  { time: '13:00', title: 'Maintenance block', status: 'Blocked' },
  { time: '18:00', title: 'Corporate football', status: 'Pending' },
  { time: '21:00', title: 'Open slot', status: 'Available' },
]

export const topCustomers = [
  { name: 'Rahul Sharma', bookings: 18, spend: 'Rs. 24,500' },
  { name: 'Aman Verma', bookings: 14, spend: 'Rs. 18,200' },
  { name: 'Sneha Patel', bookings: 11, spend: 'Rs. 12,700' },
]

export const customerGrowthData = [
  { name: 'Jan', customers: 520 },
  { name: 'Feb', customers: 610 },
  { name: 'Mar', customers: 760 },
  { name: 'Apr', customers: 890 },
  { name: 'May', customers: 1040 },
  { name: 'Jun', customers: 1284 },
]

export const reviews = [
  {
    name: 'Karan Mehta',
    rating: 5,
    text: 'Great turf quality and smooth booking experience.',
  },
  {
    name: 'Priya Nair',
    rating: 4,
    text: 'Clean court, friendly staff, and good lighting.',
  },
  {
    name: 'Mohit Jain',
    rating: 5,
    text: 'Best evening football slots in this area.',
  },
]

export const aiInsights = [
  '6 PM to 9 PM is your strongest booking window. Keep premium pricing for these slots.',
  'Badminton court has lower weekday utilization. Add a weekday morning discount.',
  'Cricket box repeat customers are increasing. Create a monthly pass offer.',
]

export const notifications = [
  { title: 'New booking request', detail: 'Rahul requested 7 PM football slot.' },
  { title: 'Payment received', detail: 'Rs. 1,200 received for Cricket Box.' },
  { title: 'Review added', detail: 'Karan gave Emerald Football Arena 5 stars.' },
  { title: 'Cancellation', detail: 'Nikhil cancelled tomorrow pickleball slot.' },
]

export const activity = [
  'Booking approved for Prime Cricket Box.',
  'Maintenance slot blocked for Badminton Court.',
  'New customer joined from mobile app.',
  'Owner replied to Karan Mehta review.',
]

