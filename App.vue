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

<style lang='scss'>
	@font-face {
	  font-family: 'iconfont';
	  src: url('./static/aliFont/iconfont.eot');
	  src: url('./static/aliFont/iconfont.eot?#iefix') format('embedded-opentype'),
	      url('./static/aliFont/iconfont.woff2') format('woff2'),
	      url('./static/aliFont/iconfont.woff') format('woff'),
	      url('./static/aliFont/iconfont.ttf') format('truetype'),
	      url('./static/aliFont/iconfont.svg#iconfont') format('svg');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.icon-downarrow:before {
	  content: "\e692";
	}

	.icon-downarrow-copy:before {
	  content: "\e693";
	}


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
</style>
