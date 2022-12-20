import React, { useState } from 'react'
import Button from './Button'
import './css/ProductItem.css'

const ProductItem = ({ product, className, onAdd }) => {
    const [textOnButton, setTextOnButton] = useState('Добавить в \nкорзину')

    const onAddHandler = () => {
        onAdd(product)
        setTextOnButton((product.isInBasket) ? 'Убрать из \nкорзины' : 'Добавить в \nкорзину')
    }

    return (
        <div className={'product ' + className}>
            <img className='img' src={product.isInBasket ? 'img/remove.png' : 'img/add.png'}/>
            <div className='title'>{product.title}+1</div>
            <div className='description'>{product.description}</div>
            <div className='price'>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className='add-btn' onClick={onAddHandler} children={textOnButton}/>
        </div>
    )
}

export default ProductItem