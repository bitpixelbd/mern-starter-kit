/* eslint-disable */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, Popconfirm, Space, Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { BorderRadius } from "tabler-icons-react";
import { deleteApi, get, post } from "~/services/api/api";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";
import CitiesModal from "./CitiesModal";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;

    const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => get(getUrlForModel("CareTypes")), { staleTime: 0 });

    const {  data: allCities } = useQuery(["Get cities for care-type"], () => get(getUrlForModel("City")), { staleTime: 0 });
    // console.log(cities?.data);
    const [editedItem, setEditedItem] = useState(null)


    useEffect(() => {
        if (trigger) {
            refetch();
        }
    }, [trigger]);


    const deleteMutation = useMutation(async (id: any) => await deleteApi(getUrlForModel(model, id)), {
        onSuccess: () => {
            message.success('Deleted Successfully');
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
    }

    const getCities = (citiesIds)=>{
        console.log(citiesIds);
        return <>{citiesIds}</>
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Slug',
            dataIndex: 'slug'
        },
        {
            title: 'Icon',
            render: (record: any) => {
                return <Image src={record?.icon} height={50} />
            },
        },
        {
            title: 'Description',
            dataIndex: 'desc'
        },
        {
            title: 'Cities',
            render:(record: any)=>{
                const arr = []
                const cities = record?.cities?.split(',')
                cities && cities?.map(item=>{
                    if(item !== ""){
                        arr.push(Number(item))
                    }
                })
               return <CitiesModal allCities={allCities} careTypeId={record?.id} avaiableCities={arr && arr}  />
            }
        },
        {
            title: 'Colors',
            render: (record: any) => {
                return <>
                        <div style={{backgroundColor:`${record?.bg_color ? record?.bg_color : "#edfbff"}`, height:"60px", width:"60px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <span style={{color:`${record?.text_color ? record?.text_color : "#00a0d1"}`,  fontWeight:"600"}}>{record?.text_color ? record?.text_color : "#00a0d1"}</span>
                        </div>
                    </>
            },
        },
        {
            title: 'Actions',
            render: (record: any) => {
                return <Space>
                    <Button onClick={() => onClickEdit(record)} type={'link'}><EditOutlined /></Button>
                    <Popconfirm
                        title="Delete this item?"
                        description="This action cannot be undone"
                        onConfirm={() => handleDeleteClient(record.id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type={'link'}><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>
            },
        }
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <Table
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={fetchData?.data} />
    );
}


const Cities = (cityIds) => {
//   const {
//     isError,
//     error,
//     isLoading,
//     isSuccess,
//     data: cities,
//   } = useQuery({
//     queryKey: ["jksahdfkjash fkljnmasfdhlaisufhaskmnfdaslj","saldfjaskldfasklfj"],
//     queryFn: () =>post(`crud/find-where?model=City`, {
//         where: { id: { in: cityIds} },
//       }),
//   });
// const [cities,setCities]=useState([])
    let cities = []
    const getCitties =  useMutation(
        async (data) => await post("crud/find-where?model=City", {
            where:{
                id:{in:data}
            }
        }),
    {
      onSuccess: (response) => {
        const datas = response?.data
        for (let i of datas ) {
            return <p>dfasdf</p>
        }
      },
      onError: () => {
        message.error('Something went wrong');
      },
    },
     )
//   const items = cities?.data?.map((city, index) => {
//     return {
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//           {city?.name}
//         </a>
//       ),
//       key: index,
//     };
//   });
// console.log({cities});

// if(cityIds?.length){
    getCitties.mutate(cityIds)
// }

// cities && cities?.map(item=> {return(<p>{item?.name}</p>)})

//   return (
//     <>
      {/* <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Cities
            <DownOutlined />
          </Space>
        </a>
      </Dropdown> */}

      {/* {cities && cities?.data?.map((city) => <span key={city?.id}>{city?.name}</span>)} */}
    // </>
//   );
};