import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/AdminPanel';
import CustomerLogin from './components/CustomerLogin';
import CustomerSignup from "./components/CustomerSignup";
import VendorLogin from "./components/VendorLogin";
import VendorSignup from "./components/VendorSignup";
import WelcomePage from './components/WelcomePage';
import "./components/init"
import VendorDashboard from "./components/VendorDashboard";
import CustomerDashboard from "./components/CustomerDashboard";


const App = (): JSX.Element => {
  return (
   <>
   <script type="application/javascript">
  var global = window;
</script>
   <BrowserRouter>
    <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/adminPanel" element={<AdminPanel/>}/>
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/vendor/login" element ={<VendorLogin/>}/>
        <Route path="/vendor/signup" element ={<VendorSignup/>}/>
        <Route path="/vendor/dashboard" element={<VendorDashboard/>}/>
        <Route path="/customer/dashboard" element={<CustomerDashboard/>}/>


    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
