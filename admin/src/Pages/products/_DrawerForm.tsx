/* eslint-disable */

import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Space, Switch, Upload, message } from "antd";
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


    const { isLoading, isError, error, data: productCategories, refetch } = useQuery({
        queryKey: ["Categories", "Products"],
        queryFn: () => get(getUrlForModel('ProductCategory')),
        staleTime: 0
    });

    // const { data: states } = useQuery({
    //     queryKey: ["states", "advisor"],
    //     queryFn: () => get("admin/advisor/states"),
    //     staleTime: 0
    // });


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
        formValues.price = parseFloat(formValues.price)
        formValues.discount_id = parseFloat(formValues.discount_id)
        formValues.cost_pert_item = parseFloat(formValues.cost_pert_item)
        formValues.stock_quantity = parseFloat(formValues.stock_quantity)
        formValues.weight = parseFloat(formValues.weight)
        formValues.length = parseFloat(formValues.length)
        formValues.wide = parseFloat(formValues.wide)
        formValues.height = parseFloat(formValues.height)
        formValues.store_id = parseFloat(formValues.store_id)
        formValues.category_id = parseFloat(formValues.category_id)
        formValues.brand_id = parseFloat(formValues.brand_id)
        const url = getUrlFromUploadComponent(formValues, 'featured_image');
        formValues.featured_image = url;


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
                name: editedItem?.name,
                permalink: editedItem?.permalink,
                description: editedItem?.description,
                content: editedItem?.content,
                sku: editedItem?.sku,
                price: editedItem?.price,
                discount_id: editedItem?.discount_id,
                cost_pert_item: editedItem?.cost_pert_item,
                barcode: editedItem?.barcode,
                stock_status: editedItem?.stock_status,
                stock_quantity: editedItem?.stock_quantity,
                weight: editedItem?.weight,
                length: editedItem?.length,
                height: editedItem?.height,
                wide: editedItem?.wide,
                status: editedItem?.status,
                store_id: editedItem?.store_id,
                is_featured: editedItem?.is_featured,
                category_id: editedItem?.category_id,
                brand_id: editedItem?.brand_id,
                collection_tag: editedItem?.collection_tag,
                label: editedItem?.label,

                featured_image: [
                    {
                        uid: "-1",
                        status: "done",
                        thumbUrl: editedItem?.featured_image
                    }
                ],
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
                title={isEditing ? "Update Product" : "Add Product"}
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

                    <Form.Item
                        label="Permalink"
                        name="permalink"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="content"
                        name="content"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sku"
                        name="sku"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Cost Per Item"
                        name="cost_pert_item"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item

                        label="Product Code"
                        name="barcode"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Stock Status"
                        name="stock_status"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Select placeholder="Select Status" showSearch>
                            <Select.Option value="pending">pending</Select.Option>
                            <Select.Option value="publish">publish</Select.Option>
                            <Select.Option value="draft">Draft</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Stock Quantity"
                        name="stock_quantity"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Stock Quantity"
                        name="stock_quantity"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Discount Id"
                        name="discount_id"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Width"
                        name="weight"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Height"
                        name="height"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="weight"
                        name="wide"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="weight"
                        name="length"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Store Id"
                        name="store_id"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Brand Id"
                        name="brand_id"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category_id"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Select placeholder="Select Status" showSearch>
                            {
                                productCategories?.data?.map(category => <Select.Option key={category?.id} value={category?.id}>{category?.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Collection_tag"
                        name="collection_tag"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Label"
                        name="label"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Is Featured"
                        name="is_featured"
                    >
                        <Switch defaultChecked={editedItem?.is_verified} />
                    </Form.Item>

                    {/* <Form.Item label="Status" name="status">
                        <Select placeholder="Select Status" showSearch>
                            {
                                cities && cities?.data?.map(city => <Select.Option key={city?.id} value={city?.name}>{city?.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item> */}


                    <Form.Item
                        name="featured_image"
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
