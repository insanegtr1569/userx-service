import { useEffect,useState } from 'react';import { api } from '../../api/client';import { Link } from 'react-router-dom';
export default function AdminDashboard(){const [bookings,setBookings]=useState([]);useEffect(()=>{api.get('/admin/bookings').then(r=>setBookings(r.data));},[]);
const revenue=bookings.filter(b=>b.paymentStatus==='paid').reduce((a,b)=>a+b.totalPrice,0);
return <div className='p-4'><Link to='/admin/bikes'>Manage Bikes</Link><div className='grid md:grid-cols-3 gap-4 my-4'><div className='card'>Total: {bookings.length}</div><div className='card'>Revenue: ₹{revenue}</div><div className='card'>Active: {bookings.filter(b=>b.status==='active').length}</div></div></div>}
