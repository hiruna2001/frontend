
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <BrowserRouter>
      <div className="w-full h-screen" >

        <Toaster position='top-right'/>
        <Routes paths="/">
              <Route path="/*" element={<HomePage />} />
              <Route path="/product" element={<h1>Product Page</h1>} />
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/admin/*" element={<AdminPage />} />


        </Routes>



      </div>


    </BrowserRouter>
  
  )
}

export default App
