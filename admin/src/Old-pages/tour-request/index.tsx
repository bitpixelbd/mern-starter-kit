import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { deleteApi, get } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';
import { getHeader } from '~/utility/helmet';

import DrawerForm from './_DrawerForm';
import Title from 'antd/es/typography/Title';

const model = 'tour-request';
const title = 'Tour Request';
const drawerTitle = 'Add Tour Request';

export default function tourRequest() {
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: contact_list,
    refetch,
  } = useQuery(['request tour'], () => get(getUrlForModel('RequestTour')), {
    staleTime: 0,
  });

  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const showDrawer = () => {
    setOpen(true);
    setIsEditing(false);
    setEditedItem(null);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClickEdit = (record: any) => {
    setIsEditing(true);
    setEditedItem(record);
    setOpen(true);
  };

  const onSubmitSuccess = (isEditing: boolean) => {
    setTrigger((trigger) => trigger + 1);
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    }
  };

  const deleteMutation = useMutation(
    async (id: any) => await deleteApi(getUrlForModel('RequestTour', id)),
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
      title: 'Selected date',
      dataIndex: 'date',
    },
    {
      title: 'Selected est time',
      dataIndex: 'est_time',
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
              onCancel={() => { }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type={'link'}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  
  return (
    <div>
      <DrawerForm
        title={drawerTitle}
        onClose={onClose}
        open={open}
        model={model}
        isEditing={isEditing}
        editedItem={editedItem}
        onSubmitSuccess={onSubmitSuccess}
      />

      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>{title}</Title>
      </Space>

      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={contact_list?.data}
      />
    </div>
  );
}
