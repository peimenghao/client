<template>
	<div class="fillcontain">
		<div>
			<el-form :inline="true" ref="search_data" :model='search_data'>
				<el-form-item label="投标时间筛选:">
					<el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间">
					</el-date-picker>&nbsp;&nbsp;&nbsp;
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
			<el-table v-if="tableData.length > 0" :data='tableData' max-height="650" border :default-sort="{prop: 'date', order: 'descending'}"
			 style="width: 100%;border-top: 1px solid lightgray;">
				<el-table-column prop="visitTime" label="创建时间" align='center' sortable>
				</el-table-column>
				<el-table-column prop="name" label="来访姓名" align='center'>
				</el-table-column>
				<el-table-column prop="content" label="备注" align='center'>
				</el-table-column>
				<el-table-column prop="phone" label="来访电话" align='center'>
				</el-table-column>
				<el-table-column prop="vsisitPerson" label="访问人名字" align='center'>
				</el-table-column>
				<el-table-column prop="receptionist" label="接待人名字" align='center'>
				</el-table-column>
				<el-table-column prop="note" label="拜访事由" align='center'>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="info" @click="updataVisitor(tableData[scope.$index])">编辑</el-button>
						<el-button size="mini" type="danger" @click="Delete(tableData[scope.$index].visitorId)">删除</el-button>
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
		<!-- 弹框页面 -->
		<DialogVisitor :dialog='dialog' :form='form' @update="getProfile"></DialogVisitor>
		<VisitorDialog :vdialog="vdialog" :vform="vform" @update="getProfile"></VisitorDialog>


	</div>
</template>

<script>
	import DialogVisitor from "../components/DialogVisitor";
	import VisitorDialog from "../components/visitorDialog";

	export default {
		name: "logFund",
		data() {

			return {
				tableData: [],
				allTableData: [],
				filterTableData: [],
				dialog: {
					show: false,
					title: "",
					option: "edit"
				},
				form: {
					visitorId: "",
					name: "",
					phone: "",
					concent: "",
					vsisitPerson: "",
					receptionist: "",
					visitTime: "",
					note: ""
				},
				vdialog: {
					show: false,
					title: "",
					option: "upodata"
				},
				vform: {
					visitorId: "",
					name: "",
					phone: "",
					concent: "",
					vsisitPerson: "",
					receptionist: "",
					visitTime: "",
					note: ""
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
			DialogVisitor,
			VisitorDialog
		},
		created() {
			this.getProfile();
		},
		methods: {
			getProfile() {
				// 获取表格数据
				this.$axios("/visitor/getAllVisitor").then(res => {
					this.tableData = res.data.data;
					this.allTableData = res.data.data;
					this.filterTableData = res.data.data;
					// console.log(JSON.stringify(this.tableData) + "||||");
					//设置分页数据
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
				this.form = {};
			},
			//修改访客信息
			updataVisitor(visitor) {
				//console.log(JSON.stringify(visitor));
				this.vdialog = {
					show: true,
					title: "修改访客信息",
					option: "updata"
				};
				this.vform = JSON.parse(JSON.stringify(visitor));
			},
			//删除访客
			Delete(visitorId) {
				//console.log(visitorId + "访客ID");
				this.$axios({
					method: 'get',
					url: '/visitor/deleteVisitor',
					params: {
						visitorId: visitorId
					}
				}).then(res => {
					this.getProfile();
					this.$message({
						type: "success",
						message: "删除访客成功!"
					});
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

	.table_container {
		margin-top: 10px;
		border-top: 1px solid lightgray;
	}
</style>
