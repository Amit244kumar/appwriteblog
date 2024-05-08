import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './AppWrite/Auth'
import './App.css'
import {login,logout} from './store/authSlice'
// import Header from './components/index'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  // console.log(import.meta.env.VITE_APPWRITE_DATABASE_ID)
  
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  // alert(conf.appwriteDatabaseId)
  useEffect(()=>{
    // console.log(authService.getCurrentUser())  
    authService.getCurrentUser()
    .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
    })  
    .finally(()=>setLoading(false))
  },[]) 
  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main> 
          todo:<Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App