import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';

import { deleteApi, get } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';

export default function ContactExperts() {
  const title = 'Expert Requests';
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: contact_list,
    refetch,
  } = useQuery(['Contact Expert'], () => get(getUrlForModel('ContactExpert')), {
    staleTime: 0,
  });

  const deleteMutation = useMutation(
    async (id: any) => await deleteApi(getUrlForModel('ContactExpert', id)),
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
      render: (record: any) => {
        return record?.first_name + ' ' + record?.last_name;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'City Or Post code',
      dataIndex: 'city_or_post_code',
    },
    {
      title: 'Action',
      render: (record: any) => {
        return (
          <Space>
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
            <Link to={`/contact-experts/details/${record?.id}`}>
              <Button type="primary" ghost>
                <EyeOutlined />
              </Button>
            </Link>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Title level={2}>{title}</Title>
      <Table rowKey={'id'} columns={columns} dataSource={contact_list?.data} />
    </div>
  );
}
