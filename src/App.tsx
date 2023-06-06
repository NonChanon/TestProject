import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import DataResult from './pages/DataResult'
import DetailCollection from './pages/DetailCollection'
import { InvoicePayment } from './pages/InvoicePayment'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<DataResult />} />
      <Route path='/invoice' element={<InvoicePayment />} />
      <Route path="/detail" element={<DetailCollection />} />
    </Routes>
    </>
  )
}

export default App
