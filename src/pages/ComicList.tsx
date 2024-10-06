import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/ComicList.css';
import Spinner from '../components/Spinner';
import LoadMoreButton from '../components/LoadMoreButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { PUBLIC_KEY } from '../Components/Commons'; 

interface Comic {
    id: number;
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    prices?: { price: number }[]; 
    creators?: { items: { name: string; resourceURI: string }[] }; 
    dates?: { type: string; date: string }[]; 
}

const ComicsList: React.FC = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const firstLoad = useRef(true);
    const navigate = useNavigate();
    const location = useLocation();
    const storage = localStorage;

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const searchQuery = params.get('search');

                
                if (firstLoad.current || searchQuery) {
                    firstLoad.current = false;
                    setComics([]);
                    setOffset(0);
                }

                const response = await axios.get(
                    `http://gateway.marvel.com/v1/public/comics?apikey=${PUBLIC_KEY}&limit=20&offset=${offset}${searchQuery ? `&titleStartsWith=${searchQuery}` : ''}`
                );

              
                const comicData: Comic[] = response.data.data.results.map((comic: any) => ({
                    id: comic.id,
                    title: comic.title,
                    thumbnail: comic.thumbnail,
                    prices: comic.prices, 
                    creators: comic.creators, 
                    dates: comic.dates, 
                }));

                setComics((prevComics) => [...prevComics, ...comicData]);
            } catch (err: any) {
                console.error('Erro ao buscar quadrinhos:', err);
            }
        };

        fetchComics();
    }, [offset, location.search]);

    const handleComicClick = (id: number) => {
        storage.setItem('idImagem', id.toString()); 
        navigate(`/comic/${id}`); 
    };

    const loadMoreComics = () => {
        setOffset((prevOffset) => prevOffset + 20); 
    };

    return (
        <div>
        {comics.length === 0 ? (
            <Spinner />
        ) : (
            <div id='main'>
                {comics.map((comic) => (
                    <div key={comic.id} id='comicInfo'>
                        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                        <h3 id='title'>{comic.title}</h3>
                       
                        <h4 id='price'>${comic.prices.length > 0 ? comic.prices[0].price : 'N/A'}</h4>
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
                <LoadMoreButton onClick={loadMoreComics} />
            </div>
        )}
    </div>
    );
};

export default ComicsList;
