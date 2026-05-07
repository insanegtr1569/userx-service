import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';import BikeDetail from './pages/BikeDetail';import Dashboard from './pages/Dashboard';import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';import ManageBikes from './pages/admin/ManageBikes';
const Guard=({children,admin})=>{const {user}=useAuth(); if(!user) return <Navigate to='/login'/>; if(admin&&user.role!=='admin') return <Navigate to='/'/>; return children;};
export default function App(){const {user,dark,setDark,logout}=useAuth();
return <div><nav className='p-4 flex gap-4 card m-3'><Link to='/'>BikeRentX</Link><button onClick={()=>setDark(!dark)}>Theme</button>{user?<><Link to='/dashboard'>Dashboard</Link>{user.role==='admin'&&<Link to='/admin'>Admin</Link>}<button onClick={logout}>Logout</button></>:<Link to='/login'>Login</Link>}</nav>
<Routes><Route path='/' element={<Home/>}/><Route path='/login' element={<Login/>}/><Route path='/bikes/:id' element={<BikeDetail/>}/><Route path='/dashboard' element={<Guard><Dashboard/></Guard>}/><Route path='/admin' element={<Guard admin><AdminDashboard/></Guard>}/><Route path='/admin/bikes' element={<Guard admin><ManageBikes/></Guard>}/></Routes></div>}
