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
    const [comics, setComics] = useState<Comic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);

    const fetchComics = async (offset: number) => {
        const url = `http://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&offset=${offset}`;
        try {
            const response = await axios.get(url);
            console.log('Request', response.data);
            setComics((prevComics) => [...prevComics, ...response.data.data.results]);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar HQs:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComics(offset);
    }, [offset]);

    const loadMoreComics = () => {
        setOffset((prevOffset) => prevOffset + 20);
    };

    return (
        <div>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div id='main'>
                    {comics.map((comic) => (
                        <div key={comic.id} id='comicInfo'>
                            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                            <h3 id='title'>{comic.title}</h3>
                            <h4 id='price'>${comic.prices[0]?.price}</h4>
                            <div id='creator-year'>
                                {comic.creators.items.length > 0 ? (
                                    comic.creators.items.slice(0, 1).map((creator) => (
                                        <p key={creator.resourceURI}>{creator.name}</p>
                                    ))
                                ) : (
                                    <p>sem registro</p>
                                )}
                                <h4>
                                    {new Date(comic.dates.find(date => date.type === 'onsaleDate')?.date ?? '').getFullYear() || 'N/A'}
                                </h4>
                            </div>
                        </div>
                    ))}
                    <button onClick={loadMoreComics} id='button'>+ Carregar mais</button>
                </div>
            )}
        </div>
    );
};

export default ComicsList;
