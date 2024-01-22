/* eslint-disable */
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, message } from "antd";
import React from "react";
import { patch, post, put } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";

// @ts-ignore
export default function DrawerForm({title, model, onClose, open, onSubmitSuccess, isEditing, editedItem,  ...props}) {

    const [form] = Form.useForm();

    const createData = useMutation(async (data) => await post(getUrlForModel("AmenityGroup"), data.data), {//TODO refactor
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const updateData = useMutation(async (data: any) => await patch(getUrlForModel("AmenityGroup", data.id), data), {//TODO refactor
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

    if (editedItem) {
        const val = {
            name: editedItem.name,
            is_popular: !!(editedItem.is_popular)
        };
        form.setFieldsValue(val);
    } else {
        form.resetFields();
    }

    return (
        <>
            <Drawer
                title={isEditing ? "Update Amenity Group" : title}
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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'This field is required' }]}
                >
                    <Input />
                </Form.Item>

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
