import React from "react";
import {AppStyle} from './App.styled';
import { GalleryList } from "./GalleryList/GalleryList";
import { Header } from './Header/Header';
import { ColorRing } from 'react-loader-spinner';
import { ButtonLoadMore } from "./ButtomLoadMore/ButtomLoadMore";
import { getApi } from '../getApi/getApi';
import { animateScroll as scroll } from 'react-scroll';




class App extends React.Component  {


  state = {
    inputValue: '',
    image: [],
    error: null,
    status: 'idle',
    page: 1,
    showBtn: false,
    scrollToBottom:function() {
    scroll.scrollToBottom()
  }

  }



    componentDidUpdate(prevProps, prevState) {
      const prevValue = prevState.inputValue;
      const prevPage = prevState.page;
      const nextValue = this.state.inputValue;
      const nextPage = this.state.page;
      if (prevValue !== nextValue || prevPage !== nextPage) {
        this.setState({status:'pending'})
        this.fetchImg();

                
        }
    }

  fetchImg = () => {
    const { inputValue, page } = this.state;
    getApi(inputValue,page).then(img =>
        this.setState(prevState => ({
            image: [...prevState.image, ...img.hits],
          showBtn: this.state.page < Math.ceil(img.totalHits / 12)
            
          
          })
      )
      )
      .catch(error => this.setState({ error, status: 'rejected' }))
      .finally(()=>this.setState({status: 'resolved',}))
    }

  handleSubmitForm = value => {
    this.setState({
      inputValue: value,
      page: 1,
      image: []
    })
}

  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
    this.state.scrollToBottom()
  }




  render(){
    const { error, status,showBtn } = this.state;
    return (
      <AppStyle>
        <Header onSubmit={this.handleSubmitForm} />
        {status === 'idle' && (<div><p>Enter a value in the input field</p></div>)}
        {status === 'pending' && (<div><ColorRing
             visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>)}
        {status === 'rejected' && (<div><p>{error.message}</p></div>)}
        {status === 'resolved' && (<GalleryList image={this.state.image} />)}
        {showBtn && (<ButtonLoadMore title='Load more' onClick={this.handleClickLoadMore} />)}
      </AppStyle>
    );
  }
 
};


export {App}