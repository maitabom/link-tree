import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex w-full justify-center items-center flex-col min-h-screen text-white">
      <h1 className="font-bold text-4xl mb-4">Página não encontrada</h1>
      <p className="italic text-1xl mb-3">Você entrou em uma página que não existe</p>

      <Link className="bg-gray-50/20 py-1 px-4 rounded-md" to="/">Voltar para Home</Link>
    </div>
  );
}

export default NotFound;
