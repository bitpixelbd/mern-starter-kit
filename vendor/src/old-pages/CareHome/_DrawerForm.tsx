/* eslint-disable */

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import AddCityModal from '~/components/care-home/AddCityModal';
import { SERVER_URL } from '~/configs';
import { deleteApi, get, patch, post, put } from '~/services/api/api';
import { API_CRUD, API_FILE_UPLOAD, getUrlForModel } from '~/services/api/endpoints';

// @ts-ignore
export default function DrawerForm({
  title: drawerTitle,
  drawerUpdateTitle,
  model,
  onClose,
  open,
  onSubmitSuccess,
  isEditing,
  editedItem,
  ...props
}) {
  const [form] = Form.useForm();
  const [url, setUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);

  const createData = useMutation(
    async (data) => await post(getUrlForModel('CareHome'), data.data),
    {
      onSuccess: (response) => {
        form.resetFields();
        message.success('Saved Successfully');
        onSubmitSuccess();
      },
      onError: () => {
        form.resetFields();
        message.error('Something went wrong');
      },
    },
  );

  const updateData = useMutation(
    async (data: any) => await patch(getUrlForModel('CareHome', data.id), data),
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
    if (url !== null && url !== '') {
      formValues.profile_photo = url;
    }
    if (formValues.logo) {
      formValues.logo = formValues?.logo[0]?.response?.data?.url;
    }
    if (formValues.feature_image) {
      formValues.feature_image = formValues?.feature_image[0]?.response?.data?.url;
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

  const {
    isLoading,
    isError,
    error,
    data: amenity,
    refetch,
  } = useQuery({
    queryKey: ['Amenity For Care'],

    queryFn: () => get(`${API_CRUD}?model=Amenity`),
  });

  const fileHandleChange = async (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    setImagePreview(URL.createObjectURL(fileObj));
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const file = await axios
      .post(API_FILE_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res?.data?.data?.url);
        setUrl(res?.data?.data?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getImagePreview = () => {
    if (imagePreview) {
      return <img src={imagePreview} alt="" height={80} />;
    }
    if (editedItem && editedItem.profile_photo) {
      return <img src={editedItem.profile_photo} alt="" height={80} />;
    }
    return null;
  };

  useEffect(() => {
    if (editedItem) {
      const val = {
        name: editedItem?.name,
        email: editedItem?.email,
        phone: editedItem?.phone,
        short_desc: editedItem?.short_desc,
        desc: editedItem?.desc,
        street: editedItem?.street,
        post_code: editedItem?.post_code,
        state: editedItem?.state,
        lat: editedItem?.lat,
        lon: editedItem?.lon,
        address: editedItem?.address,
        price_start: editedItem?.price_start,
        price_end: editedItem?.price_end,
        website: editedItem?.website,
        facebook: editedItem?.facebook,
        instagram: editedItem?.instagram,
        linkedin: editedItem?.linkedin,
        slug: editedItem?.slug,
        is_verified: editedItem?.is_verified,
        is_publish: editedItem?.is_publish,
        community_size: editedItem?.community_size,
        ratting_cleanliness: editedItem?.ratting_cleanliness,
        ratting_care_services: editedItem?.ratting_care_services,
        ratting_facilities: editedItem?.ratting_facilities,
        ratting_resident_satisfaction: editedItem?.ratting_resident_satisfaction,
        ratting_meals_dining: editedItem?.ratting_meals_dining,
        ratting_activities: editedItem?.ratting_activities,
        ratting_staff: editedItem?.ratting_staff,
        ratting_value: editedItem?.ratting_value,
        city_id: editedItem?.city_id,
      };
      form.setFieldsValue(val);
    } else {
      form.resetFields();
    }
  }, [editedItem]);

  // const [fileList, setFileList] = useState([]);

  // Function to handle before upload
  const beforeUpload = (file) => {
    // Ensure only one file is in the list
    setFileList([file]);
    return false; // Returning false prevents the file from being uploaded
  };

  const onSubmit = () => {
    try {
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target?.result, { header: true });
        const parsedData = csv?.data;
        if (parsedData && Array.isArray(parsedData) && parsedData.length) {
          console.log(parsedData);
        }
        setFileList(null);
      };
      console.log({ fileList });
      if (fileList && Array.isArray(fileList) && fileList.length) {
        // @ts-ignore
        reader.readAsText(fileList[0]?.originFileObj);
      }
      // return
    } catch (e) {
      console.log({
        color: 'red',
        message: 'CSV parse failed',
      });
      console.log(e);
    }
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedValues((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handleCheckboxChange = (checkedValues) => {
    setSelectedValues(checkedValues);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
  const {
    isLoading: isLoadingCities,
    isError: isErrorCities,
    error: errorCities,
    data: cities,
    refetch: refetchCities,
  } = useQuery(['Get All city for add a care homes'], () => get(getUrlForModel('City')), {
    staleTime: 0,
  });

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx: number, target: boolean) => {
    refetchCities();
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };
  // console.log(selectedCity)
  return (
    <>
      <Drawer
        title={isEditing?drawerUpdateTitle: drawerTitle}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter care home name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input type="tel" />
          </Form.Item>
          <Form.Item label="Street" name="street">
            <Input />
          </Form.Item>
          <Form.Item label="Postal code" name="post_code">
            <Input />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input />
          </Form.Item>
          <Form.Item label="Latitude" name="lat">
            <Input />
          </Form.Item>
          <Form.Item label="Longitude" name="lon">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Price start" name="price_start">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Price end" name="price_end">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input type="url" />
          </Form.Item>
          <Form.Item label="Facebook" name="facebook">
            <Input type="url" />
          </Form.Item>
          <Form.Item label="Instagram" name="instagram">
            <Input type="url" />
          </Form.Item>
          <Form.Item label="Linkedin" name="linkedin">
            <Input type="url" />
          </Form.Item>
          <Form.Item label="Slug" name="slug">
            <Input />
          </Form.Item>
          <Form.Item label="Community size" name="community_size">
            <Select placeholder="Community size">
              <Select.Option value="SMALL">Small</Select.Option>
              <Select.Option value="MEDIUM">Medium</Select.Option>
              <Select.Option value="LARGE">Large</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="logo"
            label="Logo"
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
          <Form.Item
            name="feature_image"
            label="Feature Image"
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
          <Form.Item label="Short description" name="short_desc">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="City" name="city_id">
            <Select
              showSearch
              placeholder="Select a city"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={cities?.data?.map((item) => {
                return {
                  value: item?.id,
                  label: item?.name,
                };
              })}
            />
          </Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
            <Button type="primary" onClick={() => toggleModal(0, true)}>
              + add city
            </Button>
          </Space>

          <Form.Item label="Rating cleanliness" name="ratting_cleanliness">
            {/* <span>Rating cleanliness</span> */}
            <Select placeholder="Rating cleanliness">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Rating care services" name="ratting_care_services">
            {/* <span>Rating care services</span> */}
            <Select placeholder="Rating care services">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Rating facilities" name="ratting_facilities">
            {/* <span>Rating facilities</span> */}
            <Select placeholder="Rating facilities">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Rating resd. satisfaction"
            name="ratting_resident_satisfaction"
          >
            {/* <span>Rating resident satisfaction</span> */}
            <Select placeholder="Rating resident satisfaction">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Rating meals dining" name="ratting_meals_dining">
            {/* <span>Rating meals dining</span> */}
            <Select placeholder="Rating meals dining">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Rating activities" name="ratting_activities">
            {/* <span>Rating activities</span> */}
            <Select placeholder="Rating activities">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Rating staff" name="ratting_staff">
            {/* <span>Rating staff</span> */}
            <Select placeholder="Rating staff">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Rating value" name="ratting_value">
            {/* <span>Rating value</span> */}
            <Select placeholder="Rating value">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
              <Select.Option value={3}>3</Select.Option>
              <Select.Option value={4}>4</Select.Option>
              <Select.Option value={5}>5</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Is Verified" name="is_verified">
            <Switch defaultChecked={editedItem?.is_verified} />
          </Form.Item>
          <Form.Item label="Is Publish" name="is_publish">
            <Switch defaultChecked={editedItem?.is_publish} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateData.isLoading}
              onClick={onSubmit}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title="Add City"
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        footer=""
      >
        <AddCityModal ok_modal={() => toggleModal(0, false)} />
      </Modal>
    </>
  );
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
