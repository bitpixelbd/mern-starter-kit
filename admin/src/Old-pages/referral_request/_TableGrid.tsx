/* eslint-disable */

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import React, { useEffect } from "react";
import { deleteApi, get, patch, post } from "~/services/api/api";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";

// @ts-ignore
export default function _TableGrid({ model, trigger, ...props }) {
    const KEY = `all-${model}`;

    // const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => get(getUrlForModel(model)), { staleTime: 0 });
    const { isLoading, isError, error, isSuccess, data: fetchData, refetch } = useQuery([`Referral list`], () => post(`${API_CRUD_FIND_WHERE}?model=Referral`, {
        where: {},
        include: {
            User: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
            ReferralUser: {
                select: {
                    first_name: true,
                    last_name: true,
                    id: true
                }
            },
            ReferralPartner: {
                select: {
                    first_name: true,
                    last_name: true,
                    id: true
                }
            }
        }
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

    const onClickApproved = (record: any) => {
        updateData.mutate({
            status: "ACCEPTED",
            id: record.id,
        })
    }

    const updateData = useMutation(async (data: any) => await patch(getUrlForModel(model, data.id), data), {//TODO refactor
        onSuccess: (response) => {
            message.success('Approved Successfully');
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const columns = [
        {
            title: 'Id',
            render: (record: any) => {
                return record?.id
            }
        },
        {
            title: 'User name',
            render: (record: any) => {
                return record?.User?.first_name + " " + record?.User?.last_name
            }
        },
        {
            title: 'Refferd By',
            render: (record: any) => {
                if (record.type === "PARTNER") {
                    return record?.ReferralPartner?.first_name + " " + record?.ReferralPartner?.last_name + `(${record?.ReferralPartner?.id})`
                } else {
                    return record?.ReferralUser?.first_name + " " + record?.ReferralUser?.last_name + `(${record?.ReferralUser?.id})`
                }
            }
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            render: (record: any) => {
                return <Space>
                    <Popconfirm
                        title="Delete this item?"
                        description="This action cannot be undone"
                        onConfirm={() => handleDeleteClient(record?.id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type={'link'}><DeleteOutlined /></Button>
                    </Popconfirm>
                    {
                        record?.status !== "ACCEPTED" ?
                            <Button onClick={() => onClickApproved(record)} type="primary" >Approve</Button> : <Button onClick={() => onClickApproved(record)} type="primary" disabled >Approve</Button>

                    }
                </Space >
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
