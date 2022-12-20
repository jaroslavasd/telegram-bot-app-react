import React from 'react'
import Button from './Button'
import './css/ProductItem.css'

const ProductItem = ({ product, className, onAdd, isAdded }) => {

    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                {isAdded ? 'Убрать из корзины' : 'Добавить в корзину'}
            </Button>
        </div>
    )
}

export default ProductItem