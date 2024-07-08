import React from 'react';
import { Breadcrumb, Dropdown, Space, Button } from 'antd';
import { HomeOutlined, UserOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    label: (
      <Link to="/signup" rel="noopener noreferrer">
        Add User
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/profile" rel="noopener noreferrer">
        Deactivate User
      </Link>
    ),
  },
  {
    key: '3',
    danger: true,
    label: (
      <Link to="/deleteuser" rel="noopener noreferrer">
        Delete User
      </Link>
    ),
  },
];

const items2 = [
  {
    key: '1',
    label: (
      <Link to="/addproduct" rel="noopener noreferrer">
        Add Product
      </Link>
    ),
  },
  {
    key: '2',
    disabled:true,
    label: (
      <Link to="/updateproduct" rel="noopener noreferrer">
        Update Product
      </Link>
    ),
  },
  {
    key: '3',
    danger:true,
    label: (
      <Link to="/deleteproduct" rel="noopener noreferrer">
        Delete Product
      </Link>
    ),
  },
];
const items3 = [
  {
    key: '1',
    disabled:true,
    label: (

      <Link to="/profile" rel="noopener noreferrer">
        Create Order
      </Link>
    ),
  },
  {
    key: '2',
    disabled:true,
    label: (
      <Link to="/profile" rel="noopener noreferrer">
        Update Order 
      </Link>
    ),
  },
  {
    key: '3',
    danger:true,
    disabled:true,
    label: (
      <Link to="/profile" rel="noopener noreferrer">
        Delete Order
      </Link>
    ),
  },
];

function AdminBreadCrumb() {
    const navigate = useNavigate();

    return (
        <Breadcrumb className='sticky'>
            <Breadcrumb.Item className='cursor-pointer' onClick={() => navigate('/admin')}>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item className='cursor-pointer' onClick={() => navigate('/profile')}>
                <UserOutlined />
                <span>Profile</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item className='cursor-pointer'>
                <Space direction="horizontal" >
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomLeft"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                         <p>User Operations</p>
                    </Dropdown>
                  </Space>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className='cursor-pointer'>
                <Space direction="horizontal" >
                    <Dropdown
                        menu={{
                            items:items2,
                        }}
                        placement="bottomLeft"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <p>Product Operations</p>
                    </Dropdown>
                    </Space>
                  </Breadcrumb.Item>
                    <Breadcrumb.Item className='cursor-pointer'>
                <Space direction="horizontal" >
                    <Dropdown
                        menu={{
                            items:items3,
                        }}
                        placement="bottomLeft"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <p>Order Operations</p>
                    </Dropdown>
                    
                </Space>
            </Breadcrumb.Item>
            <Breadcrumb.Item className='cursor-pointer'></Breadcrumb.Item>
            <Breadcrumb.Item className='cursor-pointer'></Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default AdminBreadCrumb;
