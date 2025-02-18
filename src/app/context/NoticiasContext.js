'use client'
import { createContext, useContext, useState } from 'react';

const NoticiasContext = createContext();

export function NoticiasProvider({ children }) {
  const [noticias, setNoticias] = useState([]);
  const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNoticia = async (pesquisa) => {
    setLoading(true);
    const apiKey = "c7e4c61d69814647851cd1c33a162abf";const currentDate = new Date().toISOString().split('T')[0]; // Data atual em formato YYYY-MM-DD
    const apiUrl = `https://newsapi.org/v2/everything?q=${pesquisa}&from=${currentDate}country=br&sortBy=publishedAt&apiKey=${apiKey}`;
    console.log(apiUrl)
  
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setNoticias(data.articles || []);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectNoticia = (noticia) => {
    setNoticiaSelecionada(noticia); // Armazena a notícia selecionada no contexto
  };

  return (
    <NoticiasContext.Provider value={{ noticias, loading, fetchNoticia, noticiaSelecionada, selectNoticia, setNoticias }}>
      {children}
    </NoticiasContext.Provider>
  );
}

export const useNoticias = () => {
  return useContext(NoticiasContext);
};
