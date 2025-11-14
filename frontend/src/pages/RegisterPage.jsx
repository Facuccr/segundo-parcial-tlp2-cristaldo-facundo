import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  // TODO: Integrar lógica de registro aquí
  // TODO: Implementar useForm para el manejo del formulario

  const { formState, name, lastname, username, email, password, handleChange } =
    useForm({
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // TODO: Implementar función handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !lastname.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("completa todos los campos");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastname,
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        setError("no se pudo registrar el usuario");
        setLoading(false);
        return;
      }

      navigate("/home");
    } catch (error) {
      setError("Error en el server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crear Cuenta
        </h2>

        {/* TODO: Mostrar este div cuando haya error */}
        <div className="hidden bg-red-100 text-red-700 p-3 rounded mb-4">
          <p className="text-sm">
            Error al crear la cuenta. Intenta nuevamente.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Apellido
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Ingresa tu apellido"
              value={lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};
