import "./App.css"
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom"
import DataResult from './pages/DataResult.tsx'
import DetailCollection from './pages/DetailCollection.tsx'
import { InvoicePayment } from './pages/InvoicePayment.tsx'
import RDTransaction from './pages/RDTransaction.tsx'
import RecieptAS9 from './pages/RecieptAS9.tsx'
import UserManagement from "./pages/UserManagement.tsx"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/usermanagement" />} />
      <Route path="/lots" element={<DataResult />} />
      <Route path="/approved" element={<DataResult />} />
      <Route path="/pending" element={<DataResult />} />
      <Route path="/invaliddata" element={<DataResult />} />
      <Route path="/denied" element={<DataResult />} />
      <Route path='/invoice' element={<InvoicePayment />} />
      <Route path='/detail' element={<DetailCollection />} />
      <Route path='/transaction' element={<RDTransaction />} />
      <Route path='/reciept' element={<RecieptAS9 />} />
      <Route path="/lots" element={<DataResult />} />
      <Route path="/usermanagement" element={<UserManagement />} />
    </Routes>
    </>
  )
}

export default App
