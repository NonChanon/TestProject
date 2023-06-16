import "./App.css"
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom"
import DataResult from './pages/DataResult.tsx'
import DetailCollection from './pages/DetailCollection.tsx'
import { InvoicePayment } from './pages/InvoicePayment.tsx'
import RDTransaction from './pages/RDTransaction.tsx'
import RecieptAS9 from './pages/RecieptAS9.tsx'
import UserManagement from "./pages/UserManagement.tsx"
import RoleManagement from "./pages/RoleManagement.tsx"
import EditDetail from "./pages/EditDetail.tsx"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<EditDetail />} />
      <Route path="/lots/all" element={<DataResult />} />
      <Route path="/lots/approved" element={<DataResult />} />
      <Route path="/lots/pending" element={<DataResult />} />
      <Route path="/lots/invaliddata" element={<DataResult />} />
      <Route path="/lots/denied" element={<DataResult />} />
      <Route path='/invoice' element={<InvoicePayment />} />
      <Route path='/detail' element={<DetailCollection />} />
      <Route path="/:lotname/:customertaxid/edit" element={<EditDetail />} />
      <Route path='/rd/all' element={<RDTransaction />} />
      <Route path='/rd/success' element={<RDTransaction />} />
      <Route path='/rd/fail' element={<RDTransaction />} />
      <Route path='/reciept' element={<RecieptAS9 />} />
      <Route path="/lots" element={<DataResult />} />
      <Route path="/usermanagement" element={<UserManagement />} />
      <Route path="/rolemanagement" element={<RoleManagement />} />
      <Route path="/:lotname" element={<DetailCollection />} />
    </Routes>
    </>
  )
}

export default App
