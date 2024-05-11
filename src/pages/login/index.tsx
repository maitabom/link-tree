import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import Input from "../../components/input";
import { auth } from "../../services/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', {replace: true})
      })
      .catch((error) => {
        console.error(error)
      });
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev<span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
        </h1>
      </Link>
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
        <Input type="email" placeholder="Digite o seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Digite a sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
          Acessar
        </button>
      </form>
    </div>
  );
}

export default Login;
