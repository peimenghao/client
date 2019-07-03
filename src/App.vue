<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import jwt_decode from "jwt-decode";
	export default {
		name: "app",
		// mounted() {
		// 	// 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
		// 	window.onbeforeunload = function(e) {
		// 		var storage = window.localStorage;
		// 		storage.clear()
		// 	}
		// },
		created() {
			if (localStorage.eleToken) {
				const decode = jwt_decode(localStorage.eleToken);
				this.$store.dispatch("set_token", !this.isEmpty(decode));
				this.$store.dispatch("set_userInfo", decode);
			}
		},
		methods: {
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


<style>
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
	}

	body .el-table th.gutter {
		display: table-cell !important;
	}
</style>
