import React from 'react';
import { Route, Switch, BrowserRouter /*, HashRouter*/ } from 'react-router-dom'; //BrowserRouter не работает в GH-pages
import Main from './Main';
import Map from "./Map";
import {ROUTES_MAP} from '../utils/routesMap';
import data from '../data/points.json';

/*Основной компонент приложения*/
function App() {
    return (
        <BrowserRouter>
        //<HashRouter>
            <div className='page'>
                <Switch>
                    {/*Страница с кнопкой "Перейти к карте"*/}
                    <Route exact path={ROUTES_MAP.MAIN}>
                        <Main />
                    </Route>
                    {/*Страница с картой, тут же передаются данные из файла points.json*/}
                    <Route path={ROUTES_MAP.MAP}>
                        <Map data = {data}  />
                    </Route>
                </Switch>
            </div>
        //</HashRouter>
        </BrowserRouter>
    );
}

export default App;
