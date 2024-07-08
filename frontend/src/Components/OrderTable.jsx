import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Popconfirm, Typography, Button, Input, Space, Tag, Table, Select } from 'antd';
import Highlighter from 'react-highlight-words';

const { Option } = Select;
function updateOrders(orderNumber,status){
  fetch('http://localhost/api/changeorders',{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({orderNumber,status})
  }).then(res=>res.json()).then(data=>{
    data.type==='success'?alert(data.msg):alert(data.error)
  })

}
const ProductsTable = () => {
  const [data, setData] = useState('');
  const [update, setUpdate] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  useEffect(() => {
    fetch('http://localhost/api/orders')
      .then(result => result.json())
      .then(res => setData(res.orders));
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key, selectedStatus) => {
    setUpdate(true)
    // try {
    //   const row = await form.validateFields();
    //   const newData = [...data];
    //   const index = newData.findIndex((item) => key === item.key);

    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, { ...item, ...row });
    //     setData(newData);
    //     setEditingKey('');

    //     // Send POST request to update the order status
    //     const updatedOrder = newData[index];
    //     let fetchData=await fetch('http://localhost/api/changeorders', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         orderName: updatedOrder.orderNumber,
    //         status: selectedStatus // Use the selected status here
    //       })
    //     });
    //     let datadata=await fetchData.json()
    //     setData(datadata.data)
    //     // console.log(datadata)
    //   } else {
    //     newData.push(row);
    //     setData(newData);
    //     setEditingKey('');
    //   }
    // } catch (errInfo) {
    //   console.log('Validate Failed:', errInfo);
    // }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={close}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      ...getColumnSearchProps('orderNumber'),
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      ...getColumnSearchProps('customerName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      ...getColumnSearchProps('city'),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      ...getColumnSearchProps('state'),
    },
    {
      title: 'Zip Code',
      dataIndex: 'zipCode',
      key: 'zipCode',
      ...getColumnSearchProps('zipCode'),
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      ...getColumnSearchProps('paidAmount'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <span>
            {editable ? (
              <Form.Item
                name="status"
                style={{ margin: 0 }}
                rules={[{ required: true, message: 'Please select status!' }]}
              >
                <Select defaultValue={record.status} onChange={(value) => updateOrders(record.orderNumber,value)}>
                  <Option value="pending">Pending</Option>
                  <Option value="processing">Processing</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </Form.Item>
            ) : (
              <span>{record.status}</span>
            )}
          </span>
        );
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => {
              save(record.key, record.status);
            }} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  return (
    <>
      <h1 className="m-4 text-2xl font-semibold text-gray-800 md:text-3xl">Orders</h1>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default ProductsTable;
