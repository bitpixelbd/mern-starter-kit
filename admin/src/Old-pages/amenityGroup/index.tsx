/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button, Col, Radio, RadioChangeEvent, Row, Space, Tabs, Typography } from "antd";
import DrawerForm from "./_DrawerForm";
import { PlusOutlined } from "@ant-design/icons";
import TableGrid from "./_TableGrid";
import { getHeader } from "~/utility/helmet";
import { TabsPosition } from "antd/es/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get, post } from "~/services/api/api";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";
import AmenityContent from "~/components/amenity-group/AmenityContent";

const { Title } = Typography;

const model = 'Subject';
const title = 'Subjects';
const drawerTitle = 'Add Subject';

const Medicine = () => {

    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [trigger, setTrigger] = useState(0);


    const showDrawer = () => {
        setOpen(true);
        setIsEditing(false);
        setEditedItem(null);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onClickEdit = (record: any) => {
        setIsEditing(true);
        setEditedItem(record);
        setOpen(true);
    }

    const onSubmitSuccess = (isEditing: boolean) => {
        setTrigger(trigger => trigger + 1)
        if (isEditing) {
            setOpen(false);
            setIsEditing(false);
            setEditedItem(null);
        } else {
            setOpen(false);
            setIsEditing(false);
            setEditedItem(null);
        }
    }
    const [tabPosition, setTabPosition] = useState<TabsPosition>('left');

    const changeTabPosition = (e: RadioChangeEvent) => {
        setTabPosition(e.target.value);
    };

    const { isLoading, isError, error, isSuccess, data: amenityGroup, refetch } = useQuery([`AmenityGroup`], () => post(`${API_CRUD_FIND_WHERE}?model=AmenityGroup`, {
        "include": {
            Amenity: true,
        }
    }), { staleTime: 0 });

    useEffect(() => {
        if (trigger) {
            refetch();
        }
    }, [trigger]);

    return (
        <>
            {getHeader(title)}
            <DrawerForm
                title={"Add Amenity Group"}
                onClose={onClose}
                open={open}
                model={model}
                isEditing={isEditing}
                editedItem={editedItem}
                onSubmitSuccess={onSubmitSuccess}
            />
            <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={2}>Amenity Group</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>Add group</Button>
            </Space>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <TableGrid
                        trigger={trigger}
                        model={model}
                        onClickEdit={onClickEdit}
                    />
                </Col>
            </Row>
            {/* <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <>
                        <Tabs
                            tabPosition={tabPosition}
                            items={amenityGroup?.data?.map((item) => {
                                return {
                                    label: `${item?.name}`,
                                    key: item?.id,
                                    children: <AmenityContent group={item} />,
                                };
                            })}
                        />
                    </>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer} style={{marginLeft:"20px"}}>Add New Group</Button>
                </Col>
            </Row> */}

        </>
    )
};

export default Medicine
