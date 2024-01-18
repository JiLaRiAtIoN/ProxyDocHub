import React from "react"; 

import { Menu } from "antd"; 

import SubMenu from "antd/lib/menu/SubMenu"; 

import { Link } from "react-router-dom"; 

import { ROUTE_PATHS } from "../../router/paths"; 


 

export const Navigation = ({ 
 /** children - дочерний код, который будет находится */ 
 /** внутри <Navigation>___</Navigation> */ 
 children, 
 ...props 

}) => { 

 
 return ( 
   <div> 
    <Menu 
      mode={'horizontal'} 
      theme={'dark'} 
      defaultActiveFirst={'sub-2'} 
    > 
      <SubMenu title={'Документы'} key={'sub-2'}>

        <Menu.Item key={'menu-1'}>  
       <Link to={ROUTE_PATHS.proxy.list}> 
         Документ "Доверенность"
       </Link> 
        </Menu.Item> 

        <Menu.Item key={'menu-5'}>
          <Link to={ROUTE_PATHS.stud.list}>
          Документ "Путевой лист"
          </Link>
        </Menu.Item> 


      </SubMenu>
      

 
      <SubMenu title={'Справочники'} key={'sub-1'}> 

 
       <Menu.Item key={'menu-2'}> 
         <Link to={ROUTE_PATHS.individuals}> 
          Физические лица 
         </Link> 
       </Menu.Item> 

 
       <Menu.Item key={'menu-3'}> 
         <Link to={ROUTE_PATHS.organizations}> 
          Организации 
         </Link> 
       </Menu.Item> 

 
       <Menu.Item key={'menu-4'}> 
         <Link to={ROUTE_PATHS.products}> 
          Товары 
         </Link> 
       </Menu.Item> 

       <Menu.Item key={'menu-7'}> 
         <Link to={ROUTE_PATHS.voditels}> 
          Водители
         </Link> 
       </Menu.Item> 

 
      </SubMenu> 

 
      <Menu.Item key="link"> 
       Выход 
      </Menu.Item> 
    </Menu> 

 
    {/*  
      После Navigation 
      будет отрисован тот компонент, 
      который соответсвует текущему значению  
      адресной строки 
    */} 
    {children} 
   </div> 
 ) 

} 