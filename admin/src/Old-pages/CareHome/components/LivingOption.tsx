import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Form, Modal, Row, Select, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useEffect, useState } from 'react';
import { get, post } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';

const LivingOption = ({ record,  careTypes }) => {
  const [selectedOption, setSelectedOption] = useState<any>([]);
  const [option, setOption] = useState([]);
  const [modal, setModal] = useState(false);
  const [form] = Form.useForm();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [all_amenities, setAll_amenities] = useState([]);

  const createData = useMutation(
    async (data) =>
      await post(
        `admin/care-home/set/care-type?care_id=${Number(record?.id)}`,
        data?.val,
      ),
    {
      //TODO refactor
      onSuccess: (response) => {
        message.success('Saved Successfully');
        form.resetFields();
        // onSubmitSuccess();
        setModal(false);
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
  );

  // useEffect(() => {
  //     !setOption?.length && careTypes?.data?.map(item => setOption([...option, { label: item?.name, value: item?.id }]))
  // }, [selectedOption])

  // const options = careTypes?.data?.map(item => setOption([...option, { label: item?.name, value: item?.id }]))

  const onFinish = () => {
    const values = selectedAmenities?.map((item) => {
      return {
        care_type_id: Number(item),
        care_home_id: Number(record?.id),
      };
    });
    // @ts-ignore
    createData.mutate({
      val: values,
    });
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckAll(!checkAll);
    if (e.target.checked) {
      setSelectedAmenities(all_amenities);
    } else {
      setSelectedAmenities([]);
    }
  };

  const handleCheckboxChange = (checkedValues) => {
    setSelectedAmenities(checkedValues);
  };

  useEffect(() => {
    const all_amenities = [];
    careTypes?.data?.map((item) => {
      all_amenities.push(item?.id);
    });
    setAll_amenities(all_amenities);
    if (selectedAmenities.length === all_amenities?.length) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [careTypes, selectedAmenities]);

  useEffect(() => {
    const existingCareTypeIds = record?.CareServiceOfferd?.map( item => item.care_type_id);
    setSelectedAmenities(existingCareTypeIds);
  }, [record]);

  const options = careTypes?.data?.map((i) => ({label: i.name, value: i.id}));

  return (
    <>
      <Button type="dashed" onClick={() => setModal(true)}>
        Living options
      </Button>
      <Modal
        title=""
        style={{ top: 20 }}
        open={modal}
        centered
        onOk={onFinish}
        okText="Save"
        onCancel={() => setModal(false)}
      >
        <Checkbox
          onChange={onCheckAllChange}
          checked={checkAll}
          style={{ width: '100%' }}
        >
          <p>Select all</p>
        </Checkbox>
        <Checkbox.Group
            options={options}
          style={{ width: '100%', display: 'block' }}
          value={selectedAmenities}
          onChange={handleCheckboxChange}
        >

        </Checkbox.Group>
      </Modal>
    </>
  );
};

export default LivingOption;
