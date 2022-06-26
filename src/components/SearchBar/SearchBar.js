import { useState} from "react";
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit}) { 
    const [imgName, setImgName] = useState('');

    const hndleNameChange = event => { 
        setImgName(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => { 
        event.preventDefault();
        if (imgName.trim() === '') { 
            alert('Введіть назву картинки котру хочете знайти');
            return;
        };
        onSubmit(imgName);
        setImgName('');
    };

        return (
            <header className="Searchbar">
                <form className='SearchForm' onSubmit={handleSubmit}>
                    <button type="submit" className='SearchForm_button'>
                        <span className='SearchForm_button--label'>Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="imgName"
                        value={imgName}
                        onChange={hndleNameChange}
                    />
                </form>
            </header>
        );
};

SearchBar.propTypes = {
    onSubmit:PropTypes.func.isRequired,
};