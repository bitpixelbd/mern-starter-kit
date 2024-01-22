/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteApi, get, post } from "~/services/api/api";
import React, { useEffect } from "react";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";
import { Link, useParams } from "react-router-dom";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;
    const { location } = useParams(); // read id parameter from the url

    const { isLoading, isError, error , refetch,  data: featuresData,  } = useQuery(
        [KEY],
        () => get(getUrlForModel(model)),
        { staleTime: 0 }
    );


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


    // title
    // description
    // image

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Sort Order',
            dataIndex: 'sort_order'
        },
        {
            title: 'Is Active',
            render: (record: any) => {
                if (record?.is_active) {
                    return <Tag color="green">Yes</Tag>;
                }
                return <Tag color="orange">No</Tag>;
            },
        },
        {
            title: 'Actions',
            render: (record: any) => {
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
                </Space>
            },
        },
        {
            title: 'Detail',
            render: (record: any) => {
                return (
                    <>
                        <Space>
                            <Link to={`/features/details/${record.id}`}>
                                <Button type="primary" ghost>
                                    <EyeOutlined />
                                </Button>
                            </Link>
                        </Space>
                    </>
                );
            }
        },
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <Table
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={featuresData?.data} />
    );
}
