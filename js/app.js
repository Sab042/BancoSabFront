import {
    mostrarExito,
    mostrarError,
    mostrarAdvertencia,
    mostrarInformacion
} from "./ui/notificaciones.js";

import {
    configurarNavegacion,
    renderizarVista
} from "./ui/renderizarVistas.js";

// Esta variable deberá estar conectada al servicio de autenticación.
let autenticado = false;

configurarNavegacion(() => autenticado);

renderizarVista("inicio", autenticado);

// Después de iniciar sesión correctamente:
// autenticado = true;
// renderizarVista("panel", autenticado);

// Después de cerrar sesión:
// autenticado = false;
// renderizarVista("inicio", autenticado);