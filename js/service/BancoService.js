import Movimiento from "../models/Movimiento.js";

export default class BancoService {
    #productos;
    #historial;

    constructor(productos = []) {
        this.#productos = productos;
        this.#historial = [];
    }

    agregarProducto(producto) {
        if (!producto) {
            throw new Error("El producto es obligatorio.");
        }

        if (this.#productos.some(p => p.id === producto.id)) {
            throw new Error("El producto ya está registrado.");
        }

        this.#productos.push(producto);
    }

    consultarProductos(titularId) {
        return this.#productos
            .filter(p => p.titularId === titularId);
    }

    buscarProducto(id) {
        const producto = this.#productos.find(p => p.id === id);

        if (!producto) {
            throw new Error("No se encontró el producto bancario.");
        }

        return producto;
    }

    consultarSaldo(idProducto) {
        const producto = this.buscarProducto(idProducto);

        if (typeof producto.consultarSaldo !== "function") {
            throw new Error(
                "Este producto no tiene saldo de depósito."
            );
        }

        return producto.consultarSaldo();
    }

    consignar(idProducto, monto) {
        const cuenta = this.buscarProducto(idProducto);
        const saldo = cuenta.consignar(monto);

        this.#registrar(
            "CONSIGNACION",
            monto,
            null,
            cuenta,
            saldo
        );

        return { saldo };
    }

    retirar(idProducto, monto) {
        const cuenta = this.buscarProducto(idProducto);

        if (typeof cuenta.retirar !== "function") {
            throw new Error("Este producto no permite retiros.");
        }

        // La cuenta valida el retiro según sus reglas específicas.
        const resultado = cuenta.retirar(monto);

        const saldo = typeof resultado === "object"
            ? resultado.saldo
            : resultado;

        this.#registrar(
            "RETIRO",
            monto,
            cuenta,
            null,
            saldo
        );

        return {
            saldo,
            detalle: resultado
        };
    }

    transferir(idOrigen, idDestino, monto) {
        if (idOrigen === idDestino) {
            throw new Error(
                "No puedes transferir al mismo producto."
            );
        }

        const origen = this.buscarProducto(idOrigen);
        const destino = this.buscarProducto(idDestino);

        if (
            origen.titularId === destino.titularId &&
            origen.id === destino.id
        ) {
            throw new Error("El origen y el destino deben ser diferentes.");
        }

        if (
            typeof origen.retirar !== "function" ||
            typeof destino.consignar !== "function"
        ) {
            throw new Error(
                "La transferencia requiere cuentas bancarias compatibles."
            );
        }

        // Validamos el retiro antes de modificar cualquiera de las cuentas.
        origen.calcularRetiro(monto);

        const resultadoRetiro = origen.retirar(monto);
        const saldoOrigen = typeof resultadoRetiro === "object"
            ? resultadoRetiro.saldo
            : resultadoRetiro;

        const saldoDestino = destino.consignar(monto);

        this.#registrar(
            "TRANSFERENCIA_ENVIADA",
            monto,
            origen,
            destino,
            saldoOrigen
        );

        this.#registrar(
            "TRANSFERENCIA_RECIBIDA",
            monto,
            origen,
            destino,
            saldoDestino
        );

        return {
            monto: Number(monto),
            saldoOrigen,
            saldoDestino
        };
    }

    registrarCompraTarjeta(idTarjeta, descripcion, monto, cuotas) {
        const tarjeta = this.buscarProducto(idTarjeta);

        if (typeof tarjeta.registrarCompra !== "function") {
            throw new Error("El producto seleccionado no es una tarjeta.");
        }

        const compra = tarjeta.registrarCompra(
            descripcion,
            monto,
            cuotas
        );

        this.#registrar(
            "COMPRA_TARJETA",
            monto,
            tarjeta,
            null,
            tarjeta.deuda
        );

        return compra;
    }

    consultarMovimientos(idProducto = null) {
        return [...this.#historial]
            .filter(movimiento => {
                if (!idProducto) return true;

                return (
                    movimiento.cuentaOrigen === idProducto ||
                    movimiento.cuentaDestino === idProducto
                );
            })
            .sort(
                (a, b) => new Date(b.fecha) - new Date(a.fecha)
            )
            .map(movimiento => movimiento.obtenerDetalle());
    }

    #registrar(tipo, monto, origen, destino, saldoResultante) {
        const movimiento = new Movimiento(
            crypto.randomUUID(),
            tipo,
            monto,
            origen ? origen.id : null,
            destino ? destino.id : null,
            saldoResultante
        );

        this.#historial.push(movimiento);

        if (origen) {
            origen.registrarMovimiento(movimiento);
        }

        if (destino && destino !== origen) {
            destino.registrarMovimiento(movimiento);
        }
    }

    exportarHistorial() {
        return this.#historial.map(
            movimiento => movimiento.obtenerDetalle()
        );
    }
}