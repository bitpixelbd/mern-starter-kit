/* eslint-disable */

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
import { SERVER_URL } from '~/configs';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD, API_CRUD_FIND_WHERE } from '~/services/api/endpoints';
import DrawerForm from './_DrawerForm';
import TableGrid from "./_TableGrid";
const { Title } = Typography;

const FeatureDetails = () => {
  const { id } = useParams(); // read id parameter from the url

  const { data: details, refetch } = useQuery(
    [location, "Features Data"],
    () => post(`${API_CRUD_FIND_WHERE}?model=Feature`,
      {
        "where": { "id": Number(id) }
      }),
    { enabled: !!(id), staleTime: 0 },
  );

  console.log(details?.data[0]);


  return (
    <>
      <Card bordered={true} style={{ width: "100%" }}>
        {
          details?.data[0]?.has_image &&
          <Divider>
            <Image height={200} src={details?.data[0]?.image}></Image>
          </Divider>
        }
        <Descriptions>
          <Descriptions.Item label="Id">{details?.data[0]?.id}</Descriptions.Item>
          <Descriptions.Item label="Title">{details?.data[0]?.title}</Descriptions.Item>
          <Descriptions.Item label="Type">{details?.data[0]?.type}</Descriptions.Item>
          <Descriptions.Item label="Sort Order">{details?.data[0]?.sort_order}</Descriptions.Item>
          {
            details?.data[0]?.has_button && <>
              <Descriptions.Item label="Button Class">{details?.data[0]?.button_class}</Descriptions.Item>
              <Descriptions.Item label="Button Text">{details?.data[0]?.button_text}</Descriptions.Item>
              <Descriptions.Item label="Button Url">{details?.data[0]?.button_url}</Descriptions.Item>
            </>
          }
          <Descriptions.Item label="Has Button">{details?.data[0]?.has_button ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>
          <Descriptions.Item label="Has Image">{details?.data[0]?.has_image ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>

          <Descriptions.Item label="Is Active">{details?.data[0]?.is_active ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>

          <Descriptions.Item label="Description">
            <div dangerouslySetInnerHTML={{__html: details?.data[0]?.description}}>
            </div>
          </Descriptions.Item>

        </Descriptions>

      </Card>
    </>
  );
};

export default FeatureDetails;
