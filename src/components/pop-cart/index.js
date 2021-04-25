import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Popover, Button, Table, Badge, Affix } from 'antd';
import './style.css'
import {useStore, useGetter} from 'hokx'

function columns(deleteProd){
  return [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },{
      title: '数量',
      dataIndex: 'count',
      key: 'count',
    },{
      title: '操作',
      key: 'action',
      render: row => (
        <Button size="small" onClick={() => deleteProd(row.key)}>删除</Button>
      ),
    },
  ]
}

const content = (props) => {

  const {state, dispatch} = useStore('cart')
  const getter = useGetter('cart')

  // 删除商品
  let deleteProd = id => dispatch({type: 'deleteFromCart', prodId: id})

  return(
    <div>
      <Table columns={columns(deleteProd)} dataSource={state.cartProducts} size="small"/>
      <p>共 {getter.totalCount} 件商品，共${getter.totalPrice}</p>
      <Button type="primary" size="small" danger><Link to="/cart">去购物车</Link></Button>
    </div>
  )
};

export default (props) => {

  const getter = useGetter('cart')

  return (
    <div className='popCart'>
      <Popover content={content} title="购物车">
        <Badge count={getter.totalCount}>
          <Button type="primary">我的购物车</Button>
        </Badge>
      </Popover>
    </div>
  )
}