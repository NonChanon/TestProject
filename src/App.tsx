import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import DataResult from "./pages/DataResult.tsx";
import DetailCollection from "./pages/DetailCollection.tsx";
import InvoicePayment from "./pages/InvoicePayment.tsx";
import RDTransaction from "./pages/RDTransaction.tsx";
import RDDetailCollection from "./pages/RDDetailCollection.tsx";
import RDEditDetail from "./pages/RDEditDetail.tsx";
import RecieptAS9 from "./pages/RecieptAS9.tsx";
import UserManagement from "./pages/UserManagement.tsx";
import RoleManagement from "./pages/RoleManagement.tsx";
import EditDetail from "./pages/EditDetail.tsx";
import Login from "./pages/Login.tsx";
import UseAuth from "./services/UseAuth.tsx";
import AddUser from "./users/AddUser.tsx";

import "react-datepicker/dist/react-datepicker.css";
import { ProtectRoute } from "./services/ProtectRoute.tsx";

function App() {
  const { isAuthen } = UseAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!isAuthen ? <Login /> : <Navigate to="/batchdataresult" />}
        />
        <Route
          path="/"
          element={
            isAuthen ? (
              <Navigate to={"/batchdataresult"} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/batchdataresult"
          element={isAuthen ? <DataResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/batchdataresult/:lotname"
          element={
            isAuthen ? (
              <ProtectRoute>
                <DetailCollection />
              </ProtectRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/batchdataresult/:lotname/:customertaxid/edit"
          element={
            isAuthen ? (
              <ProtectRoute>
                <EditDetail />
              </ProtectRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/invoice"
          element={isAuthen ? <InvoicePayment /> : <Navigate to="/login" />}
        />
        <Route
          path="/detail"
          element={isAuthen ? <DetailCollection /> : <Navigate to="/login" />}
        />
        <Route
          path="/rd"
          element={isAuthen ? <RDTransaction /> : <Navigate to="/login" />}
        />
        <Route
          path="/rd/:lotName"
          element={isAuthen ? <RDDetailCollection /> : <Navigate to="/login" />}
        />
        <Route
          path="/rd/:lotname/:customertaxid/edit"
          element={isAuthen ? <RDEditDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/reciept"
          element={isAuthen ? <RecieptAS9 /> : <Navigate to="/login" />}
        />
        <Route
          path="/usermanagement"
          element={
            isAuthen ? (
              <ProtectRoute>
                <UserManagement />
              </ProtectRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rolemanagement"
          element={
            isAuthen ? (
              <ProtectRoute>
                <RoleManagement />
              </ProtectRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/usermanagement/adduser"
          element={isAuthen ? <AddUser /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
