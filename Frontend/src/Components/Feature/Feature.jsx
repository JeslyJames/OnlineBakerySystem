import React from 'react'
import './Feature.css'
import data_Product from '../Assets/data'
import Item from '../Item/Item'

const Feature = () => {
  return (
    <div className='feature'>
        <div className="feature-item">
            {data_Product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            } )}
        </div>
    </div>
  )
}

export default Feature
