import {createStore} from 'hokx'

import products from './products'
import cart from './cart'

const reducer = [products, cart]
const Provider = createStore(reducer)

export default Provider