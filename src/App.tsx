import "./App.css"
import Navbar from './components/Navbar'
// import { useAuth } from 'react-auth-hook';
import { Routes, Route, Navigate } from "react-router-dom"
import DataResult from './pages/DataResult.tsx'
import DetailCollection from './pages/DetailCollection.tsx'
import { InvoicePayment } from './pages/InvoicePayment.tsx'
import RDTransaction from './pages/RDTransaction.tsx'
import RecieptAS9 from './pages/RecieptAS9.tsx'
import UserManagement from "./pages/UserManagement.tsx"
import RoleManagement from "./pages/RoleManagement.tsx"
import Login from "./pages/Login.tsx"

function App() {
  // const isAuthen  = useAuth();
  return (
    <>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<Navigate to="/usermanagement" />} />
      <Route path="/login" element={<Login />} />
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
      <Route path="/rolemanagement" element={<RoleManagement />} />
    </Routes>
    </>
  )
}

export default App
