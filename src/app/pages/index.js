import axios from "axios";
import Link from "next/link";

export async function getServerSideProps() {
  const apiKey = process.env.NEWS_API_KEY;
  const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`);
  return { props: { noticias: res.data.articles } };
}

export default function Home({ noticias }) {
  return (
    <div>
      <h1>Painel de Notícias</h1>
      <ul>
        {noticias.map((noticia, index) => (
          <li key={index}>
            <Link href={`/noticia/${index}`}>
              <h2>{noticia.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
