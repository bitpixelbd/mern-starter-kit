/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteApi, get } from "~/services/api/api";
import React, { useEffect } from "react";
import { getUrlForModel } from "~/services/api/endpoints";
import { Link } from "react-router-dom";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;

    const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => get(getUrlForModel(model)), { staleTime: 0 });

    useEffect(() => {
        if (trigger) {
            refetch();
        }
    }, [trigger]);


    const deleteMutation = useMutation(async (id: any) => await deleteApi(getUrlForModel(model, id)), {
        onSuccess: () => {
            message.success('Deleted Successfully');
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Slug',
            dataIndex: 'slug'
        },
        {
            title: 'Meta description',
            dataIndex: 'meta_desc'
        },
        {
            title: 'Actions',
            render: (record: any) => {
                console.log(record)
                return <Space>
                    <Button onClick={() => onClickEdit(record)} type={'link'}><EditOutlined /></Button>
                    <Popconfirm
                        title="Delete this item?"
                        description="This action cannot be undone"
                        onConfirm={() => handleDeleteClient(record.id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type={'link'}><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Link to={`/static-pages/details/${record.id}`}>
                        <Button type="primary" ghost>
                            <EyeOutlined />
                        </Button>
                    </Link>
                </Space>
            },
        },
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <>
            <Table
                rowKey="id"
                loading={isLoading}
                columns={columns}
                dataSource={fetchData?.data}
            />
        </>
    );
}
