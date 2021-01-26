import React, {useState} from 'react';
import MapboxGL from 'mapbox-gl';
import ReactMapboxGl, { GeoJSONLayer, Popup } from "react-mapbox-gl";
import Place from "./Place";
import {Link} from 'react-router-dom';
import {ROUTES_MAP} from "../utils/routesMap";

//так должно работать
// eslint-disable-next-line import/no-webpack-loader-syntax
MapboxGL.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
//токен, необходимый для работы с mapbox
const accessToken = 'pk.eyJ1Ijoic2FuaXNpbW92IiwiYSI6ImNra2Jsb3h2MTAzbmszMXFzeDZzNXUyZWoifQ.dq9YuV8GpDbbv8B4btLRTA';
const Mapbox = ReactMapboxGl({
    accessToken: accessToken,
});
/*Компонент, включающий в себя список мест из файла points.json и Mapbox-карту*/
export default function Map(props) {
    const geojsondata = props.data;
    /*Координаты Калининграда, чтобы центрировать карту*/
    const lng = 20.5;
    const lat = 54.7;
    const [center, setCenter] = useState({lng: lng, lat: lat});
    /*Увеличение карты*/
    const [zoom, setZoom] = useState(12);
    /*Стейт place – место, на которое кликнул пользователь*/
    const [place, setPlace] = useState(undefined);

    /*Функция для закрытия попапа – меняет состояние переменной place на undefined*/
    function closePopup() {
        if (place) {
            setPlace(undefined);
        }
    }

    /*Функция для приближения к выбранному месту*/
    function centerPlace(place) {
        setPlace(place); /*Переменная place теперь содержит данные о выбранном месте*/
        setZoom(15); /*Карта приближается к выбранному месту*/
        setCenter(place.geometry.coordinates); /*Карта центрируется по координатам выбранного места*/
    }

    /*Функция, которая нужна для обработки клика по точке на карте*/
    function handleMarkerClick(evt) {
        /*создаётся объект, содержащий данные о точке на карте, на которую кликнул пользователь*/
        const newPlace = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [evt.lngLat.lng, evt.lngLat.lat]
            },
            properties: {
                name: evt.features[0].properties.name,
                rating: evt.features[0].properties.rating
            }
        }
        /*карта центрируется по выбранному месту*/
        centerPlace(newPlace);
    }

    return (
        <section className='map'>
            <div className='map__list-container'>
                <ul className='map__list'>
                    {
                        /*для каждого места из points.json создаётся элемент списка,
                        содержащий данные о месте*/
                        geojsondata.features.map((feature, i) => {
                            return <Place place={feature}
                                          key={i}
                                          handlePlaceClick={centerPlace} />
                        })
                    }
                </ul>
                {/*Кнопка для возвращения на экран с кнопкой "перейти к карте"*/}
                <Link className='map__link' to={ROUTES_MAP.MAIN}>Вернуться</Link>
            </div>
            <Mapbox
                // eslint-disable-next-line
                style="mapbox://styles/mapbox/streets-v11"
                center={center}
                zoom={[zoom]}
                flyToOptions={{
                    'speed': 0.4
                }}
            >
                <GeoJSONLayer
                    data={
                        geojsondata
                    }
                    circleLayout={{ visibility: 'visible' }}
                    circlePaint={{
                        "circle-color": "#CD2D24",
                        "circle-opacity": 0.7,
                        "circle-radius": 8
                    }}
                    circleOnClick={(evt) => {evt.preventDefault(); handleMarkerClick(evt)}}
                />
                {/*Если в переменной состояния place записано место,
                то создаётся попап, содержащий данные об этом месте*/}
                {place && (
                    <Popup key={place.id} coordinates={place.geometry.coordinates}>
                        <div className='map__popup'>
                            <button onClick={closePopup} className='map__popup-close' />
                            <h3 className='map__popup-title'>{place.properties.name}</h3>
                        </div>
                    </Popup>
                )}
            </Mapbox>
        </section>
    )
}