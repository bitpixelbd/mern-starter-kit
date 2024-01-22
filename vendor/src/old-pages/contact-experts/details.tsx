import { useQuery } from '@tanstack/react-query'
import { Card, Descriptions, Divider, Image, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useParams } from 'react-router-dom'
import { get } from '~/services/api/api'
import { getUrlForModel } from '~/services/api/endpoints'

export default function ContactExpertsDetails() {
    const { id } = useParams()

    const { isError, error, isLoading, isSuccess, data: details } = useQuery({
        queryKey: [`ContactExpert - ${id}`],
        queryFn: () => get(getUrlForModel("ContactExpert", id))
    })

    return (
        <>
            <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={2}>{details?.data?.first_name} </Title>
                {/* <Button type="p rimary" onClick={() => onClickEdit(details?.data)} icon={<EditOutlined />} >Edit</Button> */}
            </Space>
            <Card bordered={true} style={{ width: "100%" }}>
                <Descriptions>
                    <Descriptions.Item label="First Name">{details?.data?.first_name}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">{details?.data?.last_name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{details?.data?.email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{details?.data?.phone}</Descriptions.Item>

                    <Descriptions.Item label="Care Recipient">{details?.data?.care_recipient}</Descriptions.Item>
                    <Descriptions.Item label="Living options">{details?.data?.living_options}</Descriptions.Item>
                    <Descriptions.Item label="Timeline">{details?.data?.timeline}</Descriptions.Item>
                    <Descriptions.Item label="Budget">{details?.data?.budget}</Descriptions.Item>
                    <Descriptions.Item label="Financial resources">{details?.data?.financial_resources}</Descriptions.Item>
                    <Descriptions.Item label="City/Post code">{details?.data?.city_or_post_code}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    )
}
