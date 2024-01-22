/* eslint-disable */

import { useMutation } from '@tanstack/react-query';
import { Button, DatePicker, Drawer, Form, Input, Select, Switch, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { patch, post } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';
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
  const dateFormat = 'YYYY-MM-DD'; // pass this variable to ant d Datepicker

  const [form] = Form.useForm();

  const createData = useMutation({
    mutationFn: async (data) => await post(getUrlForModel(model), data?.data),
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
    formValues.product_id = parseInt(formValues.product_id);
    formValues.discount_amount = parseInt(formValues.discount_amount);
    formValues.store_id = parseInt(formValues.store_id);

    if (formValues.image) {
      const url = getUrlFromUploadComponent(formValues, 'image');
      formValues.profile_photo = url;
      delete formValues['image'];
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
      const formattedStartDate = dayjs(editedItem?.start_date);
      const formattedEndDate = dayjs(editedItem?.end_date);

      const val = {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        product_id: editedItem?.product_id,
        type: editedItem?.type,
        discount_type: editedItem?.discount_type,
        discount_amount: editedItem?.discount_amount,
        is_expired: editedItem?.is_expired,
        store_id: editedItem?.store_id,
        // image: [
        //     {
        //         uid: "-1",
        //         status: "done",
        //         thumbUrl: editedItem?.profile_photo
        //     }
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
        title={isEditing ? 'Update Withdrawals' : 'Add Withdrawals'}
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
            label="Amount (Balance: $3,662.25)"
            name="withdraw_amount"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item
            label="Bank Name"
            name="bank_name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Account Holer Name"
            name="account_holder_name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Account Number"
            name="account_number"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Discount amount"
            name="discount_amount"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input type="number" />
          </Form.Item>

          {/* <Form.Item label="Discount Type" name="discount_type">
            <Select placeholder="Assign in city" showSearch>
              <Select.Option value="PERCENTAGE">Percentage</Select.Option>
              <Select.Option value="FIXED">Fixed</Select.Option>
            </Select>
          </Form.Item> */}

          {/* <Form.Item
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
