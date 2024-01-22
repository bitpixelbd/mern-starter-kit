/* eslint-disable */

import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Col, Divider, Drawer, Form, Input, InputNumber, List, Row, Select, Skeleton, Space, Switch, Upload, message } from "antd";
import { patch, post, put } from "~/services/api/api";
import React, { useState } from "react";
import { REGISTER_TEACHER, API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { DownloadOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import Papa from "papaparse";
import {EXAMPLE_CSV_CONTENT} from "~/pages/CareHome/example.csv";

// @ts-ignore
export default function DrawerFormRegister({ title, onClose, open, onSubmitSuccess, isEditing, ...props }) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [create, setCreate] = useState(false)

    const createMutate = useMutation(async (data) => await post("admin/care-home", data), {
        onSuccess: (response) => {
            setCreate(true)
            // message.success('Saved Successfully');
            onSubmitSuccess();
            // form.resetFields()
        },
        onError: () => {
            // form.resetFields();
            // message.error('Something went wrong');
            setCreate(false)
        }
    });



    const onFinish = async (formValues: any) => {

        createMutate.mutate(formValues)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const beforeUpload = file => {
        setFileList([file]);
        return false;
    };

    const onSubmit = () => {
        try {
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target?.result, { header: true });
                const parsedData = csv?.data;
                if (parsedData && Array.isArray(parsedData) && parsedData.length) {
                    const data = chunkArray(parsedData, 100)
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        createMutate.mutate(element);
                        console.log({element})
                    }
                    // if (create) {
                    //     onSubmitSuccess();
                    //     form.resetFields()
                    //     message.success('Saved Successfully');
                    // } else {
                    //     form.resetFields()
                    //     message.error('Something went wrong');
                    // }
                    setFileList([])
                }
                setFileList(null);
            };
            if (fileList && Array.isArray(fileList) && fileList.length) {
                // @ts-ignore
                reader.readAsText(fileList[0]?.originFileObj);
            }
        } catch (e) {
            console.log({
                color: 'red',
                message: 'CSV parse failed'
            });
            console.log(e)
        }
    }

    function chunkArray(inputArray, chunkSize) {
        const arr = inputArray.map(item => {
            return ({
                name: item.name !== undefined ? item?.name : "",
                email: item.email !== undefined ? item?.email : "",
                phone: item.phone !== undefined ? item?.phone : "",
                logo: item.logo !== undefined ? item?.logo : "",
                short_desc: item.short_desc !== undefined ? item?.short_desc : "",
                desc: item.desc !== undefined ? item?.desc : "",
                street: item.street !== undefined ? item?.street : "",
                post_code: item.post_code !== undefined ? item?.post_code : "",
                city: item.city !== undefined ? item?.city : "",
                state: item.state !== undefined ? item?.state : "",
                lat: item.lat !== undefined ? item?.lat : "",
                lon: item.lon !== undefined ? item?.lon : "",
                address: item.address !== undefined ? item?.address : "",
                price_start: item.price_start !== undefined ? item?.price_start : "",
                price_end: item.price_end !== undefined ? item?.price_end : "",
                website: item.website !== undefined ? item?.website : "",
                facebook: item.facebook !== undefined ? item?.facebook : "",
                instagram: item.instagram !== undefined ? item?.instagram : "",
                linkedin: item.linkedin !== undefined ? item?.linkedin : "",
                slug: item.slug !== undefined ? item?.slug : "",
            })
        })

        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    }


    const handleDownload = () => {
        const jsonString = `data:text;chatset=utf-8,${encodeURIComponent(EXAMPLE_CSV_CONTENT)}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "organization-import-sample.csv";
        link.click();
    };


    return (
        <>
            <Drawer
                title={
                    <>
                        <Row>
                            <Col span={8}>
                                <h4>Import Organizations</h4>
                            </Col>
                            <Col span={8} offset={8}>
                                <Button type="primary" shape="round" icon={<DownloadOutlined />} size="sm" onClick={handleDownload}>
                                    Download Example
                                </Button>
                            </Col>
                        </Row>
                    </>
                }
                width={600}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}>
                <Space>
                    <Upload
                        accept=".csv"
                        fileList={fileList}
                        beforeUpload={beforeUpload}
                        onChange={({ fileList }) => setFileList(fileList)}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Space>
                <Space style={{ margin: "0 20px" }}>
                    <Button type="primary" htmlType="submit" onClick={onSubmit} loading={createMutate.isLoading}>
                        Save
                    </Button>
                </Space>
            </Drawer>
        </>
    );
}
