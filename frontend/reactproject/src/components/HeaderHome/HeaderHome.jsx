import styles from "./HeaderHome.module.css";
import { Link } from "react-router-dom";

function HeaderHome(){
    return (
        <header className={styles.headerhome}>
            <div className={styles.title}>
                <span>Registros</span>
                <span>de Aves</span>
            </div>
            <div>
                <Link to="/cadastrar">Cadastrar</Link>
            </div>
        </header>
    );
}

export default HeaderHome;