'use client';
import { useState } from 'react';
import { useNoticias } from '../app/context/NoticiasContext';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const [pesquisa, setPesquisa] = useState('');
  const { noticias, loading, fetchNoticia, selectNoticia } = useNoticias(); // Consumindo o contexto

  const handlePesquisa = () => {
    if (pesquisa) {
      fetchNoticia(pesquisa); // Chama a função do contexto para buscar as notícias
    }
  };

  const limparPesquisa = () => {
    setPesquisa('');
  };

  return (
    <main className="page">
      <h1>📰 Painel de Notícias</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Digite um termo de pesquisa..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button className="search-btn" onClick={handlePesquisa}>
          <FaSearch />
        </button>
        <button className="clear-btn" onClick={limparPesquisa}>
          <FaTrashAlt />
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : noticias.length > 0 ? (
        <div className="noticias-grid">
          {noticias?.map((noticia, index) => (
            <Link
              key={`${noticia.title}-${index}`}  // Usando o título como chave única para os links
              href="/noticia" // Caminho fixo para a página de detalhes
              passHref
              onClick={() => selectNoticia(noticia)} // Salva a notícia selecionada no contexto
            >
              <div className="noticia-card">
                {noticia.urlToImage && (
                  <img src={noticia.urlToImage} alt={noticia.title} className="noticia-image" />
                )}
                <div className="card-content">
                  <h2>{noticia.title}</h2>
                  <p>{noticia.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>⚠️ Nenhuma notícia encontrada para "{pesquisa}".</p>
      )}
    </main>
  );
}
