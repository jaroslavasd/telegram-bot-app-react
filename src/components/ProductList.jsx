import React, { useState, useCallback, useEffect } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import ProductItem from './ProductItem'
import './css/ProductList.css'

const products = [
    {id: '1', title: 'Джинсы', description: 'Синего цвета, прямые', img: '../../public/img/logo512.png', price: 5000, isInBasket: false},
    {id: '2', title: 'Куртка', description: 'Зеленого цвета, теплая', price: 12000, isInBasket: false},
    {id: '3', title: 'Джинсы 2', description: 'Синего цвета, прямые', price: 5000, isInBasket: false},
    {id: '4', title: 'Куртка 8', description: 'Зеленого цвета, теплая', price: 122, isInBasket: false},
    {id: '5', title: 'Джинсы 3', description: 'Синего цвета, прямые', price: 5000, isInBasket: false},
    {id: '6', title: 'Куртка 7', description: 'Зеленого цвета, теплая', price: 600, isInBasket: false},
    {id: '7', title: 'Джинсы 4', description: 'Синего цвета, прямые', price: 5500, isInBasket: false},
    {id: '8', title: 'Куртка 5', description: 'Зеленого цвета, теплая', price: 12000, isInBasket: false},
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