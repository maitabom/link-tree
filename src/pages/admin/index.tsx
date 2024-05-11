import { FormEvent, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import Header from "../../components/header";
import Input from "../../components/input";
import { datastore } from "../../services/firebase";
import LinkItem from "./linkitens";

function Admin() {
  const [nameLink, setNameLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [textColor, setTextColor] = useState("#f1f1f1");
  const [backgroundColor, setBackgroundColor] = useState("#121212");
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    const linksRef = collection(datastore, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkItem[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          background: doc.data().background,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  });

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameLink === "" || urlLink === "") {
      alert("Preencha todos os campos");
      return;
    }

    await addDoc(collection(datastore, "links"), {
      name: nameLink,
      url: urlLink,
      background: backgroundColor,
      color: textColor,
      created: new Date(),
    })
      .then(() => {
        setNameLink("");
        setUrlLink("");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(datastore, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-8">
      <Header />
      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-8 mb-4 w-full max-w-xl"
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          type="text"
          placeholder="Digite o nome do link"
          value={nameLink}
          onChange={(e) => setNameLink(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          type="url"
          placeholder="Digite a URL"
          value={urlLink}
          onChange={(e) => setUrlLink(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>
            <Input
              type="color"
              placeholder="Digite o nome do link"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Texto do Link
            </label>
            <Input
              type="color"
              placeholder="Digite o texto do link"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
        </section>
        {nameLink !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border rounded-md border-gray-100/25">
            <label className="text-white font-medium mt-2 mb-2">
              Visualização
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColor,
              }}
            >
              <p className="font-medium" style={{ color: textColor }}>
                {nameLink}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium"
        >
          Cadastrar
        </button>
      </form>
      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.background, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="border border-dashed p-1 rounded bg-neutral-900"
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Admin;
