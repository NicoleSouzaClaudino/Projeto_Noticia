import { useRouter } from "next/router";

export default function Noticia({ noticia }) {
  const router = useRouter();
  if (!noticia) return <p>Carregando...</p>;

  return (
    <div>
      <button onClick={() => router.back()}>Voltar</button>
      <h1>{noticia.title}</h1>
      <p>{noticia.description}</p>
      <img src={noticia.urlToImage} alt={noticia.title} width="600" />
      <a href={noticia.url} target="_blank" rel="noopener noreferrer">Leia mais</a>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const apiKey = process.env.NEWS_API_KEY;
  const res = await fetch(`https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`);
  const data = await res.json();
  
  return { props: { noticia: data.articles[params.id] || null } };
}
