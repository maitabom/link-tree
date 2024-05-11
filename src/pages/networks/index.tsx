import { FormEvent, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

import Header from "../../components/header";
import Input from "../../components/input";
import { datastore } from "../../services/firebase";

function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(datastore, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    }

    loadLinks();
  });

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(datastore, "social", "link"), {
      facebook,
      instagram,
      youtube,
    })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas Redes Sociais
      </h1>
      <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
        <label className="text-white font-medium my-2">Link do Facebook</label>
        <Input
          type="url"
          placeholder="Digite a URL do Facebook"
          value={facebook}
          onChange={(e) => {
            setFacebook(e.target.value);
          }}
        />

        <label className="text-white font-medium my-2">Link do Instagram</label>
        <Input
          type="url"
          placeholder="Digite a URL do Instagram"
          value={instagram}
          onChange={(e) => {
            setInstagram(e.target.value);
          }}
        />

        <label className="text-white font-medium my-2">Link do Youtube</label>
        <Input
          type="url"
          placeholder="Digite a URL do Youtube"
          value={youtube}
          onChange={(e) => {
            setYoutube(e.target.value);
          }}
        />

        <button
          className="text-white bg-blue-600 h-9 rounded-md my-7 font-medium"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Networks;
