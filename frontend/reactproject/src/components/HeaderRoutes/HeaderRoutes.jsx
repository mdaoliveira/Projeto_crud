import styles from "./HeaderRoutes.module.css";
import { Link } from "react-router-dom";

function HeaderRoutes() {
    return (
        <header className={styles.headerroutes}>
            <div className={styles.title}>
                <Link to="/">Início</Link>
                <Link to="/cadastrar">Cadastrar</Link>
            </div>
        </header>
    );
}

export default HeaderRoutes;