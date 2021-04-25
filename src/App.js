import React,{useState, useEffect} from 'react'
import PopCart from './components/pop-cart'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Products from './pages/products'
import Cart from './pages/cart'

function App(props){
    return (
        <div id='app'>
            <Router>
                <div>
                    <span className="title"><strong>Hokx</strong> - 购物车示例</span>
                    <PopCart />
                </div>
                <Route path='/' component={Products} exact></Route>
                <Route path='/cart' render={props => <Cart {...props}/>} exact></Route>
            </Router>
        </div>
    )
}

export default App