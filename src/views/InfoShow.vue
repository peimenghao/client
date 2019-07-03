<template>
	<div class="infoshow">
		<!-- <div class="table_container">
			<el-form>
				<el-form-item class="btnRight">
					<el-button type="primary" size="small" icon="view" @click='onAddMoney()'>修改个人信息</el-button>
				</el-form-item>
			</el-form>
    </div>-->

		<div class="center">
			<el-form label-width="80px" :model="user" :rules="rules">
				<el-form-item label="账号">
					<el-input v-model="user.userName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input v-model="user.position" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="所属部门">
					<el-input v-model="user.department.departName" :disabled="true" clearable></el-input>
				</el-form-item>
				<el-form-item label="真实姓名" prop="realName">
					<el-input v-model="user.realName" :disabled="ISdisabled" clearable></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="user.phone" :disabled="ISdisabled" clearable></el-input>
				</el-form-item>
				<el-form-item label="出生年月" prop="birthday">
					<el-date-picker v-model="user.birthday" :disabled="ISdisabled" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" clearable></el-date-picker>
				</el-form-item>

				<el-form-item label="性别">
					<el-radio-group v-model="user.gender" :disabled="ISdisabled">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="邮箱" prop="email">
					<el-input v-model="user.email" :disabled="ISdisabled" clearable></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" style="margin-left:30%;margin-top: 50px;">
				<el-form-item>
					<el-button type="primary" icon="view" @click="updatePasswordById()">修改密码</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="view" @click="ISdisabled=false">修改个信息</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="info" icon="view" @click="save()">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		<UpdatePDialog :pdialog="updatePDialog" :pform="form"></UpdatePDialog>
	</div>
</template>
<script>
	import UpdatePDialog from '../components/updatePDialog';
	import qs from 'qs'
	export default {
		name: "infoshow",
		data() {
			return {
				userInfo: "",
				user: {
					department: {},
					gender: 1
				},
				ISdisabled: true,
				rules: {
					realName: [{
							required: true,
							message: "请填写真实姓名",
							trigger: "blur"
						},
						{
							min: 2,
							max: 30,
							message: "长度在 2 到 30 个字符",
							trigger: "blur"
						}
					],
					email: [{
						type: "email",
						required: true,
						message: "邮箱格式不正确",
						trigger: "blur"
					}],
					phone: [{
							required: true,
							trigger: "blur",
							message: "手机不能为空"
						},
						{
							min: 5,
							max: 11,
							message: "长度在 5 到 11 个字符",
							trigger: "blur"
						}
					],
					birthday: {
						required: true,
						message: "请填写出生日期",
						trigger: "blur"
					}
				},
				updatePDialog: {
					show: false,
					title: "",
					option: "edit"
				},
				form: {},

			};
		},
		components: {
			UpdatePDialog
		},
		created() {
			this.userInfo = this.$store.getters.userInfo;
			this.getAllInfo();
		},
		methods: {
			getAllInfo() {
				this.$axios({
					methods: "get",
					url: "/user/getUserbyUserName",
					params: {
						userName: this.userInfo
					}
				}).then(res => {
					this.user = JSON.parse(JSON.stringify(res.data.data));
					this.form.userName = this.user.userName;
					this.form.userId = this.user.userId;
					// console.log(JSON.stringify(res.data));

				});
			},
			//修改密码
			updatePasswordById() {
				this.updatePDialog = {
					show: true,
					title: "修改密码",
					option: "edit"
				}
			},
			//保存
			save() {
				if(!this.ISdisabled){
					
				
				
				const data1 = {
					userId :this.user.userId,
					email:this.user.email,
					gender:this.user.gender,
					phone:this.user.phone,
					realName:this.user.realName,
					userName:this.user.userName,
					birthday:this.user.birthday
				};
				//console.log(data1);
				this.$axios({
					method: 'post',
					url: "/user/updateUserData",
					headers: {'content-type': 'application/x-www-form-urlencoded'},
					data:qs.stringify(data1)
				}).then(res => {
					this.ISdisabled=true;
					this.$message({
						message: "个人信息修改成功",
						type: "success"
					});
					
				});
			}
		 }
		}
	};
</script>
<style scoped>
	.table_container {
		padding: 10px 30px 20px 0px;
		box-sizing: border-box;
	}

	.infoshow {
		width: 100%;
		height: 600px;
		box-sizing: border-box;
		padding-top: 30px;
	}

	.center {
		margin: 0 auto;
		padding-top: 50px;
		width: 40%;
		height: 650px;
		/* background: lightgray; */
	}
</style>
