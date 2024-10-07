import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '/src/styles/Character.css';
import { PUBLIC_KEY } from '../Components/Commons';
import Spinner from '../Components/Spinner';

interface Character {
  id: number;
  image: string;
  name: string;
}

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true); 
  const firstLoad = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();
  const storage = localStorage;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 

      try {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search');

        if (firstLoad.current || searchQuery) {
          firstLoad.current = false;
          setCharacters([]);
          setOffset(0);
        }

        const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&apikey=${PUBLIC_KEY}${searchQuery ? `&nameStartsWith=${searchQuery}` : ''}`
        );

        const characterData: Character[] = response.data.data.results.map((character: any) => ({
          id: character.id,
          name: character.name,
          image: `${character.thumbnail.path}/portrait_xlarge.jpg`,
        }));

        setCharacters((prevCharacters) => [...prevCharacters, ...characterData]);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [offset, location.search]);

  const handleButtonClick = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  const handleImageClick = (id: number) => {
    storage.setItem(`idImagem`, id.toString());
    navigate(`${id}`);
  };

  return (
    <div className='charactersGrid'>
      {loading && <Spinner />} 
      <ul className="character-list">
        {characters.map((character: Character) => (
          <li key={character.id} className="character-card">
            <div className="character-image">
              <img
                src={character.image}
                alt={character.name}
                onClick={() => handleImageClick(character.id)}
              />
            </div>
            <div className="character-name" onClick={() => handleImageClick(character.id)}>
              <span>{character.name}</span>
            </div>
          </li>
        ))}
      </ul>
      {!loading && characters.length > 0 && ( 
        <button onClick={handleButtonClick} className='button-characters'>Carregar mais</button>
      )}
    </div>
  );
};
