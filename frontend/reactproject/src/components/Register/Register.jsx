import styles from "./Register.module.css";
import { useState } from "react";

function Register(props){
    // Estados campo formulário
    const [newEspecie, setNewEspecie] = useState("");
    const [newNumBirds, setNewNumBirds] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newLocalizacao, setNewLocalizacao] = useState("");
    const [newDataRegister, setNewDataRegister] = useState("");

    // crud create
    const addRegister = (e) => {
        e.preventDefault();

        const especie = newEspecie.trim();
        const num_aves = parseInt(newNumBirds);
        const usuario = newUser.trim();
        const localizacao = newLocalizacao.trim();
        const data_register = newDataRegister;

        const validateForm = () => {
            if(!especie || (!num_aves === "") || !usuario || !localizacao || !data_register){
                alert("Preencha todos os campos!");
                return false;
            }
            if(isNaN(num_aves)){
            alert("Somente números para o campo 'Número de aves'!");
            return false;
            }
            return true;
        }

        if (validateForm()) {
            fetch("http://localhost:8800/", {
              method: "POST",
              // Defini conteúdo tipo JSON
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ especie, num_aves, usuario, localizacao, data_register }),
            })
              .then(response => response.json())
              .then(() => {
                props.clicked("Registro cadastrado!");
                // Limpar os campos
                setNewEspecie("");
                setNewNumBirds("");
                setNewUser("");
                setNewLocalizacao("");
                setNewDataRegister("");
              })
              .catch((error) => console.error("Erro ao criar registro -> ", error));
        }
    }

    return(
        <div className={styles.register}>
            <h1>Cadastrar</h1>
            <form onSubmit={addRegister}>
                <label>Espécie: <input type="text" value={newEspecie}onChange={(e)=>setNewEspecie(e.target.value)}/></label>
                <label>Número de aves: <input type="text" value={newNumBirds}onChange={(e)=>setNewNumBirds(e.target.value)}/></label>
                <label>Usuário: <input type="text" value={newUser}onChange={(e)=>setNewUser(e.target.value)}/></label>
                <label>Localização: <input type="text" value={newLocalizacao}onChange={(e)=>setNewLocalizacao(e.target.value)}/></label>
                <label>Data: <input type="datetime-local" value={newDataRegister}onChange={(e)=>setNewDataRegister(e.target.value)}/></label>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Register;