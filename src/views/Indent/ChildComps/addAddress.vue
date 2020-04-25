<template>
	<div class="add-adress">

		<!-- 头部 -->
		<nav-bar class="nav-bar">
			<template v-slot:left>
				<div class="titleBack" @click="onClickLeft">
					<img src="../imgs/fanhui.svg" alt="">
				</div>
			</template>
			<template v-slot:center>添加地址</template>
		</nav-bar>

		<!-- 填写地址 -->
		<!-- 通过 $event 即时获取input的值 -->
<!-- 		<ul class="new-address">
			<li><span>姓名</span><input type="text" placeholder="收货人姓名" :value='data.receiving_name' @input='nameInput($event)'></li>
			<li><span>电话</span><input type="text" placeholder="收货人手机号" :value='data.receiving_phone' @input='phoneInput($event)'></li>
			<li><span>地址</span><input type="text" placeholder="收货地址" :value='data.receiving_address' @input='addressInput($event)'></li>
		</ul> -->
		<!-- 通过 v-model 即时获取input的值 -->
		<ul class="new-address">
			<li><span>姓名</span><input type="text" placeholder="收货人姓名" v-model='data.receiving_name'></li>
			<li><span>电话</span><input type="text" placeholder="收货人手机号" maxlength="11" v-model='data.receiving_phone'></li>
			<li><span>地址</span><input type="text" placeholder="收货地址" v-model='data.receiving_address'></li>
		</ul>
		
		<!-- 使用 -->
		<div class="employ" @click="clickEmploy">保存并使用</div>

		<!-- 历史地址 -->
		<ul class="history-address">
			<p>历史地址：</p>
				<better-scroll class="scroll">
					<li
						class="shipping-address"
						v-for="(item, index) of userInfo.user_receiving"
						:key='index'
						:class="{'li-focus': chooseNum==index}"
						@click="clickItem(item, index)">
						<input type="radio" :id="'choice-'+index" name="drone" :value="item" ref='liId'>
						<label :for="'choice-'+index" class="choice-item">
							<div class="address-info">
								<div class="info">
									<span class="name">{{item.receiving_name}}</span>
									<span class="phone">{{item.receiving_phone}}</span>
								</div>
								<div class="address">{{item.receiving_address}}</div>
							</div>
						</label>
					</li>
				</better-scroll>
		</ul>
	</div>
</template>

<script>
	import NavBar from 'components/NavBar/NavBar.vue'
	import BetterScroll from 'components/BetterScroll/BetterScroll.vue'
	
	import {harvestAddress} from 'api/index.js'
	
	import {mapState} from 'vuex'
	
	export default {
		name: 'addAddress',
		components: {
			NavBar,
			BetterScroll
		},
		computed: {
			...mapState(['userInfo']),
		},
		data(){
			return {
				data: {},  // 保存新的收货地址
				chooseNum: null
			}
		},
		methods: {
			// 返回
			onClickLeft() {
				this.$router.back()
			},
			// 监听input
			// nameInput(event){
			// 	this.data.receiving_name = event.currentTarget.value
			// },
			// phoneInput(event){
			// 	this.data.receiving_phone = event.currentTarget.value
			// },
			// addressInput(event){
			// 	this.data.receiving_address = event.currentTarget.value
			// },
			// 保存地址
			clickEmploy(){
				// 验证
				if(!this.data.receiving_name || !this.data.receiving_phone || !this.data.receiving_address){
					this.$toast.show('请完善地址信息')
					return
				}
				// 整合地址信息
				this.data.user_id = this.userInfo._id
				this.data.receiving_name = this.data.receiving_name || this.userInfo.user_name
				this.data.receiving_phone = this.data.receiving_phone || this.userInfo.user_phone
				this.data.receiving_address = this.data.receiving_address || ''
				// 地址同步至服务端
				harvestAddress(this.data).then(res=>{
					this.userInfo.user_receiving = res.data
				})
				// 返回上一层
				this.onClickLeft()
			},
			// 点击某一历史地址
			clickItem(item, index){
				this.$refs.liId[index].checked = !this.$refs.liId[index].checked
				if(this.$refs.liId[index].checked == false) {
					this.chooseNum = null
					this.data.receiving_name = ''
					this.data.receiving_phone = ''
					this.data.receiving_address = ''
				} else {
					this.chooseNum = index
					this.data.receiving_name = item.receiving_name
					this.data.receiving_phone = item.receiving_phone
					this.data.receiving_address = item.receiving_address
				}
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.add-adress {
		background-color #f5f5f5;
		height 100vh;
	}

	// 头部
	.nav-bar {
		background-color #fff;
		.titleBack {
			padding-top 0.1875rem;
			img {
				width 60%;
				display block;
				margin 0 auto;
			}
		}
	}

	// 填写地址
	.new-address{
		margin-top 3px;
		li{
			background-color #fff;
			display flex;
			height 44px;
			padding 10px 16px;
			margin-top 2px;
			color #323233;
			span{
				flex .2
			}
			input{
				flex .8
				border 0;
				background-color transparent;
				outline none;
				color #323233;
				line-height 44px
			}	
			input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {  // 占位符颜色
				color: #b1b1b4;
			} 
			input::-moz-placeholder, textarea::-moz-placeholder { 
				color: #b1b1b4;
			} 
			input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
				color: #b1b1b4;
			} 
		}
	}

	// 保存并使用
	.employ{
		width 90%
		margin 0 auto
		height 3rem
		line-height 3rem
		text-align center
		background-color #fff;
		border: 1px solid #c8c8c8;
		background-color rgba(200, 200, 200, .2)
		margin-top 30px
	}
	
	// 历史地址
	.scroll{
		height calc(100vh - 44px - 138.92px - 78px - 80px)
		overflow hidden
	}
	.history-address{
		margin-top 50px;
		// 提示
		p{
			font-weight 600;
			font-size 1.2rem;
			margin-bottom 5px;
		}
		// 地址列表
		.shipping-address{
			background-color #fff;
			width 100%
			align-items center
			padding 16px
			border-bottom 1px solid #b9b9b9;
			display flex
			.via{
				// flex 1
				margin-right 10px
			}
			.choice-item{
				margin-left 10px
			}
			// 地址信息
			.address-info{
				flex 1
				.info>.name{
					margin-right 20px
				}
				.info>.phone{
					// color #a5a5a5;
					opacity .7  // 不透明度
					font-size .9rem
				}
				.address{
					word-wrap break-word
					word-break break-all
				}
			}
			.arrows{
				// flex 1
				height 50%
				margin auto 0
				margin-left 5px
			}
		}
		.li-focus{
				background-color #60C680
				color #fff
		}
	}

</style>
