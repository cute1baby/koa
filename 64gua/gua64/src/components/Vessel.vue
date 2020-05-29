<template>
	<div class="hello">
		<Header class="header">
			<cube-input
				class="search"
				v-model="searchName"
				:clearable="clearable"
				placeholder="输入关键词：如乾卦"
				@keyup.enter.native="handleKeyup"
			></cube-input>
		</Header>
		<div class="container">
            <p class="count" v-if="count > 0">
                查询到<span>{{count}}</span>条记录
            </p>
            <p class="count" v-else>抱歉，没有匹配到记录</p>
            <div class="df fwrap" v-if="contentList.length > 0">
			    <Mode v-for="m in contentList" :key="m.id" :item="m"/>
            </div>
		</div>

		<div style="height: 50px;"></div>
	</div>

</template>

<script>
import axios from 'axios'
import Mode from './mode'
export default {
	name: 'Vessel',
	data () {
		return {
			searchName: '',
			clearable: {
				visible: true,
				blurHidden: true
			},
			count: 0,
			contentList: []
		}
	},
	created() {
		this.getData()
	},
	methods: {
		// 获取数据
		getData() {
			axios({
				method: 'get',
				url: '/api/findContent',
				params: {
					searchName: this.searchName
				}
			}).then( rs => {
			if (!rs.code) {
					this.count = rs.data.count;
					this.contentList = rs.data.data;
				}
			});
		},
		handleKeyup() {
			console.log(1111)
			this.getData()
		}
	},
	components: {
		Mode
	}
}
</script>

<style scoped lang="scss">
.header{
	width: 100%;
	padding: 1rem 0.8rem .4rem;
	box-sizing: border-box;
	background: #fff;
	position: fixed;
	left: 0;
	top: 0;
	display: block;
	box-shadow: 1px 3px 4rem rgba(0,0,0,0.1);
}
.container{
	margin-top: 6rem;
	padding: .8rem .4rem;
}
</style>
