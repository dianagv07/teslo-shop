import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const { name, email, role, image } = session.user;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-10 border border-gray-200">
        <Title title="Perfil" />

        <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {image ? (
              <img
                src={image}
                alt="Avatar"
                className="w-28 h-28 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600 border border-gray-300">
                {name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>

          {/* Info del usuario */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-black">{name}</h2>
            <p className="text-gray-500 text-sm mt-1">{email}</p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">Rol asignado:</p>
              <span className="inline-block mt-1 px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
