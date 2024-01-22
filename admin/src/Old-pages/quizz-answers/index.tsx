/* eslint-disable */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Collapse, CollapseProps, Descriptions, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { getHeader } from "~/utility/helmet";
import { useQuery } from "@tanstack/react-query";
import { post } from "~/services/api/api";
import { API_CRUD_FIND_WHERE } from "~/services/api/endpoints";
import { useParams } from "react-router-dom";

const { Title } = Typography;

const model = 'QuizzAnswers';
const title = 'Quizz answers';

const { Panel } = Collapse;
const QuizzAnswers = ({role}) => {

    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [trigger, setTrigger] = useState(0);
    const { id } = useParams();



    // const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => get(getUrlForModel(model)), { staleTime: 0 });
    const { isLoading, isError, error, isSuccess, data: fetchData, refetch } = useQuery([`Referral list`], () => post(`${API_CRUD_FIND_WHERE}?model=QuizzAnswers`, {
        where: { [role === "user" ? "user_id" : "partner_id"]: Number(id) },
    }), { staleTime: 0 });

    console.log("quizz answesrs ===>>>", fetchData?.data)

    return (
        <>
            {/* {getHeader(title)} */}
            <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={2}>{title}</Title>
            </Space>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <Collapse>
                        {
                            fetchData?.data?.map((item, index) => {
                                return (
                                    <>
                                        <Panel header={`Quizz No : ${index + 1}`} key={index}>
                                            <p>Quizz : </p>
                                            <Card bordered={true} style={{ width: '100%' }}>
                                                <Descriptions>
                                                    <Descriptions.Item label="Care Recipient">
                                                        {item?.care_recipient === "myself" ? "Myself" : item?.care_recipient === "parents" ? "My parents" : "Someone else"}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Living options">
                                                        {item?.living_options === "independent_living" ? "Independent Living (No assistance required of any kind)" : item?.living_options === "assisted_living" ? "Assisted Living (Need assistance for Activities of Daily Living)" : "Memory Care (Specialized care for cognitive decline)"}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Timeline">
                                                        {item?.timeline === "1_3" ? "Within 1-3 months" : item?.living_options === "3_6" ? "Next 3-6 months" : "I’m not sure (Planning Ahead)"}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Budget">
                                                        {item?.budget === "below_2" ? "Less than $2k" : item?.budget === "2_5" ? "$2K - $5k" : "$5K+"}
                                                        {/* {item?.budget === "below_2" ? "Less than $2k" : item?.budget === "" : ""} */}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Memory care">
                                                        {item?.memory_care}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Senior care services">
                                                        {item?.senior_care_services}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Amenities">
                                                        {item?.amenities}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Location" style={{textTransform:"capitalize"}}>
                                                        {item?.location}
                                                    </Descriptions.Item>
                                                </Descriptions>
                                            </Card>
                                        </Panel>
                                    </>
                                )
                            })
                        }
                    </Collapse>
                </Col>
            </Row>

        </>
    )
};

export default QuizzAnswers
