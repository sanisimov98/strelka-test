import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES_MAP } from "../utils/routesMap";

export default function Main() {
    return (
        <main className='main'>
            <h1 className='main__title'>Туристические точки притяжения Калиниграда</h1>
            <Link to={ROUTES_MAP.MAP} className='main__link'>Перейти к карте</Link>
        </main>
    )
}