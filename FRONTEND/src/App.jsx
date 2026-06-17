

import Header from './header.jsx'
import Dashboard from './Pages/dashboard.jsx'
import Transaction from './Pages/transaction.jsx'
import Budgetplanner from './Pages/budgetplanner.jsx'
function App() {
  

  return (
    <>
    <div className="grid lg:grid-cols-[0.8fr_3.2fr] ">
      <Header/>
      <Budgetplanner/>
    </div>
    </>
  )
}

export default App
