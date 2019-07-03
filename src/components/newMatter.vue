<template>
	<div>
		<el-dialog :title="mdialog.title" :visible.sync="mdialog.show" :close-on-click-modal='false' :close-on-press-escape='false'
		 :modal-append-to-body="false">
			<div class="form">
				<el-form ref="form" label-width="120px" :model="mform" :rules="rules" style="margin:10px;width:auto;">
				<el-form-item prop='title' label="任务标题:">
				    <el-input type="title" v-model="mform.title" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop='content'  label="任务内容:">
				    <el-input  type="textarea" :rows="5" v-model="mform.content" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop='remindTime' label="设置提醒时间:">
					<el-date-picker v-model="mform.remindTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择提醒时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item  class="text_right">
				    <el-button @click="mdialog.show = false" >取 消</el-button>
				    <el-button type="primary" @click='onSubmit()'>提  交</el-button>
				</el-form-item>
		
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from "qs"
	export default{
		name:"newMatter",
		props:{
			mdialog:Object
		},
		data(){
			return{
				mform:{},
			rules:{
				title:{ required: true, message: "请填写任务标题！", trigger: "blur" },
				content:{ required: true, message: "请填写代办任务内容！", trigger: "blur" },
				remindTime:{ required: true, message: "请设置提醒时间！", trigger: "blur" }
			},
		}
			
		},
		methods:{
			onSubmit(){
				this.mform.userId=localStorage.getItem("userId");
				// console.log(this.mform);
				this.$axios({
					method:'post',
					url:'/matter/saveMatter',
					headers: {'content-type': 'application/x-www-form-urlencoded'},
					data:qs.stringify(this.mform),
				}).then(res => {
					this.$message({
						message: "提交代办任务成功",
						type: "success"
					});
					this.mdialog.show = false;
					this.$emit("update");
				});
			}
		}
	}
</script>

<style scoped>
	
</style>
