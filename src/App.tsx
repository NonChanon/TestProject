import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import DataResult from "./pages/DataResult.tsx";
import DetailCollection from "./pages/DetailCollection.tsx";
import { InvoicePayment } from "./pages/InvoicePayment.tsx";
import RDTransaction from "./pages/RDTransaction.tsx";
import RecieptAS9 from "./pages/RecieptAS9.tsx";
import UserManagement from "./pages/UserManagement.tsx";
import RoleManagement from "./pages/RoleManagement.tsx";
import EditDetail from "./pages/EditDetail.tsx";
import Login from "./pages/Login.tsx";
import UseAuth from "./services/UseAuth.tsx";
import AddUser from "./users/AddUser.tsx";
import EditUser from "./users/EditUser.tsx";

function App() {
  const { isAuthen } = UseAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!isAuthen ? <Login /> : <Navigate to="/lots/all" />}
        />
        <Route
          path="/"
          element={
            isAuthen ? <Navigate to={"/lots/all"} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/lots/all"
          element={isAuthen ? <DataResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/lots/approved"
          element={isAuthen ? <DataResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/lots/pending"
          element={isAuthen ? <DataResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/lots/invaliddata"
          element={isAuthen ? <DataResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/lots/denied"
          element={isAuthen ? <DataResult /> : <Navigate to="/login" />}
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
          path="/:lotname/:customertaxid/edit"
          element={isAuthen ? <EditDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/rd/all"
          element={isAuthen ? <RDTransaction /> : <Navigate to="/login" />}
        />
        <Route
          path="/rd/success"
          element={isAuthen ? <RDTransaction /> : <Navigate to="/login" />}
        />
        <Route
          path="/rd/fail"
          element={isAuthen ? <RDTransaction /> : <Navigate to="/login" />}
        />
        <Route
          path="/reciept"
          element={isAuthen ? <RecieptAS9 /> : <Navigate to="/login" />}
        />
        <Route
          path="/usermanagement"
          element={isAuthen ? <UserManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/rolemanagement"
          element={isAuthen ? <RoleManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/:lotname"
          element={isAuthen ? <DetailCollection /> : <Navigate to="/login" />}
        />
        <Route
          path="/usermanagement/adduser"
          element={isAuthen ? <AddUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/usermanagement/edituser/:id"
          element={isAuthen ? <EditUser /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
