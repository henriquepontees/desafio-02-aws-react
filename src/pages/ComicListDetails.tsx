
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ComicListDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Components/Spinner';
import Footer from '../Components/Footer';
import '../styles/CharacterDetails.css';
interface Comic {
    title: string,
    image: string,
    price: string,
    published: string,
    pagesNumber: string,
    author: string,
    series: string,
    characters: Characters[],
    otherComics: OthersComic[],
}

interface Characters {
    id: string,
    name: string,
    image: string,
}

interface OthersComic {
    id: string,
    name: string,
    image: string,
}

export const ComicListDetails = () => {
  const { id } = useParams();
  const [comic, setComic] = useState<Comic | null>(null);
  const apiKey = '6fc18222ac8e9167cd6f3fb05cff423b';
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const generalResponse = await axios.get(
          `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${apiKey}`
        );

        const charactersResponse = await axios.get(
            `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?limit=3&apikey=${apiKey}`
          );

        const comicsResponse = await axios.get(
            `https://gateway.marvel.com:443/v1/public/comics?limit=20&apikey=${apiKey}`
        );
        
        const charInfo = generalResponse.data.data.results[0];
        const charactersInfo = charactersResponse.data.data;
        const comicsInfo = comicsResponse.data.data;

        const comicData: Comic ={
          title: charInfo.title,
          image: `${charInfo.thumbnail.path}/portrait_xlarge.jpg`,
          price: charInfo.prices[0].price ?? Math.floor(Math.random() * (100 - 10 + 1)) + 10,
          published: charInfo.dates?.find(
            (date:any) => date.type === "onsaleDate"
          )?.date.slice(0, 4) || "Data não disponível",
          pagesNumber: charInfo.pageCount === "" ? "Registro não existe." : charInfo.series.available,
          author: charInfo.creators.items[0].name === "" ? "Registro não existe." : charInfo.creators.items[0].name,
          series:charInfo.series.name,
          characters: charactersInfo.results.slice(1,4).map((character: any) => ({
            id: character.id, 
            name: character.name,
            image: character.thumbnail.path+"/portrait_xlarge.jpg", 
          })),
          otherComics: comicsInfo.results.map((comic: any) => ({
            id: comic.id, 
            name: comic.title,
            image: comic.thumbnail.path+"/portrait_xlarge.jpg", 
          })),
        };
        console.log(comicData)
        setComic(comicData);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData(); 
  }, [id]); 

  const handleAddToCart = () => {
    if (!comic) return;

    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : { products: [], quantities: [] };

    const productIndex = cart.products.findIndex((p: any) => p.id === comic.id);
    if (productIndex >= 0) {
      cart.quantities[productIndex]++;
    } else {
      cart.products.push({
        id: parseInt(id!),
        image: comic.image,
        title: comic.title,
        price: parseFloat(comic.price),
      });
      cart.quantities.push(1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Produto adicionado ao carrinho!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressStyle: { backgroundColor: '#ff8100' }
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (!comic) {
    return <p>Erro ao carregar os dados do personagem.</p>;
  }

  return (
    <main className="comic-details-container-comic">
      <section className="button-section-comic">
        <button className="back-button-comic" onClick={() => window.history.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="64" fill="none" viewBox="0 0 24 24" stroke="rgba(255, 129, 0, 1)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </section>
      <section className="main-information-container-comic">
        <figure className="comic-image-container-comic">
          <img src={comic.image} alt={comic.title} className="comic-details-image-comic" />
        </figure>
        <div className="comic-informations-comic">
          <h1 className="comic-details-name-comic">{comic.title}</h1>
          <p className="info-price-comic">$ {comic.price}</p>
          <div className="info-container-comic">
            <div className="info-item-comic">
              <h3 className="info-title-comic">Publicado em</h3>
              <p className="info-value-comic">{comic.published}</p>
            </div>
            <div className="info-item-comic">
              <h3 className="info-title-comic">Núm. de Páginas</h3>
              <p className="info-value-comic">{comic.pagesNumber}</p>
            </div>
            <div className="info-item-comic">
              <h3 className="info-title-comic">Autor</h3>
              <p className="info-value-comic">{comic.author}</p>
            </div>
            <div className="info-item-comic">
              <h3 className="info-title-comic">Série</h3>
              <p className="info-value-comic">{comic.series}</p>
            </div>
          </div>
  
          {comic.characters.length > 0 && (
            <section className="comic-characters-comic">
              <h3 className="character-list-title-comic">Personagens da obra</h3>
              <div className="characters-list-comic">
                {comic.characters.map((character) => (
                  <div className="character-item-comic" key={character.id}>
                    <a href={`/Characters/${character.id}`} className='a-comic-comic' >
                      <img src={character.image} alt={character.name} className="character-image-comic" />
                    </a>
                    <p className="character-name-comic">{character.name}</p>
                  </div>
                ))}
              </div>
              <div className="comic-buttons-comic">
                <button className="add-to-cart-button-comic">Adicionar ao Carrinho</button>
                <button className="buy-now-button-comic">Comprar Agora</button>
            </div>
            </section>
          )}

        </div>
      </section>
  
      <section className="other-comics-section-comic">
        <h2 className="other-comics-title-comic">Mais obras</h2>
        <div className="other-comics-list-comic">
          {comic.otherComics.map((otherComic) => (
            <div className="other-comic-item-comic" key={otherComic.id}>
              <a href={`/Comic/${otherComic.id}`}>
                <img src={otherComic.image} alt={otherComic.name} className="other-comic-image-comic" />
              </a>
              <h4 className="other-comic-name-comic">{otherComic.name}</h4>
            </div>
          ))}
        </div>
      </section>
  
      <Footer />
      <ToastContainer />
    </main>
  );
  
}
