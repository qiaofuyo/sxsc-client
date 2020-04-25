<template>
	<div id="nav">
		<div class="nav-grid" v-for="(nav, index) in homenav_data" :key="index" @click='clickNav(index)'>
			<div class="nav-cell">
				<div class="nav-img">
					<img v-lazy="nav.image_url" />
				</div>
				<span class="nav-text">{{nav.name}}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'HomeNav',
		props: {
			homenav_data: Array
		},
		methods: {
			clickNav(index) {
				this.$router.replace({
					name: 'classify',
					params: {secondaryIndex: index+1}
				})
			}
		},
	}
</script>

<style scoped lang="stylus">
	#nav
		background-color #fff
		.nav-grid
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			justify-content: center;
			display inline-block
			width 20%
			.nav-cell
				box-sizing border-box
				padding 13px 8px
				text-align center
				.nav-img
					width 70%
					margin 0 auto
					img
						width 100%
				.nav-text
					font-size .9rem
					color #7d7e80
					display inline-block
					margin-top .5rem
</style>
