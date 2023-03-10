import {useState} from "react";
import { Searchbar, SearchForm, SearchFormButton, ButtonLabel, Input } from "./Header.styled";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Header = ({ onSubmit }) => {
  const [value, setValue] = useState('');


  const handleInputChange = evt => {
  setValue( evt.currentTarget.value.toLowerCase())
  }
  
  
 const handleSubmit = evt => {
    evt.preventDefault();
    if (value.trim() === '') {
      Notify.info('Enter a value in the input field');
   return
    }

    onSubmit(value);

   setValue('');
}

  return(
    <Searchbar >
  <SearchForm onSubmit={handleSubmit}>
    <SearchFormButton type="submit">
      <ButtonLabel>Search</ButtonLabel>
    </SearchFormButton>

    <Input
      type="text"
      autocomplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={value}
      onChange={handleInputChange}
    />
      </SearchForm>
    </Searchbar>
  )

}
