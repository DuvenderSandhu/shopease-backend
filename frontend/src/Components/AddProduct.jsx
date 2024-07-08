import React, { useEffect } from 'react';
import { Flex } from 'antd';
const { TextArea } = Input;
import { useNavigate } from 'react-router-dom'
import { CloseOutlined,HomeOutlined, UserOutlined  } from '@ant-design/icons';
import {Breadcrumb ,  Card,  Input, Typography } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import actionCreators from '../../state';
import {useDispatch, useSelector} from 'react-redux'
import AdminBreadCrumb from './AdminBreadCrumb';

import {
  Button,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from 'antd';
// import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onChange = (e) => {
  console.log('Change:', e.target.value);
};


const AddProduct = () =>{ 
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const user= useSelector(state=>state.changeUser)
  function ValidateActivation(){
    dispatch(actionCreators.showNotification({type:"error",msg:"Your Account is Deactivate"}))
    dispatch(actionCreators.changeUser({username:"",email:"",token:""}))
    navigate('/signin')
  }
  useEffect(()=>{
    !user.activationStatus?ValidateActivation():""
    user.token?user.isAdmin?"":navigate('/profile'):navigate('/signup')
  },[])
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let obj = {
      name: values.productName.slice(0,1).toUpperCase() + values.productName.slice(1).toLowerCase(),
      description: values.description.slice(0,1).toUpperCase() + values.description.slice(1).toLowerCase(),
      availableColors: values.color.split(",").map(e => e[0].toUpperCase() + e.slice(1)),
      sizes: values.size.split(',').map(e => e.toUpperCase()),
      category: values.category,
      img: values.img,
      price: values.price,
      brand: values.brand.slice(0,1).toUpperCase() + values.brand.slice(1).toLowerCase(),
    };

    fetch('http://localhost:80/api/addproduct', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => {
        if (data.type === 'success') {
            dispatch(actionCreators.showNotification({ type: 'success', msg: data.msg }));
        } else {
            console.log(data);
        }
    });
};
  return (
    
  <div className='px-8 md:px-24 m-auto lg:px-48'>
  {user.isAdmin?<AdminBreadCrumb/>:""}
    
    <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl my-8">Add Product </h1>
    <Form
    name="validate_other"
    {...formItemLayout}
    onFinish={onFinish}
    initialValues={{
      'input-number': 3,
      'checkbox-group': ['A', 'B'],
      rate: 3.5,
      'color-picker': null,
    }}
    style={{
      maxWidth: 600,
    }}
  >

    <Form.Item label="Product Name" name="productName" rules={[
        {
          required: true,
          message: 'Product Name Required',
          type: 'string',
        },
      ]}>
   <Flex vertical gap={12}>
    <Input placeholder="Outlined" />
  </Flex>
    </Form.Item>

    <Form.Item label="Company Name" name="brand" rules={[
        {
          required: true,
          message: 'Company required',
          type: 'string',
        },
      ]}>
   <Flex vertical gap={12}>
    <Input placeholder="Outlined" />
  </Flex>
    </Form.Item>
    
    <Form.Item label="Product Description" name="description" rules={[
        {
          required: true,
          message: 'Description required',
          type: 'string',
        },
      ]}>
   <Flex vertical gap={12}>
   <TextArea
      showCount
      maxLength={100}
      onChange={onChange}
      allowClear 
      placeholder="disable resize"
      style={{
        height: 120,
        resize: 'none',
      }}
    />
  </Flex>
    </Form.Item>
    
    <Form.Item label="Color" name="color" rules={[
        {
          required: true,
          message: 'Select Color',
          type: 'string',
        },
      ]}>
   <Flex vertical gap={12}>
    <Input placeholder="All Color Comma Seperated" />
  </Flex>
    </Form.Item>

    <Form.Item label="Size" name="size" rules={[
        {
          required: true,
          message: 'Enter Size',
          type: 'string',
        },
      ]}>
   <Flex vertical gap={12}>
    <Input placeholder="All Size Comma Seperated" />
  </Flex>
    </Form.Item>

    <Form.Item
      name="category"
      label="Select[multiple]"
      rules={[
        {
          required: true,
          message: 'Select Category',
          type: 'string',
        },
      ]}
    >
      <Select mode="tag" placeholder="Select Category">
      <Select.Option value="Apparel and Accessories">Apparel and Accessories</Select.Option>
      <Select.Option value="Electronics">Electronics</Select.Option>
      <Select.Option value="Home & Kitchen">Home & Kitchen</Select.Option>
      <Select.Option value="Beauty & Personal Care">Beauty & Personal Care</Select.Option>
      <Select.Option value="Sports & Outdoors">Sports & Outdoors</Select.Option>
      <Select.Option value="Toys & Games">Toys & Games</Select.Option>
      <Select.Option value="Health & Wellness">Health & Wellness</Select.Option>
      <Select.Option value="Books & Media">Books & Media</Select.Option>
      <Select.Option value="Food & Groceries">Food & Groceries</Select.Option>
      <Select.Option value="Pets">Pets</Select.Option>
      <Select.Option value="Office Supplies">Office Supplies</Select.Option>
      <Select.Option value="Travel & Luggage">Travel & Luggage</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item label="Price" >
      <Form.Item name="price" noStyle rules={[
        {
          required: true,
          message: 'Enter Price',
          type: 'number',
        },
      ]}>
        <InputNumber min={0}  />
      </Form.Item>
      <span
        className="ant-form-text"
        style={{
          marginLeft: 8,
        }}
      >
        /Quantity
      </span>
    </Form.Item>

    {/* <Form.Item
      name="upload"
      label="Product Images"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      extra="Image should be clear"
      rules={[
        {
          required: true,
          message: 'Upload Image',
          type: 'string',
        },
      ]}
    >
      <Upload name="images" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item> */}

<Form.Item label="Image URL" name="img" rules={[
        {
          required: true,
          message: 'Enter Image URL',
          type: 'string',
        },
      ]}>
         <Flex vertical gap={12}>
    <Input placeholder="All Size Comma Seperated" />
  </Flex>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        span: 12,
        offset: 6,
      }}
    >
      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="reset">reset</Button>
      </Space>
    </Form.Item>
  </Form>
  </div>
);}
export default AddProduct;