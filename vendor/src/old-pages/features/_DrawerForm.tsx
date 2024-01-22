/* eslint-disable */

import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Switch, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { patch, post, put } from "~/services/api/api";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import { getUrlFromUploadComponent } from "~/utility/upload";

// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [hasImage, setHasImage] = useState(false)
    const [hasButton, setHasButton] = useState(false)

    const createData = useMutation(async (data) => await post(getUrlForModel(model), data.data), {//TODO refactor
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const updateData = useMutation(async (data: any) => await patch(getUrlForModel(model, data.id), data), {//TODO refactor
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
        if (formValues !== null && formValues !== undefined) {
            const url = getUrlFromUploadComponent(formValues, 'image');
            formValues.image = url;
        }

        if (formValues?.sort_order !== undefined && formValues?.sort_order !== "") {
            formValues.sort_order = Number(formValues?.sort_order);
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
                title: editedItem.title,
                description: editedItem.description,
                type: editedItem.type,
                image: [
                    {
                        uid: "-1",
                        // name: "xxx.png",
                        status: "done",
                        // url:  editedItem.image,
                        thumbUrl: editedItem.image
                    }
                ],
                is_active: editedItem.is_active,
                sort_order: editedItem.sort_order,
                has_image: editedItem.has_image,
                has_button: editedItem.has_button,
                button_text: editedItem.button_text,
                button_url: editedItem.button_url,
                button_class: editedItem.button_class,
            };
            setHasImage(editedItem?.has_image)
            setHasButton(editedItem?.has_button)
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [editedItem])


    const normFile = (e) => {
        console.log({ e });
        if (Array.isArray(e)) {
            return e;
        }
        /*if (e?.fileList && Array.isArray(e.fileList)) {
            const file = e.fileList[0];
            if (file && file.status === 'done' && file.response && file.response.success && file.response?.data?.url) {
                return file.response?.data?.url
            }
        }*/
        return e && e.fileList;
    };


    return (
        <>
            <Drawer
                title={isEditing ? 'Update feature' : title}
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
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    // rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                    >
                        <Select placeholder="type">
                            <Option value="home" >Home</Option>
                            <Option value="home_feature_card">Home feature card</Option>
                            <Option value="home_bottom_hero">Home bottom hero</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Is active"
                        name="is_active"
                        valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="Sort order"
                        name="sort_order"
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Has button"
                        name="has_button"
                        valuePropName="checked">

                        <Switch onClick={(value) => setHasButton(value)} />
                    </Form.Item >

                    {
                        hasButton &&
                        <>
                            <Form.Item
                                label="Button text"
                                name="button_text">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Button url"
                                name="button_url">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Button class"
                                name="button_class">
                                <Input />
                            </Form.Item>
                        </>
                    }
                    <Form.Item
                        label="Has image"
                        name="has_image"
                        valuePropName="checked">
                        <Switch onClick={(value) => setHasImage(value)} />
                    </Form.Item>
                    {
                        hasImage &&
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
                    }

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>

                </Form>
            </Drawer>
        </>
    );
}
