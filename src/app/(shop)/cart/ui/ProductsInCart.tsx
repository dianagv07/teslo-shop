'use client'; // Este componente se ejecuta en el cliente (navegador)

import { useCartStore } from "@/store"; // Acceso al estado global del carrito (Zustand u otro)
import { ProductImage, QuantitySelector } from "@/components"; // Componentes para imagen y selector de cantidad
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const ProductsInCart = () => {

    // Funciones para actualizar cantidad y eliminar productos del carrito
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
    // Información resumida del carrito (total ítems)
    const { itemsInCart } = useCartStore(state => state.getSummaryInfo());

    const [loaded, setLoaded] = useState(false);

    // Productos actualmente en el carrito
    const productInCart = useCartStore(state => state.cart);

    // Cuando cambia el carrito, se marca como cargado para mostrar contenido
    useEffect(() => {
        setLoaded(true);
    }, [productInCart]);

    // Mostrar animación de carga mientras no se haya cargado la info del carrito
    if (!loaded) {
        return <div className="w-full h-full bg-gray-200 animate-pulse">&nbsp;</div>
    }

    // Redirigir a página vacía si no hay productos en el carrito
    if (itemsInCart === 0) {
        redirect('/empty');
    }

    return (
        <>
            {
                productInCart.map(item => (
                    <div key={`${item.slug}-${item.size}`} className="flex mb-5">
                        {/* Imagen del producto */}
                        <ProductImage
                            src={item.image}
                            width={180}
                            height={180}
                            alt={item.title}
                            className="mr-5 rounded"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <div>
                            {/* Enlace al detalle del producto */}
                            <Link href={`/product/${item.slug}`} className="hover:underline cursor-pointer">
                                {item.size} - {item.title}
                            </Link>
                            {/* Precio */}
                            <p>${item.price}</p>
                            {/* Selector para cambiar la cantidad */}
                            <QuantitySelector
                                quantity={item.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(item, quantity)}
                            />
                            {/* Botón para remover producto del carrito */}
                            <button onClick={() => removeProduct(item)} className="underline mt-3">Remover</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
