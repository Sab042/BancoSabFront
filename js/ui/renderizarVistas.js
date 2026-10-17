const VISTAS_PUBLICAS = [
    "inicio",
    "login",
    "registro"
];

const VISTAS_PRIVADAS = [
    "panel",
    "cuentas",
    "consignar",
    "retirar",
    "transferir",
    "movimientos",
    "tarjeta",
    "perfil",
    "usuarios"
];

const TODAS_LAS_VISTAS = [
    ...VISTAS_PUBLICAS,
    ...VISTAS_PRIVADAS
];

let vistaActual = "inicio";

export function renderizarVista(
    nombreVista,
    autenticado = false
) {
    if (!TODAS_LAS_VISTAS.includes(nombreVista)) {
        throw new Error(
            `La vista "${nombreVista}" no está registrada.`
        );
    }

    if (
        VISTAS_PRIVADAS.includes(nombreVista) &&
        !autenticado
    ) {
        nombreVista = "login";
    }

    const secciones = document.querySelectorAll("[data-vista]");
    let vistaEncontrada = false;

    secciones.forEach(seccion => {
        const activa = seccion.dataset.vista === nombreVista;

        seccion.hidden = !activa;
        seccion.classList.toggle("vista-activa", activa);

        if (activa) {
            vistaEncontrada = true;
        }
    });

    if (!vistaEncontrada) {
        throw new Error(
            `No se encontró una sección HTML para la vista "${nombreVista}".`
        );
    }

    vistaActual = nombreVista;

    document.querySelectorAll("[data-navegar]").forEach(boton => {
        const activo = boton.dataset.navegar === nombreVista;

        boton.classList.toggle("activo", activo);

        if (activo) {
            boton.setAttribute("aria-current", "page");
        } else {
            boton.removeAttribute("aria-current");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    document.dispatchEvent(
        new CustomEvent("vista:cambiada", {
            detail: { nombreVista }
        })
    );

    return nombreVista;
}

export function obtenerVistaActual() {
    return vistaActual;
}

export function configurarNavegacion(
    obtenerEstadoAutenticacion
) {
    document.addEventListener("click", evento => {
        const boton = evento.target.closest("[data-navegar]");

        if (!boton) return;

        const destino = boton.dataset.navegar;
        const autenticado = obtenerEstadoAutenticacion();

        try {
            renderizarVista(destino, autenticado);
        } catch (error) {
            console.error(
                "No se pudo cambiar de vista:",
                error.message
            );
        }
    });
}

export function ocultarVistasPrivadas() {
    document.querySelectorAll("[data-vista]").forEach(seccion => {
        if (VISTAS_PRIVADAS.includes(seccion.dataset.vista)) {
            seccion.hidden = true;
            seccion.classList.remove("vista-activa");
        }
    });

    renderizarVista("inicio", false);
}