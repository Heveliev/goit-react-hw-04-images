import {useState,useEffect,useRef} from "react";
import {AppStyle} from './App.styled';
import { GalleryList } from "./GalleryList/GalleryList";
import { Header } from './Header/Header';
import { ColorRing } from 'react-loader-spinner';
import { ButtonLoadMore } from "./ButtomLoadMore/ButtomLoadMore";
import { getApi } from '../getApi/getApi';
import { animateScroll as scroll } from 'react-scroll';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED:'rejected',
}


const App = () => {
  const [images, setImage] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const refScroll = useRef(() => scroll.scrollToBottom())
  

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    
    setStatus(Status.PENDING)

    getApi(inputValue, page).then(img => {
      
      setImage(state =>[...state, ...img.hits]);
      setShowBtn(page < Math.ceil(img.totalHits / 12));
    })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED)
      })
      .finally(() => setStatus(Status.RESOLVED))
},[inputValue,page])

  
  const handleSubmitForm = value => {
    setInputValue(value);
    setPage(1);
    setImage([]);
  }
  

  const handleClickLoadMore = () => {
    setPage(state=>state + 1)
    refScroll.current();
  }
 return (
      <AppStyle>
        <Header onSubmit={handleSubmitForm} />
        {status === Status.IDLE && (<div><p>Enter a value in the input field</p></div>)}
        {status === Status.PENDING && (<div><ColorRing
             visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>)}
        {status === Status.REJECTED && (<div><p>{error.message}</p></div>)}
     {<GalleryList image={images} />}
        {showBtn && (<ButtonLoadMore title='Load more' onClick={handleClickLoadMore} />)}
      </AppStyle>
  )
}


export {App}