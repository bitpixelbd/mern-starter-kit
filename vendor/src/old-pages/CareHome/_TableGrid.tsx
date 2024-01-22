/* eslint-disable */

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm, Space, Switch, Table, Tag, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterSearch from '~/components/FilterSearch';
import {
  deleteApi,
  get,
  multiDeleteCageHomeApi,
  multiPublishCareHomes,
  multiVerifiedCareHomes,
  patch,
} from '~/services/api/api';
import {
  DELETE_CARE_HOMES,
  MULTI_PUBLISH_CARE_HOMES,
  MULTI_VERIFIED_CARE_HOMES,
  getUrlForModel,
} from '~/services/api/endpoints';
import BulkAction from './BulkAction';
import useCarehomes from './hooks/useCarehomes';
import LivingOption from './components/LivingOption';

// @ts-ignore
export default function _TableGrid({
  model,
  trigger,
  onClickEdit,
  onSubmitSuccess,
  ...props
}) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const KEY = `all-${model}`;

  const { useCareHomesData } = useCarehomes();

  const {
    isLoading,
    isError,
    error,
    data: fetchData,
    refetch,
  } = useCareHomesData({ limit, page });

  const [query, setQuery] = useState('');

  const [tableData, setTableData] = useState([]);

  const deleteMutation = useMutation(
    async (id: any) => await deleteApi(getUrlForModel('CareHome', id)),
    {
      onSuccess: () => {
        message.success('Deleted Successfully');
        onSubmitSuccess();
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
  );
  const multiDeleteMutation = useMutation({
    mutationFn: (ids: any) => multiDeleteCageHomeApi(DELETE_CARE_HOMES, { ids }),
    onSuccess: () => {
      message.success('Deleted Successfully');
      onSubmitSuccess();
      queryClient.invalidateQueries(['GET_ALL_CARE_HOMES']);
      setSelectedRows([]);
      toggleOpen(false);
    },
    onError: () => {
      message.error('Something went wrong');
      queryClient.invalidateQueries(['GET_ALL_CARE_HOMES']);
    },
  });
  const multiPublishingMutation = useMutation({
    mutationFn: (data: any) => multiPublishCareHomes(MULTI_PUBLISH_CARE_HOMES, data),
    onSuccess: () => {
      message.success('Action Successful');
      onSubmitSuccess();
      queryClient.invalidateQueries(['GET_ALL_CARE_HOMES']);
      setSelectedRows([]);
      toggleOpen(false);
    },
    onError: () => {
      message.error('Something went wrong');
      queryClient.invalidateQueries(['GET_ALL_CARE_HOMES']);
    },
  });

  const multiVerifedMutation = useMutation({
    mutationFn: (data: any) => multiVerifiedCareHomes(MULTI_VERIFIED_CARE_HOMES, data),
    onSuccess: () => {
      message.success('Action Successful');
      onSubmitSuccess();
      queryClient.invalidateQueries(['GET_ALL_CARE_HOMES']);
      setSelectedRows([]);
      toggleOpen(false);
    },
    onError: () => {
      message.error('Something went wrong');
      queryClient.invalidateQueries(['GET_ALL_CARE_HOMES']);
    },
  });

  const updateData = useMutation(
    async (data: any) => await patch(getUrlForModel('CareHome', data.id), data),
    {
      //TODO refactor
      onSuccess: (response) => {
        // message.success('Updated Successfully');
        refetch();
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
  );

  // if (trigger) refetch()
  const handleDeleteClient = (id: any) => {
    if (selectedRows.length > 0) {
      multiDeleteMutation.mutate(selectedRows);
      return;
    }
    deleteMutation.mutate(id);
  };

  const handlePublish = (e, id) => {
    if (selectedRows.length > 0) {
      multiPublishingMutation.mutate({ ids: selectedRows, is_publish: e });
      return;
    }
    updateData.mutate({ id: id, is_publish: e });
  };

  const handleVerified = (e, id) => {
    if (selectedRows.length > 0) {
      multiVerifedMutation.mutate({ ids: selectedRows, is_verified: e });
      return;
    }
    updateData.mutate({ id: id, is_verified: e });
  };

  const {
    isError: CareTypesError,
    isSuccess,
    data: careTypes,
    refetch: careTypesRefatch,
  } = useQuery([`care-types for- service offerd`], () => get(getUrlForModel("CareTypes")), { staleTime: 0 });


  const columns = [
    {
      title: 'Name',
      render: (record: any) => {
        return (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
            <h3 style={{ margin: '0', padding: '0' }}>{record?.name}</h3>
            <a style={{ margin: '0', padding: '0' }} href={`mailto:${record?.email}`}>
              {record?.email}
            </a>
            <p style={{ margin: '0', padding: '0' }}>{record?.phone}</p>
            <a
              style={{ margin: '0', padding: '0' }}
              href={`${record?.website}`}
              target="_blank"
            >
              {record?.website}
            </a>
          </div>
        );
      },
    },
    {
      title: 'City',
      render: (record: any) => {
        return <span>{record?.City?.name}</span>
      }
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
    {
      title: 'Postal Code',
      dataIndex: 'post_code',
    },
    {
      title: "Living options",
      render: (record: any) => {
        console.log({ record })
        return <LivingOption record={record} careTypes={careTypes} />
      }
    },
    {
      title: 'Is Verified',
      render: (record: any) => {
        return (
          <Switch
            // defaultChecked={record?.is_publish}
            checked={record?.is_verified}
            onChange={(e) => handleVerified(e, record?.id)}
          />
        );
      },
    },
    {
      title: 'Is Publish',
      render: (record: any) => {
        return (
          <Switch
            // defaultChecked={record?.is_publish}
            checked={record?.is_publish}
            onChange={(e) => handlePublish(e, record?.id)}
          />
        );
      },
    },
    {
      title: 'Actions',
      render: (record: any) => {
        return (
          <Space>
            <Link to={`/care-home/details/${record.id}`}>
              <Button type="primary" ghost>
                <EyeOutlined />
              </Button>
            </Link>
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
          </Space>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const rows = selectedRows.map((row) => row.id);
      setSelectedRows(rows);

      if (selectedRows.length > 0) {
        toggleOpen(true);
      } else {
        toggleOpen(false);
      }
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record?.name,
    }),
  };

  const toggleOpen = (isOpen) => {
    setOpen(isOpen);
  };

  const selectAll = ({ action = 'select' }) => {
    if (action === 'deselect') {
      setSelectedRows([]);
      toggleOpen(false);
      return;
    }
    const rows = fetchData?.data?.data.map((row) => row.id);
    rowSelection.onChange(rows, fetchData?.data?.data);
  };

  const onAction = ({ actionType }) => {
    if (actionType === 'delete') {
      if (selectedRows.length > 0) {
        multiDeleteMutation.mutate(selectedRows);
        return;
      }
    }
    if (actionType === 'publish') {
      if (selectedRows.length > 0) {
        multiPublishingMutation.mutate({ ids: selectedRows, is_publish: true });
        return;
      }
    }
    if (actionType === 'unpublish') {
      if (selectedRows.length > 0) {
        multiPublishingMutation.mutate({ ids: selectedRows, is_publish: false });
        return;
      }
    }
    if (actionType === 'verified') {
      if (selectedRows.length > 0) {
        multiVerifedMutation.mutate({ ids: selectedRows, is_verified: true });
        return;
      }
    }
    if (actionType === 'unverified') {
      if (selectedRows.length > 0) {
        multiVerifedMutation.mutate({ ids: selectedRows, is_verified: false });
        return;
      }
    }
  };

  if (isError) {
    return <p>Failed to load data</p>;
  }

  return (
    <>
      <FilterSearch
        setItem={setTableData}
        model={'careHome'}
        filterItems={[]}
        trigger={trigger}
        paginationProps={{ limit, page, setLimit, setPage }}
      />
      <br />
      <br />
      <BulkAction
        open={open}
        toggleOpen={toggleOpen}
        selectedRows={selectedRows}
        selectAll={selectAll}
        onAction={onAction}
      />
      <Table
        rowKey="id"
        rowSelection={{
          ...rowSelection,
          selectedRowKeys: selectedRows,
        }}
        loading={isLoading}
        columns={columns}
        dataSource={fetchData?.data?.data}
        pagination={{
          pageSize: limit,
          total: fetchData?.data?.total,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: (page, pageSize) => {
            setPage(page - 1);
            setLimit(pageSize || 10);
          },
        }}
      />
    </>
  );
}
