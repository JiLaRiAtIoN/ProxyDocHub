import { DatePicker, Button, Space, Table, Select } from "antd"; 
import React, { useEffect, useRef, useState } from "react"; 
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { useParams } from "react-router"; 
import StudBodyService from "../../../api/services/stud-body-service"; 
import StudHeadersService from "../../../api/services/stud-header-service"; 
import OrganizationService from "../../../api/services/organization-service";
import VoditelService from "../../../api/services/voditel-service"; 
import { StudBodiesDialog } from "../../../components/dialogs/stud-bodies-dialog/StudBodiesDialog"; 
import { useReactToPrint } from "react-to-print"; 
import dayjs from 'dayjs';

const { Option } = Select; 

export const StudView = ({ 
 onOk, 
 onClick, 
 ...props 

}) => { 
 const columns = [ 
  { 
   title: 'Код', 
   dataIndex: 'id', 
   key: 'id', 
  }, 
  { 
   title: 'Время выезда с остановки', 
   dataIndex: 'startTime', 
   key: 'startTime',
  }, 
  { 
   title: 'Время прибытия на остановку', 
   dataIndex: 'endTime', 
   key: 'endTime',
  }, 
  { 
    title: 'Пробег', 
    dataIndex: 'probeg', 
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

 
 const componentRef = useRef(); 
 const handlePrint = useReactToPrint({ 
  content: () => componentRef.current, 
 }); 
 const { id } = useParams(); 
 const [stud, setStud] = useState(null); 
 const [list, setList] = useState([]);
 const [organizations, setOrganizations] = useState([]); 
 const [voditels, setVoditels] = useState([]); 
 const [currentRecord, setCurrentRecord] = useState(null); 
 const [visible, setVisible] = useState(false); 

 
 useEffect( () => { 
  async function fetchData() { 

   const list = await StudBodyService.getAllHeadersRecords(id);
   const organizations = await OrganizationService.getAllRecords(); 
   const voditels = await VoditelService.getAllRecords(); 
   const stud = await StudHeadersService.getOneRecord(id);
   console.log(stud)
 
   setList(list); 
   setStud(stud); 

   setOrganizations(organizations); 
   setVoditels(voditels); 

 
   return () => { 
    setList([]); 
    setStud(null); 


    setOrganizations([]); 
    setVoditels([]); 
  }; 
  } 
  fetchData(); 
 }, [id]); 



 const createRecordHandler = () => { 
  setCurrentRecord(null) 
  setVisible(true); 
 } 
 const updateRecordHandler = (record) => { 
  setCurrentRecord(record) 
  setVisible(true) 
 } 
 const deleteRecordHandler = async (recordId) => { 
  await StudBodyService.removeRecord(recordId); 
  setList(list.filter(it => it.id !== recordId)); 
 } 

 
 return ( 
  <div style={{ padding: 16 }}> 
   <div ref={componentRef}> 

 
    <Space 
     direction={'vertical'} 
     align={'center'} 
     style={{ width: '100%', marginBottom: 24 }} 
    > 
     <h2>Документ № <strong>{stud?.number}</strong></h2> 
     
    <Space 
    >Дата  
     <DatePicker 
      format="DD.MM.YYYY" 
      value={dayjs(stud?.date1, 'YYYY-MM-DD') || null} 
      onChange={date => setStud({ ...stud, date1: date },StudHeadersService.updateRecord({ 
       ...stud, date1: date 
      })) 
      } 
      style={{ width: 232}} 
      allowClear={false} 
     /> 
     </Space>  

 
     <Space>Организация: <strong> 
      <Select 
       value={stud?.organizationId || null} 
       onChange={value => setStud({ ...stud, organizationId: value },StudHeadersService.updateRecord({ 
        ...stud, organizationId: value 
       })) 
       } 
       placeholder={"Выберите организацию"} 
       style={{ width: 425 }} 
      > 
      {organizations.map(it => <Option 
       value={it.id}> 
       {it.title} 
      </Option>)} 
      </Select> 
     </strong></Space> 

 
     <Space>Водитель: <strong> 
     <Select 
       value={stud?.voditelId || null} 
       onChange={value => setStud({ ...stud, voditelId: value },StudHeadersService.updateRecord({ 
        ...stud, voditelId: value 
       })) 
       } 
       placeholder={"Выберите водителя"} 
       style={{ width: 425 }} 
       > 
       {voditels.map(it => <Option 
        value={it.id}> 
        {it.lastName} {it.firstName} {it.patronymic} 
       </Option>)} 
      </Select> 
      </strong></Space>
      <Space>
        <h3>Марка машины <strong>{stud?.marka}</strong></h3>
      </Space>
      <Space>
        <h4>Маршрут № <strong>{stud?.marshrut}</strong></h4>
      </Space>
      
    </Space> 

 
    <Table dataSource={list} columns={columns} /> 
   </div> 

 
   <Space> 
    <Button onClick={createRecordHandler}> 
     Создать 
    </Button> 
    <Button type="dashed" onClick={handlePrint}> 
     Печать 
    </Button> 
   </Space> 

 
   <StudBodiesDialog 
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
    studHeaderId={id} 
   /> 
  </div> 
 ) 

}  