import { DatePicker, Input, Space, Select } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import StudHeadersService from "../../../api/services/stud-header-service"; 

import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const StudHeadersDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 konductors, 
 organizations, 
 voditels,
 ...props 

}) => { 
 const [studHeader, setStudHeader] = useState(null); 

 
 useEffect(() => { 
  if (currentRecord) { 
   setStudHeader(currentRecord); 
  } else { 
   setStudHeader(null); 
  } 
 }, [currentRecord]) 


 const onOkHandler = async () => { 
  const record = 
   currentRecord 
    ? await StudHeadersService.updateRecord({ 
     id: currentRecord.id, 
     ...studHeader, 
    }) 
    : await StudHeadersService.createRecord(studHeader) 
  onOk(record); 
 } 

 return ( 
  <Modal 
   visible={visible} 
   title={currentRecord ? 'Редактировать' : 'Создать'} 
   onOk={onOkHandler} 
   onCancel={onCancel} DD
  > 

 
   <Space direction="vertical" style={{ width: '100%' }}> 
    <Input 
     value={studHeader?.number || ''} 
     onChange={e => setStudHeader({ ...studHeader, number: e.target.value })} 
     placeholder="Укажите номер документа" 
    /> 

 
    <Space style={{width: '100%'}}> 

 
    <DatePicker  
      value={dayjs(studHeader?.date1 , 'YYYY-MM-DD').isValid() ? dayjs(studHeader.date1 , 'YYYY-MM-DD') : null} 
      onChange={date => setStudHeader({ ...studHeader, date1: date })} 
      placeholder={"Укажите дату "} 
      style={{ width: 232 }} 
      format="DD.MM.YYYY" 
      allowClear={false} 
     /> 

 
    </Space> 

 
    <Space style={{width: '100%'}}>
     <Select 
      value={studHeader?.organizationId || null} 
      onChange={value => setStudHeader({ ...studHeader, organizationId: value })} 
      placeholder={"Выберите организацию"} 
      style={{ width: 232 }} 
     > 
      {organizations.map(it => <Option 
       value={it.id}> 
       {it.title} 
      </Option>)} 
    </Select> 
 
    </Space> 
    <Space>
      <Select 
      value={studHeader?.voditelId || null} 
      onChange={value => setStudHeader({ ...studHeader, voditelId: value })} 
      placeholder={"Выберите водителя"} 
      style={{ width: 232 }} 
     > 
      {voditels.map(it => <Option 
       value={it.id}> 
       {it.lastName} 
      </Option>)} 
    </Select> 
    </Space>
    <Space>
        <Input
        value={studHeader?.marka || ''} 
        onChange={e => setStudHeader({ ...studHeader, marka: e.target.value })} 
        placeholder="Укажите марку автомобиля" 
        />
        <Input
        value={studHeader?.marshrut || ''} 
        onChange={e => setStudHeader({ ...studHeader, marshrut: e.target.value })} 
        placeholder="Укажите номер маршрута" 
        />
    </Space>

 
   </Space> 
  </Modal> 
 ) 

 

}  