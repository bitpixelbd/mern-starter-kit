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


    const { isLoading, isError, error, data: cities, refetch } = useQuery({
        queryKey: ["cities", "advisor"],
        queryFn: () => get(getUrlForModel('city')),
        staleTime: 0
    });

    const { data: states } = useQuery({
        queryKey: ["states", "advisor"],
        queryFn: () => get("admin/advisor/states"),
        staleTime: 0
    });

    const { data: postalCodes } = useQuery({
        queryKey: ["postalCodes", "advisor"],
        queryFn: () => get("admin/advisor/post-codes"),
        staleTime: 0
    });

    const createData = useMutation({
        mutationFn: async (data) => await post(getUrlForModel(model), data.data),
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
        },
        onError: () => { message.error('Something went wrong') }
    });

    const updateData = useMutation({
        mutationFn: async (data: any) => await patch(getUrlForModel(model, data.id), data),
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {
        if (formValues.image) {
            const url = getUrlFromUploadComponent(formValues, 'image');
            formValues.profile_photo = url;
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
                first_name: editedItem?.first_name,
                last_name: editedItem?.last_name,
                email: editedItem?.email,
                phone: editedItem?.phone,
                address: editedItem?.address,
                designation: editedItem?.designation,
                experience: editedItem?.experience,
                families_helped: editedItem?.families_helped,
                operating_in: editedItem?.operating_in,
                image: [
                    {
                        uid: "-1",
                        status: "done",
                        thumbUrl: editedItem?.profile_photo
                    }
                ],
                assign_city: editedItem?.assign_city
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [isEditing])


    const normFile = (e) => {
        console.log({ e });
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    // console.log({ states })

    return (
        <>
            <Drawer
                title={isEditing ? "Update Advisor" : "Add Advisor"}
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

                    <Form.Item
                        label="First name"
                        name="first_name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last name"
                        name="last_name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Designation"
                        name="designation"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Families helped"
                        name="families_helped"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item

                        label="Experience"
                        name="experience"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Operating in"
                        name="operating_in"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Assign in city" name="assign_city">
                        {/* <span>Rating staff</span> */}
                        <Select placeholder="Assign in city" showSearch>
                            {
                                cities && cities?.data?.map(city => <Select.Option key={city?.id} value={city?.name}>{city?.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Assign in State"
                        name="assign_state"
                    >
                        <Select placeholder="Assign in State" showSearch>
                            {
                                states && states?.data?.data?.map((state, index) => <Select.Option key={index} value={state}>{state}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Assign Postal Code"
                        name="assign_postal_code"
                    >
                        <Select placeholder="Assign Postal Code" showSearch>
                            {
                                postalCodes && postalCodes?.data?.data?.map((postCode, index) => <Select.Option key={index} value={postCode}>{postCode}</Select.Option>)
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
