import { Link } from "react-router-dom";

import styles from "./LinkButton.module.css";

function LinkButtom({ to, text }) {
  return (
    <Link to={to} className={styles.btn}>
      {text}
    </Link>
  );
}

export default LinkButtom;
