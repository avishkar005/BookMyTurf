const turfs = [
  {
    id: 1,
    name: "Green Arena",
    city: "Pune",
    address: "Baner, Pune",
    owner: "Rahul Patil",
    phone: "919876543210",
    image: "/images/football.jpg",
    rating: 4.8,
    sports: [
      {
        id: 1,
        name: "Football",
        price: 900,
        capacity: "10 vs 10",
        slots: [
          "06:00 AM - 07:00 AM",
          "07:00 AM - 08:00 AM",
          "05:00 PM - 06:00 PM",
          "06:00 PM - 07:00 PM",
          "07:00 PM - 08:00 PM",
        ],
      },
      {
        id: 2,
        name: "Cricket",
        price: 1200,
        capacity: "22 Players",
        slots: [
          "08:00 AM - 09:00 AM",
          "09:00 AM - 10:00 AM",
          "04:00 PM - 05:00 PM",
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Champion Box",
    city: "Mumbai",
    address: "Andheri West, Mumbai",
    owner: "Amit Shah",
    phone: "919812345678",
    image: "/images/cricket.jpg",
    rating: 4.9,
    sports: [
      {
        id: 1,
        name: "Cricket",
        price: 1500,
        capacity: "22 Players",
        slots: [
          "06:00 AM - 07:00 AM",
          "08:00 AM - 09:00 AM",
          "06:00 PM - 07:00 PM",
        ],
      },
      {
        id: 2,
        name: "Football",
        price: 1000,
        capacity: "10 vs 10",
        slots: [
          "07:00 AM - 08:00 AM",
          "05:00 PM - 06:00 PM",
        ],
      },
    ],
  },

  {
    id: 3,
    name: "Ace Court",
    city: "Bangalore",
    address: "Whitefield, Bangalore",
    owner: "Kiran Kumar",
    phone: "919998887777",
    image: "/images/badminton.jpg",
    rating: 4.7,
    sports: [
      {
        id: 1,
        name: "Badminton",
        price: 500,
        capacity: "4 Players",
        slots: [
          "06:00 AM - 07:00 AM",
          "07:00 AM - 08:00 AM",
          "08:00 PM - 09:00 PM",
        ],
      },
      {
        id: 2,
        name: "Table Tennis",
        price: 350,
        capacity: "2 Players",
        slots: [
          "09:00 AM - 10:00 AM",
          "10:00 AM - 11:00 AM",
          "05:00 PM - 06:00 PM",
        ],
      },
    ],
  },

  {
    id: 4,
    name: "Victory Sports Hub",
    city: "Hyderabad",
    address: "Madhapur, Hyderabad",
    owner: "Suresh Reddy",
    phone: "919955443322",
    image: "/images/basketball.jpg",
    rating: 4.6,
    sports: [
      {
        id: 1,
        name: "Basketball",
        price: 800,
        capacity: "10 Players",
        slots: [
          "06:00 AM - 07:00 AM",
          "07:00 PM - 08:00 PM",
          "08:00 PM - 09:00 PM",
        ],
      },
      {
        id: 2,
        name: "Volleyball",
        price: 700,
        capacity: "12 Players",
        slots: [
          "08:00 AM - 09:00 AM",
          "05:00 PM - 06:00 PM",
        ],
      },
    ],
  },

  {
    id: 5,
    name: "Elite Sports Club",
    city: "Nagpur",
    address: "Wardha Road, Nagpur",
    owner: "Vikram Joshi",
    phone: "919911223344",
    image: "/images/football.jpg",
    rating: 4.5,
    sports: [
      {
        id: 1,
        name: "Football",
        price: 850,
        capacity: "10 vs 10",
        slots: [
          "06:00 AM - 07:00 AM",
          "07:00 AM - 08:00 AM",
          "06:00 PM - 07:00 PM",
        ],
      },
      {
        id: 2,
        name: "Badminton",
        price: 450,
        capacity: "4 Players",
        slots: [
          "09:00 AM - 10:00 AM",
          "07:00 PM - 08:00 PM",
        ],
      },
    ],
  },

  {
    id: 6,
    name: "PlayMax Arena",
    city: "Delhi",
    address: "Dwarka, Delhi",
    owner: "Rohan Mehta",
    phone: "919900112233",
    image: "/images/cricket.jpg",
    rating: 4.9,
    sports: [
      {
        id: 1,
        name: "Cricket",
        price: 1800,
        capacity: "22 Players",
        slots: [
          "06:00 AM - 07:00 AM",
          "07:00 AM - 08:00 AM",
          "08:00 PM - 09:00 PM",
        ],
      },
      {
        id: 2,
        name: "Football",
        price: 1300,
        capacity: "10 vs 10",
        slots: [
          "05:00 PM - 06:00 PM",
          "06:00 PM - 07:00 PM",
        ],
      },
    ],
  },
]

export default turfs