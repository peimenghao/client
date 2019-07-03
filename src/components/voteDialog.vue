<template>
	<div class="logFund">

		<!-- 未超时的投票 -->
		<el-dialog v-if="voteDetail.overtime == 0" :title="votedialog.title" :visible.sync="votedialog.show"
		 :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false" width="40%">
			<div class="form">
				<div style="margin-bottom: 10px;margin-left: 15px; font-size: 18px;">
					<h2>{{voteDetail.content}}</h2>
				</div>
				<div>
					<!-- 单选 -->
					<el-radio-group v-if="voteDetail.isSelectOne == 1" v-model="checkedValue" change>
						<div v-for="(o, index) in voteDetail.voteOptionList" :key="index" :offset="index > 0 ? voteDetail.voteOptionList.length : 0">
							<el-radio style="margin:10px 0px 10px 30px ;" :label="o.optionId">
								{{o.content}}
							</el-radio>
							<el-popover v-if="voteDetail.anonymous==0" style="margin-left: 10px;" placement="top-start" title="已投此选项" width="200"
							 trigger="click">
								<div v-for="(m, index) in o.userList" :key="index" :offset="index > 0 ? o.userList.length : 0">
									<span style="margin-right: 10px;color: gray;">{{m.realName}}</span>
								</div>
								<el-button type="text" slot="reference">详情</el-button>
							</el-popover>
						</div>
					</el-radio-group>

					<!-- 多选 -->
					<el-checkbox-group v-else v-model="checkedList">
						<div v-for="(o, index) in voteDetail.voteOptionList" :key="index" :offset="index > 0 ? voteDetail.voteOptionList.length : 0">
							<el-checkbox style="margin:10px 0px 10px 30px ;" :label="o.optionId">
								{{o.content}}
							</el-checkbox>
							<el-popover v-if="!voteDetail.anonymous" style="margin-left: 10px;" placement="top-start" title="已投此选项" width="200"
							 trigger="click">
								<div v-for="(m, index) in o.userList" :key="index" :offset="index > 0 ? voteDetail.voteOptionList.userList.length : 0">
									<span style="margin-right: 10px;color: gray;">{{m.userName}}</span>
								</div>
								<el-button type="text" slot="reference">详情</el-button>
							</el-popover>
						</div>
					</el-checkbox-group>

				</div>
				<div class="buttonset">
					<el-button size="small" @click="votedialog.show=false">取 消</el-button>
					<el-button size="small" type="primary" @click='onSubmit()'>确认</el-button>
				</div>
			</div>
		</el-dialog>

		<!-- 已超时的投票 -->
		<el-dialog v-else :title="votedialog.title" :visible.sync="votedialog.show" :close-on-click-modal='false'
		 :close-on-press-escape='false' :modal-append-to-body="false" width="50%">
			<div style="margin-bottom: 10px;margin-left: 15px; font-size: 18px;">
				<h2>{{voteDetail.content}}</h2>
			</div>
			<el-table :data="voteDetail.voteOptionList">
				<el-table-column prop="content" label="选项"></el-table-column>
				<el-table-column prop='userList.length' label="选票"></el-table-column>
				<el-table-column v-if="voteDetail.anonymous==0" label="操作">
					<template slot-scope="scope">
						<el-popover placement="top-start" title="已投此选项" width="200" trigger="click">
							<div v-for="(m, index) in voteDetail.voteOptionList[scope.$index].userList" :key="index" :offset="index > 0 ? m.length : 0">
								<span style="margin-right: 10px;color: gray;">{{m.realName}}</span>
							</div>
							<el-button type="text" slot="reference">详情</el-button>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
			<div class="buttonset">
				<el-button size="small" @click="votedialog.show=false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: "voteDialog",
		props: {
			votedialog: Object,
			voteDetail: Object
		},
		data() {
			return {
				checkedValue: 0,
				checkedList: [],
				// userId:0

			};
		},
		// created() {
		// 	this.$axios({
		// 		methods: "get",
		// 		url: "/user/getUserbyUserName",
		// 		params: {
		// 			userName: localStorage.getItem('userInfo')
		// 		}
		// 	}).then(res => {
		// 		this.userId = res.data.data.userId;
		// 	});
		// },
		methods: {
			
			//用户执行投票
			onSubmit() {
				
				var data = {
					themeId:this.voteDetail.themeId,
					userId:localStorage.getItem("userId"),
				};
				var option;
				if (this.voteDetail.isSelectOne == 1) {
					if(this.checkedValue !=""){
						let key='optionId1';
					let value=this.checkedValue;
					data[key]=value;
					}else{
						return;
					}
				} else {
					//判断是否有选择，有选择则将数组的数据逐个放进对象中
					if(this.checkedList.length){     
						for(var i=0;i<this.checkedList.length;i++){
						let key='optionId'+(i+1);
						let value=this.checkedList[i];
						data[key]=value;
					}
					}else{
						return;
					}
				}
				
				console.log(JSON.stringify(data) + "数据");
				this.$axios({
						method: 'POST',
						url: '/vote/saveOptionUser',
						headers: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: qs.stringify(data)
					})
					.then(res => {
						this.$message({
							message: "投票成功",
							type: "success"
						});
						this.votedialog.show = false;
						this.$emit("update");
					});
			}
		}
	};
</script>
<style scoped>
	.buttonset {
		margin-top: 10px;
		margin-left: 40%;
	}
</style>
