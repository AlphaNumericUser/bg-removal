import { Routes, Route } from "react-router-dom"
import { Home, BuyCredits, Result } from "./pages"
import { Footer, Navbar } from "./componets"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// ! Como nota creo que me gusta más como maneja el router
// ! fernando herrera
const App = () => {
  return (
    <div className="min-h-screen bg-slate-50" >
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyCredits />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App