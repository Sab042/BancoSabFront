export default class ProductoBancario {

    // Atributos privados: encapsulamiento
    #id;
    #titularId;
    #numero;
    #movimientos;

    constructor(id, titularId, numero) {
        if (!id || !titularId || !numero) {
            throw new Error(
                "El producto debe tener ID, titular y número."
            );
        }

        this.#id = id;
        this.#titularId = titularId;
        this.#numero = numero;
        this.#movimientos = [];
    }

    // Getters: permiten consultar los atributos privados
    get id() {
        return this.#id;
    }

    get titularId() {
        return this.#titularId;
    }

    get numero() {
        return this.#numero;
    }

    get movimientos() {
        return [...this.#movimientos];
    }

    // Registra un movimiento asociado al producto
    registrarMovimiento(movimiento) {
        if (!movimiento) {
            throw new Error(
                "El movimiento no puede estar vacío."
            );
        }

        this.#movimientos.push(movimiento);
    }

    // Devuelve los movimientos del más reciente al más antiguo
    consultarMovimientos() {
        return [...this.#movimientos].sort(
            (a, b) =>
                new Date(b.fecha) - new Date(a.fecha)
        );
    }

    // Método abstracto: las clases hijas deben implementarlo
    calcularCargo() {
        throw new Error(
            "El método calcularCargo() debe implementarse en la clase hija."
        );
    }

    // Representación básica del producto
    obtenerInformacion() {
        return {
            id: this.#id,
            titularId: this.#titularId,
            numero: this.#numero,
            tipo: this.constructor.name
        };
    }
}