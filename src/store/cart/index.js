const cart = {
    nameSpace: 'cart',
    localStorage: true,
    state: {
        cartProducts: [],
    },
    getter: {
        totalCount(state){
            return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0)
        },
        totalPrice(state){
            return state.cartProducts.reduce((sum, prod) => sum + prod.totalPrice, 0)
        },
        selectedProds(state){
            return state.cartProducts.reduce((sum, prod) => {
                prod.isChecked && sum.push(prod.key)
                return sum
            }, [])
        },
        checkedCount(state){
            return state.cartProducts.reduce((sum, prod) => {
                if (prod.isChecked) {
                    sum += prod.count
                }
                return sum
            }, 0)
        },
        checkedPrice(state){
            return state.cartProducts.reduce((sum, prod) => {
                if (prod.isChecked) {
                    sum += prod.totalPrice
                }
                return sum
            }, 0)
        }
    },
    reducer: {
        // 1. cartProducts 中没有该商品，把该商品添加到数组，并增加 count，isChecked，totalPrice
        // 2. cartProducts 有该商品，让商品的数量加1，选中，计算小计
        addToCart(state, action) {
            let product = action.data
            const prod = state.cartProducts.find(item => item.key === product.key)
            if (prod) {
                prod.count++
                prod.isChecked = true
                prod.totalPrice = prod.count * prod.price
            } else {
                state.cartProducts.push({
                    ...product,
                    count: 1,
                    isChecked: true,
                    totalPrice: product.price
                })
            }
            // 直接push就是在修改引用的内存数据, 而引用地址没有变化, react会认为虚拟dom没有发生变化, 所以解构赋予新引用.
            state.cartProducts = [...state.cartProducts]
            return {...state}
        },
        deleteFromCart(state, action){
            const index = state.cartProducts.findIndex(prod=> prod.key === action.prodId)
            index !== -1 && state.cartProducts.splice(index, 1)
            state.cartProducts = [...state.cartProducts]
            return {...state}
        },
        updateProductCount(state, action){
            const prod = state.cartProducts.find(prod => prod.key === action.prodId)
            if(prod){
                prod.count = action.count
                prod.totalPrice = action.count * prod.price
            }
            return {...state}
        },
        updateAllProductChecked(state, action){
            state.cartProducts.forEach(prod => {
              prod.isChecked = action.checked
            })
            return {...state}
        },
        updateProductChecked(state, action){
            const prod = state.cartProducts.find(prod => prod.key === action.prodId)
            prod && (prod.isChecked = action.checked)
            return {...state}
        },
    },
    effects: {}
}

export default cart