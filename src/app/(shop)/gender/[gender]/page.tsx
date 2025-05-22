export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";




interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {

  // Extraemos el género desde los parámetros de la URL
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // Mapeo de etiquetas para mostrar el género en español de forma amigable en la UI
  const label: Record<string, string> = {
    'men': 'Hombre',
    'women': 'Mujer',
    'kid': 'Niños',
    'unisex': 'Todos',
  }

  return (
    <>
      <Title
        title={`Articulos de ${label[gender]}`}
        subtitle="Todos los productos"
        classname="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages}/>

    </>
  );
}