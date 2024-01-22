import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Col, List, message, Modal, Radio, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { patch } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';

const CitiesModal = ({ allCities, careTypeId, avaiableCities }) => {
  // console.log({ avaiableCities });
  const model = 'CareTypes';
  const [open, setOpen] = useState(false);
  const [selectedCitites, setSelectedCities] = useState(avaiableCities);
  const allCity = allCities?.data;

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const updateData = useMutation(
    async (data: any) => await patch(getUrlForModel(model, data.id), data),
    {
      onSuccess: (response) => {
        message.success('Updated Successfully');
        setOpen(false);
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
  );

  const getSelectedCities = (value) => {
    setSelectedCities(value);
  };

  const handelCityUpdate = () => {
    const citiesString = selectedCitites?.toString(',');
    updateData.mutate({
      id: careTypeId,
      cities: citiesString,
    });
  };

  const defaultCitties = selectedCitites?.map((item) => {
    const value = allCity?.find((i) => i?.id === item);
    return value;
  });

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Cities
      </Button>
      <Modal
        title="Edit Cities"
        open={open}
        onOk={handelCityUpdate}
        onCancel={hideModal}
        okText="Save"
        cancelText="Cancel"
        centered={true}
      >
        {/* TODO INLINE CSS USED */}
        <div style={{ marginBottom: '10px' }}>
          {defaultCitties?.map((item) => (
            <Button
              type="disable"
              key={item?.id}
              style={{ margin: '2px', borderRadius: '5px' }}
            >
              {item?.name}
            </Button>
          ))}
        </div>
        <Select
          mode="multiple"
          placeholder="Select one or more options"
          style={{ width: '100%' }}
          onChange={getSelectedCities}
          defaultValue={avaiableCities}
        >
          {allCity?.map((item) => {
            return (
              <Select.Option key={item?.id} value={item?.id}>
                {item?.name}
              </Select.Option>
            );
          })}
        </Select>
      </Modal>
    </>
  );
};

export default CitiesModal;
