import React, { useState, useCallback, useEffect } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import ProductItem from './ProductItem'
import './css/ProductList.css'

const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', isInBasket: false},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', isInBasket: false},
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', isInBasket: false},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', isInBasket: false},
    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые', isInBasket: false},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', isInBasket: false},
    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые', isInBasket: false},
    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', isInBasket: false},
]

const getTotalPrice = (items = []) => items.reduce((acc, item) => acc += item.price, 0)

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([])
    const { tg, queryId } = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }

        fetch('https://telegram-bot-nivazhna.onrender.com/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const isAlreadyAdded = (product) => addedItems.find(item => item.id === product.id)

    const onAdd = (product) => {
        let newItems = []

        if(isAlreadyAdded(product)) {
            newItems = addedItems.filter(item => item.id !== product.id)
            product.isInBasket = false
            // setTextOnButton('Добавить в корзину')
        } else {
            newItems = [...addedItems, product]
            product.isInBasket = true
            // setTextOnButton('Убрать из корзины')
        }

        setAddedItems(newItems)
        
        if(newItems.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить - ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map((item, i)=> (
                <ProductItem
                    key = { item.id } 
                    product = { item }
                    className = { 'item' }
                    onAdd = { onAdd }
                />
            ))}
        </div>
    )
}

export default ProductList