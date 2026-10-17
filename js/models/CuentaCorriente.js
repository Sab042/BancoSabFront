import Cuenta from "./Cuenta.js";

export default class CuentaCorriente extends Cuenta {

    static PORCENTAJE_SOBREGIRO = 0.20;

    constructor(id, titularId, numero, saldoInicial = 0) {
        super(id, titularId, numero, saldoInicial);
    }

    calcularLimiteRetiro() {
        const saldoPositivo = Math.max(0, this.saldo);

        return saldoPositivo * (
            1 + CuentaCorriente.PORCENTAJE_SOBREGIRO
        );
    }

    calcularRetiro(monto) {
        const valor = Number(monto);

        if (!Number.isFinite(valor) || valor <= 0) {
            throw new Error(
                "El retiro debe ser mayor que cero."
            );
        }

        const limite = this.calcularLimiteRetiro();

        if (valor > limite) {
            throw new Error(
                `Superas el límite permitido. Máximo: ${limite.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0
                })}.`
            );
        }

        return valor;
    }

    retirar(monto) {
        const valor = this.calcularRetiro(monto);

        this.ajustarSaldo(this.saldo - valor);

        return this.saldo;
    }

    aplicarInteres() {
        return 0;
    }

    calcularCargo() {
        return 0;
    }
}