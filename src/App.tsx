import "./App.css"
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom"
import DataResult from './pages/DataResult.tsx'
import DetailCollection from './pages/DetailCollection.tsx'
import InvoicePayment from "./pages/InvoicePayment.tsx"
import RDTransaction from './pages/RDTransaction.tsx'
import RecieptAS9 from './pages/RecieptAS9.tsx'
import UserManagement from "./pages/UserManagement.tsx"
import RoleManagement from "./pages/RoleManagement.tsx"
import EditDetail from "./pages/EditDetail.tsx"
import PopupButt from "./components/PopupButt.tsx"

import "react-datepicker/dist/react-datepicker.css"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/lots/all"} />} />
        <Route path="/lots/all" element={<DataResult />} />
        <Route path="/lots/approved" element={<DataResult />} />
        <Route path="/lots/pending" element={<DataResult />} />
        <Route path="/lots/invaliddata" element={<DataResult />} />
        <Route path="/lots/denied" element={<DataResult />} />
        <Route path='/invoice/all' element={<InvoicePayment />} />
        <Route path='/invoice/approved' element={<RDTransaction />} />
        <Route path='/invoice/pending' element={<RDTransaction />} />
        <Route path='/detail' element={<DetailCollection />} />
        <Route path="/:lotname/:customertaxid/edit" element={<EditDetail />} />
        <Route path='/rd/all' element={<RDTransaction />} />
        <Route path='/rd/success' element={<RDTransaction />} />
        <Route path='/rd/fail' element={<RDTransaction />} />
        <Route path='/reciept' element={<RecieptAS9 />} />
        <Route path="/lots" element={<Navigate to={"/lots/all"} />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/rolemanagement" element={<RoleManagement />} />
        <Route path="/:lotname" element={<DetailCollection />} />
      </Routes>
    </>
    // <PopupButt />
  )
}

export default App