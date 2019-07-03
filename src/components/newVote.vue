<template>
	<div class="logFund">
		<el-dialog :title="newVoteD.title" :visible.sync="newVoteD.show" :close-on-click-modal='false' :close-on-press-escape='false'
		 :modal-append-to-body="false">
			<div class="form">
				<el-form ref="form" label-width="120px" :model="vote" style="margin:10px;width:auto;">

					<el-form-item label="投票主题" prop='content' :rules="{required: true, message: '投票主题不能为空', trigger: 'blur'}">
						<el-input type="content" v-model="vote.content" clearable></el-input>
					</el-form-item>
					<el-form-item v-for="(item, index) in vote.voteOptionList" :label="'选项' + (index+1)" :key="index">
						<el-input v-model="item.content"></el-input>
						<el-button size="small" @click.prevent="removeDomain(item)">删除</el-button>
					</el-form-item>
					<el-form-item label="创建人姓名:" prop='author' :rules="{required: true, message: '创建人不能为空', trigger: 'blur'}">
						<el-input type="author" v-model="vote.author" clearable></el-input>
					</el-form-item>
					<el-form-item label="截止时间:" prop='endTime' :rules="{required: true, message: '截止日期不能为空', trigger: 'blur'}">
						<el-date-picker v-model="vote.endTime" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择截止时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="投票方式:">
						<el-radio-group v-model="vote.isSelectOne">
							<el-radio :label="1">单选</el-radio>
							<el-radio :label="0">多选</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="是否匿名:">
						<el-radio-group v-model="vote.anonymous">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button type="info" @click="newVoteD.show=false">取 消</el-button>
						<el-button @click="addDomain">新增选项</el-button>
						<el-button type="primary" @click="submitForm()">提交</el-button>
					</el-form-item>




				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: "newVote",
		props: {
			newVoteD: Object,
		},
		data() {
			return {
				vote: {
					content: "",
					author: "",
					endTime: "",
					anonymous: 1,
					isSelectOne: 1,
					voteOptionList: [{
						content: ""
					}]
				},
			}
		},
		methods: {
			removeDomain(item) {
				var index = this.vote.voteOptionList.indexOf(item)
				if (index !== -1) {
					this.vote.voteOptionList.splice(index, 1)
				}
			},
			addDomain() {
				this.vote.voteOptionList.push({
					content: "",
				});
			},
			//提交投票信息
			submitForm() {  
				var end = new Date(this.vote.endTime);
				var create =  new Date();
				if(end<create){
					this.$message({
						message: "投票截止时间不能小于当前时间",
						type: "danger"
					});
					return;
				}
				console.log(JSON.stringify(this.vote) + "数据");
				this.$axios({
						method: 'POST',
						url: '/vote/saveVote',
						headers: {
							'content-type': 'application/json; charset=utf-8'
						},
						data: JSON.stringify(this.vote),
					})
					.then(res => {
						this.$message({
							message: "提交成功",
							type: "success"
						});
						this.newVoteD.show=false;
						this.$emit("update");
					});

			},
		}
	}
</script>
