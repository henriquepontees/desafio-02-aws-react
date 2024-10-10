import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '/src/styles/CharacterDetails.css';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

interface Character {
  name: string;
  image: string;
  created: string;
  storiesNumber: string;
  seriesNumber: string;
  description: string;
  stories: Comic[];
  otherComics: Comic[];
}

interface Comic {
  id: string;
  name: string;
  image: string;
}

export const CharactersDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const apiKey = '6fc18222ac8e9167cd6f3fb05cff423b';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const generalResponse = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${apiKey}`
        );

        const storiesResponse = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=20&apikey=${apiKey}`
        );

        const comicsResponse = await axios.get(
          `https://gateway.marvel.com:443/v1/public/comics?limit=20&apikey=${apiKey}`
        );

        const charInfo = generalResponse.data.data.results[0];
        const storiesInfo = storiesResponse.data.data;
        const comicsInfo = comicsResponse.data.data;

        const characterData: Character = {
          name: charInfo.name,
          image: `${charInfo.thumbnail.path}/portrait_xlarge.jpg`,
          created: charInfo.modified ? charInfo.modified.slice(0, 4) : "Data não disponível",
          seriesNumber: charInfo.series.available === "" ? "Registro não existe." : charInfo.series.available,
          storiesNumber: charInfo.stories.available === "" ? "Registro não existe." : charInfo.stories.available,
          description: charInfo.description === "" ? "Registro não existe." : charInfo.description,
          stories: storiesInfo.results.slice(0, 3).map((comic: any) => ({
            id: comic.id,
            name: comic.title,
            image: comic.thumbnail.path + "/portrait_xlarge.jpg",
          })),
          otherComics: comicsInfo.results.map((comic: any) => ({
            id: comic.id,
            name: comic.title,
            image: comic.thumbnail.path + "/portrait_xlarge.jpg",
          })),
        };

        setCharacter(characterData);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!character) {
    return <p>Erro ao carregar os dados do personagem.</p>;
  }

  return (
    <main className="character-character-details-container">
      <section className="character-button-section">
        <button className="character-back-button" onClick={() => window.history.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="64" fill="none" viewBox="0 0 24 24" stroke="rgba(255, 129, 0, 1)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </section>
      <section className="character-main-information-container">
        <figure className="character-character-details-image-container">
          <img src={character.image} alt={character.name} className="character-character-details-image" />
        </figure>
        <div className="character-character-informations">
        <h1 className="character-character-details-name">{character.name}</h1>
          <div className="character-info-container">
            <div className="character-info-item">
              <h3 className="character-info-title">Criado em</h3>
              <p className="character-info-value">{character.created}</p>
            </div>
            <div className="character-info-item">
              <h3 className="character-info-title">Histórias</h3>
              <p className="character-info-value">{character.storiesNumber}</p>
            </div>
            <div className="character-info-item">
              <h3 className="character-info-title">Núm. de séries</h3>
              <p className="character-info-value">{character.seriesNumber}</p>
            </div>
          </div>

          <h3 className="character-character-description-title">Descrição</h3>
          <p className="character-character-description">{character.description}</p>

          <section className="character-character-characters">
            <h3 className="character-character-stories-title">Histórias</h3>
            <div className="character-characters-list">
              {character.stories.map((story) => (
                <div className="character-character-item" key={story.id}>
                  <a href={`/comic/${story.id}`} className='a-character' >
                  <img src={story.image} alt={story.name} className="character-character-image" />
                  </a>
                  <h5 className="character-character-name">{story.name}</h5>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
      
      <section className="other-comics-section-comic">
        <h2 className="other-comics-title-comic">Mais obras</h2>
        <div className="other-comics-list-comic">
          {character.otherComics.map((comic) => (
            <div className="other-comic-item-comic" key={comic.id}>
              <a href={`/Comic/${comic.id}`}>
                <img src={comic.image} alt={comic.name} className="other-comic-image-comic" />
              </a>
              <h4 className="other-comic-name-comic">{comic.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <Footer /> 
    </main>
  );
};
