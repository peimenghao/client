<template>
	<div class="fillcontain">
		<!-- <div class="container">
            <h1 class="title">OA管理平台</h1>
            <p class="lead">会议记录，日程</p>
        </div> -->
		<div>
			<el-form :inline="true" ref="search_data" :model='search_data'>
				<el-form-item label="待办任务筛选:">
					<el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间">
					</el-date-picker>&nbsp;&nbsp;&nbsp;
					<el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
				</el-form-item>
				<el-form-item class="btnRight">
					<el-button type="primary" size="small" icon="view" @click='onAddmatter()'>新建待办任务</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="container">


			<el-table :data="tableData" style="width: 100%;border-top: 1px solid lightgray;" border :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="createTime" label="创建时间" width="200" align='center' sortable>
				</el-table-column>
				<el-table-column prop="remindTime" label="提醒时间" width="180" align='center'>
				</el-table-column>
				<el-table-column prop="title" label="任务标题" align='center'>
				</el-table-column>
				<el-table-column prop="content" label="任务内容" align='center'>
				</el-table-column>
				<el-table-column label="任务状态" align='center' width="180">
					<template slot-scope="scope">
						{{ tableData[scope.$index].isOver ? "已超时":"待执行"}}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="180">
					<template  slot-scope="scope">
						<el-button v-if="tableData[scope.$index].isOver" size="mini" type="info" disabled >编辑</el-button>
						<el-button v-else size="mini" type="info" @click="updataMatter(tableData[scope.$index])">编辑</el-button>
						<el-button size="mini" type="danger" @click="Delete(tableData[scope.$index],scope.$index)">删除</el-button>
					</template>
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
		</div>

		<NewMatter :mdialog="mdialog"  @update="getData"></NewMatter>
		<UpdataMatter :matterdialog="matterdialog" :matterform="matterform" @update="getData"></UpdataMatter>
	</div>
</template>

<script>
	import NewMatter from '../components/newMatter'
	import UpdataMatter from '../components/updataMatter'
	export default {
		name: 'home',
		data() {
			return {
				mdialog: {
					show: false,
					title: "",
					option: "add"
				},
				tableData: [],
				allTableData: [],
				filterTableData: [],
				paginations: {
					page_index: 1, // 当前位于哪页
					total: 0, // 总数
					page_size: 5, // 1页显示多少条
					page_sizes: [5, 10, 15, 20], //每页显示多少条
					layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
				},
				search_data: {
					startTime: "",
					endTime: ""
				},
				matterdialog:{
					show:false,
					title:"",
					option:"updata"
				},
				matterform:{}
			}
		},
		components: {
			NewMatter,
			UpdataMatter
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				this.$axios({
					method: 'get',
					url: "/matter/getMatter",
					params: {
						userId: localStorage.getItem("userId")
					}
				}).then(res => {
					this.tableData = res.data.data;
					this.allTableData = res.data.data;
					this.filterTableData = res.data.data;
					//console.log(JSON.stringify(this.tableData) +"待办事项");
					//设置分页数据
					this.setPaginations();
				});
			},
			//新建待办任务
			onAddmatter() {
				this.mdialog = {
					show: true,
					title: "新建代办任务",
					option: "add"
				};
			},
			//新建待办任务窗口
			updataMatter(item){
				this.matterdialog = {
					show: true,
					title: "修改待办任务",
					option: "update"
				};
				this.matterform=JSON.parse( JSON.stringify(item)) ;
			},
			Delete(matter,index){
				console.log(matter);
				this.$axios({
					method:'get',
					url:'/matter/deleteByMatterId',
					params:{
						matterId:matter.matterId,
						isOver:matter.isOver
					}
				}).then(res => {
					this.tableData.splice(index,1);
				});
			},
			//设置分页
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
			onScreeoutMoney() {
				// 筛选
				if (!this.search_data.startTime || !this.search_data.endTime) {
					this.$message({
						type: "warning",
						message: "请选择时间区间"
					});
					this.getProfile();
					return;
				}
				const stime = this.search_data.startTime.getTime();
				const etime = this.search_data.endTime.getTime();
				this.allTableData = this.filterTableData.filter(item => {
					let date = new Date(item.date);
					let time = date.getTime();
					return time >= stime && time <= etime;
				});
				// 分页数据
				this.setPaginations();
			}
		}
	}
</script>
<style scoped>

	.fillcontain {
		width: 100%;
		height: 100%;
		padding: 16px;
		box-sizing: border-box;
	}
	
	.btnRight {
		float: right;
	}
	
	.pagination {
		text-align: right;
		margin-top: 10px;
	}
	
	.table_container {
		margin-top: 10px;
		border-top: 1px solid lightgray;
	}
</style>
