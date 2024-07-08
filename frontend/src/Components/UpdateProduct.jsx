import React, { useState ,useEffect} from 'react';
import {  Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Flex
} from 'antd';
import AdminBreadCrumb from '../Components/AdminBreadCrumb';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);


const UpdateProduct = () => {
    const [data,setData]=useState({name:"Duvender Sandhu",brand:"XYZ"})
    const onFinish = (values) => {
        console.log('Received values of form: ', values);}
    const onSearch = (value, _e, info) =>{
    fetch(`http://localhost:5173/api/${value}`).then(res=>res.json()).then(data=>setData(data))
    document.querySelector('.item').classList.remove('hidden')
    };
    return (
        <div className='px-8 md:px-24 m-auto lg:px-48'>
            
        <AdminBreadCrumb/>
        <div className='flex justify-center items-center m-8'>
        <Space direction="vertical">
                    <Search
                    placeholder="Enter Product ID"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    />
                </Space>
        </div>
        <div className='item hidden'>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl my-8">Update Product </h1>
          <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            name:"Duvender Sandhu"
          }}
          style={{
            maxWidth: 600,
          }}
        >
      
          <Form.Item label="Product Name" name="name" rules={[
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
                value:data.brand
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
                value:data.description
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
        </div>
)};
export default UpdateProduct;
