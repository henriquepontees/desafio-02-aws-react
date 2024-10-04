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

 
  return (
    <div>
        <h1>Personagem: {character?.name || 'Carregando...'}</h1>
    </div>
  )
}
