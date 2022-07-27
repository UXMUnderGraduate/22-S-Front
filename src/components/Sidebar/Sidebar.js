import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCog, FaUserTie, FaColumns, FaThList, FaHome } from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import "./SideBar.css";
import { BsMusicPlayerFill} from 'react-icons/bs';
import {  FiLogOut} from "react-icons/fi";
const Menuitem = styled(MenuItem)`
  :hover {
    background-color: #aeb4f6;
    padding: 0px;
    border-radius: 5px;
  }
`;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const styles = {
      menuIcon: {
      float: "left",
      margin: "10px",
      marginLeft:"25px",
      fontSize:"25px",
      color:"white"
    }
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div id="header">
    <ProSidebar  collapsed={collapsed}>
      <SidebarHeader >
      <div className="logotext" >
        <Menu iconShape="none" >
          <MenuItem icon={<BsMusicPlayerFill />}><h3>UXM Musix</h3></MenuItem>
        </Menu>
      </div>

        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
        
      </SidebarHeader>
      <SidebarContent>
      <Menu >
        <Menuitem icon={<FaHome />}><a href="/" style={{styles}}>Home</a></Menuitem>
        <Menuitem icon={<FaThList />} ><a href="/" style={{color:"white"}}>장르별 음악</a> </Menuitem>        
        <Menuitem icon={<FaColumns />}><a href="/download" style={{color:"white"}}>다운로드</a> </Menuitem>
        <div style={{background:"#7B83EB"}}>
        <SubMenu title="내 음원" icon={<FaUserTie />} >
          <Menuitem><a href="/analysis" style={{color:"white"}}>내 음원 업로드</a></Menuitem>
          <Menuitem><a href="/delete" style={{color:"white"}}>내 음원 삭제</a></Menuitem>
        </SubMenu>
        </div>
      </Menu></SidebarContent>

      <SidebarFooter>
          <Menu >
            <MenuItem icon={<FiLogOut />}><a href="/login" style={{color:"white"}}>로그아웃</a></MenuItem> 
            <Menuitem icon={<FaCog />}><a href="/info" style={{color:"white"}}>회원 정보 수정</a></Menuitem>
          </Menu>
      </SidebarFooter>
    </ProSidebar>
    </div>
  );
};
export default SideBar;