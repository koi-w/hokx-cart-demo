import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Table, Tag, Button, InputNumber, Affix } from 'antd';
import './style.css'
import {useStore, useGetter} from 'hokx'

// 列表字段
function columns(updateProductCount, deleteProd){
    return [
        {
            title: '商品',
            dataIndex: 'name',
            key: 'key',
            render: text => <Tag color={'geekblue'}>{text}</Tag>,
        },{
            title: '单价',
            dataIndex: 'price',
            key: 'key',
        },{
            title: '数量',
            dataIndex: 'count',
            key: 'key',
            render: (count, row) => <InputNumber defaultValue={count} min={1} onChange={count => updateProductCount(row.key, count)}/>
        },{
            title: '小计',
            dataIndex: 'totalPrice',
            key: 'key',
        },{
            title: '操作',
            key: 'action',
            render: row => <Button onClick={() => deleteProd(row.key)}>删除</Button>,
        }
    ]
}

// 列表属性
function rowSelection(defaultSelected, dispatch){
    return {
        type: 'checkbox',
        selectedRowKeys: defaultSelected,
        onSelect: (row, selected) => {
            dispatch({type: 'updateProductChecked', prodId: row.key, checked: selected})
        },
        onSelectAll: selected => {
            dispatch({type: 'updateAllProductChecked', checked: selected})
        },
    }
}

export default (props) => {

    const {state, dispatch} = useStore('cart')
    const getter = useGetter('cart')

    // 增/减商品数量
    let updateProductCount = (id, count) => {
        dispatch({type: 'updateProductCount', prodId: id, count})
    }

    // 删除商品
    let deleteProd = id => dispatch({type: 'deleteFromCart', prodId: id})

    return (
        <div className='cart'>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                <Breadcrumb.Item>购物车</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Table rowSelection={rowSelection(getter.selectedProds, dispatch)}
                    columns={columns(updateProductCount, deleteProd)}
                    dataSource={state.cartProducts}
            />
            <p>已选 {getter.checkedCount} 件商品，总价：{getter.checkedPrice}</p>
            <Button type="primary" danger>结算</Button>
        </div>
    )
}