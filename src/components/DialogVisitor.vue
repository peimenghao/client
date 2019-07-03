<template>
    <div class="DialogVisitor">
         <el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">
            <div class="form">
                <el-form 
				   :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">

                    <el-form-item prop='name' label="来访姓名:">
                        <el-input type="name" v-model="form.name" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop='phone'  label="来访人电话:">
                        <el-input type="phone" v-model="form.phone" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop='vsisitPerson' label="访问人名字:">
                        <el-input type="vsisitPerson" v-model="form.vsisitPerson" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop='visitTime' label="创建时间:">
                        <!-- <el-input type="cash" v-model="form.cash"></el-input> -->
						
						<el-date-picker v-model="form.visitTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间">
						</el-date-picker>
                    </el-form-item>

                    <el-form-item prop='receptionist' label="接待人名字:">
                        <el-input type="receptionist" v-model="form.receptionist" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop='note' label="备注:">
                        <el-input type="note" v-model="form.content" clearable></el-input>
                    </el-form-item>

                     <el-form-item label="拜访事由"> 
                        <el-input type="textarea" v-model="form.note" clearable></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit()'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "DialogVisitor",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
	 
      form_rules: {
        name: [
          { required: true, message: "来访人姓名不能为空！", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "来访人电话不能为空！", trigger: "blur" }
        ],
        vsisitPerson: [
          { required: true, message: "访问人姓名不能为空！", trigger: "blur" }
        ],
        visitTime: [{ required: true, message: "时间不能为空！", trigger: "blur" }]
      }
    };
  },
  
  methods: {
    onSubmit(){
      const data1 = this.form;
      console.log(data1)
      this.$axios({
        method: 'POST',
        url:'/visitor/saveVisitor',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data1),  }) 
        .then(res => {
        // 注册成功
        this.$message({
          message: "访客信息提交成功",
          type: "success"
        });
          this.dialog.show = false;
          this.$emit("update");
        });
    }
  }
};
</script>

