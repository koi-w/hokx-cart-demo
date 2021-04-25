import axios from 'axios'

const products = {
    nameSpace: 'products',
    state: {
        products: []
    },
    reducer: {
        setProducts(state, action){
            state.products = action.data
            return {...state}
        }
    },
    effects: {
        async getData({state,put}, action){
            const { data } = await axios({
                method: 'GET',
                url: '/products.json'
            })
            put({type:'setProducts', data})
        }
    }
}

export default products