<template>
    <div class="DialogFound">
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

                    <el-form-item prop='interviewerName' label="面试姓名:">
                        <el-input type="interviewerName" v-model="form.interviewerName" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop='phone'  label="面试电话:">
                        <el-input type="phone" v-model="form.phone" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop='position' label="面试岗位:">
                        <el-input type="position" v-model="form.position" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop='startTime' label="进入公司时间:">
						<el-date-picker v-model="form.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间">
						</el-date-picker>
                    </el-form-item>

                    <el-form-item prop='endTime' label="离开公司时间:">
						<el-date-picker v-model="form.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间">
						</el-date-picker>
                    </el-form-item>

                    <el-form-item prop='note' label="面试结果:">
                        <el-input type="note" v-model="form.result" clearable></el-input>
                    </el-form-item>

                     <el-form-item label="面试HR:"> 
                        <el-input type="hrName" v-model="form.hrName" clearable></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false" >取 消</el-button>
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
  name: "DialogFound",
  props: {
    dialog: Object,
    form: Object
  },
  data() {
    return {
	 
      form_rules: {
        interviewerName: [
          { required: true, message: "来访人姓名不能为空！", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "来访人电话不能为空！", trigger: "blur" }
        ],
        position: [
          { required: true, message: "访问人姓名不能为空！", trigger: "blur" }
        ],
        startTime: [{ required: true, message: "开始时间不能为空！", trigger: "blur" }],
		endTime: [{ required: true, message: "结束时间不能为空！", trigger: "blur" }],
      }
    };
  },
  
  methods: {
    onSubmit(){
      const data1 = this.form;
      // console.log(data1)
      this.$axios({
        method: 'POST',
        url:'/interview/saveInterview',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data1),  }) 
        .then(res => {
        
        this.$message({
          message: "面试信息提交成功",
          type: "success"
        });
          this.dialog.show = false;
          this.$emit("update");
        });
    }
  }
};
</script>

