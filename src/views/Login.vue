<template>
	<div class="login">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">OA在线后台管理系统</span>
			</div>
			<el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
				<el-form-item label="账号" prop="userName">
					<el-input v-model="loginUser.userName" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
				</el-form-item>
				<div class="tiparea">
					<p>还没有账号？现在<router-link to='/register'>注册</router-link>
					</p>
				</div>
			</el-form>
		</section>
	</div>
</template>

<script>
	import jwt_decode from "jwt-decode";
	import qs from 'qs';

	export default {
		name: "login",
		data() {
			return {
				loginUser: {
					userName: "",
					password: ""
				},
				rules: {
					userName: [{
							required: true,
							message: "用户名不能为空",
							trigger: "change"
						},
						{
							min: 2,
							max: 30,
							message: "长度在 2 到 30 个字符",
							trigger: "blur"
						}
					],
					password: [{
							required: true,
							message: "密码不能为空",
							trigger: "blur"
						},
						{
							min: 6,
							max: 30,
							message: "长度在 6 到 30 个字符",
							trigger: "blur"
						}
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				console.log(this.loginUser);
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$axios({
							url: "/login/login",
							method: 'POST',
							headers: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: qs.stringify(this.loginUser),
						}).then(res => {
							// 登录成功
							const {
								token
							} = res.data;
							//console.log(res.data);
							localStorage.setItem("token", token);

							// 解析token
							const decode = jwt_decode(token);
							console.log(JSON.stringify(decode));
							var userInfo=decode;
							localStorage.setItem('userInfo',userInfo.userName);
							 this.$store.commit('set_token', token);
							 this.$store.commit('set_userInfo',userInfo.userName);
							 this.getUserId();
							// 页面跳转
							this.$router.push("/index");
						});
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			getUserId(){
				this.$axios({
					methods: "get",
					url: "/user/getUserbyUserName",
					params: {
						userName: localStorage.getItem('userInfo')
					}
				}).then(res => {
					localStorage.setItem("userId",res.data.data.userId);
				});
			},
			isEmpty(value) {
				return (
					value === undefined ||
					value === null ||
					(typeof value === "object" && Object.keys(value).length === 0) ||
					(typeof value === "string" && value.trim().length === 0)
				);
			}
		}
	};
</script>

<style scoped>
	.login {
		position: relative;
		width: 100%;
		height: 100%;
		background: url(../assets/bg.jpg) no-repeat center center;
		background-size: 100% 100%;
	}

	.form_container {
		width: 28rem;
		height: 250px;
		position: absolute;
		top: 20%;
		left: 34%;
		padding: 25px;
		border-radius: 5px;
		text-align: center;
	}

	.form_container .manage_tip .title {
		font-family: "宋体";
		font-weight: bold;
		font-size: 2.8rem;
		color: #fff;
	}

	.loginForm {
		margin-top: 20px;
		background-color: #fff;
		padding: 40px 50px 20px 20px;
		border-radius: 5px;
		box-shadow: 0px 5px 10px #cccc;
	}

	.manage_tip {
		margin-bottom: 2rem;
	}

	.submit_btn {
		width: 100%;
	}

	.tiparea {
		text-align: right;
		font-size: 14px;
		color: #333;
	}

	.tiparea p a {
		color: #409eff;
	}
</style>
