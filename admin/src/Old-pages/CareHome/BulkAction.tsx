import { Button, Dropdown, MenuProps, Popconfirm, Popover } from 'antd';
import React, { useState } from 'react';

function BulkAction({ open, toggleOpen, selectedRows, selectAll, onAction }) {
  const hide = () => {
    toggleOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    // toggleOpen(newOpen);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Popconfirm
          title="Delete this item?"
          description="This action cannot be undone"
          onConfirm={() => onAction({ actionType: 'delete' })}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type={'link'}>
            Delete All
          </Button>
        </Popconfirm>
      ),
    },
    {
      key: '2',
      label: (
        <Button onClick={() => onAction({ actionType: 'publish' })} type="ghost">
          Publish All
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button onClick={() => onAction({ actionType: 'unpublish' })} type="ghost">
          Unpublish All
        </Button>
      ),
    },
    {
      key: '4',
      label: (
        <Button onClick={() => onAction({ actionType: 'verified' })} type="ghost">
          Verified
        </Button>
      ),
    },
    {
      key: '5',
      label: (
        <Button onClick={() => onAction({ actionType: 'unverified' })} type="ghost">
          Unverified
        </Button>
      ),
    },
  ];

  const popOverContent = (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div>
        <span>{selectedRows?.length} items are selected.</span>
        {/* <Button onClick={() => selectAll({ action: 'select' })}>Select All</Button> */}
      </div>
      <div>
        <Button
          style={{ marginRight: '20px' }}
          onClick={() => selectAll({ action: 'deselect' })}
        >
          Clear All
        </Button>
        <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
          <Button>Action</Button>
        </Dropdown>
      </div>
    </div>
  );

  //   console.log('selectedRows', selectedRows, open);

  return (
    <div>
      <Popover
        placement="topLeft"
        content={popOverContent}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        overlayStyle={{ width: '84%' }}
      ></Popover>
    </div>
  );
}

export default BulkAction;
