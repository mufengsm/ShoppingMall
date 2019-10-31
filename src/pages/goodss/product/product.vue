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
			<view class="title">{{commodityInfo.title}}</view>
			<text class="supply_type">{{commodityInfo.supplyType}}</text>
		</view>
		<!--  分享 -->
			<!-- <view class="share-section" @tap="share">
				<view class="share-icon">
					<text class="yticon icon-xingxing"></text>
					返
				</view>
				<text class="tit">该商品分享可领49减10红包</text>
				<text class="yticon icon-bangzhu1"></text>
				<view class="share-btn">
					立即分享
					<text class="yticon icon-you"></text>
				</view>
			</view>
 			-->
		<view class="c-list">
			<!-- 规格选择 -->
			<view class="c-row b-b" @tap="toggleSpec">
				<text class="tit">选择</text>
				<view class="con">
					<text 
					class="selected-text" 
					v-for="(sItem, sIndex) in specSelected" 
					:key="sIndex"
					>已选：{{ sItem.name }}</text>
				</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<!-- 购物保障 -->
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
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
	<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>

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
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{ active: favorite }" @tap="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @tap="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn">加入购物车</button>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @tap="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @tap.stop="stopPrevent">
				<view class="a-t">
					<image :src="popup.logoImg"></image>
					<view class="right">
						<text class="price">商品单价：¥{{commodityInfo.first}}</text>
						<text class="stock">零售价：</text>
						<text class="stock">起订价：</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">{{ sItem.name }}</text>
						</view>
					</view>
				</view>
				<view v-for="(item, index) in specList" :key="index" class="attr-list">
					<text>{{ item.name }}</text>
					<view class="item-list">
						<text
							v-for="(childItem, childIndex) in specChildList"
							v-if="childItem.pid === item.id"
							:key="childIndex"
							class="tit"
							:class="{ selected: childItem.selected }"
							@tap="selectSpec(childIndex, childItem.pid)"
						>
							{{ childItem.name }}
						</text>
					</view>
				</view>
				<button class="btn" @tap="toggleSpec">完成</button>
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
			popup:{
				logoImg:"",
			},
			commodityInfo:{
				title:"",
				first:"",
				disacount:"",
				third:"",
				supplyType:""
			},
      desc: "",
      specList: [
        {
          id: 1,
          name: '尺寸',
        },
      ],
      specChildList: [
        {
          id: 1,
          pid: 1,
          name: 'XS',
        },
        {
          id: 2,
          pid: 1,
          name: 'S',
        },
        {
          id: 3,
          pid: 1,
          name: 'M',
        },
        {
          id: 4,
          pid: 1,
          name: 'L',
        },
        {
          id: 5,
          pid: 1,
          name: 'XL',
        },
        {
          id: 6,
          pid: 1,
          name: 'XXL',
        }
      ],
    };
  },
  components: {
    Share,
	},
  async onLoad(options) {
		// 商品信息
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
					logoImg:result.logo_img
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
    // // 规格 默认选中第一条
    // this.specList.forEach((item) => {
    //   for (const cItem of this.specChildList) {
    //     if (cItem.pid === item.id) {
    //       this.$set(cItem, 'selected', true);
    //       this.specSelected.push(cItem);
    //       break; // forEach不能使用break
    //     }
    //   }
    // });
    this.shareList = await this.$api.json('shareList');
  },
  methods: {
    // 规格弹窗开关
    toggleSpec() {
      if (this.specClass === 'show') {
        this.specClass = 'hide';
        setTimeout(() => {
          this.specClass = 'none';
        }, 250);
      } else if (this.specClass === 'none') {
        this.specClass = 'show';
      }
    },
    // 选择规格
    selectSpec(index, pid) {
      const list = this.specChildList;
      list.forEach((item) => {
        if (item.pid === pid) {
          this.$set(item, 'selected', false);
        }
      });

      this.$set(list[index], 'selected', true);
      // 存储已选择
      /**
			 * 修复选择规格存储错误
			 * 将这几行代码替换即可
			 * 选择的规格存放在specSelected中
			 */
      this.specSelected = [];
      list.forEach((item) => {
        if (item.selected === true) {
          this.specSelected.push(item);
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
		}
  },
};
</script>

<style lang="scss">
@import "./product.scss"
</style>
