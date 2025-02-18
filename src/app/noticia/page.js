'use client';
import { useNoticias } from '../context/NoticiasContext';

export default function NoticiaDetalhada() {
  const { noticiaSelecionada } = useNoticias(); // Pegando a notícia do contexto

  if (!noticiaSelecionada) {
    return <p>⚠️ Notícia não encontrada!</p>;
  }

  return (
    <main className="noticia-detalhada">
      <h1>{noticiaSelecionada.title}</h1>
      {noticiaSelecionada.urlToImage && (
        <img src={noticiaSelecionada.urlToImage} alt={noticiaSelecionada.title} />
      )}
      <p>{noticiaSelecionada.description}</p>
      <div dangerouslySetInnerHTML={{ __html: noticiaSelecionada.content }} />
    </main>
  );
}
