import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '/src/styles/CharacterDetails.css';
import Spinner from '../components/Spinner';
import Footer from '../Components/Footer';

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
    <div className="character-details-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="64" fill="none" viewBox="0 0 24 24" stroke="rgba(255, 129, 0, 1)">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>

      <div className="main-information-container">
        <div className="character-details-image-container">
          <img src={character.image} alt={character.name} className="character-details-image" />
        </div>

        <div className="character-informations">
          <h1 className="character-details-name">{character.name}</h1>

          <div className="info-container">
            <div className="info-item">
              <h3 className="info-title">Criado em</h3>
              <p className="info-value">{character.created}</p>
            </div>
            <div className="info-item">
              <h3 className="info-title">Histórias</h3>
              <p className="info-value">{character.storiesNumber}</p>
            </div>
            <div className="info-item">
              <h3 className="info-title">Núm. de séries</h3>
              <p className="info-value">{character.seriesNumber}</p>
            </div>
          </div>

          <h3 className="character-description-title">Descrição</h3>
          <p className="character-description">{character.description}</p>

          <div className="character-stories">
            <h3 className="character-stories-title">Histórias</h3>
            <div className="stories-list">
              {character.stories.map((story) => (
                <div className="story-item" key={story.id}>
                  <img src={story.image} alt={story.name} className="story-image" />
                  <h5 className="story-name">{story.name}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="character-other-comics">
        <h2 className="character-other-comics-title">Mais Obras</h2>
        <div className="comics-list">
          {character.otherComics.map((comic) => (
            <div className="comic-item" key={comic.id}>
              <img src={comic.image} alt={comic.name} className="comic-image" />
              <h4 className="comic-name">{comic.name}</h4>
            </div>
          ))}
        </div>
      </div>
      
  
      <Footer /> 
    </div>
  );
};
