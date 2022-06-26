import { useState,useEffect} from "react";
import './styles.css';
import SearchBar from "components/SearchBar";
import ImgGallery from "components/ImgGallery";
import fetchUrl from "components/servises/FetchUrl";
import Button from "components/Button";
import Modal from "components/Modal";
import Loader from "components/Loader";

export default function App() { 
  const [imgUrl, setImgUrl] = useState('');
  const [image, setImage] = useState([]);
  const [pages,setPages] = useState(1);
  const [error,setError] = useState(null);
  const [stat, setStatus] = useState('idle');
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [largeImageUrl,setLargeImageUrl] = useState(null);

  useEffect(() => { 
    if (imgUrl === '') {
      return;
     };

    setStatus('pending');
    
  fetchUrl(imgUrl, pages)
    .then(response => {
      const images = response.hits.map(({ id, tags, largeImageURL, webformatURL }) =>
        ({ id, tags, largeImageURL, webformatURL }));
      console.log(images);

      if (images.length === 0) { 
        alert(`We did't find ${imgUrl} image `);
        setStatus('rejected');
      };

      if (images.length > 0) {
        setImage(prevState => [...prevState, ...images],
          setStatus('resolved'),
          );
      };
        
    }).catch(error => {
      setError(error);
      setStatus('rejected');
    });
      console.log(error);
  },[error, imgUrl, pages]);

  

  const handleFormSubmit = imageUrl => { 
    setImage([]);
    if (image !== imageUrl) { 
      setImgUrl(imageUrl);
      setPages(prevState => prevState + 1);
    console.log(imageUrl);
    };
  };

 const toggleModal = () => { 
   setShowModalWindow(!showModalWindow);
  };

 const largeImageClick = images => { 
   setLargeImageUrl(images);
    console.log('images',images);
    console.log('largeImageUrl',largeImageUrl);
  };

 const loadMoreButton = event => { 
    event.preventDefault();
   setPages(prevState => prevState + 1);
  };

    return (
      <>
        <SearchBar onSubmit={handleFormSubmit} />
        {image.length > 0 &&
          (<ImgGallery
          images={image}
          largeImageClick={largeImageClick}
          toggleModal={ toggleModal}
          />)
          } 
        {showModalWindow && <Modal onClose={toggleModal}
            largeImage={largeImageUrl}
        />}
        {image.length > 0 && stat === "resolved" && (<Button onClick={loadMoreButton} />)}
        { stat === 'pending' && <Loader/>}
        
      </>
    )
};