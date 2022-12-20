import React, { useState } from 'react'
import Button from './Button'
import './css/ProductItem.css'

const ProductItem = ({ product, className, onAdd }) => {
    const [textOnButton, setTextOnButton] = useState('Добавить в корзину')

    const onAddHandler = () => {
        onAdd(product)
        setTextOnButton((product.isInBasket) ? 'Убрать из корзины' : 'Добавить в корзину')
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler} children={textOnButton}/>
        </div>
    )
}

export default ProductItem