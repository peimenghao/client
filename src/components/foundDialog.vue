<template>
	<div class="logFund">
		<el-dialog :title="fdialog.title" :visible.sync="fdialog.show" :close-on-click-modal='false' :close-on-press-escape='false'
		 :modal-append-to-body="false">
			<div class="form">
				<el-form ref="form" label-width="120px" :model="fform" style="margin:10px;width:auto;">
				<el-form-item prop='name' label="面试姓名:">
				    <el-input type="name" v-model="fform.interviewerName" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop='phone'  label="面试电话:">
				    <el-input type="phone" v-model="fform.phone" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop='vsisitPerson' label="面试岗位:">
				    <el-input type="vsisitPerson" v-model="fform.position" clearable></el-input>
				</el-form-item>
				
				<el-form-item prop='visitTime' label="进入公司时间:">
					<el-date-picker v-model="fform.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item prop='visitTime' label="离开公司时间:">
					<el-date-picker v-model="fform.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item prop='note' label="面试结果:">
				    <el-input type="note" v-model="fform.result" clearable></el-input>
				</el-form-item>
				
				 <el-form-item label="面试HR:"> 
				    <el-input type="hrName" v-model="fform.hrName" clearable></el-input>
				</el-form-item>
				
				<el-form-item  class="text_right">
				    <el-button @click="fdialog.show = false" >取 消</el-button>
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
		name: "VisitorDialog",
		props: {
			fdialog: Object,
			fform: Object
		},
		data() {
			return {
				
			};
		},
		methods: {
			onSubmit() {
				const data1 = this.fform;
				console.log(JSON.stringify(data1) + "数据");
				this.$axios({
						method: 'POST',
						url: '/interview/saveInterview',
						headers: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: qs.stringify(data1),
					})
					.then(res => {
						this.$message({
							message: "修改成功",
							type: "success"
						});
						this.fdialog.show=false;
						this.$emit("update");
					});
			}
		}
	};
</script>
