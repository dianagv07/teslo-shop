'use client'; // Indica que este componente se ejecuta en el cliente (navegador)

import { Swiper, SwiperSlide } from 'swiper/react'; // Componentes para carrusel/slider
import 'swiper/css'; // Estilos base de Swiper
import 'swiper/css/free-mode'; // Estilos para el modo libre de Swiper
import 'swiper/css/pagination'; // Estilos para la paginación de Swiper

import './slideshow.css'; // Estilos personalizados para el slideshow
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'; // Módulos adicionales para Swiper (autoplay, modo libre, paginación)
import Image from 'next/image'; // Componente optimizado de Next.js para imágenes

// Definición de las props que recibe el componente
interface Props {
    images: string[]; // Array de nombres o rutas de imágenes
    title: string; // Título usado para el atributo alt de las imágenes
    classname?: string; // Clase CSS opcional para el contenedor
}

export const ProductMobileSlideShow = ({ images, title, classname }: Props) => {

    return (
        // Contenedor principal con clase opcional recibida por props
        <div className={classname}>
            {/* Componente Swiper para el carrusel */}
            <Swiper
                style={{
                    width: '100vw', // ancho completo de la ventana
                    height: '500px' // altura fija para el slideshow
                }}
                pagination // activa la paginación con puntos
                autoplay={{ delay: 2500 }} // cambia automáticamente cada 2.5 segundos
                modules={[FreeMode, Autoplay, Pagination]} // módulos activos para funcionalidad extra
                className="mySwiper2" // clase CSS personalizada para el slider
            >
                {
                    // Iteramos sobre el arreglo de imágenes para crear cada slide
                    images.map(img => (
                        <SwiperSlide key={img}>
                            {/* Imagen optimizada de Next.js */}
                            <Image
                                src={`/products/${img}`} // ruta relativa a carpeta products
                                width={600} // ancho fijo para la imagen
                                height={500} // alto fijo para la imagen
                                alt={title} // texto alternativo accesible
                                className='object-fill' // estilo para que la imagen rellene el contenedor
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
