/* eslint-disable */
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Button,
    Col,
    Drawer,
    Form,
    Image,
    Input,
    Popconfirm,
    Row,
    Space, Switch,
    Table,
    Tag,
    Typography,
    Upload,
    message
} from "antd";
import React, { useEffect, useState } from "react";
import FilterSearch from "~/components/FilterSearch";
import { deleteApi, get, patch, post } from "~/services/api/api";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import { getLabelFromName } from "~/utility/form";
import { getHeader } from "~/utility/helmet";
import { getUrlFromUploadComponent } from "~/utility/upload";

const { Title } = Typography;

const model = 'City';
const title = 'Cities';
const drawerTitle = 'Add City';
const drawerTitleEdit = 'Edit City';
const KEY = `all-${model}`;

const FIELDS = [
    {
        name: 'name',
        rules: [{ required: true, message: 'This field is required' }],
        table: true,
    },
    {
        name: 'code',
        label: 'State',
        table: true
    },
    {
        name: 'image',
        table: true,
        type: 'image',
        render: (record: any) => {
            return <Space>
                <Image
                    width={100}
                    src={`${record.image}`}
                />
            </Space>
        },
    },
    {
        name: 'short_order',
        type: 'number'
    },
];

const DrawerForm = ({ onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) => {
    const fiedld = []
    const queryClient = useQueryClient()
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const createData = useMutation(async (data) => await post(getUrlForModel(model), data.data), {
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
            queryClient.invalidateQueries({ queryKey: [KEY] })
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const updateData = useMutation(async (data: any) => await patch(getUrlForModel(model, data.id), data), {
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
            queryClient.invalidateQueries({ queryKey: [KEY] })
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {
        //TODO need to make this part generic
        const url = getUrlFromUploadComponent(formValues, 'image');
        formValues.image = url;

        if (formValues?.short_order) {
            formValues.short_order = Number(formValues?.short_order)
        }

        if (isEditing) {
            updateData.mutate({
                ...formValues,
                id: editedItem.id
            })
        } else {
            // @ts-ignore
            createData.mutate({
                data: formValues
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log({ e });
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    useEffect(() => {
        if (editedItem) {
            console.log({ editedItem })
            const cities = editedItem?.cities?.split(',')
            console.log({ cities })
            const val = {
                name: editedItem.name,
                code: editedItem.code,
                short_order: editedItem.short_order,
                is_home_page: editedItem.is_home_page,
                cities: cities?.map(item => Number(item)),
                image: [
                    {
                        uid: "-1",
                        // name: "xxx.png",
                        status: "done",
                        // url:  editedItem.image,
                        thumbUrl: editedItem.image
                    }
                ]
            };

            form.setFieldsValue(val);

        } else {

            form.resetFields();
        }
    }, [editedItem])



    return (
        <>
            <Drawer
                title={isEditing ? drawerTitleEdit : drawerTitle}
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {
                        FIELDS.map(field => {
                            const type = field.type ?? 'text';
                            const label = field.label ?? getLabelFromName(field.name);
                            if (type === 'text') {
                                return (
                                    <Form.Item
                                        label={label}
                                        name={field.name}
                                        rules={field.rules ?? []}
                                    >
                                        <Input />
                                    </Form.Item>
                                )
                            }

                            if (type === 'checkbox') {
                                return (
                                    <Form.Item
                                        label={label}
                                        name={field.name}
                                        valuePropName="checked">
                                        <Switch />
                                    </Form.Item>
                                )
                            }

                            if (type === 'number') {
                                return (
                                    <Form.Item
                                        label={label}
                                        name={field.name}>
                                        <Input type="number" />
                                    </Form.Item>
                                )
                            }

                            if (type === 'image') {
                                return (
                                    <Form.Item
                                        name={field.name}
                                        label={label}
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                    >
                                        <Upload
                                            defaultFileList={[...fileList]}
                                            name="file"
                                            action={API_FILE_UPLOAD}
                                            maxCount={1}
                                            listType="picture"
                                        >
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                )
                            }

                        })}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={createData.isLoading || updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

const TableGrid = ({ onClickEdit, onSubmitSuccess, trigger, ...props }) => {
    const [tableData, setTableData] = useState([])

    const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => get(getUrlForModel(model)), { staleTime: 0 });

    const updateData = useMutation(async (data: any) => await patch(getUrlForModel(model, data.id), data), {
        onSuccess: (response) => {
            message.success('Updated Successfully');
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const deleteMutation = useMutation(async (id: any) => await deleteApi(getUrlForModel(model, id)), {
        onSuccess: () => {
            message.success('Deleted Successfully');
            onSubmitSuccess()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
    }

    let columns = [];
    FIELDS.filter(i => i.table).map(field => {
        const type = field.type ?? 'text';
        const label = field.label ?? getLabelFromName(field.name);
        if (field.render) {
            columns.push({
                title: label,
                render: field.render,
            })
        }
        if (type === 'text') {
            columns.push({
                title: label,
                dataIndex: field.name,
            })
        }
    });

    const handleIsHomePage = (e, id) => {
        updateData.mutate({ is_home_page: e, id: id })
    }

    columns.push(
        {
            title: 'Is home page',
            render: (record: any) => {
                return <Switch
                    checked={record?.is_home_page}
                    onChange={(e) => handleIsHomePage(e, record?.id)}
                />
            },
        }
    )
    columns.push({
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
    });



    console.log('col', columns);

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <>
            {/* <FilterSearch
                setItem={setTableData}
                model={"city"}
                filterItems={
                    [
                        {
                            label: "Name",
                            value: "name",
                        },
                    ]
                }
                trigger={trigger}
            /> */}
            <Table
                rowKey="id"
                loading={isLoading}
                columns={columns}
                dataSource={fetchData?.data} />
        </>
    );
}

const City = () => {
    const [trigger, setTrigger] = useState(0);
    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
    }

    const onSubmitSuccess = (isEditing: boolean) => {
        setTrigger(trigger => trigger + 1)
        if (isEditing) {
            setOpen(false);
            setIsEditing(false);
            setEditedItem(null);
        } else {
            setOpen(false);
            setIsEditing(false);
            setEditedItem(null);
        }
    }

    return (
        <>

            {getHeader(title)}
            <DrawerForm
                onClose={onClose}
                open={open}
                isEditing={isEditing}
                editedItem={editedItem}
                onSubmitSuccess={onSubmitSuccess}
            />
            <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={2}>{title}</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>Add New</Button>
            </Space>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <TableGrid
                        onClickEdit={onClickEdit}
                        trigger={trigger}
                        onSubmitSuccess={onSubmitSuccess}
                    />
                </Col>
            </Row>

        </>
    )
};

export default City
