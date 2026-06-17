
import Header from './header.jsx'
function App() {
  

  return (
    <>
    <div className="grid lg:grid-cols-[0.8fr_3.2fr]  gap-0">
      <Header/>
      <div className="border-2 border-black h-[1200px]">

      </div>
    </div>
    </>
  )
}

export default App

import Header from './header.jsx'
import Dashboard from './Pages/dashboard.jsx'
import Transaction from './Pages/transaction.jsx'
function App() {
  

  return (
    <>
    <div className="grid lg:grid-cols-[0.8fr_3.2fr] ">
      <Header/>
      <Transaction/>
    </div>
    </>
  )
}

export default App
