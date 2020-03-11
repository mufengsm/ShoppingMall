<script>
/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
import {
  mapMutations,
} from 'vuex';

export default {
  methods: {
    ...mapMutations(['login']),
  },
  onLaunch() {
    const userInfo = uni.getStorageSync('userInfo') || '';
    if (userInfo.id) {
      // 更新登陆状态
      uni.getStorage({
        key: 'userInfo',
        success: (res) => {
          this.login(res.data);
        },
      });
    }
  },
};
</script>
<style>@import './static/aliFont/iconfont.css';</style>
<style lang='scss'>
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-lg + 2upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type=default],
	button[type=default] {
		color: $font-color-dark;
	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}
	.uni-input-input{
		/* 这里是修改原生input搜索框样式 */
		margin: 4px;
	}
	// 本香样式
	.font-ml{font-size: 3.7333vw;}
	.font-l{font-size:3.2vw;}
	.bg-white{background-color: #fff;}
	.flex{display: flex;}
	// 全屏宽高
	.full-height {
		height: 100%;
	}
	.full-width{
		width: 100%;
	}
	.getmsmcodebtn {
		margin-left: 5%;
		width: 30%;
		line-height: 8.8vw;
		border-radius: 1.3333vw;
		font-size: 3.2vw !important;
		text-align: center;
		background: linear-gradient(to right, #f9e6c4, #c9ad81);
	}
	.flex-alin-center{align-items: center;}
	.btn{
		color: #40392E;
		text-align: center;
		border-radius: 5.3333vw;
		background: -webkit-gradient(linear, left top, right top, from(#F9E6C4), to(#C9AD81));
		background: linear-gradient(to right, #F9E6C4, #C9AD81);
	}
	
</style>
