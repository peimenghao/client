<template>
	<div class="logFund">
		<el-dialog :title="vdialog.title" :visible.sync="vdialog.show" :close-on-click-modal='false' :close-on-press-escape='false'
		 :modal-append-to-body="false">
			<div class="form">
				<el-form ref="form" label-width="120px" :model="vform" style="margin:10px;width:auto;">

					<el-form-item prop='name' label="来访姓名:">
						<el-input type="name" v-model="vform.name" clearable></el-input>
					</el-form-item>

					<el-form-item prop='phone' label="来访人电话:">
						<el-input type="phone" v-model="vform.phone" clearable></el-input>
					</el-form-item>

					<el-form-item prop='vsisitPerson' label="访问人名字:">
						<el-input type="vsisitPerson" v-model="vform.vsisitPerson" clearable></el-input>
					</el-form-item>

					<el-form-item prop='visitTime' label="创建时间:">
						<!-- <el-input type="cash" v-model="form.cash"></el-input> -->
						<!-- <el-date-picker v-model="vform.visitTime" type="datetime" placeholder="选择时间">
						</el-date-picker> -->
						<el-date-picker v-model="vform.visitTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
							
						</el-date-picker>
					</el-form-item>

					<el-form-item prop='receptionist' label="接待人名字:">
						<el-input type="receptionist" v-model="vform.receptionist" clearable></el-input>
					</el-form-item>

					<el-form-item prop='content' label="备注:">
						<el-input type="content" v-model="vform.content" clearable></el-input>
					</el-form-item>

					<el-form-item label="拜访事由">
						<el-input type="textarea" v-model="vform.note" clearable></el-input>
					</el-form-item>

					<el-form-item class="text_right">
						<el-button @click="vdialog.show=false">取 消</el-button>
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
		name: "VisitorDialog",
		props: {
			vdialog: Object,
			vform: Object
		},
		data() {
			return {
				
			};
		},
		methods: {
			onSubmit() {
				const data1 = this.vform;
				//console.log(JSON.stringify(data1) + "数据");
				this.$axios({
						method: 'POST',
						url: '/visitor/saveVisitor',
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
						this.vdialog.show=false;
						this.$emit("update");
					});
			}
		}
	};
</script>
