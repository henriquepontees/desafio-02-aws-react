import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/ComicList.css';
import Spinner from '../components/Spinner';
import LoadMoreButton from '../components/LoadMoreButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { PUBLIC_KEY } from '../Components/Commons';

interface Creator {
    name: string;
    resourceURI: string;
}

interface DateInfo {
    type: string;
    date: string;
}
 
interface Comic {
    id: number;
    title: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    prices?: { price: number }[];
    creators?: { items: Creator[] };
    dates?: DateInfo[];
}
 
const ComicsList: React.FC = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const firstLoad = useRef(true);
    const navigate = useNavigate();
    const location = useLocation();
    const storage = localStorage;
 
    useEffect(() => {
        const fetchComics = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const searchQuery = params.get('search');
 
                if (firstLoad.current) {
                    firstLoad.current = false;
                    return;
                  }
 
                const response = await axios.get(
                    `http://gateway.marvel.com/v1/public/comics?apikey=${PUBLIC_KEY}&limit=20&offset=${offset}${searchQuery ? `&titleStartsWith=${searchQuery}` : ''}`
                );
 
                const comicData: Comic[] = response.data.data.results.map((comic: {
                    id: number;
                    title: string;
                    thumbnail: {
                        path: string;
                        extension: string;
                    };
                    prices: { price: number }[];
                    creators: { items: Creator[] };
                    dates: DateInfo[];
                }) => ({
                    id: comic.id,
                    title: comic.title,
                    thumbnail: comic.thumbnail,
                    prices: comic.prices || [],
                    creators: comic.creators || { items: [] },
                    dates: comic.dates || [],
                }));
 
                setComics((prevComics) => [...prevComics, ...comicData]);
            } catch (error) {
                setError('Erro ao buscar quadrinhos. Tente novamente mais tarde.');
                console.error(error);
            }
        };

        fetchComics();
    }, [offset, location.search]);

    const handleComicClick = (id: number) => {
        storage.setItem('idImagem', id.toString());
        navigate(`/comic/${id}`);
    };

    const loadMoreComics = () => {
        setOffset(prevOffset => prevOffset + 20);
    };

    return (
        <div className="body-comic-lits">

        <div>
            {error && <div className="error-message">{error}</div>}
            {comics.length === 0 ? (
                <Spinner />
            ) : (
                <div className='main'>
                    {comics.map((comic) => {
                        const onSaleDate = comic.dates?.find(date => date.type === 'onsaleDate');
                        const creatorName = comic.creators?.items[0]?.name || 'sem registro';
                        const price = comic.prices?.[0]?.price ?? 'N/A';

                        return (
                            <div key={comic.id} id='comicInfo' onClick={() => handleComicClick(comic.id)}>
                                <img
                                    className='img-comic'
                                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                    alt={comic.title}
                                />
                                <h3 id='title'>{comic.title}</h3>
                                <h4 id='price'>${price}</h4>
                                <div id='creator-year'>
                                    <p>{creatorName}</p>
                                    <h4>
                                        {onSaleDate ? new Date(onSaleDate.date).getFullYear() : 'N/A'}
                                    </h4>
                                </div>
                            </div>
                        );
                    })}
                    <LoadMoreButton onClick={loadMoreComics} />
                </div>
            )}
        </div>
        </div>
    );
};

export default ComicsList;
