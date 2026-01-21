
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'
import TestPage from './pages/test'
import RegisterPage from './pages/registerPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPasswordPage from './pages/forgetPassword'
import UserSettingsPage from './pages/settings'
function App() {

  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="w-full h-screen" >

        <Toaster position='top-right'/>
        <Routes paths="/">
              <Route path="/*" element={<HomePage />} />
              <Route path="/product" element={<h1>Product Page</h1>} />
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/forget-password" element={<ForgetPasswordPage/>} />
              <Route path="/settings" element={<UserSettingsPage/>} />


        </Routes>



      </div>

      </GoogleOAuthProvider>
    </BrowserRouter>
  
  )
}

export default App
