import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import styles from "./Edit.module.css";

function Edit(props){

    const { state : item } = useLocation();
    const navigate = useNavigate();

    const [newEspecie, setNewEspecie] = useState(item?.especie || "");
    const [newNumBirds, setNewNumBirds] = useState(item?.num_aves || "");
    const [newUser, setNewUser] = useState(item?.usuario || "");
    const [newLocalizacao, setNewLocalizacao] = useState(item?.localizacao || "");
    const [newDataRegister, setNewDataRegister] = useState(item?.data_register || "");

    // Caso houver acesso por url com rota inexistente
    if (!item){
        return(
        <div className={styles["no-item"]}>
            <p>Nenhum usuário selecionado</p>
        </div>
        );
    }

    // crud update
    const updateRegister = (e) => {
        e.preventDefault();

        const especie = newEspecie.trim();
        const num_aves = parseInt(newNumBirds);
        const usuario = newUser.trim();
        const localizacao = newLocalizacao.trim();
        const data_register = newDataRegister;

        // Validações dos campos do input do editar 
        const validateForm = () => {
            if(!especie || !newNumBirds || !usuario || !localizacao || !data_register){
                alert("Preencha todos os campos!");
                return false;
            }
            if (isNaN(parseInt(newNumBirds))){
                alert("Somente números para o campo 'Número de aves'!");
                return false;
            }
            return true;
        }
        
        if(validateForm()){
            fetch(`http://localhost:8800/${item.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                // Converte para String JSON
                body: JSON.stringify({
                    especie, 
                    num_aves,
                    usuario,
                    localizacao,
                    data_register,
                }),
            })
            .then((response) => response.json())
            .then(() => {
                props.clicked("Registro atualizado!");
                navigate("/detalhes", {
                    // Volta para details com os dados atualizados
                    state: {
                        ...item,
                        especie,
                        num_aves,
                        usuario,
                        localizacao,
                        data_register,
                    },
                });
            })
            .catch((error) => console.error("Erro ao editar registro -> ", error));
        }
    }

    return(

        <div className={styles.edit}>
            <h1>Editar</h1>
            <form onSubmit={updateRegister}>
                <label>Espécie: <input value={newEspecie}onChange={(e)=>setNewEspecie(e.target.value)}/></label>
                <label>Número de aves: <input value={newNumBirds}onChange={(e)=>setNewNumBirds(e.target.value)}/></label>
                <label>Usuário: <input value={newUser}onChange={(e)=>setNewUser(e.target.value)}/></label>
                <label>Localização: <input value={newLocalizacao}onChange={(e)=>setNewLocalizacao(e.target.value)}/></label>
                <label>Data: <input type="datetime-local" value={newDataRegister}onChange={(e)=>setNewDataRegister(e.target.value)}/></label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Edit;