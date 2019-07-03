<template>
	<div class="whole">
		<template>
			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
				<el-tab-pane label="用户管理" name="first">
					<template>
						<el-form :inline="true" ref="searchName" class="btnRight">
							<el-form-item label="真实姓名搜索:">
								<el-input type="name" v-model="searchName" clearable></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" size="small" icon="search" @click='onScreeoutMoney()'>搜索</el-button>
							</el-form-item>

						</el-form>
						<el-table :data="tableData" style="width: 100%;border-top: 1px solid lightgray;" border :default-sort="{prop: 'date', order: 'descending'}">
							<el-table-column prop="createTime" label="日期" width="200" align='center' sortable>
							</el-table-column>
							<el-table-column prop="userName" label="账号" width="180" align='center'>
							</el-table-column>
							<el-table-column prop="realName" label="真实姓名" align='center'>
							</el-table-column>
							<el-table-column prop="position" label="职位" align='center'>
							</el-table-column>
							<el-table-column prop='department.departName' label="所属部门" align='center'>
							</el-table-column>
							<el-table-column prop="phone" label="手机号" align='center'>
							</el-table-column>
							<el-table-column prop="email" label="邮箱" align='center'>
							</el-table-column>
							<el-table-column prop="birthday" label="出生日期" align='center'>
							</el-table-column>
						</el-table>
						<!-- 分页 -->
						<el-row>
							<el-col :span="24">
								<div class="pagination">
									<el-pagination v-if='paginations.total > 0' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size"
									 :layout="paginations.layout" :total="paginations.total" :current-page.sync='paginations.page_index'
									 @current-change='handleCurrentChange' @size-change='handleSizeChange'>

									</el-pagination>
								</div>
							</el-col>
						</el-row>
					</template>

				</el-tab-pane>
				<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
				<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
				<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
			</el-tabs>
		</template>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeName2: 'first',
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				allTableData: [],
				filterTableData: [],
				//需要给分页组件传的信息
				paginations: {
					page_index: 1, // 当前位于哪页
					total: 0, // 总数
					page_size: 5, // 1页显示多少条
					page_sizes: [5, 10, 15, 20], //每页显示多少条
					layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
				},
				searchName: "",
			};
		},
		created() {
			this.getProfile();
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			getProfile() {
				// 获取部门数据
				this.$axios("/user/getUsers").then(res => {
					// console.log(res.data);
					this.tableData = res.data.data;
					this.allTableData = res.data.data;
					this.filterTableData = res.data.data;
					// console.log(JSON.stringify(this.tableData) + "||||");
					//设置分页数据
					this.setPaginations();
				});
			},
			onScreeoutMoney() { //user/getUserByRealname真实姓名查询
			    const search_name=this.searchName;
				  this.$axios({
					  method:"get",
					  url:"/user/getUserByRealname",
					  params:{
						  realName:this.searchName
					  }
				  }).then(res => {
					this.tableData = res.data.data;
					this.allTableData = res.data.data;
					this.filterTableData = res.data.data;
					//console.log(JSON.stringify(this.tableData) + "||||");
					//设置分页数据
					this.setPaginations();
				});
			},
			handleCurrentChange(page) {
				// 当前页
				let sortnum = this.paginations.page_size * (page - 1);
				let table = this.allTableData.filter((item, index) => {
					return index >= sortnum;
				});
				// 设置默认分页数据
				this.tableData = table.filter((item, index) => {
					return index < this.paginations.page_size;
				});
			},
			handleSizeChange(page_size) {
				// 切换size
				this.paginations.page_index = 1;
				this.paginations.page_size = page_size;
				this.tableData = this.allTableData.filter((item, index) => {
					return index < page_size;
				});
			},
			setPaginations() {
				// 总页数
				this.paginations.total = this.allTableData.length;
				this.paginations.page_index = 1;
				this.paginations.page_size = 5;
				// 设置默认分页数据
				this.tableData = this.allTableData.filter((item, index) => {
					return index < this.paginations.page_size;
				});
			},

		}
	}
</script>
<style scoped>
	.whole {
		padding: 18px;
	}

	.pagination {
		text-align: right;
		margin-top: 10px;
	}

	.btnRight {
		float: right;
	}
</style>
