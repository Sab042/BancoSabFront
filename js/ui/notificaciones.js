export function mostrarNotificacion(
    mensaje,
    tipo = "exito",
    duracion = 3500
) {
    let contenedor = document.getElementById(
        "contenedor-notificaciones"
    );

    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "contenedor-notificaciones";
        contenedor.className = "contenedor-notificaciones";
        contenedor.setAttribute("aria-live", "polite");
        contenedor.setAttribute("aria-atomic", "true");

        document.body.appendChild(contenedor);
    }

    const iconos = {
        exito: "✓",
        error: "✕",
        advertencia: "⚠",
        informacion: "ℹ"
    };

    const tiposPermitidos = [
        "exito",
        "error",
        "advertencia",
        "informacion"
    ];

    if (!tiposPermitidos.includes(tipo)) {
        tipo = "informacion";
    }

    const notificacion = document.createElement("div");
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.setAttribute("role", "status");

    const icono = document.createElement("span");
    icono.className = "notificacion-icono";
    icono.textContent = iconos[tipo];

    const texto = document.createElement("p");
    texto.className = "notificacion-mensaje";
    texto.textContent = mensaje;

    const botonCerrar = document.createElement("button");
    botonCerrar.type = "button";
    botonCerrar.className = "notificacion-cerrar";
    botonCerrar.textContent = "×";
    botonCerrar.setAttribute("aria-label", "Cerrar notificación");

    notificacion.append(icono, texto, botonCerrar);
    contenedor.appendChild(notificacion);

    let temporizador;

    function cerrar() {
        clearTimeout(temporizador);
        notificacion.remove();
    }

    botonCerrar.addEventListener("click", cerrar);

    if (duracion > 0) {
        temporizador = setTimeout(cerrar, duracion);
    }

    return {
        cerrar,
        elemento: notificacion
    };
}

export function mostrarError(mensaje) {
    return mostrarNotificacion(mensaje, "error");
}

export function mostrarExito(mensaje) {
    return mostrarNotificacion(mensaje, "exito");
}

export function mostrarAdvertencia(mensaje) {
    return mostrarNotificacion(mensaje, "advertencia");
}

export function mostrarInformacion(mensaje) {
    return mostrarNotificacion(mensaje, "informacion");
}