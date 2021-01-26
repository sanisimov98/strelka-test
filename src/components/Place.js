import React from 'react';

export default function Place({place, handlePlaceClick}) {

    /*При клике на элемент из списка мест соответствующее место записывается в переменную состояния place
    * и происходит переход к выбранному месту на карте*/
    function handleClick() {
        handlePlaceClick(place);
    }

    return (
        <li className='map__list-item' onClick={handleClick}>
                <h3>{place.properties.name}</h3>
        </li>
    )
}