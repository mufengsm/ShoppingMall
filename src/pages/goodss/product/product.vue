<template>
	<view class="container">
		<view class="carousel">
			<!-- 轮播图 -->
			<swiper indicator-dots circular="true" duration="400">
				<swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index">
					<view class="image-wrapper"><image :src="item.src" class="loaded" mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>
			<!-- 分享按钮 -->
			<view class="forward" @tap="forward">
				<text class="iconfont icon-zhuanfa-xian"></text>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="introduce-section">
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{commodityInfo.first}}</text>
				<text class="coupon-tip">{{commodityInfo.disacount}}折</text>
				<view class="bot-row sell">已卖出: {{123}}件</view>
			</view>
			<view class="bot-row">市场价：<text class="third">¥{{commodityInfo.third}}</text></view>
				<view class="goods_info">
					<view class="from">自营</view>
					<view class="title">{{commodityInfo.title}}</view>
				</view>
			<text class="supply_type">{{commodityInfo.supplyType}}</text>
		</view>

		<view class="c-list">
			<!-- 规格选择 -->
			<view class="c-row b-b" @tap="toggleSpec('specs')">
				<text class="tit">选择</text>
				<view class="con">
					<text 
					class="selected-text" 
					>{{selected}}{{popup.haveChosen}}</text>
				</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<!-- 购物保障 -->
			<view class="c-row b-b" @tap="toggleSpec('service')">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text style="color: #df0e1d;">多多美优购</text>
					<text>全程保障，购物无忧</text>
				</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<image 
				class="portrait" 
				src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" 
				mode="aspectFill"
				></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，我很喜欢,推荐大家前来购买</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-11-08 12:21</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品介绍 -->
		<view class="detail-desc">
			<view class="d-header"><text>图文详情</text></view>
			<rich-text :nodes="desc"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/indexs/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/carts/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{ active: favorite }" @tap="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @tap="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn"
				@tap="addCart"
				>加入购物车</button>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @tap="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<!-- 购买商品弹窗 -->
			<view v-if="isPopup==='specs'" class="layer attr-content guarantee_layer" @tap.stop="stopPrevent">
				<view class="a-t">
					<image :src="popup.logoImg"></image>
					<view class="right">
						<text class="price">商品单价：¥{{popup.marketPrice}}</text>
						<text class="stock">零售价：{{popup.purchasePrice}}</text>
						<text class="stock">起订价：{{popup.salesPrice}}</text>
						<view class="selected">
							<text class="selected-text">
								{{selected}}：{{popup.haveChosen ? popup.haveChosen : popup.name}}
							</text>
						</view>
					</view>
				</view>
				<!-- 规格列表 -->
				<view class="attr-list">
					<text>{{ popup.name }}</text>
					<view class="item-list">
						<text
							v-for="(childItem, childIndex) in popup.specChildList"
							:key="childIndex"
							class="tit"
							:class="{ selected: childItem.selected }"
							@tap="selectSpec(childItem, childIndex)"
						>
							{{ childItem.name }}
						</text>
					</view>
				</view>
				<!-- 增加商品数量 -->
				<view class="attr-list">
					<view class="quantity_adjusted">
						<text class="selected_quantity">已选</text>
						<button @tap="changeQuantity('-')">-</button>
						<input type="number" :value="purchaseQuantity" @input="detectionValue">
						<button @tap="changeQuantity('+')">+</button>
					</view>
				</view>
				<button class="btn" @tap="toggleSpecSpecial">确定</button>
			</view>
			<!-- 服务弹窗 -->
			<view v-if="isPopup==='service'" class="layer attr-content guarantee_layer" @tap.stop="stopPrevent">
					<view class="guarantee">基础保障</view>
					<view class="guarantee_item">
							<view class="mark">保</view>
							<view class="title">正品保障</view>
							<view class="info">商品支持正品保障服务</view>
					</view>
					<view class="guarantee_item">
							<view class="mark">七</view>
							<view class="title">七天无理由退货</view>
							<view class="info">消费者在满足7天无理由退换货申请条件的前提下，可以提出“7天无理由退换货”的申请</view>
					</view>
					<button class="btn" @tap="toggleSpec">确定</button>
			</view>
		</view>
