<template>
	<view>
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<text class="search_back" @tap="backIndex"></text>
			<input class="ser-input" type="text" value="输入关键字搜索" />
			<text class="search_btn">搜索</text>
		</view>
		<!-- #endif -->
		<SortList
			title="品牌"
			:private_info="private_info.private_brand_info"
			:current="brand.current"
			:is_brand_open="brand.is_brand_open"
			@brand_choice="brand_choice"
			@open="open"
		></SortList>
		<SortList
			title="分类"
			:private_info="private_info.private_sort_info"
			@open="open"
			:current="sort.sort_current"
			:is_brand_open="sort.is_sort_open"
			@brand_choice="brand_choice"
		></SortList>
		<view class="commodity">
			<view class="commodity_item" v-for="(item, index) in private_search_info" :key="index" :data-id="item.id" @tap="goodsInfo(item.id)">
				<image :src="item.logo_img" class="commodity_item_left" />
				<view class="commodity_item_right">
					<view class="commodity_item_right_top">{{ item.name }}</view>
					<view class="commodity_item_right_center">
						<view class="commodity_item_right_center_top">
							<text class="commodity_item_right_center_top_left">￥{{item.first}}</text>
							<view class="commodity_item_right_center_top_right">{{item.disacount}}折</view>
						</view>
						<view class="commodity_item_right_center_bottom">￥{{item.third}}</view>
					</view>
					<view class="commodity_item_right_bottom">
						<view class="commodity_item_right_bottom_left" v-if="item.is_best">精选</view>
						<view class="commodity_item_right_bottom_right">{{ item.supply_type }}</view>
					</view>
				</view>
			</view>
		</view>
		<UniLoadMore :status="no_data ? 'loading' : 'noMore'"></UniLoadMore>
	</view>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import SortList from '@/components/SortList/SortList';

