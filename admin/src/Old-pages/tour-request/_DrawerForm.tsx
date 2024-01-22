/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, DatePicker, Drawer, Form, Input, Select, Space, Switch, TimePicker, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React from "react";
import { SERVER_URL } from '~/configs';
import { deleteApi, get, patch, post, put } from "~/services/api/api";
import { API_CRUD, getUrlForModel } from "~/services/api/endpoints";




// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const updateData = useMutation(async (data: any) => await patch(getUrlForModel("RequestTour", data.id), data), {//TODO refactor
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
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (editedItem) {
        const val = {
            first_name: editedItem?.first_name,//
            last_name: editedItem?.last_name,//
            email: editedItem?.email,//

        };
        form.setFieldsValue(val);
    } else {
        form.resetFields();
    }

    const {
        isLoading,
        isError,
        error,
        data: advisors,
        refetch,
    } = useQuery({
        queryKey: ['Tour request List'],

        queryFn: () => get(getUrlForModel("RequestTour")),
    });
    const format = 'HH:mm';

    return (
        <>
            <Drawer
                title={title}
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
                        label="Select A date"
                        name="date"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Select A Time (EST)"
                        name="est_time"
                    >
                        <TimePicker defaultValue={dayjs('12:08', format)} format={format} />;
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input type="email" />
                    </Form.Item>

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
