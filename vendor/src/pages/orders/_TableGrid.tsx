/* eslint-disable */

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Image, Popconfirm, Space, Table, Tag, message } from 'antd';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import AdvisorAssignButton from '~/components/AdvisorAssignButton';
import { deleteApi, get } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
  const KEY = `all-${model}`;

  const {
    isLoading,
    isError,
    error,
    data: fetchData,
    refetch,
  } = useQuery({
    queryKey: [KEY],
    queryFn: () => get(getUrlForModel(model)),
    staleTime: 0,
  });

  console.log(fetchData?.data);

  useEffect(() => {
    if (trigger) {
      refetch();
    }
  }, [trigger]);

  const deleteMutation = useMutation({
    mutationFn: async (id: any) => await deleteApi(getUrlForModel(model, id)),
    onSuccess: () => {
      message.success('Deleted Successfully');
      refetch();
    },
    onError: () => {
      message.error('Something went wrong');
    },
  });

  const handleDeleteClient = (id: any) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'user_id',
    },
    {
      title: 'Discount',
      dataIndex: 'discount_id',
    },
    {
      title: 'Sub Amount',
      dataIndex: 'sub_amount',
    },
    {
      title: 'Promotion Amout',
      dataIndex: 'promotion_amount',
    },
    {
      title: 'Taxt Amount',
      dataIndex: 'tax_amount',
    },
    {
      title: 'Shipping Amount',
      dataIndex: 'shipping_amount',
    },
    {
      title: 'Status',
      render: (record: any) => {
        if (record?.status === 'deny') {
          return <Tag color="red">{record?.status}</Tag>
        }
        if (record?.status === 'pending') {
          return <Tag color="yellow">{record?.status}</Tag>
        }
        if (record?.status === 'published') {
          return <Tag color="green">{record?.status}</Tag>
        }
      }
    },
    {
      title: 'Actions',
      render: (record: any) => {
        return (
          <Space>
            <Button onClick={() => onClickEdit(record)} type={'link'}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete this item?"
              description="This action cannot be undone"
              onConfirm={() => handleDeleteClient(record.id)}
              onCancel={() => { }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type={'link'}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            {/* <Link to={`/products/details/${record.id}`}>
              <Button type="primary" ghost>
                <EyeOutlined />
              </Button>
            </Link> */}
          </Space>
        );
      },
    },
  ];

  if (isError) {
    return <p>Failed to load data</p>;
  }

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={fetchData?.data}
    />
  );
}
