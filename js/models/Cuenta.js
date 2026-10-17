import ProductoBancario from "./ProductoBancario.js";

export default class Cuenta extends ProductoBancario {

    #saldo;
    #movimientos;

    constructor(id, titularId, numero, saldoInicial = 0) {
        super(id, titularId, numero);

        if (!Number.isFinite(Number(saldoInicial)) ||
            Number(saldoInicial) < 0) {
            throw new Error("El saldo inicial no puede ser negativo.");
        }

        this.#saldo = Number(saldoInicial);
        this.#movimientos = [];
    }

    get saldo() {
        return this.#saldo;
    }

    get movimientos() {
        return [...this.#movimientos];
    }

    consultarSaldo() {
        return this.#saldo;
    }

    consignar(monto) {
        monto = this.#validarMonto(monto);

        this.#saldo += monto;

        return this.#saldo;
    }

    calcularRetiro(monto) {
        throw new Error(
            "El método calcularRetiro debe implementarse en la clase hija."
        );
    }

    retirar(monto) {
        const valor = this.calcularRetiro(monto);

        this.#saldo -= valor;

        return this.#saldo;
    }

    aplicarInteres() {
        return 0;
    }

    // Método protegido por convención para actualizar el saldo
    // desde las clases hijas mediante el método público.
    ajustarSaldo(nuevoSaldo) {
        if (!Number.isFinite(nuevoSaldo)) {
            throw new Error("El saldo debe ser un número válido.");
        }

        this.#saldo = nuevoSaldo;
    }

    registrarMovimiento(movimiento) {
        if (!movimiento) {
            throw new Error("El movimiento es obligatorio.");
        }

        this.#movimientos.push(movimiento);

        super.registrarMovimiento(movimiento);
    }

    consultarMovimientos() {
        return [...this.#movimientos].sort(
            (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
    }

    calcularCargo() {
        return 0;
    }

    #validarMonto(monto) {
        const valor = Number(monto);

        if (!Number.isFinite(valor) || valor <= 0) {
            throw new Error(
                "El monto debe ser un número mayor que cero."
            );
        }

        return valor;
    }

    obtenerInformacion() {
        return {
            ...super.obtenerInformacion(),
            saldo: this.#saldo,
            movimientos: this.consultarMovimientos()
        };
    }
}