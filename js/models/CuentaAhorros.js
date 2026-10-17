import Cuenta from "./Cuenta.js";

export default class CuentaAhorros extends Cuenta {

    static TASA_MENSUAL = 0.015;

    constructor(id, titularId, numero, saldoInicial = 0) {
        super(id, titularId, numero, saldoInicial);
    }

    aplicarInteres() {
        return this.saldo * CuentaAhorros.TASA_MENSUAL;
    }

    calcularRetiro(monto) {
        const valor = Number(monto);

        if (!Number.isFinite(valor) || valor <= 0) {
            throw new Error(
                "El retiro debe ser mayor que cero."
            );
        }

        if (valor > this.saldo) {
            throw new Error(
                "No puedes retirar más dinero del saldo disponible."
            );
        }

        return valor;
    }

    retirar(monto) {
        const valor = this.calcularRetiro(monto);

        // Calcula el interés sobre el saldo anterior al retiro.
        const interes = this.aplicarInteres();

        // Registra el interés y descuenta el retiro solicitado.
        this.ajustarSaldo(this.saldo + interes - valor);

        return {
            saldo: this.saldo,
            montoRetirado: valor,
            interesAplicado: interes
        };
    }

    calcularCargo() {
        return this.aplicarInteres();
    }
}