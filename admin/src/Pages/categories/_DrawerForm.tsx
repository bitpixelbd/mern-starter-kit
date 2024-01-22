/* eslint-disable */

import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Space, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from '~/configs';
import { deleteApi, get, patch, post, put } from "~/services/api/api";
import { API_CRUD, API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import { getUrlFromUploadComponent } from "~/utility/upload";




// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();


    const { isLoading, isError, error, data: categories, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: () => get(getUrlForModel(model)),
        staleTime: 0
    });

    const { data: states } = useQuery({
        queryKey: ["states", "Categories"],
        queryFn: () => get("admin/advisor/states"),
        staleTime: 0
    });

    const { data: category } = useQuery({
        queryKey: ["categories", "categories"],
        queryFn: () => get(model),
        staleTime: 0
    });

    const createData = useMutation({
        mutationFn: async (data) => await post(getUrlForModel(model), data.data),
        onSuccess: (response) => {
            // console.log(response);
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
            refetch()
        },
        onError: () => { message.error('Something went wrong') }
    });

    const updateData = useMutation({
        mutationFn: async (data: any) => await patch(getUrlForModel(model, data.id), data),
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {

        // console.log(formValues);

        if (formValues.image) {
            const url = getUrlFromUploadComponent(formValues, 'image');
            formValues.image = url;
            delete formValues["image"]
        }

        if (formValues.experience) {
            formValues.experience = Number(formValues.experience)
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


    useEffect(() => {
        if (editedItem) {
            const val = {
                name: editedItem?.name,
                permalink: editedItem?.permalink,
                parent_id: editedItem?.parent_id,
                image: [
                    {
                        uid: "-1",
                        status: "done",
                        thumbUrl: editedItem?.image
                    }
                ],
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [editedItem, isEditing])


    const normFile = (e) => {
        console.log({ e });
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    return (
        <>
            <Drawer
                title={isEditing ? "Update Category" : "Add Category"}
                width={720}
                onClose={onClose}
                open={open}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category Slug"
                        name="permalink"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item label="Parent Category" name="parent_id">
                        {/* <span>Rating staff</span> */}
                        <Select placeholder="Select a Parent Category" showSearch>
                            {
                                categories && categories?.data?.map(category => {
                                    if (category?.id !== editedItem?.id) return <Select.Option key={category?.id} value={category?.id}>{category?.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            // defaultFileList={[...fileList]}
                            name="file"
                            action={API_FILE_UPLOAD}
                            maxCount={1}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={createData.isPending || updateData.isPending}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
