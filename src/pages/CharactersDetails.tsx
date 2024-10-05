import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/styles/CharacterDetails.css';

interface Character {
    name: string,
    image: string,
    created: string,
    storiesNumber: string,
    seriesNumber: string,
    description: string,
    stories: Comic[],
    otherComics: Comic[],
}

interface Comic {
    id: string,
    name: string,
    image: string,
}

export const CharactersDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const apiKey = '6fc18222ac8e9167cd6f3fb05cff423b';
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
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

        const characterData: Character ={
          name: charInfo.name,
          image: `${charInfo.thumbnail.path}/portrait_xlarge.jpg`,
          created: charInfo.modified ? charInfo.modified.slice(0, 4) : "Data não disponível",
          seriesNumber: charInfo.series.available === "" ? "Registro não existe." : charInfo.series.available,
          storiesNumber: charInfo.stories.available === "" ? "Registro não existe." : charInfo.stories.available,
          description: charInfo.description === "" ? "Registro não existe." : charInfo.description,
          stories: storiesInfo.results.slice(0,3).map((comic: any) => ({
            id: comic.id, 
            name: comic.title,
            image: comic.thumbnail.path+"/portrait_xlarge.jpg", 
          })),
          otherComics: comicsInfo.results.map((comic: any) => ({
            id: comic.id, 
            name: comic.title,
            image: comic.thumbnail.path+"/portrait_xlarge.jpg", 
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
  }, []); 

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!character) {
    return <p>Erro ao carregar os dados do personagem.</p>;
  }

  return (
    <div className="character-details-container">
      <div className="character-image-container">
        <img src={character.image} alt={character.name} className="character-image" />
      </div>
      
      <h1 className="character-name">{character.name}</h1>

      <div className="character-info">
        <div className="info-item">
          <span>Criado em</span>
          <p>{character.created}</p>
        </div>
        <div className="info-item">
          <span>Histórias</span>
          <p>{character.storiesNumber}</p>
        </div>
        <div className="info-item">
          <span>Núm. de séries</span>
          <p>{character.seriesNumber}</p>
        </div>
      </div>

      <div className="character-description">
        <h2>Descrição</h2>
        <p>{character.description}</p>
      </div>

      <div className="character-stories">
        <h2>Histórias</h2>
        <div className="stories-list">
          {character.stories.map((story) => (
            <div className="story-item" key={story.id}>
              <img src={story.image} alt={story.name} className="story-image" />
              <p>{story.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="character-other-comics">
        <h2>Outros quadrinhos</h2>
        <div className="comics-list">
          {character.otherComics.map((comic) => (
            <div className="comic-item" key={comic.id}>
              <img src={comic.image} alt={comic.name} className="comic-image" />
              <p>{comic.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
