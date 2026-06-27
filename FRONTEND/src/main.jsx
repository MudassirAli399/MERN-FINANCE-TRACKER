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
      <Route path="/create" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      

    </Route>
    
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={route} />
  </Provider>
)
