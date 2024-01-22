/* eslint-disable */

import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
  message
} from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DrawerFormAmenityOfferd from "~/components/teacher/amenity_offerd/_DrawerForm";
import AmenityOfferdTableGrid from '~/components/teacher/amenity_offerd/_TableGrid';
import DrawerFormExamBoard from "~/components/teacher/exam_board/_DrawerForm";
import ExamBoardTableGrid from '~/components/teacher/exam_board/_TableGrid';
import { SERVER_URL } from '~/configs';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD, API_CRUD_FIND_WHERE } from '~/services/api/endpoints';
import DrawerForm from "./_DrawerForm";
const { Title } = Typography;

import DrawerFormQualifications from "~/components/teacher/qualifications/_DrawerForm";
import QualificationsTableGrid from '~/components/teacher/qualifications/_TableGrid';


import Attachment from '~/components/care-home/Attachments';
import AvailableAmenity from '~/components/care-home/AvailableAmenity';
import CareServiceOfferd from '~/components/care-home/CareServiceOfferd';
import Reviews from '~/components/care-home/Reviews';
import RoomTypeOfferd from '~/components/care-home/RoomTypeOfferd';
import DrawerFormReview from "~/components/teacher/review/_DrawerForm";
import ReviewTableGrid from '~/components/teacher/review/_TableGrid';

const TeacherDetails = () => {
  const drawerTitle = 'Update care home';

  const model = 'CareHome';
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [openAvailableAmenity, setOpenAvailableAmenity] = useState(false);
  const [editedItemAvailableAmenity, setEditedItemAvailableAmenity] = useState(null);
  const [isEditingAvailableAmenity, setIsEditingAvailableAmenity] = useState(false);
  const [triggerAvailableAmenity, setTriggerAvailableAmenity] = useState(0);

  const [openExamBoard, setOpenExamBoard] = useState(false);
  const [editedItemExamBoard, setEditedItemExamBoard] = useState(null);
  const [isEditingExamBoard, setIsEditingExamBoard] = useState(false);
  const [triggerExamBoard, setTriggerExamBoard] = useState(0);

  const [openQualifications, setOpenQualifications] = useState(false);
  const [editedItemQualifications, setEditedItemQualifications] = useState(null);
  const [isEditingQualifications, setIsEditingQualifications] = useState(false);
  const [triggerQualifications, setTriggerQualifications] = useState(0);


  const [openReview, setOpenReview] = useState(false);
  const [editedItemReview, setEditedItemReview] = useState(null);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [triggerReview, setTriggerReview] = useState(0);

  const BASE_URL = '/care-homes';
  const navigate = useNavigate();

  const { id } = useParams(); // read id parameter from the url

  const { isLoading, isError, error, isSuccess, data: details, refetch } = useQuery([`care-Home-details-${id}`], () => post(`${API_CRUD_FIND_WHERE}?model=CareHome`, {
    "where": {
      "id": Number(id)
    },
    "include": {
      City: true,
      AvailableAmenities: true
    }
  }), { staleTime: 0 });



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



  // console.log(details?.data[0]);



  const available_amenities = details?.data[0]?.AvailableAmenities?.map(i => i?.amenity_id)

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
        <Title level={2}>Organization details</Title>
        <Button type="primary" onClick={() => onClickEdit(details?.data[0])} icon={<EditOutlined />} >Edit</Button>
      </Space>
      <Space direction="vertical" size={16}>

        <Card bordered={true} style={{ width: "100%" }}>
          <Divider>
            <Image height={200} src={details?.data[0]?.logo}></Image>
          </Divider>
          <Descriptions>
            <Descriptions.Item label="Name">{details?.data[0]?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{details?.data[0]?.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{details?.data[0]?.phone}</Descriptions.Item>
            <Descriptions.Item label="Post code">{details?.data[0]?.post_code}</Descriptions.Item>
            <Descriptions.Item label="Street">{details?.data[0]?.street}</Descriptions.Item>
            <Descriptions.Item label="State">{details?.data[0]?.state}</Descriptions.Item>
            <Descriptions.Item label="City">{details?.data[0]?.City?.name}</Descriptions.Item>
            <Descriptions.Item label="Longitude">{details?.data[0]?.lon}</Descriptions.Item>
            <Descriptions.Item label="Latitude">{details?.data[0]?.lat}</Descriptions.Item>
            <Descriptions.Item label="Address">{details?.data[0]?.address}</Descriptions.Item>
            <Descriptions.Item label="Price start">$ {details?.data[0]?.price_start}</Descriptions.Item>
            <Descriptions.Item label="Price end">$ {details?.data[0]?.price_end}</Descriptions.Item>
            <Descriptions.Item label="Slug">{details?.data[0]?.slug}</Descriptions.Item>
            <Descriptions.Item label="Ratting">{details?.data[0]?.ratting_value}</Descriptions.Item>
            <Descriptions.Item label="Is Verified">
            {
              details?.data[0]?.is_verified ? <Tag color="green">Yes</Tag> : <Tag color="orange">No</Tag>
            }
            </Descriptions.Item>
            <Descriptions.Item label="Community Size">{details?.data[0]?.community_size}</Descriptions.Item>
            <Descriptions.Item label="City Id">{details?.data[0]?.city_id}</Descriptions.Item>
            <Descriptions.Item label="Short description">{details?.data[0]?.short_desc}</Descriptions.Item>
            <br />
            <br />
            <Descriptions.Item span={3} label="Description">{details?.data[0]?.desc}</Descriptions.Item>
            {/* <Divider> */}
            <Descriptions.Item label="">
              <Space wrap>
                <Button type="link" href={details?.data[0]?.website} target='_blank' >Website</Button>
                <Button type="link" href={details?.data[0]?.facebook} target='_blank' >Facebook</Button>
                <Button type="link" href={details?.data[0]?.instagram} target='_blank' >Instagram</Button>
                <Button type="link" href={details?.data[0]?.linkedin} target='_blank' >Linkedin</Button>
              </Space>
            </Descriptions.Item>
            {/* </Divider> */}
          </Descriptions>
        </Card>

        <Card>
          <Title level={3} >Amenities</Title>
          <AvailableAmenity available_amenities={available_amenities} />
        </Card>


        <Card style={{width:"100%"}}>
          <Title level={3} >Care service offerd</Title>
          <CareServiceOfferd />
        </Card>

        <Card style={{width:"100% !important"}}>
          <Title level={3} >Room type offerd</Title>
          <RoomTypeOfferd />
        </Card>
        <Card>
          <Title level={3} >Attachment</Title>
          <Attachment />
        </Card>
        <Card>
          <Reviews/>
        </Card>
      </Space>

    </>
  );
};

export default TeacherDetails;
