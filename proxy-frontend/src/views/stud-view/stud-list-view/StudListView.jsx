import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import OrganizationService from "../../../api/services/organization-service";
import StudHeadersService from "../../../api/services/stud-header-service";
import VoditelService from "../../../api/services/voditel-service";
import { StudHeadersDialog } from "../../../components/dialogs/stud-headers-dialog/StudHeadersDialog";


export const StudListView = ({
    ...props
}) => {
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Номер',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Дата',
            dataIndex: 'date1',
            key: 'date1',
        },
        {
            title: 'Водитель',
            voditelId: 'voditelId',
            render: (text, record) => voditels.find(it => it.id === record.voditelId)?.lastName,
        },
        {
            title: 'Организация',
            organizationId: 'organizationId',
            render: (text, record) => organizations.find(it => it.id === record.organizationId)?.title,
        },
        {
            title: 'Марка',
            dataIndex: 'marka',
            key: 'marka',
        },
        {
            title: 'Маршрут',
            dataIndex: 'marshrut',
            key: 'marshrut',
        },
        
        {
            title: 'Действия',
            key: 'actions',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <div onClick={() => updateRecordHandler(record)}>
                            <EditOutlined />
                        </div>
                        <div onClick={() => deleteRecordHandler(record.id)}>
                            <DeleteOutlined />
                        </div>
                    </Space>
                )
            }
        }
    ];

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    const [organizations, setOrganizations] = useState([]);
    const [voditels, setVoditels] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const voditels = await VoditelService.getAllRecords();
          const organizations = await OrganizationService.getAllRecords();
          const list = await StudHeadersService.getAllRecords();   //CAS
          setVoditels(voditels);
          setOrganizations(organizations);
          setList(list);
        } catch (res) {
          // Обработка ошибок, например, вывод сообщения об ошибке или запись в лог
          alert("Произошла ошибка:", res);
        }
      };
    
      fetchData();
    
      // Уберите return, так как он не требуется в данном случае
    }, []);
    console.log(list);

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async (recordId) => {
        await StudHeadersService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{ padding: 16 }}>
    <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => ({
            onDoubleClick: event => {
                navigate(`/stud/${record.id}`);
            },
        })}
    />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <StudHeadersDialog
                visible={visible}
                onOk={(record) => {
                    currentRecord
                        ? setList(list.map(it => it.id === currentRecord.id
                            ? { ...record }
                            : it))
                        : setList([...list, record]);

                    setCurrentRecord(null);
                    setVisible(false);
                }}
                onCancel={() => setVisible(false)}
                currentRecord={currentRecord}
                voditels={voditels}
                organizations={organizations}
                
            />
        </div>
    )
}