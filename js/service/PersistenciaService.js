export default class PersistenciaService {

    guardar(clave, datos) {
        if (!clave) {
            throw new Error("Debes indicar una clave de almacenamiento.");
        }

        try {
            localStorage.setItem(clave, JSON.stringify(datos));
            return true;
        } catch (error) {
            throw new Error(
                `No fue posible guardar los datos: ${error.message}`
            );
        }
    }

    cargar(clave, valorPorDefecto = null) {
        if (!clave) {
            throw new Error("Debes indicar una clave de almacenamiento.");
        }

        try {
            const datos = localStorage.getItem(clave);

            if (datos === null) {
                return valorPorDefecto;
            }

            return JSON.parse(datos);
        } catch {
            throw new Error(
                `No fue posible leer los datos guardados: ${clave}`
            );
        }
    }

    eliminar(clave) {
        localStorage.removeItem(clave);
    }

    existe(clave) {
        return localStorage.getItem(clave) !== null;
    }

    limpiarTodo() {
        localStorage.clear();
    }
}