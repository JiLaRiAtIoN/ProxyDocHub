import { Input, Space } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 


 


let localId = 0 

 

export const StudBodiesCreateDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 studHeaderId, 
 ...props 

}) => { 
 const [studBody, setStudBody] = useState(null); 

 
 useEffect(() => { 
   if (currentRecord) { 
    setStudBody(currentRecord); 
   } else { 
    setStudBody(null); 
   } 
 }, [currentRecord]) 

 
 const onOkHandler = async () => { 
   const record = 
    {id: localId, 
      startTime: studBody.startTime, 
      endTime: studBody.endTime, 
      probeg: studBody.probeg, 
    } 
   onOk(record); 
   setStudBody(null); 
   localId += 1; 
 } 

 
 return ( 
   <Modal 
    visible={visible} 
    title={currentRecord ? 'Редактировать' : 'Создать'} 
    onOk={onOkHandler} 
    onCancel={onCancel} 
   > 
    <Space direction="vertical"> 

 
      <Space> 

 
       <Input  
         format="HH:MM" 
         value={studBody?.startTime || ''} 
         onChange={e => setStudBody({ ...studBody, startTime: e.target.value })} 
         placeholder="Время отправления" 
       /> 

 
       <Input 
         format="HH:MM"
         value={studBody?.endTime || ''} 
         onChange={e => setStudBody({ ...studBody, endTime: e.target.value })} 
         placeholder="Время прибытия" 
       /> 
 
        <Input 
         value={studBody?.probeg || ''} 
         onChange={e => setStudBody({ ...studBody, probeg: e.target.value })} 
         placeholder="Укажите пробег" 
       /> 
      </Space> 

 
    </Space> 

 
   </Modal> 
 ) 

}