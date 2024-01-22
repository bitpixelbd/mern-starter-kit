import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Upload, Form, Input, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE, API_FILE_UPLOAD } from '~/services/api/endpoints';
import { getUrlFromUploadComponent } from '~/utility/upload';
import { getImageFieldsKeys } from './settings';


export default function Hero() {
    const [form] = Form.useForm();

    const { isLoading, isSuccess, isError, error, data: settingsResponse, refetch } = useQuery(
        ["Settings"],
        () => post(`${API_CRUD_FIND_WHERE}?model=${"Setting"}`,
            {}),
        {
            staleTime: 0
        });

    let data: any = {};
    if (isSuccess && settingsResponse?.data) {
        const imageFields = getImageFieldsKeys();
        settingsResponse?.data?.map((item) => {
            if (imageFields.includes(item.key)) {
                data[item.key] = [
                    {
                        uid: "-1",
                        status: "done",
                        thumbUrl: item.value
                    }
                ]
            } else {
                data[item.key] = item.value;
            }
        })
    }


    if (data) {
        form.setFieldsValue(data);
    }

    const createData = useMutation(async (data) => await post("admin/settings", data.data), {
        onSuccess: (response) => {
            refetch()
            form.resetFields()
            message.success('Saved Successfully');
        },
        onError: () => {
            form.resetFields();
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {
        // const imageFields = getImageFieldsKeys();

        // imageFields.map(item => {
        //     const url = getUrlFromUploadComponent(formValues, item);
        //     formValues[item] = url;
        // })
        const dataArray = [];
        if (formValues.logo) {
            const url = getUrlFromUploadComponent(formValues, 'logo');
            formValues.logo = url;
        }
        if (formValues.favicon) {
            const url = getUrlFromUploadComponent(formValues, 'favicon');
            formValues.favicon = url;
        }
        if (formValues.hero_image) {
            const url = getUrlFromUploadComponent(formValues, 'hero_image');
            formValues.hero_image = url;
        }

        // console.log({ formValues })
        // return
        for (const name in formValues) {
            // if (formValues.hasOwnProperty(name)) {
            //     dataArray.push({ name, value: formValues[name] === undefined && "" ? null : formValues[name] });
            // }
            // console.log({ name })
            dataArray.push({
                key: name,
                value: formValues[name] === undefined && "" ? null : formValues[name]
            })
        }
        console.log("settings data after saving ===>>>", dataArray)
        // return
        createData.mutate({ data: dataArray });
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Hero title"
                name="hero_title"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Hero description"
                name="hero_desc"
            >
                <TextArea rows={5} />
            </Form.Item>
            <Form.Item
                label="Hero image"
                name="hero_image"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
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
            <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={createData?.isLoading} >
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}
