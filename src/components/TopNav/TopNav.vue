
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  needBack: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
    default: '#fff',
  },
  backCustom: {
    type: Function,
  },
  needShare: {
    type: Boolean,
    default: false,
  },
  shareCustom: {
    type: Function,
  },
  needBorder: {
    type: Boolean,
    default: false,
  },
  // 标题颜色
  titleColor: {
    type: String,
    default: '#000000',
  },
});

/**
 * 返回事件
 */
const goBack = () => {
  if (props.backCustom && typeof props.backCustom == 'function') {
    props.backCustom();
  } else {
    router.go(-1);
  }
};

/**
 * 分享事件
 */
const onShare = () => {
  if (props.shareCustom && typeof props.shareCustom == 'function') {
    props.shareCustom();
  }
};
</script>
<template>
  <van-sticky :offset-top="0">
    <div class="top-nav-box" :style="[{ backgroundColor: '#ffffff' }, { color: titleColor }]">
      <div class="left-wrapper part-wrapper">
        <div class="icn-box back" v-if="needBack" @click="goBack">
          <van-icon name="arrow-left" class="icn" />
        </div>
      </div>
      <span class="title-text">{{ title }}</span>
      <div class="right-wrapper part-wrapper">
        <slot name="right"></slot>
        <div class="icn-box share" v-if="needShare" @click="onShare">
          <img src="@/assets/images/common/icn_share.png" alt="" class="icn">
        </div>
      </div>

    </div>
  </van-sticky>
</template>  

<style scoped lang="scss">
.top-nav-box {
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  text-align: center;
  position: relative;

  .icn-box {
    padding-left: 25px;
    padding-right: 25px;

    // padding-top: 5px;
    .icn {
      font-size: 16px;
      margin-top: 13px;
    }

    &.share {
      padding-left: 0;

      .icn {
        height: 20px;
      }
    }
  }

  &.border {
    border-bottom: 1px solid #e5e5e5;
  }

  .part-wrapper {
    position: absolute;
    top: 0;

    &.left-wrapper {
      left: 0;
    }

    &.right-wrapper {
      right: 0;
      display: flex;

    }

  }

}
</style>