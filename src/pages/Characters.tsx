import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Character {
  id: number;
  image: string;
  name: string;
}

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const apiKey = '6fc18222ac8e9167cd6f3fb05cff423b';
  const [offset, setOffset] = useState(0);
  const firstLoad = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (firstLoad.current) {
            firstLoad.current = false; 
            return;
          }

        const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&apikey=${apiKey}`
        );
        
        const characterData: Character[] = response.data.data.results.map((character: any) => ({
          id: character.id,
          name: character.name,
          image: `${character.thumbnail.path}/portrait_incredible.jpg`,
        }));

        setCharacters((prevCharacters) => [...prevCharacters, ...characterData]);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchData(); 
  }, [offset]); 

  const handleClick = () => {
    setOffset((prevOffset) => prevOffset + 20); 
  };

  return (
    <div className='charactersGrid'>
      <ul>
        {characters.map((character: Character) => (
          <li key={character.id}>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Carregar mais</button>
    </div>
  );
};
