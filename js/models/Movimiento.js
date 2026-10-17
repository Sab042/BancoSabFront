export default class Movimiento {

    #id;
    #fecha;
    #tipo;
    #valor;
    #cuentaOrigen;
    #cuentaDestino;
    #saldoResultante;
    #detalle;

    constructor(
        id,
        tipo,
        valor,
        cuentaOrigen = null,
        cuentaDestino = null,
        saldoResultante = null,
        detalle = ""
    ) {
        if (!id || !tipo) {
            throw new Error(
                "El movimiento debe tener un ID y un tipo."
            );
        }

        const monto = Number(valor);

        if (!Number.isFinite(monto) || monto <= 0) {
            throw new Error(
                "El valor del movimiento debe ser mayor que cero."
            );
        }

        this.#id = id;
        this.#fecha = new Date();
        this.#tipo = tipo;
        this.#valor = monto;
        this.#cuentaOrigen = cuentaOrigen;
        this.#cuentaDestino = cuentaDestino;
        this.#saldoResultante = saldoResultante;
        this.#detalle = detalle;
    }

    get id() {
        return this.#id;
    }

    get fecha() {
        return this.#fecha.toISOString();
    }

    get tipo() {
        return this.#tipo;
    }

    get valor() {
        return this.#valor;
    }

    get cuentaOrigen() {
        return this.#cuentaOrigen;
    }

    get cuentaDestino() {
        return this.#cuentaDestino;
    }

    get saldoResultante() {
        return this.#saldoResultante;
    }

    get detalle() {
        return this.#detalle;
    }

    obtenerDetalle() {
        return {
            id: this.#id,
            fecha: this.#fecha.toISOString(),
            tipo: this.#tipo,
            valor: this.#valor,
            cuentaOrigen: this.#cuentaOrigen,
            cuentaDestino: this.#cuentaDestino,
            saldoResultante: this.#saldoResultante,
            detalle: this.#detalle
        };
    }
}