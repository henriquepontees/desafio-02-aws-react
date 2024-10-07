import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ComicListDetails.css';


interface Comic {
    title: string,
    image: string,
    price: string,
    published: string,
    pagesNumber: string,
    author: string,
    series: string,
    characters: Characters[],
    otherComics: OthersComic[],
}

interface Characters {
    id: string,
    name: string,
    image: string,
}

interface OthersComic {
    id: string,
    name: string,
    image: string,
}

export const ComicListDetails = () => {
  const { id } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);
  const apiKey = '6fc18222ac8e9167cd6f3fb05cff423b';
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const generalResponse = await axios.get(
          `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${apiKey}`
        );

        const charactersResponse = await axios.get(
            `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?limit=3&apikey=${apiKey}`
          );

        const comicsResponse = await axios.get(
            `https://gateway.marvel.com:443/v1/public/comics?limit=20&apikey=${apiKey}`
        );
        
        const charInfo = generalResponse.data.data.results[0];
        const charactersInfo = charactersResponse.data.data;
        const comicsInfo = comicsResponse.data.data;

        const comicData: Comic ={
          title: charInfo.title,
          image: `${charInfo.thumbnail.path}/portrait_xlarge.jpg`,
          price: charInfo.prices[0].price ?? Math.floor(Math.random() * (100 - 10 + 1)) + 10,
          published: charInfo.dates?.find(
            (date:any) => date.type === "onsaleDate"
          )?.date.slice(0, 4) || "Data não disponível",
          pagesNumber: charInfo.pageCount === "" ? "Registro não existe." : charInfo.series.available,
          author: charInfo.creators.items[0].name === "" ? "Registro não existe." : charInfo.creators.items[0].name,
          series:charInfo.series.name,
          characters: charactersInfo.results.slice(1,4).map((character: any) => ({
            id: character.id, 
            name: character.name,
            image: character.thumbnail.path+"/portrait_xlarge.jpg", 
          })),
          otherComics: comicsInfo.results.map((comic: any) => ({
            id: comic.id, 
            name: comic.title,
            image: comic.thumbnail.path+"/portrait_xlarge.jpg", 
          })),
        };
        console.log(comicData)
        setComic(comicData);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData(); 
  }, []); 

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!comic) {
    return <p>Erro ao carregar os dados do personagem.</p>;
  }

  return (
    <div className="comic-details-container">
  
      <a href="/ComicsList/">
        <button className="back-button">Voltar</button>
      </a>
      <div className="main-information-container">
  
        <div className="comic-image-container">
          <img src={comic.image} alt={comic.title} className="comic-details-image" />
        </div>
  
        <div className="comic-informations">
          <h1 className="comic-details-title">{comic.title}</h1>

          <div className="comic-price">
            <p>R$ {comic.price}</p>
          </div>
  
          <div className="info-item">
            <h3>Publicado em</h3>
            <p>{comic.published}</p>
          </div>
  
          <div className="info-item">
            <h3>Núm. de Páginas</h3>
            <p>{comic.pagesNumber}</p>
          </div>
  
          <div className="info-item">
            <h3>Autor</h3>
            <p>{comic.author}</p>
          </div>
  
          <div className="info-item">
            <h3>Série</h3>
            <p>{comic.series}</p>
          </div>
  
            {comic.characters.length > 0 && (
            <div className="comic-characters">
                <h3>Personagens da obra</h3>
                <div className="characters-list">
                {comic.characters.map((character) => (
                    <div className="character-item" key={character.id}>
                        <a href={`/Characters/${character.id}`}>
                            <img src={character.image} alt={character.name} className="character-image" />
                        </a>
                    <p>{character.name}</p>
                    </div>
                ))}
                </div>
            </div>
            )}
  
          <div className="comic-buttons">
            <button className="add-to-cart">Adicionar ao carrinho</button>
            <button className="buy-now">Comprar agora</button>
          </div>
        </div>
      </div>
  
      <div className="other-comics-section">
        <h2>Mais obras</h2>
        <div className="other-comics-list">
          {comic.otherComics.map((otherComic) => (
            <div className="other-comic-item" key={otherComic.id}>
              <a href={`/Comic/${otherComic.id}`}>
                <img src={otherComic.image} alt={otherComic.name} className="other-comic-image" />
              </a>
              <p>{otherComic.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
}
