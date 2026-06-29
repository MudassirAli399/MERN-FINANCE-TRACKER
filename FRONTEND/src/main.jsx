import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './Pages/dashboard.jsx'
import Transaction from './Pages/transaction.jsx'
import Reports from './Pages/reports.jsx'
import Budgetplanner from './Pages/budgetplanner.jsx'
import CreateAccount from './Pages/createaccount.jsx'
import Login from './Pages/loginaccount.jsx'
import { Provider } from 'react-redux'
import store from './Store/configure.js'
import EmailStep from './Pages/Forgot Password/email.jsx'
import OtpStep from './Pages/Forgot Password/otp.jsx'
import NewPasswordStep from './Pages/Forgot Password/password.jsx'
import App from './App.jsx'
import Layout from "./Pages/Layout.jsx"
import {RouterProvider,Route,createBrowserRouter,createRoutesFromElements} from "react-router-dom"

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={<Dashboard />} />
      <Route path="transaction" element={<Transaction />} />
      <Route path="reports" element={<Reports />} />
      <Route path="budgetplanner" element={<Budgetplanner />} />
      <Route path="create" element={<CreateAccount />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<EmailStep />} /> 
      <Route path="forgot-password/otp" element={<OtpStep />} />
      <Route path="forgot-password/new-password" element={<NewPasswordStep />} />
    </Route> 
                          )                         
                                  )


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={route} />
  </Provider>
                                                  )
