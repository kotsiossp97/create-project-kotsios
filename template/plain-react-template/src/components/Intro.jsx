import React from "react";
import styles from "./intro.module.scss";

const Intro = () => {
    return (
        <div className={styles.App}>
            <h1>Welcome to your new project!</h1>
            <p>
                Edit <code>./App.js</code> to continue !
            </p>
            <p>&copy; Konstantinos Andreou</p>
        </div>
    );
};

export default Intro;
