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
import { SERVER_URL } from '~/configs';
import { deleteApi, get, patch, post, put } from '~/services/api/api';
import { API_CRUD, API_FILE_UPLOAD, getUrlForModel } from '~/services/api/endpoints';
import { getUrlFromUploadComponent } from '~/utility/upload';

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

  //   const {
  //     isLoading,
  //     isError,
  //     error,
  //     data: cities,
  //     refetch,
  //   } = useQuery({
  //     queryKey: ['cities', 'advisor'],
  //     queryFn: () => get(getUrlForModel('city')),
  //     staleTime: 0,
  //   });

  //   const { data: states } = useQuery({
  //     queryKey: ['states', 'advisor'],
  //     queryFn: () => get('admin/advisor/states'),
  //     staleTime: 0,
  //   });

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
    formValues.sub_amount = parseInt(formValues.sub_amount);
    formValues.tax_amount = parseInt(formValues.tax_amount);
    formValues.shipping_amount = parseInt(formValues.shipping_amount);
    formValues.shipping_id = parseInt(formValues.shipping_id);
    formValues.billing_id = parseInt(formValues.billing_id);

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
        user_id: editedItem?.user_id,
        sub_amount: editedItem?.sub_amount,
        promotion_amount: editedItem?.promotion_amount,
        tax_amount: editedItem?.tax_amount,
        discount_id: editedItem?.discount_id,
        shipping_amount: editedItem?.shipping_amount,
        shipping_id: editedItem?.shipping_id,
        billing_id: editedItem?.billing_id,
        status: editedItem?.status,
        is_company_invoice: editedItem?.is_company_invoice,
        company_name: editedItem?.company_name,
        company_email: editedItem?.company_email,
        company_address: editedItem?.company_address,
        company_tax: editedItem?.company_tax,
        // featured_image: [
        //   {
        //     uid: '-1',
        //     status: 'done',
        //     thumbUrl: editedItem?.featured_image,
        //   },
        // ],
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
        title={isEditing ? 'Update Order' : 'Add Order'}
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
          <Form.Item label="User Name" name="user_id">
            <Input />
          </Form.Item>

          <Form.Item label="Discount" name="discount_id">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Sub Amount" name="sub_amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Promotion Amount" name="promotion_amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Tax Amount" name="tax_amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Shipping Amount" name="shipping_amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Shipping Id" name="shipping_id">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Billing id" name="billing_id">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>

          <Form.Item label="Company Name" name="company_name">
            <Input />
          </Form.Item>

          <Form.Item label="Company email" name="company_email">
            <Input />
          </Form.Item>

          <Form.Item label="Company Address" name="company_address">
            <Input />
          </Form.Item>

          <Form.Item label="Company Tax" name="company_tax">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select placeholder="Select Status" showSearch>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="published">Published</Select.Option>
              <Select.Option value="deny">Deny</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Is Company Invoice" name="is_company_invoice">
            <Switch defaultChecked={false} />
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

          {/* <Form.Item
            label="Image"
            name="featured_image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" action={API_FILE_UPLOAD} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item> */}
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
