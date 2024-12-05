import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/AdminPanel';
import CustomerLogin from './components/CustomerLogin';
import CustomerSignup from "./components/CustomerSignup";


const App = (): JSX.Element => {
  return (
   <>
   <BrowserRouter>
    <Routes>
        {/* Login route */}
        <Route path="/login" element={<CustomerLogin />} />

        {/* Signup route */}
        <Route path="/signup" element={<CustomerSignup />} />

    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
