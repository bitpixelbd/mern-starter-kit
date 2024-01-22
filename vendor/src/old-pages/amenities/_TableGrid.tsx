/* eslint-disable */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteApi, get, post } from "~/services/api/api";
import React, { useEffect } from "react";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";
import { useParams } from "react-router-dom";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const { id } = useParams();
    const KEY = `all-${model}`;

    // const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => get(getUrlForModel(model)), { staleTime: 0 });


    const { isLoading, isError, error, isSuccess, data: fetchData, refetch } = useQuery([`care-Home-details-${id}`], () => post(`${API_CRUD_FIND_WHERE}?model=Amenity`, {
        "where": {
            "amenity_group_id": Number(id)
        },
    }), { staleTime: 0 });

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
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Slug',
            dataIndex: 'slug'
        },
        {
            title: 'Icon image',
            render: (record: any) => {
                return <Image src={record?.icon_url} style={{maxWidth:"100px"}}></Image>
            },
        },
        {
            title: 'Static icon name',
            render: (record: any) => {
                return <Image src={record?.icon} style={{maxWidth:"100px"}}></Image>
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
        }
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <Table
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={fetchData?.data} />
    );
}
