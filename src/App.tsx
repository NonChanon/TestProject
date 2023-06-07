import "./App.css"
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import DataResult from './pages/DataResult.tsx'
import DetailCollection from './pages/DetailCollection.tsx'
import { InvoicePayment } from './pages/InvoicePayment.tsx'
import RDTransaction from './pages/RDTransaction.tsx'
import RecieptAS9 from './pages/RecieptAS9.tsx'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<DataResult />} />
      <Route path='/invoice' element={<InvoicePayment />} />
      <Route path='/detail' element={<DetailCollection />} />
      <Route path='/transaction' element={<RDTransaction />} />
      <Route path='/reciept' element={<RecieptAS9 />} />
    </Routes>
    </>
  )
}

export default App
