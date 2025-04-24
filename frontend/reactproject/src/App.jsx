import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import HeaderHome from "./components/HeaderHome/HeaderHome";
import HeaderRoutes from "./components/HeaderRoutes/HeaderRoutes";
import DataList from "./components/DataList/DataList";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";



function AppDivision(){
  // Para saber a localização - com Hook
  const Location = useLocation();
  const isHome = Location.pathname === "/";
  const navigate = useNavigate();

  // modal após create, update e delete
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [operation, setOperation] = useState("");

  function clicked(msg, operation=""){
    console.log(msg);
    setModalIsOpen(true);
    setModalMessage(msg);
    setOperation(operation);
  }

  function closeModal() {
    setModalIsOpen(false);
    setModalMessage("");
    // Para voltar para a home após a exclusão
    if(operation === "delete"){
      navigate("/");
    }
  }

  return(
    <div>
      {/* Home personalizada pelo location */}
      {isHome ? <HeaderHome /> : <HeaderRoutes />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<DataList />}/>
          <Route path="/editar" element={<Edit clicked={clicked} />}/>
          <Route path="/detalhes" element={<Details clicked={clicked} />}/>
          <Route path="/cadastrar" element={<Register clicked={clicked} />}/>
          <Route path="*" element={
              <div style={{ textAlign: "center", fontSize: "20px", height: "calc(80vh - 60px)"}}>
                <h1>404 - Página não encontrada</h1>
              </div>}/>          
        </Routes>
        {/* Modal para recebimento das mensagens após determinada operação crud  */}
        {modalIsOpen && modalMessage && (
          <div className="modal-show">
            <div className="modal-content">
              <h1>{modalMessage}</h1>
              <button onClick={closeModal}>Fechar</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppDivision/>
    </Router>
  );
}

export default App;