<template>
	<div class="fillcontain">
		<div>
			<el-form :inline="true" ref="search_data" :model='search_data'>
				<el-form-item label="投标时间筛选:">
					<el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间">
					</el-date-picker> &nbsp;&nbsp;&nbsp;
					<el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
				</el-form-item>
				<el-form-item class="btnRight">
					<el-button type="primary" size="small" icon="view" @click='onAddMoney()'>添加</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table_container">
			<el-table v-if="tableData" :data='tableData' max-height="650" border :default-sort="{prop: 'date', order: 'descending'}"
			 style="width: 100%">
				<el-table-column prop="interviewerName" label="面试姓名" align='center'  sortable>
				</el-table-column>
				<el-table-column prop="phone" label="面试电话" align='center'>
				</el-table-column>
				<el-table-column prop="position" label="面试岗位" align='center' >
				</el-table-column>
				<el-table-column prop="startTime" label="进公司时间" align='center' >
				</el-table-column>
				<el-table-column prop="endTime" label="离开公司时间" align='center'>
				</el-table-column>
				<el-table-column prop="result" label="面试结果" align='center' >
				</el-table-column>
				<el-table-column prop="hrName" label="面试hr" align='center'>
				</el-table-column>
				<!-- <el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="updataFound(tableData[scope.$index])" type="info">编辑</el-button>
						<el-button size="mini" type="danger" @click="Delete(tableData[scope.$index].visitorId)">删除</el-button>
					</template>
				</el-table-column> -->
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
		<!-- 弹框页面 -->
		<DialogFound :dialog='dialog' :form='form' @update="getProfile" ></DialogFound>
		<FoundDialog :fdialog='fdialog' :fform='fform' @update="getProfile"></FoundDialog>
	</div>
</template>

<script>
	import DialogFound from "../components/DialogFound";
	import FoundDialog from "../components/foundDialog";

	export default {
		name: "fundlist",
		data() {
			return {
				// apiurl: 'http://192.168.110.189/',
				tableData: [],
				allTableData: [],
				filterTableData: [],
				dialog: {
					show: false,
					title: "",
					option: "edit"
				},
				form: {
					 interviewId: "",
					 interviewerName: "",
					 position: "",
					 phone: "",
					 startTime: "",
					 endTime: "",
					 result: "",
					 hrName: ""
				},
				fdialog: {
					show: false,
					title: "",
					option: "updata"
				},
				fform: {
					 interviewId: "",
					 interviewerName: "",
					 position: "",
					 phone: "",
					 startTime: "",
					 endTime: "",
					 result: "",
					 hrName: ""
				},
				//需要给分页组件传的信息
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
				}
			};
		},
		components: {
			DialogFound,
			FoundDialog
		},
		created() {
			this.getProfile();
		},
		methods: {
			getProfile() {
				// 获取表格数据
				this.$axios("/interview/getAllInterview").then(res => {
					this.tableData = res.data.data;
					this.allTableData = res.data.data;
					this.filterTableData = res.data.data;
					// console.log(res.data.data)
					// 设置分页数据
					this.setPaginations();
				});
			},
			onAddMoney() {
				// 添加
				this.dialog = {
					show: true,
					title: "添加信息",
					option: "add"
				};
				this.form = {
			    }
			},
			updataFound(found){
				console.log(JSON.stringify(found));
				this.fdialog = {
					show: true,
					title: "修改面试信息",
					option: "updata"
				};
				this.fform = JSON.parse(JSON.stringify(found));
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
	};
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
</style>
