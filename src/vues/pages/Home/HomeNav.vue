<template>
	<div id="nav">
		<div class="nav-grid" v-for="nav in homenav_data" :key="nav._id">
			<div class="nav-cell">
				<div class="nav-img">
					<img :src="nav.image_url" />
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
		}
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
				.nav-text
					font-size .9rem
					color #7d7e80
					display inline-block
					margin-top .5rem
</style>
