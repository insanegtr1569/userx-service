import { useEffect,useState } from 'react';import { api } from '../api/client';
export default function Dashboard(){const [bookings,setBookings]=useState([]);useEffect(()=>{api.get('/bookings/me').then(r=>setBookings(r.data));},[]);
return <div className='p-4'><h2>My Bookings</h2><div className='space-y-3'>{bookings.map(b=><div key={b._id} className='card'>{b.bike?.name} | {b.status} | ₹{b.totalPrice}</div>)}</div></div>}
