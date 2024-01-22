/* eslint-disable */

import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Upload,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SERVER_URL } from '~/configs';
import { deleteApi, get, patch, post, put } from '~/services/api/api';
import { API_CRUD, API_FILE_UPLOAD, getUrlForModel } from '~/services/api/endpoints';
import { getUrlFromUploadComponent } from '~/utility/upload';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

// @ts-ignore
export default function DrawerForm({
  title,
  model,
  onClose,
  open,
  onSubmitSuccess,
  isEditing,
  editedItem,
  ...props
}) {
  const [form] = Form.useForm();

  const {
    isLoading,
    isError,
    error,
    data: cities,
    refetch,
  } = useQuery({
    queryKey: ['cities', 'advisor'],
    queryFn: () => get(getUrlForModel('city')),
    staleTime: 0,
  });

  const { data: states } = useQuery({
    queryKey: ['states', 'advisor'],
    queryFn: () => get('admin/advisor/states'),
    staleTime: 0,
  });

  const { data: postalCodes } = useQuery({
    queryKey: ['postalCodes', 'advisor'],
    queryFn: () => get('admin/advisor/post-codes'),
    staleTime: 0,
  });

  const createData = useMutation({
    mutationFn: async (data) => await post(getUrlForModel(model), data.data),
    onSuccess: (response) => {
      message.success('Saved Successfully');
      form.resetFields();
      onSubmitSuccess();
    },
    onError: () => {
      message.error('Something went wrong');
    },
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
    },
  });

  const onFinish = async (formValues: any) => {
    formValues.price = parseFloat(formValues.price);
    formValues.discount_id = parseInt(formValues.discount_id);
    formValues.cost_pert_item = parseFloat(formValues.cost_pert_item);
    formValues.stock_quantity = parseInt(formValues.stock_quantity);
    formValues.weight = parseFloat(formValues.weight);
    formValues.length = parseFloat(formValues.length);
    formValues.wide = parseFloat(formValues.wide);
    formValues.height = parseFloat(formValues.height);
    formValues.store_id = parseInt(formValues.store_id);
    formValues.category_id = parseInt(formValues.category_id);
    formValues.brand_id = parseInt(formValues.brand_id);

    if (formValues.featured_image) {
      const url = getUrlFromUploadComponent(formValues, 'featured_image');
      formValues.featured_image = url;
    }

    if (formValues.experience) {
      formValues.experience = Number(formValues.experience);
    }
    if (isEditing) {
      updateData.mutate({
        ...formValues,
        id: editedItem.id,
      });
    } else {
      // @ts-ignore
      createData.mutate({
        data: formValues,
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
        wide: editedItem?.wide,
        height: editedItem?.height,
        status: editedItem?.status,
        store_id: editedItem?.store_id,
        is_featured: editedItem?.is_featured,
        category_id: editedItem?.stock_status,
        brand_id: editedItem?.brand_id,
        collection_tag: editedItem?.collection_tag,
        label: editedItem?.label,
        featured_image: [
          {
            uid: '-1',
            status: 'done',
            thumbUrl: editedItem?.featured_image,
          },
        ],
      };
      form.setFieldsValue(val);
    } else {
      form.resetFields();
    }
  }, [isEditing]);

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
        title={isEditing ? 'Update Store' : 'Add Store'}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
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
            label="Store Name"
            name="name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Shop Url"
            name="shop_url"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="price" name="price">
            <ReactQuill
              theme="snow" // You can choose different themes like 'snow', 'bubble', etc.
              modules={{
                toolbar: toolbarOptions,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item label="barcode" name="barcode">
            <Select placeholder="Assign in city" showSearch>
              {cities &&
                cities?.data?.map((city) => (
                  <Select.Option key={city?.id} value={city?.name}>
                    {city?.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item> */}

          <Form.Item
            label="Store Logo"
            name="store_logo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Upload name="file" action={API_FILE_UPLOAD} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Store Banner"
            name="store_Banner"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" action={API_FILE_UPLOAD} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createData.isPending || updateData.isPending}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
