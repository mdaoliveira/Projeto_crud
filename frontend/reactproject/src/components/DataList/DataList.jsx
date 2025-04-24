import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import styles from "./DataList.module.css";

// Ajuste do input datetime-local type
function formattedDateInput(datetimeStr){
    const date = new Date(datetimeStr);
    //remover fuso
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
}

const DataList = () => {
    const[data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    // Requisição via fetch
    fetch("http://localhost:8800/")
        .then((response) => response.json())
        .then((data) => {
        // Obter a data com formatação
        const formattedData = data.map(item => ({
            ...item,
            data_register: formattedDateInput(item.data_register),
        }));
        setData(formattedData);
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles["table-wrapper"]}>
                <table className={styles.table}>
                <tbody>
                    {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.especie}</td>
                        <td>{item.num_aves}</td>
                        <td>{item.usuario}</td>
                        <td>{item.localizacao}</td>
                        <td>{item.data_register.replace("T", " ")}</td>
                        <td className={styles.td_button}>
                        <button onClick={() => navigate('/detalhes', { state: item })}>Mais detalhes</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataList;