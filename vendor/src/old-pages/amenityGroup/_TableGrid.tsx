import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  } = useQuery([KEY], () => get(getUrlForModel('AmenityGroup')), { staleTime: 0 });

  useEffect(() => {
    if (trigger) {
      refetch();
    }
  }, [trigger]);

  const deleteMutation = useMutation(
    async (id: any) => await deleteApi(getUrlForModel('AmenityGroup', id)),
    {
      onSuccess: () => {
        message.success('Deleted Successfully');
        refetch();
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
  );

  const handleDeleteClient = (id: any) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
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
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type={'link'}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <Link to={`/amenity-group/details/${record.id}?group=${record?.name}`}>
              <Button type="primary" ghost>
                <EyeOutlined />
              </Button>
            </Link>
          </Space>
        );
      },
    },
  ];

  if (isError) {
    return <p>Failed to load data</p>;
  }

  console.log('table data', fetchData);

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      columns={columns}
      dataSource={fetchData?.data}
    />
  );
}
