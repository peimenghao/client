<template>
	<div class="logFund">
		<el-dialog :title="pdialog.title" :visible.sync="pdialog.show" :close-on-click-modal='false' :close-on-press-escape='false'
		 :modal-append-to-body="false">
			<div class="form">
				<el-form ref="form" label-width="120px" style="margin:10px;width:auto;" :model="pw" :rules="rules">
					<el-form-item label="账号:">
						<el-input type="name" v-model="pform.userName" clearable :disabled="true"></el-input>
					</el-form-item>

					<el-form-item prop='password' label="新密码：">
						<el-input type="password" v-model="pw.password" clearable></el-input>
					</el-form-item>

					<el-form-item prop='password1' label="确认密码:">
						<el-input type="password" v-model="pw.password1" clearable></el-input>
					</el-form-item>

					<el-form-item class="text_right">
						<el-button @click="pdialog.show = false">取 消</el-button>
						<el-button type="primary" @click='onSubmit()'>保存</el-button>
					</el-form-item>

				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: "updatePDialog",
		props: {
			pdialog: Object,
			pform: Object
		},
		data() {
			var validatePass2=(rule,value,callback) => {   //密码校验
					if(value != this.pw.password){
						callback(new Error("请再次输入新密码"));
					}else{
						callback();
					}
				};
			return {
				pw: {
					password: '',
					password1: '',
				},
				rules: {
					password: [ { required: true, message: "新密码不能为空", trigger: "blur" },
					{
						min: 6,
						max: 30,
						message: "长度在 6 到 30 个字符",
						trigger: "blur"
					}],
					password1: [ { required: true, message: "密码不能为空", trigger: "blur" },
					{
						min: 6,
						max: 30,
						message: "长度在 6 到 30 个字符",
						trigger: "blur"
					},{validator:validatePass2, trigger: 'blur'}]
				}


			};
		},
		methods: {
			onSubmit() {
				const data ={
					userId: this.pform.userId,
					password: this.pw.password
				};
				
				this.$axios({
						method: 'POST',
						url: '/user/updatePasswordById',
						headers: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: qs.stringify(data)
					})
					.then(res => {
						this.$message({
							message: "修改成功",
							type: "success"
						});
						this.pdialog.show = false;
						this.$emit("update");
					});
			}
		}
	};
</script>
<<style scoped>

	</style>
