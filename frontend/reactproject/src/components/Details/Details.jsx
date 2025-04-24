import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Details.module.css";

function Details(props){
    // Obter os dados por state, acessado pelo useLocation
    const { state: item } = useLocation();
    const navigate = useNavigate();

    // Caso houver acesso por url com rota inexistente
    if(!item) {
        return (
            <div className={styles["no-item"]}>
                <p>Nenhum registro selecionado</p>
            </div>
        );
    }

    // crud delete
    const deleteRegister = (id) => {
        fetch(`http://localhost:8800/${id}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then(() => {
            // Repassar mensagem para o modal
            props.clicked("Registro deletado!", "delete");
        })
        .catch((error) => console.error("Erro ao deletar registro -> ", error));
    }

    return (
        <div className={styles.details}>
            <h1>Detalhes</h1>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Espécie:</strong> {item.especie}</p>
            <p><strong>Número de aves:</strong> {item.num_aves}</p>
            <p><strong>Usuário:</strong> {item.usuario}</p>
            <p><strong>Localização:</strong> {item.localizacao}</p>
            <p><strong>Data:</strong> {item.data_register.replace("T"," ")}</p>
            <div className={styles["button-container"]}>
                {/* Dados repassados para edit */}
                <button onClick={() => navigate('/editar', {state: item})}>Editar</button>
                <button onClick={() => deleteRegister(item.id)}>Excluir</button>
            </div>
        </div>
    );
}

export default Details;