<template>
    <div class="register">
			<HeadNav></HeadNav>
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">OA在线后台管理系统</span>
            </div>
            <el-form :model="registerUser" :rules="rules" class="registerForm" ref="registerForm" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="registerUser.phone" placeholder="请输入手机"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="registerUser.identity" placeholder="请选择部门">
                      <el-option v-for="items in allDepartment" :key="items.departId" :label="items.departName" :value="items.departId" :id="items.departId" ></el-option>   
                    </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"  class="submit_btn" @click="submitForm()">注 册</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import qs from 'qs'
import HeadNav from "../components/HeadNav.vue";
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "",
        phone:""
      },
      allDepartment:'',
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
            { required: true, trigger: 'blur', message: "手机不能为空"},
            { min: 5, max: 11, message: "长度在 5 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getDepartment();
  },
  methods: {
    getDepartment() {
      // 获取部门数据
      this.$axios("/login/loginPage").then(res => {
        this.allDepartment = res.data.data;
      });
    },
    submitForm(){
      const data = {
          userName: this.registerUser.name,
          email: this.registerUser.email,
          password: this.registerUser.password2,
          departId: this.registerUser.identity,
          phone: this.registerUser.phone,  
      }
      // console.log(data)
      this.$axios({
        method: 'POST',
        url:'/login/register',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),  }) 
        .then(res => {
        // 注册成功
        this.$message({
          message: "注册成功！",
          type: "success"
        });
        this.$router.push("/login");
          });
        }
  }
};
</script>


<style scoped>
.register {
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
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.manage_tip{
	margin-bottom: 2rem;
}
.form_container .manage_tip .title {
  font-family: "宋体";
  font-weight: bold;
  font-size: 2.8rem;
  color: #fff;
	
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 40px 50px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>



