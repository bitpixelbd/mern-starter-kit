/* eslint-disable */

import { EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Badge,
    Button,
    Card,
    Descriptions,
    Divider,
    Image,
    Space,
    Spin,
    Tag,
    Typography,
    message
} from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdvisorAssignButton from '~/components/AdvisorAssignButton';
import { SERVER_URL } from '~/configs';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import DrawerForm from './_DrawerForm';
const { Title } = Typography;


const AdvisorDetails = () => {

    const drawerTitle = 'Update Advisor';
    const model = 'Advisor';

    const BASE_URL = '/students';
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

    const { id } = useParams(); // read id parameter from the url

    const {
        isLoading,
        isError,
        error,
        data: details,
        refetch,
        isSuccess
    } = useQuery({
        queryKey: [`advisor-details-${id}`],
        queryFn: () => get(`${API_CRUD}/${id}?model=Advisor`),
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
    // refetch()
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
                <Title level={2}>{details?.data?.first_name} </Title>
                <AdvisorAssignButton advisor_id={details?.data?.id} />
            </Space>
            <Card bordered={true} style={{ width: "100%" }}>
                <Space wrap style={{ display: 'flex', justifyContent: 'end' }}>
                <Button type="primary" onClick={() => onClickEdit(details?.data)} icon={<EditOutlined />} >Edit</Button>
            </Space>
                <Divider>
                    <Image width={200} src={details?.data?.profile_photo}></Image>
                </Divider>
                <Descriptions>
                    <Descriptions.Item label="First Name">{details?.data?.first_name}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">{details?.data?.last_name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{details?.data?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{details?.data?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Designation">{details?.data?.designation}</Descriptions.Item>
                    <Descriptions.Item label="Experience">{details?.data?.experience}</Descriptions.Item>
                    <Descriptions.Item label="Operating in">{details?.data?.operating_in}</Descriptions.Item>
                    <Descriptions.Item label="Families helped">{details?.data?.families_helped}</Descriptions.Item>
                    <Descriptions.Item label="Address">{details?.data?.address}</Descriptions.Item>
                    <Descriptions.Item label="Assign city">{details?.data?.assign_city}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export default AdvisorDetails;
