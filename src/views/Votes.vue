<template>
	<div class="votes">
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
					<el-button type="primary" size="small" icon="view" @click='onAddvote()'>新建投票</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="cardList">
			<el-row>
				<el-col class="cardcol" :span="6" v-for="(o, index) in tableData" :key="index" :offset="index > 0 ? tableData.lenght : 0"
				 :default-sort="{prop: 'o.createTime', order: 'descending'}">
					<el-card class="box-card">
						<!-- shadow="hover" -->
						<div slot="header" class="clearfix">
							<span>{{o.content}}</span>
							<el-button v-if="o.overtime == 0" style="float: right;" type="success" size="mini" @click='votesIt(o.themeId)'>投票</el-button>
							<el-button v-else type="info" style="float: right;" size="mini" @click='votesIt(o.themeId)'>查看结果</el-button>
						</div>
						<el-form class="text item">
							<el-form-item label="发起人">
								<span class="spanClass">{{o.author}}</span>
							</el-form-item>
							<el-form-item label="创建时间">
								<span class="spanClass">{{o.creatTime}}</span>
							</el-form-item>
							<el-form-item label="结束时间">
								<span class="spanClass">{{o.endTime}}</span>
							</el-form-item>

						</el-form>
					</el-card>
				</el-col>
			</el-row>
			<div class="block pages" >
				<span class="pagespan" @click="despage()"><a>上一页</a> </span>    <span class="pagespan" @click="addpage()"><a>下一页</a></i></span>
			</div>
		</div>

		<VoteDialog :votedialog="votedialog" :voteDetail="voteDetail" @update="getVoteDetail"></VoteDialog>
		<NewVote :newVoteD="newVoteD" @update="getProfile"></NewVote>
	</div>
</template>
<script>
	import VoteDialog from "../components/voteDialog";
	import NewVote from "../components/newVote";
	export default {
		name: "votes",
		data() {
			return {
				tableData: [],
				search_data: {
					startTime: "",
					endTime: ""
				},
				votedialog: {
					show: false,
					title: "",
					option: "edit"
				},
				voteDetail: {},
				newVoteD: {
					show: false,
					title: "",
					option: "add"
				},
				currentPage:1,

			}
		},
		components: {
			VoteDialog,
			NewVote
		},
		created() {
			this.getProfile();
		},
		methods: {
			getProfile() {
				this.$axios({
					method: 'get',
					url:"/vote/getAllVote",
					params:{
						pageNo:this.currentPage
					},
				}).then(res => {
					this.tableData = res.data.data;
					// this.allTableData = res.data.data;
					// this.filterTableData = res.data.data;
					//console.log(JSON.stringify(this.tableData) + "||||");
					//设置分页数据
					// 	this.setPaginations();
				});
			},
			votesIt(themeId) {
				//console.log(JSON.stringify(themeId));
				this.votedialog = {
					show: true,
					title: "投票",
					option: "edit"
				};
				this.votethemeId = themeId;
				this.getVoteDetail();
			},
			getVoteDetail() {
				this.$axios({
						method: 'get',
						url: '/vote/getVoteById',
						params: {
							themeId: this.votethemeId,
						},

					})
					.then(res => {
						this.voteDetail = JSON.parse(JSON.stringify(res.data.data));
						//console.log(this.voteDetail);
					});
			},
			onAddvote() {
				this.newVoteD = {
					show: true,
					title: "新建投票",
					option: "add"
				};
			},
			despage(){
				this.currentPage--;
				if(this.currentPage<1){
					this.currentPage=1;
					this.$message({
						message: "第一页",
						type: "warning"
					});
					return;
				}
				this.getProfile();
			},
			addpage(){
				
				if(this.tableData.length<6){
					this.$message({
						message: "暂无更多投票主题",
						type: "warning"
					});
				}else{
					this.currentPage ++;
				}
				this.getProfile();
				
				
			}
		}
	};
</script>
<style scoped>
	.votes {
		width: 100%;
		height: 100%;
		padding: 16px;
		box-sizing: border-box;
	}
	.pages{
		margin-left: 100px; margin-top: 20px;
	}
	.pagespan{
		margin-right: 40px;
		font-size: 14px;
	}
	.pagespan :hover{
		cursor:pointer;
		color: blue;
	}
	
	.btnRight {
		float: right;
	}

	.cardList {
		width: 100%;

	}

	.cardcol {
		margin: 50px 50px 25px 50px;
	}

	.spanClass {
		float: right;
		margin-right: 30px;

	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}

	.el-form-item {
		margin-bottom: 0px !important;
	}
	
</style>
