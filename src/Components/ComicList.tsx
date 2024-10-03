import React, { useEffect, useState } from 'react';

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
    data: {
        type: string;
        date: Date;     
    }
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
        const response = await fetch(url);
        const data = await response.json();
        setComics(data.data.results);
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
            <div>
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
                        <h4>preço</h4>
                        <h4>ano</h4> 
                    </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default ComicsList;