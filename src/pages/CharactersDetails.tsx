import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchData(); 
  }, []); 
  return (
    <div>
        <h1>Personagem: {character?.name || 'Carregando...'}</h1>
    </div>
  )
}
