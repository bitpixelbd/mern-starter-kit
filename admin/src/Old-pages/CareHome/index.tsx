/* eslint-disable */
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import { getHeader } from '~/utility/helmet';
import DrawerForm from './_DrawerForm';
import DrawerFormRegister from './_DrawerFormImportFile';
import TableGrid from './_TableGrid';

const { Title } = Typography;

const model = 'CareHome';
const title = 'Organizations';
const drawerTitle = 'Add Organization';
const drawerUpdateTitle = 'Update Organization'

const TeacherList = () => {
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [openRegister, setOpenRegister] = useState(false);
  const [editedItemRegister, setEditedItemRegister] = useState(null);
  const [isEditingRegister, setIsEditingRegister] = useState(false);
  const [triggerRegister, setTriggerRegister] = useState(0);

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
  };

  const onSubmitSuccess = (isEditing: boolean) => {
    setTrigger((trigger) => trigger + 1);
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    }
  };

  const showDrawerRegister = () => {
    setOpenRegister(true);
    setIsEditingRegister(false);
    setEditedItemRegister(null);
  };

  const onCloseRegister = () => {
    setOpenRegister(false);
  };

  const onClickEditRegister = (record: any) => {
    setIsEditingRegister(true);
    setEditedItemRegister(record);
    setOpenRegister(true);
  };

  const onSubmitSuccessRegister = (isEditing: boolean) => {
    setTrigger((trigger) => trigger + 1);
    if (isEditing) {
      setOpenRegister(false);
      setIsEditingRegister(false);
      setEditedItemRegister(null);
    } else {
      setOpenRegister(false);
      setIsEditingRegister(false);
      setEditedItemRegister(null);
    }
  };

  return (
    <>
      {getHeader(title)}
      <DrawerForm
        title={drawerTitle}
        drawerUpdateTitle={drawerUpdateTitle}
        onClose={onClose}
        open={open}
        model={model}
        isEditing={isEditing}
        editedItem={editedItem}
        onSubmitSuccess={onSubmitSuccess}
      />


      <DrawerFormRegister
        title={drawerTitle}
        drawerUpdateTitle={drawerUpdateTitle}
        onClose={onCloseRegister}
        open={openRegister}
        model={model}
        isEditing={isEditingRegister}
        editedItem={editedItemRegister}
        onSubmitSuccess={onSubmitSuccessRegister}
      />
      {/* This Button shows the drawer for adding fields */}
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Organizations</Title>
        <Space wrap>
          <Button type="primary" icon={<DownloadOutlined />} onClick={showDrawerRegister}>
            Import
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
            Add New
          </Button>
        </Space>
      </Space>

      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <TableGrid
            trigger={trigger}
            model={model}
            onClickEdit={onClickEdit}
            onSubmitSuccess={onSubmitSuccess}
          />
        </Col>
      </Row>
    </>
  );
};

export default TeacherList;
