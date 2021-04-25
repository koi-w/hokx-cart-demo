import React,{useState, useEffect} from 'react'
import './style.css'
import { Breadcrumb, Table, Tag, Button } from 'antd';
import {useStore} from 'hokx'

function columns(addToCart){
  return [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      render: text => (<Tag color={'geekblue'}>{text}</Tag>),
    },{
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },{
      title: '操作',
      key: 'action',
      render: row => (<Button onClick={() => addToCart(row)}>加入购物车</Button>),
    }
  ]
}

export default (props) => {

  const {state: productsState, dispatch: productsDispatch} = useStore('products')
  const {state: cartState, dispatch: cartDispatch} = useStore('cart')

  // 获取商品数据
  useEffect(() => productsDispatch({type:'getData'}),[])

  // 添加商品至购物车
  let addToCart = row => {
    cartDispatch({type:'addToCart', data: row})
  }

  return (
    <div className='products'>
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
      </Breadcrumb><br/>
      <Table columns={columns(addToCart)} dataSource={productsState.products} />
    </div>
  )
}