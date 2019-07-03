<template>
    <el-row class="menu_page">
         <el-col>
             <el-menu
                mode="vertical"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff" 
                class="el-menu-vertical-demo">
                <router-link to="/home">
                    <el-menu-item index="0" style="border-top: 1px solid #1F2D3D;">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
                    </el-menu-item>
                </router-link>
                 <template>
                    <el-submenu index="1" style="border-top: 1px solid #1F2D3D;">
                        <template slot="title">
                            <i class="fa fa-margin fa-money"></i>
                            <span slot="title">访客信息</span>
                        </template>
                        <el-menu-item-group>
                          <router-link to="foundlist"><el-menu-item index="1-1">面试</el-menu-item></router-link>
                          <router-link to="visitor"><el-menu-item index="1-2">访客</el-menu-item></router-link>
                        </el-menu-item-group>
                    </el-submenu> 
                </template>
                <template>
                    <router-link to="/whole">
                    <el-menu-item index="2" style="border-top: 1px solid #1F2D3D;">
                        <i class="fa fa-margin fa-sitemap"></i>
                        <span slot="title">人员管理</span>
                    </el-menu-item>
                </router-link>
                </template>
                 <template>
					 <router-link to="/Votes">
					     <el-menu-item index="3" style="border-top: 1px solid #1F2D3D;">
					         <i class="fa fa-margin fa-object-group"></i>
					         <span slot="title">投票信息</span>
					     </el-menu-item>
					 </router-link>
					 
					 
					 
                    <!-- <el-submenu index="3" style="border-top: 1px solid #1F2D3D;">
                        <template slot="title">
                            <i class="fa fa-margin fa-object-group"></i>
                            <span slot="title">投票信息</span>
                        </template>
                        <el-menu-item-group>                        
                          <router-link to="Votes"><el-menu-item index="3-1">投票信息</el-menu-item></router-link>
                          <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu> -->
                </template>
                 <template>
                    <el-submenu index="30" style="border-top: 1px solid #1F2D3D;">
                        <template slot="title">
                            <i class="fa fa-margin fa-asterisk"></i>
                            <span slot="title">信息管理</span>
                        </template>
                        <el-menu-item-group>                        
                          <router-link to="infoshow"><el-menu-item index="30-1">个人信息</el-menu-item></router-link>
                          <!-- <el-menu-item index="30-2">选项2</el-menu-item> -->
                        </el-menu-item-group>
                    </el-submenu> 
                </template>
             </el-menu>
         </el-col>
    </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
     
       
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 4.5rem;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
  font-size: 1.2rem;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
span{
	font-size: 1.0rem;
	margin-left: 1rem;
	letter-spacing: 2px;
}
</style>
