<template>
	<div class="detail">
		<div class="df dfc">
			<Mode :item="content"/>
		</div>
		<div class="comments" v-if="content.comments && content.comments.length > 0">
			<p class="tips">注解：</p>
			<ul>
				<li v-for="v in content.comments" :key="v.id">{{v.content}}</li>
			</ul>
		</div>
		<div style="height: 4rem;"></div>
	</div>
</template>

<script>
import axios from 'axios'
import Mode from './mode'
export default {
	name: 'Detail',
	data () {
		return {
			content: {}
		}
	},
	created() {
		const { contentId } = this.$route.query
		this.getData(contentId)
	},
	methods: {
		getData(contentId) {
			axios({
				method: 'get',
				url: '/api/findDetails',
				params: {
					contentId
				}
			}).then( rs => {
				const res = rs.data;
				console.log(rs)
				if (!res.code) {
					this.content = res.data;
				}
			});
		}
	},
	components: {
		Mode
	}
}
</script>

<style scoped lang="scss">
.detail{
	.comments{
		margin: 2rem 1rem 0;
		.tips{
			font-size: 1.5rem;
			margin-bottom: 1.6rem;
		}
		li{
			line-height: 1.8;
			font-size: 1.333333rem;
			text-indent: 2em;
			margin-bottom: 1.2rem;
		}
	}
}

</style>
