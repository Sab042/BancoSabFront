import ProductoBancario from "./ProductoBancario.js";

export default class TarjetaCredito extends ProductoBancario {

    #cupoTotal;
    #deuda;
    #compras;

    constructor(
        id,
        titularId,
        numero,
        cupoTotal = 3000000
    ) {
        super(id, titularId, numero);

        if (
            !Number.isFinite(Number(cupoTotal)) ||
            Number(cupoTotal) <= 0
        ) {
            throw new Error(
                "El cupo debe ser un número mayor que cero."
            );
        }

        this.#cupoTotal = Number(cupoTotal);
        this.#deuda = 0;
        this.#compras = [];
    }

    get cupoTotal() {
        return this.#cupoTotal;
    }

    get deuda() {
        return this.#deuda;
    }

    get cupoDisponible() {
        return this.#cupoTotal - this.#deuda;
    }

    get compras() {
        return this.#compras.map(compra => ({ ...compra }));
    }

    consultarCupoDisponible() {
        return this.cupoDisponible;
    }

    consultarDeuda() {
        return this.#deuda;
    }

    calcularTasa(cuotas) {
        const numeroCuotas = Number(cuotas);

        if (
            !Number.isInteger(numeroCuotas) ||
            numeroCuotas < 1
        ) {
            throw new Error(
                "El número de cuotas debe ser un entero positivo."
            );
        }

        if (numeroCuotas <= 2) {
            return 0;
        }

        if (numeroCuotas <= 6) {
            return 0.019;
        }

        return 0.023;
    }

    calcularCuota(capital, cuotas) {
        const monto = Number(capital);
        const numeroCuotas = Number(cuotas);

        if (!Number.isFinite(monto) || monto <= 0) {
            throw new Error(
                "El valor de la compra debe ser mayor que cero."
            );
        }

        const tasa = this.calcularTasa(numeroCuotas);

        // Para una tasa del 0 %, no se necesita la fórmula financiera.
        if (tasa === 0) {
            return monto / numeroCuotas;
        }

        // Fórmula de cuota fija indicada en el proyecto.
        return (
            (monto * tasa) /
            (1 - Math.pow(1 + tasa, -numeroCuotas))
        );
    }

    registrarCompra(descripcion, capital, cuotas) {
        const monto = Number(capital);
        const numeroCuotas = Number(cuotas);

        if (!descripcion || !descripcion.trim()) {
            throw new Error(
                "Debes ingresar la descripción de la compra."
            );
        }

        if (!Number.isFinite(monto) || monto <= 0) {
            throw new Error(
                "El monto de la compra debe ser mayor que cero."
            );
        }

        if (monto > this.cupoDisponible) {
            throw new Error(
                "La compra supera el cupo disponible."
            );
        }

        const tasa = this.calcularTasa(numeroCuotas);
        const cuotaMensual = this.calcularCuota(
            monto,
            numeroCuotas
        );

        const compra = {
            id: crypto.randomUUID(),
            descripcion: descripcion.trim(),
            capital: monto,
            cuotas: numeroCuotas,
            tasaMensual: tasa,
            cuotaMensual,
            fecha: new Date().toISOString()
        };

        this.#deuda += monto;
        this.#compras.push(compra);

        return { ...compra };
    }

    // Registra un pago de la deuda de la tarjeta.
    pagarDeuda(monto) {
        const valor = Number(monto);

        if (!Number.isFinite(valor) || valor <= 0) {
            throw new Error(
                "El pago debe ser mayor que cero."
            );
        }

        if (valor > this.#deuda) {
            throw new Error(
                "El pago no puede superar la deuda actual."
            );
        }

        this.#deuda -= valor;

        return {
            pagoRealizado: valor,
            deudaPendiente: this.#deuda,
            cupoDisponible: this.cupoDisponible
        };
    }

    calcularCargo() {
        return 0;
    }

    obtenerInformacion() {
        return {
            ...super.obtenerInformacion(),
            cupoTotal: this.#cupoTotal,
            deuda: this.#deuda,
            cupoDisponible: this.cupoDisponible,
            compras: this.compras
        };
    }
}