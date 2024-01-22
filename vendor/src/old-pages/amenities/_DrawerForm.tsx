/* eslint-disable */
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Drawer, Form, Input, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD, API_FILE_UPLOAD, getUrlForModel } from '~/services/api/endpoints';
import { getUrlFromUploadComponent } from '~/utility/upload';

// @ts-ignore
export default function DrawerForm({
  title,
  editingTitle,
  model,
  onClose,
  open,
  onSubmitSuccess,
  isEditing,
  editedItem,
  ...props
}) {
  const [fileList, setFileList] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [form] = Form.useForm();

  const {
    isLoading,
    isError,
    error,
    data: AmenityGroup,
    refetch,
  } = useQuery({
    queryKey: ['AmenityGroup'],

    queryFn: () => get(`${API_CRUD}?model=AmenityGroup`),
  });

  const createData = useMutation(
    async (data) => await post(getUrlForModel(model), data.data),
    {
      //TODO refactor
      onSuccess: (response) => {
        message.success('Saved Successfully');
        form.resetFields();
        onSubmitSuccess();
        setUrl(null);
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
  );

  const updateData = useMutation(
    async (data: any) => await patch(getUrlForModel(model, data.id), data),
    {
      //TODO refactor
      onSuccess: (response) => {
        message.success('Updated Successfully');
        form.resetFields();
        onSubmitSuccess(true);
        setUrl(null);
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
  );

  const onFinish = async (formValues: any) => {
    if (formValues?.name) {
            const slug = formValues?.name.replace(/ /g, "-")
            formValues.slug = slug?.toString()?.toLowerCase()
        }
        if (formValues?.icon_url) {
      const url = getUrlFromUploadComponent(formValues, 'icon_url');
      formValues.icon_url = url;
    }
    formValues.amenity_group_id = Number(id);
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

  const normFile = (e) => {
    console.log({ e });
    if (Array.isArray(e)) {
      return e;
    }

    e?.fileList?.map((item) => {
      if (item?.status === 'uploading') setLoading(true);
      if (item?.status === 'done') setLoading(false);
    });

    return e && e.fileList;
  };

  useEffect(() => {
    if (editedItem) {
      const val = {
        name: editedItem.name,
        amenity_group_id: editedItem.amenity_group_id,
        icon: [
          {
            uid: '-1',
            // name: "xxx.png",
            status: 'done',
            // url:  editedItem.image,
            thumbUrl: editedItem.icon,
          },
        ],
      };

      form.setFieldsValue(val);
    } else {
      form.resetFields();
    }
  }, [editedItem]);

  return (
    <>
      <Drawer
        title={isEditing ? editingTitle : title}
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="icon_url"
            label="Icon image"
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

          <Form.Item label="Static icon name" name="icon">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createData.isLoading || updateData.isLoading}
              disabled={loading}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
