/* eslint-disable */

import React, { useState } from 'react';
import {
  Button,
  Card,
  Spin,
  Badge,
  Descriptions,
  Space,
  Divider,
  Tag,
  message,
  Row,
  Col,
  Avatar,
  Image
} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DrawerForm from "./_DrawerForm";


const BlogDetails = () => {
  const { Meta } = Card;
  const drawerTitle = 'Update Blog';

  const model = 'Blog';
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const BASE_URL = '/blog';
  const navigate = useNavigate();

  const { id } = useParams(); // read id parameter from the url

  const {
    isLoading,
    isError,
    error,
    data: details,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: [`static-page-details-${id}`],
    queryFn: () => get(`${API_CRUD}/${id}?model=StaticPage`),
  });


  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />
  }



  const onClickEdit = (record: any) => {
    setIsEditing(true);
    setEditedItem(record);
    setOpen(true);
  }


  const showDrawer = () => {
    setOpen(true);
    setIsEditing(false);
    setEditedItem(null);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmitSuccess = (isEditing: boolean) => {
    setTrigger(trigger => trigger + 1)
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch()
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch()
    }
  }

  return (
    <>
      <DrawerForm
        title={drawerTitle}
        onClose={onClose}
        open={open}
        model={model}
        isEditing={isEditing}
        editedItem={editedItem}
        onSubmitSuccess={onSubmitSuccess}
      />
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Static page details</Title>
        <Button type="primary" onClick={() => onClickEdit(details?.data)} icon={<EditOutlined />} >Edit</Button>
      </Space>
      <Card bordered={true} style={{ width: "100%" }}>
        <Card
          bordered={false}
          style={{ width: "100%" }}
        >

          {/* <Meta title={details?.data?.title} description={details?.data?.content} /> */}
          <Meta description={<div
            dangerouslySetInnerHTML={{ __html: details?.data?.content }}
          />} />
          <br/>
          <br/>
          <br/>
          <p>Title: {details?.data?.title}</p>
          <p>Slug: {details?.data?.slug}</p>
          <p>Meta Description: {details?.data?.meta_desc}</p>
        </Card>
      </Card>

    </>
  );
};

export default BlogDetails;