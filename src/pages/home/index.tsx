import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import Social from "../../components/social";
import SocialLinks from "./sociallinks";
import LinkItem from "../admin/linkitens";
import { datastore } from "../../services/firebase";

function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>();

  useEffect(() => {
    const linksRef = collection(datastore, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    getDocs(queryRef).then((snapshot) => {
      const lista = [] as LinkItem[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          background: doc.data().background,
          color: doc.data().color,
        });

        setLinks(lista);
      });
    });
  });

  useEffect(() => {
    const socialRef = doc(datastore, "social", "link");
    getDoc(socialRef).then((snapshot) => {
      if (snapshot.data() != undefined) {
        setSocialLinks({
          facebook: snapshot.data()?.facebook,
          instagram: snapshot.data()?.instagram,
          youtube: snapshot.data()?.youtube,
        });
      }
    });
  });

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Fábio Valentim
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇🏾</span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: link.background,
            }}
          >
            <a
              className="text-base md:text-lg"
              href={link.url}
              target="_blank"
              style={{ color: link.color }}
            >
              {link.name}
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks.facebook}>
              <FaFacebook size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.youtube}>
              <FaYoutube size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}

export default Home;
