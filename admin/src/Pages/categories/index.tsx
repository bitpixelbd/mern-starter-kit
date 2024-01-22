/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './style.categories.css';

import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Tree, Typography } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import { useState } from 'react';

import { deleteApi, get } from '~/services/api/api';
import { getUrlForModel } from '~/services/api/endpoints';

import DrawerForm from './_DrawerForm';

const { DirectoryTree } = Tree;
const { Title } = Typography;




// const treeData: DataNode[] = [
//     {
//         title: (<div className='category' >
//             <p>This is Title </p>
//             <Button onClick={() => console.log('tittt')}> <FormOutlined /> Edit Button</Button>
//         </div>),
//         key: '0-0',
//         // draggable: editButton,
//         children: [
//             { title: 'leaf 0-0', key: '0-0-0', isLeaf: false, selectable: false, children: [{ title: 'title', key: '0-asdfsdfasf-0', isLeaf: true }] },
//             { title: 'leaf 0-1', key: '0-0-6', isLeaf: true },
//             { title: 'leaf 0-1', key: '0-0-17', isLeaf: true },
//             { title: 'leaf 0-1', key: '0-0-e', isLeaf: true },
//         ],
//     },
//     {
//         title: 'parent 1',
//         key: '0-1',
//         children: [
//             { title: 'leaf 1-0', key: '0-1-0', isLeaf: true, checkable: true },
//             { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
//         ],
//     },
// ];


const drawerTitle = 'Add New Category'
const model = 'ProductCategory'


const index = () => {


    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [trigger, setTrigger] = useState(0);


    const { isLoading, isError, error, data: categoryData, refetch } = useQuery(
        {
            queryKey: ["categories"],
            queryFn: () => get(getUrlForModel(model)),
            staleTime: 0
        }
    );



    const showDrawer = () => {
        setOpen(true);
        setIsEditing(false);
        setEditedItem(null);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onClickEdit = (category: any) => {
        setIsEditing(true);
        setEditedItem(category);
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


    const deleteMutation = useMutation(
        {
            mutationFn: async (id: any) => await deleteApi(getUrlForModel(model, id)),
            onSuccess: () => {
                message.success('Deleted Successfully');
                refetch()
            },
            onError: () => {
                message.error('Something went wrong');
            }
        }
    );

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
        refetch()
    }



    const convertToNestedTree = (categories, parentId = null, depth = 1) => {
        const result = [];

        if (categories) {
            for (const category of categories) {
                if (category.parent_id === parentId) {
                    const child = {
                        key: category.id,
                        title: (
                            <div className="category">
                                <p>{category.name}</p>
                                <Button type="primary"
                                    icon={<FormOutlined />} size='small' onClick={() => onClickEdit(category)} />
                                <Button danger size='small'
                                    icon={<DeleteOutlined />} onClick={() => handleDeleteClient(category.id)} />
                            </div>
                        ),
                        image: category.image,
                        isLeaf: depth >= 3 ? true : false,
                        children: [],
                    };

                    if (depth < 3) {
                        const grandchildren = convertToNestedTree(categories, category.id, depth + 1);
                        if (grandchildren.length > 0) {
                            child.children = grandchildren;
                        }
                    }

                    result.push(child);
                }
            }
        }

        return result;
    }



    const categoriesForTree = convertToNestedTree(categoryData?.data)

    return (
        <>
            <div className='category-header'>
                <Title level={2}>Categories</Title>
                <Button type='primary' onClick={showDrawer}>Add New Category</Button>
            </div>

            <Tree
                defaultExpandedKeys={['0-0-0']}
                treeData={categoriesForTree}
                showLine
            />
            <DrawerForm
                title={drawerTitle}
                onClose={onClose}
                open={open}
                model={model}
                isEditing={isEditing}
                editedItem={editedItem}
                onSubmitSuccess={onSubmitSuccess}
            />
        </>
    );
};

export default index;
