import { Title } from "@/components"; // Componente para mostrar títulos
import Link from "next/link"; // Enlaces optimizados de Next.js
import { ProductsInCart } from "./ui/ProductsInCart"; // Componente que lista productos en el carrito
import { OrderSummary } from "./ui/OrderSummary"; // Componente que muestra resumen del pedido

export default function CartPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        {/* Título principal de la página */}
        <Title
          title="Carrito"
        />

        {/* Grid para mostrar dos columnas: productos y resumen de compra */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Sección del carrito con lista de productos */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            {/* Enlace para continuar comprando, redirige a la página principal */}
            <Link href='/' className="underline mb-5">
              Continua comprando
            </Link>

            {/* Renderiza la lista de productos que están en el carrito */}
            <ProductsInCart />
          </div>

          {/* Sección del checkout: resumen de orden y botón para continuar */}
          <div className="bg-white rounded-md shadow-md p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            {/* Componente que muestra resumen del pedido (subtotal, impuestos, total, etc.) */}
            <OrderSummary />

            {/* Botón que redirige a la página para ingresar dirección y continuar con el checkout */}
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href={'/checkout/address'}
              >
                Checkout
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
