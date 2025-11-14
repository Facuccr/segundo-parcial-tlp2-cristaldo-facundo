import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSuperheroes = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/superheroes", {
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Error al cargar superhéroes");
        setSuperheroes([]);
        return;
      }

      const result = await response.json();

      // Tu backend devuelve: { message, data: [...] }
      setSuperheroes(result.data || []);
    } catch (error) {
      console.error("Error trayendo superhéroes:", error);
      setSuperheroes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuperheroes();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
        Galería de Superhéroes
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={loadSuperheroes}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
        >
          Recargar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {superheroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={hero.image}
              alt={hero.superhero}
              className="h-64 object-cover w-full"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {hero.superhero}
              </h3>
              <p className="text-gray-600 text-sm">{hero.alter_ego}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