<!-- <Share ref="share" :contentHeight="580" :shareList="shareList"></Share> -->
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Share from  "@/components/Share/Share";
const { mapState, mapActions } = createNamespacedHelpers('storeCommodity');
export default {
  data() {
    return {
      specClass: 'none',
      specSelected: [],
      favorite: true,
      shareList: [],
			imgList: [],
			selected:"请选择规格",
			popup:{
				logoImg:"",
				name:"",
				salesPrice:"",
				specChildList: [],
				haveChosen:"",
				marketPrice:""
			},
			commodityInfo:{
				title:"",
				first:"",
				disacount:"",
				third:"",
				supplyType:""
			},
			desc: "",
			isPopup:"specs",
			purchaseQuantity:1,
			specIndex:0
    };
  },
  components: {
    Share,
	},
  async onLoad(options) {
		// 商品信息
		this.goodsId = options.id;
		this.$request.GET({
				url:this.$api.apiUrl.GET_GOODS_INFO,
				data:{
					id:options.id
				}
		}).then((res)=>{
			if(res.code === 200){
				let result = res.data;
				console.log(result);
				
				// 轮播图
				this.imgList = result.slider_img.map((item,index) => ({src:item}));
				// 商品信息
				this.commodityInfo = {
					title:result.title,
					first:result.price.first,
					disacount:result.price.disacount,
					third:result.price.third,
					supplyType:result.supply_type
				}
				// 规格信息
				this.specSelected = result.spec
				// 弹出层信息
				this.popup={
					logoImg:result.logo_img,
					name:result.spec[0].name.split(":")[0],
					marketPrice:result.spec[0].market_price,
					purchasePrice:result.spec[0].purchase_price,
					salesPrice:result.spec[0].sales_price,
					specChildList: result.spec.map((item,index)=>{
						return {
								id:index,
								name:result.spec[index].name.split(":")[1],
							}
					}),
					haveChosen:""
				}
				// 图文介绍
				this.desc = `<div style="width:100%">${result.content.replace(/<img/g,"<img class='imgWidth'")}</div>`;
			}else{uni.showToast({title:res.msg,"icon":"none"})}
		})
		// 商品评论
		this.$request.GET({
			url:this.$api.apiUrl.GET_GOODS_COMMENT,
			data:{
				id:options.id,
				page:1
			}
		}).then((res)=>{
			console.log(res,"商品评论");
		})
  },
  methods: {
    // 规格弹窗开关
    toggleSpec(popup) {
			this.isPopup = popup;
      if (this.specClass === 'show') {
        this.specClass = 'hide';
        setTimeout(() => {
          this.specClass = 'none';
        }, 250);
      } else if (this.specClass === 'none') {
        this.specClass = 'show';
      }
		},
		toggleSpecSpecial(){
			// 如果选规格的时候没有选
				if(this.selected === "请选择规格"){
					uni.showToast({
						title:"请选择规格",
						icon:"none"
					})
					return false;
				}else{
					this.toggleSpec();
					this.addCart();
				}
		},
    // 选择规格
    selectSpec(item, index) {
			this.specIndex = index;			
			// 设置两个显示文本状态
			this.selected = "已选：";
			this.popup.haveChosen = item.name;
			// 选中颜色
			const list = this.popup.specChildList;
      list.forEach((item,listIndex) => {
        if (index === listIndex) {
					this.$set(item, 'selected', true);
					const selectedProductInfo = this.specSelected[listIndex];
					// 商品单价
					this.popup.marketPrice = selectedProductInfo.market_price;
					// 零售价
					this.popup.purchasePrice = selectedProductInfo.purchase_price;
					// 起订价
					this.popup.salesPrice = selectedProductInfo.sales_price;
        }else{
					this.$set(list[listIndex], 'selected', false);
				}
			});
    },
    // 分享
    share() {
      this.$refs.share.toggleMask();
    },
    // 收藏
    toFavorite() {
      this.favorite = !this.favorite;
    },
    buy() {
      uni.navigateTo({
        url: '/pages/mys/login/login',
      });
    },
		stopPrevent() {},
		forward(){
			uni.showShareMenu({
				title:"商品",
				content:"内容",
				imageUrl:"https://meizi.manogue.com.cn/static/wap/images/ddmlogoicon.png",
				path:"/pages/gooodss/product/product",
				success:function () {
					uni.showToast({
						title:"分享成功"
					})
				}
			})
		},
		changeQuantity(mathematicalSymbols){
			// 增加于删除按钮
			if(mathematicalSymbols === "+"){
				this.purchaseQuantity++
			}else if(this.purchaseQuantity>1){
				this.purchaseQuantity--
			}
		},
		detectionValue(e){
			const num = e.detail.value;
			if (num === "") {
				// 如果输入为空
				this.purchaseQuantity = 1;
				return 1
			} else {
				// 判断值是否小于0或者是小数
				var r = /^\+?[1-9][0-9]*$/;
				if (r.test(num)) {
					this.purchaseQuantity = num;
					return num
				} else {
					// 如果数值不符合:大于0,并且是正整数
					this.purchaseQuantity = 1;
					return 1
				}
			}
		},
		addCart(){
			if(this.selected === "请选择规格"){
				this.toggleSpec('specs')
			}else{
				this.$request.POST({
					url:this.$api.apiUrl.SAVE_CART,
					data:{
						goods_id:this.goodsId,
						spec_id:this.specSelected[this.specIndex].id,
						goods_num:this.purchaseQuantity,
						is_page:"product"
					}
				}).then(res=>{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})					
				})
			}
		}
	},
};
</script>

<style lang="scss">
@import "./product.scss"
</style>
