/* eslint-disable */

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, Popconfirm, Space, Table, Tag, message } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteApi, get } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;

    const { isLoading, isError, error, data: allDiscounts, refetch } = useQuery(
        {
            queryKey: [KEY],
            queryFn: () => get(getUrlForModel(model)),
            staleTime: 0
        }
    );

    // const {  data: productCategories, refetch:categories } = useQuery({
    //     queryKey: ["Categories", "Products"],
    //     queryFn: () => get(getUrlForModel('ProductCategory')),
    //     staleTime: 0
    // });

    useEffect(() => {
if (trigger) {
        refetch();
}
    }, [trigger]);


    const deleteMutation = useMutation(
        {
            mutationFn: async (id: any) => await deleteApi(getUrlForModel(model, id)),
            onSuccess: () => {
                message.success('Deleted Successfully');
                refetch()
            },
            onError: () => {
                message.error('Something went wrong');
            }
        }
    );

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
    }

    const columns = [
        {
            title: 'Start Date',
            // dataIndex: 'end_date',
            render: (record: any) => {

                const startDate = new Date(record?.start_date)?.toLocaleDateString();
                // const year = date.getFullYear();
                // const month = (date.getMonth() + 1).toString().padStart(2, '0');
                // const day = date.getDate().toString().padStart(2, '0');
                // const formattedDate = `${year}-${month}-${day} Bangladesh Time`;
                // console.log(date?.);
                return startDate?.replaceAll("/","-")
            },
        },
        {
            title: 'End Date',
            // dataIndex:'end_date',
            render: (record: any) => {
                const endDate = new Date(record?.end_date)?.toLocaleDateString();
                // const year = date.getFullYear();
                // const month = (date.getMonth() + 1).toString().padStart(2, '0');
                // const day = date.getDate().toString().padStart(2, '0');
                // const formattedDate = `${year}-${month}-${day}`;
                return endDate?.replaceAll("/", "-")
            },
        },
        {
            title: 'Discount Type',
            dataIndex: 'discount_type'
        },
        {
            title: 'Is Expired',
            render: (record: any) => {
                if (record.is_expired) {
                    return <Tag color="orange">Yes</Tag>;
                }
                return <Tag color="green">No</Tag>;
            },
        },
        // {
        //     title: 'Image',
        //     render: (record: any) => {
        //         return <Image
        //             width={50}
        //             height={50}
        //             src={record?.featured_image} />
        //     },
        // },

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
                    {/* <Link to={`/advisor/details/${record.id}`}>
                        <Button type="primary" ghost>
                            <EyeOutlined />
                        </Button>
                    </Link> */}
                </Space>
            },
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
            dataSource={allDiscounts?.data} />
    );
}
