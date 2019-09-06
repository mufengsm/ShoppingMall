<template>
	<view>
		<view class="sort">
			<view class="sort_info">
				<view class="sort_info_left">{{title}}</view>
				<view class="sort_info_right" @tap="open(title)">
					{{ is_brand_open == false ? '展开更多' : '收起'+ title }}
					<span :class="is_brand_open ? 'iconfont icon-downarrow-copy' : 'iconfont icon-downarrow'"></span>
				</view>
				<view class="sort_info_box">
					<view
						v-for="(item, index) in private_info"
						:class="index == current ? 'sort_info_item active' : 'sort_info_item'"
						:data-id="item.id"
						:key="index"
						@tap="brand_choice(index, $event,title)"
					>
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
  name: 'SortList',
  data() {
    return {

    };
  },
  props: ['private_info', 'current', 'is_brand_open', 'title'],
  methods: {
    brand_choice(index, event, title) {
      this.$emit('brand_choice', { index, event, title });
    },
    open(_name) {
      this.$emit('open', { _name });
    },
  },
};
</script>

<style lang="scss" scoped>
.sort {
	border-top: 2px solid rgb(235, 235, 235);
	.sort_info {
		display: flex;
		flex-wrap: wrap;
		padding: 20upx;
		.sort_info_left,
		.sort_info_right {
			width: 50%;
		}
		.sort_info_left {
			font-weight: 700;
			border-left: 3px solid black;
			padding-left: 18upx;
			line-height: 47upx;
		}
		.sort_info_right {
			text-align: right;
			color: rgb(102, 102, 102);
			font-size: 15px;
			line-height: 50upx;
			.iconfont {
				font-weight: 600;
			}
		}
		.sort_info_box {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			padding-left: 10upx;
			.sort_info_item {
				width: 150upx;
				height: 60upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				border-radius: 5px;
				text-align: center;
				line-height: 60upx;
				margin: 13upx;
				font-size: 14px;
				color: black;
				background-color: rgb(238, 238, 238);
			}
			.active {
				background-color: rgb(236, 90, 80);
				color: white;
			}
		}
	}
}
</style>
