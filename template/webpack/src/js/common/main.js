import "../../sass/main.scss";
import * as bootstrap from "bootstrap";

Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).map(
    (popoverTriggerEl) => (
        new bootstrap.Popover(popoverTriggerEl)
    )
);