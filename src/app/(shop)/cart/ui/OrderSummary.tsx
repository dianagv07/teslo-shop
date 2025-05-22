'use client' // Este componente se ejecuta en el cliente (navegador)

import { useCartStore } from "@/store"; // Hook para acceder al estado global del carrito
import { currencyFormat } from "@/utils"; // Función para formatear números a formato moneda
import { useEffect, useState } from "react" // Hooks de React para estado y efectos

export const OrderSummary = () => {

    // Estado local para controlar si el componente ya cargó la información
    const [loaded, setLoaded] = useState(false);
    // Extraemos resumen del carrito: total de ítems, subtotal, impuestos y total
    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInfo())

    // Al montar el componente, marcamos como cargado
    useEffect(() => {
        setLoaded(true);
    }, [])

    // Mientras no está cargado, mostrar animación de carga
    if (!loaded) return <div className="w-full h-full bg-gray-200 animate-pulse">&nbsp;</div>

    // Mostrar resumen de la orden con números formateados y texto condicional para singular/plural
    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>Impuestos (15%) </span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
    )
}
