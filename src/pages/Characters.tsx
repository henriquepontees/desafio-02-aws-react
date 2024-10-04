import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/styles/Character.css';

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
  const navigate = useNavigate();

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
          image: `${character.thumbnail.path}/portrait_xlarge.jpg`,
        }));

        setCharacters((prevCharacters) => [...prevCharacters, ...characterData]);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchData(); 
  }, [offset]); 

  const handleButtonClick = () => {
    setOffset((prevOffset) => prevOffset + 20); 
  };

  const handleImageClick = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <div className='charactersGrid'>
    <ul className="character-list" >
        {characters.map((character: Character) => (
            <li key={character.id} className="character-card">
                <div className="character-image">
                    <img src={character.image} alt={character.name}  onClick={() => handleImageClick(character.id)}/>
                </div>
                <div className="character-name" onClick={() => handleImageClick(character.id)}>
                    <span>{character.name}</span>
                </div>
            </li>
        ))}
    </ul>
      <button onClick={handleButtonClick} className='button-characters' >Carregar mais</button>
    </div>
  );
};
