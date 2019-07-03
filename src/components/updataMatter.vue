<template>
	<div>
		<el-dialog :title="matterdialog.title" :visible.sync="matterdialog.show" :close-on-click-modal='false' :close-on-press-escape='false'
		 :modal-append-to-body="false">
			<div class="form">
				<el-form ref="form" label-width="120px" :model="matterform" :rules="rules" style="margin:10px;width:auto;">
				<el-form-item prop='title' label="任务标题:">
				    <el-input type="title" v-model="matterform.title" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop='content'  label="任务内容:">
				    <el-input type="content" v-model="matterform.content" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop='remindTime' label="设置提醒时间:">
					<el-date-picker v-model="matterform.remindTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择提醒时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item  class="text_right">
				    <el-button @click="matterdialog.show = false" >取 消</el-button>
				    <el-button type="primary" @click='onSubmit()'>提  交</el-button>
				</el-form-item>
		
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	export default{
		name:"updataMatter",
		props:{
			matterdialog:Object,
			matterform:Object
		},
		data(){
			return{
				rules:{
					title:{ required: true, message: "请填写任务标题！", trigger: "blur" },
					content:{ required: true, message: "请填写代办任务内容！", trigger: "blur" },
					remindTime:{ required: true, message: "请设置提醒时间！", trigger: "blur" }
				}
			}
		},
		methods:{
			onSubmit(){
				// console.log(this.matterform);
				this.$axios({
					method:'post',
					url:'/matter/saveMatter',
					headers: {'content-type': 'application/x-www-form-urlencoded'},
					data:qs.stringify(this.matterform),
				}).then(res => {
					this.$message({
						message: "提交代办任务成功",
						type: "success"
					});
					this.matterdialog.show = false;
					this.$emit("update");
				});
			}
		}
		
	}
</script>

<style>
</style>