const { mapState, mapActions } = createNamespacedHelpers('storeCommodity');
export default {
	data() {
		return {
			...mapState(['brand_info', 'sort_info']),
			private_info: {
				private_brand_info: [],
				private_sort_info: []
			},
			brand: {
				is_brand_open: false,
				current: null,
				brand: 0
			},
			tags_id:0,
			sort: {
				is_sort_open: false,
				sort_current: null,
				sort_brand_id: 0
			},
			private_search_info: [],
			req_search_info_page: 1,
			no_data: true,
			search_input:""
		};
	},
	components: {
		SortList
	},
	onLoad(e) {
		this.tags_id = e.tags_id ? Number(e.tags_id) : 0;
		this.req_search_info(); // 第一次加载页面数据
		this.BRAND_INFO({
			url: this.$api.apiUrl.POST_QUERY_BRAND,
			data: {
				tags_id: this.tags_id,
				num: 200
			}
		}).then(res => {
			this.private_info.private_brand_info = res.data.slice(0, 8);
		});
		this.sort_list();
	},
	onReachBottom() {
		// 触底事件发生后请求新数据
		if (this.no_data) {
			this.req_search_info_page++;
			this.req_search_info();
		} else {
			// 函数截流如果no_data为假代表请求的数据已经没有或不足够了
			return false;
		}
	},
	onNavigationBarSearchInputChanged(search_text){this.search_button(search_text)},
	onNavigationBarButtonTap(){this.search_dataInfo();},
	methods: {
		...mapActions(['SEARCH_INFO', 'BRAND_INFO', 'SORT_LIST']),
		search_dataInfo() {
			//点击搜索请求数据，方便做多端兼容
			this.$request.POST({
				url:this.$api.apiUrl.POST_BRAND_LIBRARY_QUERY,
				data:{
					tags_id: this.tags_id,
					brand_id: this.brand.brand_id,
					cate_id: this.sort.sort_brand_id,
					goods_name: this.search_input,
					page: 1,
					num: 10
				}
			}).then(res => {
				this.private_search_info = res.data
			})
		},
		search_button(search_text) {
			//点击搜索获取输入框内容
			this.search_input = search_text.text
		},
		open(data) {
			switch (data._name) {
				case '品牌':
					if (this.brand.is_brand_open === false) {
						// 没有打开更多的时候被点击，就去全局state中拿到值全部赋过去
						this.private_info.private_brand_info = this.brand_info();
					} else {
						// 如果已经打开更多，再点击就截取数据的前8项
						this.private_info.private_brand_info = this.brand_info().slice(0, 8);
					}
					// 每次都取反
					this.brand.is_brand_open = !this.brand.is_brand_open;
					break;
				case '分类':
					if (this.sort.is_sort_open === false) {
						this.private_info.private_sort_info = this.sort_info();
					} else {
						this.private_info.private_sort_info = this.sort_info().slice(0, 8);
					}
					this.sort.is_sort_open = !this.sort.is_sort_open;
					break;
				default:
					return false;
					break;
			}
		},
		brand_choice(data) {
			const { index, event, title } = data;
			// 判断是那一个分类被点击了，让他们操作各自的打他值
			if (title === '品牌') {
				if (this.brand.current === index) {
					// 如果点击的是当前被选择元素
					this.brand.current = null;
					this.brand.brand_id = 0;
				} else {
					// 获取点击对象，方便给当前元素添加class
					this.brand.current = index;
					// 获取点击id
					this.brand.brand_id = parseInt(event.currentTarget.dataset.id);
				}
				// 只要品牌被点击了，就消除并重新加载分类的数据
				this.sort.sort_current = null;
				this.sort.sort_brand_id = 0;
				this.sort_list();
			} else if (title === '分类') {
				if (this.sort.sort_current === index) {
					this.sort.sort_current = null;
					this.sort.sort_brand_id = 0;
				} else {
					this.sort.sort_current = index;
					this.sort.sort_brand_id = parseInt(event.currentTarget.dataset.id);
				}
			} else {
				return false;
			}
			// 不管两个谁被点击都会执行如下方法，使页面回到初始值
			this.req_search_info_page = 1;
			this.private_search_info = [];
			this.no_data = true;
			this.req_search_info();
		},
		req_search_info() {
			// 加载页面数据函数
			this.SEARCH_INFO({
				url: this.$api.apiUrl.POST_BRAND_LIBRARY_QUERY,
				data: {
					tags_id: this.tags_id,
					brand_id: this.brand.brand_id,
					cate_id: this.sort.sort_brand_id,
					num: 10,
					page: this.req_search_info_page,
					goods_name: this.search_input
				},
			}).then(res => {
				if (res) {
					// 如果你请求返回的数据长度不够10条就显示没有更多数据
					if (res.data.length < 10) {
						this.no_data = false;
					}
					this.private_search_info = this.private_search_info.concat(res.data);
				} else {
					this.no_data = false;
				}
			});
		},
		sort_list() {
			// 获取分类列表数据
			this.SORT_LIST({
				url: this.$api.apiUrl.POST_QUERY_CLASSIFICATION,
				data: {
					tags_id: this.tags_id,
					brand_id: this.brand.brand_id,
					num: 200
				}
			}).then(res => {
				this.private_info.private_sort_info = res.data.slice(0, 8);
			});
		},
		goodsInfo(id) {
			uni.navigateTo({
				url: `/pages/goodss/product/product?id=${id}`
			});
		}
	}
};
</script>
<style lang="scss">
/* #ifdef MP */
.mp-search-box {
	width: 100%;
	display: flex;
	padding-bottom: 5px;
	.ser-input {
		flex:8;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		font-size: 28upx;
		color: $font-color-base;
		border-radius: 20px;
		background-color: #eee;
	}
	.search_back{
		flex: 1;
		text-align: center;
		font-size: 24px;
	}
	.search_btn{
		flex: 2;
		padding-top: 2px;
		font-weight: 400;
		font-size: 17px;
		text-align: center;
	}
}
/* #endif */
.commodity {
	width: 100%;
	.commodity_item {
		width: 100%;
		height: 240upx;
		display: flex;
		border-top: 2px solid #eee;
		.commodity_item_left {
			width: 30%;
			height: 240upx;
		}
		.commodity_item_right {
			width: 70%;
			position: relative;
			padding-left: 10upx;
			.commodity_item_right_top {
				width: 100%;
				height: 80upx;
				/* #ifdef MP */
				height: 85upx;
				/* #endif */
				font-size: 14px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
			.commodity_item_right_bottom {
				display: flex;
				position: absolute;
				left: 10upx;
				bottom: 15upx;
				.commodity_item_right_bottom_left,
				.commodity_item_right_bottom_right {
					font-size: 12px;
					border-radius: 5px;
					padding: 3upx 10upx;
				}
				.commodity_item_right_bottom_left {
					margin-right: 10px;
					border: 1px solid rgb(236, 90, 80);
					color: rgb(236, 90, 80);
				}
				.commodity_item_right_bottom_right {
					border: 1px solid #00840f;
					color: #00840f;
				}
			}
			.commodity_item_right_center {
				.commodity_item_right_center_top {
					display: flex;
					.commodity_item_right_center_top_left {
						color: #ec6350;
						font-weight: 600;
						font-size: 16px;
					}
					.commodity_item_right_center_top_right {
						color: red;
						height: 35upx;
						font-weight: 400;
						font-size: 13px;
						border: 1px solid red;
						margin: 5upx 0 0 25upx;
						line-height: 30upx;
					}
				}
				.commodity_item_right_center_bottom {
					font-size: 15px;
					color: rgb(165, 165, 165);
					text-decoration: line-through;
				}
			}
		}
	}
}
</style>
