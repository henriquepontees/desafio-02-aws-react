import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ComicList.css';

interface Comic {
    id: number;
    title: string;
    description: string | null;
    thumbnail: {
      path: string;
      extension: string;
    };
    creators: {
        available: number;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    dates: {
        type: string;
        date: string;     
    }[];
    prices: {
        type: string;
        price: number;
    }[];
  }

const ComicsList: React.FC = () => {
  const publicKey = 'e55560ca5e17759eb1563f995c0426de'; 
  const url = `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}`;

  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(url);
        console.log('Resposta completa da API:', response.data);
        setComics(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar HQs:', error);
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

    return (
        <div>
        <h1>Marvel Comics</h1>
        {loading ? (
            <p>Carregando...</p>
        ) : (
            <div id='main'>
            {comics.map((comic) => (
                <div key={comic.id}>
                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}/>
                    <h3>{comic.title}</h3>
                    {comic.creators.items.slice(0, 1).map((creator) => (
                        <p key={creator.resourceURI}>
                            {creator.name}
                        </p>
                        ))}
                    <div>
                        <h4> 
                        ${comic.prices[0]?.price ?? 'N/A'}
                        </h4>
                        <h4>
                        {new Date(comic.dates.find(date => date.type === 'onsaleDate')?.date ?? '').getFullYear() || 'N/A'}
                        </h4>
                    </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default ComicsList;