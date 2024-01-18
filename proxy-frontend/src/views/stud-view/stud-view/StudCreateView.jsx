import { DatePicker, Button, Space, Table, Select, Input } from "antd"; 
import React, { useEffect, useRef, useState } from "react"; 
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { useParams } from "react-router"; 
import { useNavigate } from "react-router-dom"; 
import StudBodyService from "../../../api/services/stud-body-service"; 
import StudHeadersService from "../../../api/services/stud-header-service"; 
import OrganizationService from "../../../api/services/organization-service";
import VoditelService from "../../../api/services/voditel-service"; 
import { StudBodiesCreateDialog } from "../../../components/dialogs/stud-bodies-dialog/StudBodiesCreateDialog"; 
import moment from "moment"; 
import dayjs from 'dayjs';

const { Option } = Select; 

export const StudCreateView = ({ 
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

 
 const navigate = useNavigate(); 
 const { id } = useParams(); 
 const [studHeader, setStudHeader] = useState({date1: moment(new Date())}) 
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

 
    setList(list); 

    setOrganizations(organizations); 
    setVoditels(voditels);

 
    return () => { 
      setList([]); 


      setOrganizations([]); 
      setVoditels([]);
    }; 
   } 
   fetchData(); 
 }, [id]); 

 
 const createRecordHandler = () => { 
   setCurrentRecord(null); 
   setVisible(true); 
 } 
 const updateRecordHandler = (record) => { 
   setCurrentRecord(record); 
   setVisible(true); 
 } 
 const deleteRecordHandler = async (recordId) => { 
   setList(list.filter(it => it.id !== recordId)); 
 } 

 
 const saveHeader = async () => { 
   await StudHeadersService.createRecord(studHeader); 
 } 

 
 const saveBody = async (id) => { 
   list.forEach( async (record) => { 
    record['studHeaderId'] = id; 
    delete record.id; 
    await StudBodyService.createRecord(record); 
   }); 
 } 

 
 const saveRecordHandler = async () => { 
   await saveHeader(); 
   const allRecords = await StudHeadersService.getAllRecords(); 
   const id = allRecords.at(-1)['id']; 
   saveBody(id); 
   navigate('/'); 
 } 

 
 return ( 
   <div style={{ padding: 16 }}> 
    <div ref={componentRef}> 

 
      <Space 
       direction={'vertical'} 
       align={'center'} 
       style={{ width: '100%', marginBottom: 24 }} 
      > 
       <h2> 
         <label>Документ № 
          <Input  
            onChange={e => setStudHeader({ ...studHeader, number: +e.target.value})} 
            placeholder="№" 
            style={{ width: "65px", fontWeight: "bold", fontSize: "14pt", marginLeft: 10 }} 
          /> 
         </label> 
       </h2> 
       
      <Space 
      >Дата
       <DatePicker 
         format="DD.MM.YYYY" 
         value={dayjs(studHeader?.date1, 'YYYY-MM-DD') || new Date()} 
         onChange={date => setStudHeader({ ...studHeader, date1: date })} 
         style={{ width: 232}} 
         allowClear={false} 
       /> 
       </Space>  

 
       <Space>Организация: <strong> 
         <Select 
          value={studHeader?.organizationId || null} 
          onChange={value => setStudHeader({ ...studHeader, organizationId: value })} 
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
          value={studHeader?.voditelId || null} 
          onChange={value => setStudHeader({ ...studHeader, voditelId: value })} 
          placeholder={"Выберите получателя"} 
          style={{ width: 425 }} 
          > 
          {voditels.map(it => <Option 
            value={it.id}> 
            {it.lastName} {it.firstName} {it.patronymic} 
          </Option>)} 
         </Select> 
         </strong></Space>
      <Space>
       
         <label>Марка машины
          <Input  
            onChange={e => setStudHeader({ ...studHeader, marka: +e.target.value})} 
            placeholder="Марка машины" 
            style={{ width: "65px", fontWeight: "bold", fontSize: "14pt", marginLeft: 10 }} 
          /> 
         </label> 
        

        
         <label>Номер маршрута 
          <Input  
            onChange={e => setStudHeader({ ...studHeader, marshrut: +e.target.value})} 
            placeholder="Номер маршрута" 
            style={{ width: "65px", fontWeight: "bold", fontSize: "14pt", marginLeft: 10 }} 
          /> 
         </label> 
        
      </Space>
      </Space>

 
      <Table dataSource={list} columns={columns} /> 
    </div> 

 
    <Space 
      style={{ width: '100%', display: "flex", justifyContent: "space-between" }} 
    > 
      <Button onClick={createRecordHandler}> 
       Добавить 
      </Button> 
       
      <Space style={{ display: 'flex', gap: 10 }}> 
       <Button onClick={event => navigate('/')} > 
         Отменить 
       </Button> 

 
       <Button 
         onClick={saveRecordHandler} > 
         Сохранить 
       </Button> 
      </Space> 

 
    </Space> 

 
    <StudBodiesCreateDialog 
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