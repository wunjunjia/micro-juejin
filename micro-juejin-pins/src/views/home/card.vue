<template>
  <li class="pin-list-item">
    <div class="pin-header">
      <elm-image
        class="pin-header-avatar"
        :src="pin.author_user_info.avatar_large"
        :font-size="36"
        width="84"
        alt="avatar"
        round
      />
      <div class="pin-header-content">
        <p class="username">
          {{ pin.author_user_info.user_name }}
        </p>
        <p class="extra">
          <span
            v-if="pin.author_user_info.job_title"
            class="job"
          >{{ pin.author_user_info.job_title }}</span>
          <span>{{ pin.msg_Info.ctime | time }}</span>
        </p>
        <elm-button
          type="primary"
          size="small"
        >
          关注
        </elm-button>
      </div>
    </div>
    <p class="pin-content">{{ pin.msg_Info.content }}</p>
    <elm-image
      v-if="pin.msg_Info.pic_list.length === 1"
      :src="pin.msg_Info.pic_list[0]"
      width="400"
      alt="pin-image"
      stop-propagation
      @click="preview(0)"
    />
    <ul
      v-else
      class="pin-image-list"
    >
      <li
        v-for="(item, index) in pin.msg_Info.pic_list"
        :key="index"
        class="pin-image-list-item"
      >
        <elm-image
          :src="item"
          alt="pin-image"
          stop-propagation
          @click="preview(index)"
        />
      </li>
    </ul>
    <div class="pin-action">
      <div class="good">
        <elm-icon
          name="good"
          color="#8a93a0"
          :font-size="36"
        />
        <span class="count">{{ pin.msg_Info.digg_count || '赞' }}</span>
      </div>
      <div class="comment">
        <elm-icon
          name="chat"
          color="#8a93a0"
          :font-size="36"
        />
        <span class="count">{{ pin.msg_Info.comment_count || '评论' }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'PinCard',
  filters: {
    time(val) {
      val = Math.floor(Date.now() / 1000) - val
      if (val < 60) return `${val}秒前`
      val = Math.floor(val / 60)
      if (val < 60) return `${val}分钟前`
      val = Math.floor(val / 60)
      if (val < 24) return `${val}小时前`
      val = Math.floor(val / 24)
      return `${val}天前`
    },
  },
  props: {
    pin: {
      type: Object,
      required: true,
    },
  },
  methods: {
    preview(index) {
      this.$emit('preview', {
        picList: this.pin.msg_Info.pic_list,
        index,
      })
    },
  },
}
</script>

<style lang="less" scoped>
  .pin-list-item {
    .padding(32, 48, 0, 48);
    .margin-bottom(16);
    background-color: #fff;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .pin-header {
    position: relative;
    display: flex;
    .height(84);

    &-avatar {
      .margin-right(24);
    }

    &-content {
      overflow: hidden;
      flex-basis: 60%;
      color: @secondaryText;
      .font-size(24);

      .username {
        .single-line-overflow;
        .padding-top(8);
        .padding-bottom(12);
        color: #2e3135;
        .font-size(28);
        font-weight: 600;
      }

      .extra {
        display: flex;
        align-items: center;
      }

      .job {
        .single-line-overflow;
        position: relative;
        max-width: 60%;
        .padding-right(20);
        .margin-right(8);

        &::after {
          content: "·";
          position: absolute;
          top: 0;
          right: 0;
          .margin-left(8);
        }
      }
    }

    .elm-button {
      position: absolute;
      .top(8);
      right: 0;
    }
  }

  .pin-content {
    .margin-top(10);
    .margin-bottom(10);
    color: #17181a;
    .font-size(28);
    line-height: 1.6;
    white-space: pre-line;
    word-break: break-word;
  }

  .pin-image-list {
    display: flex;
    flex-wrap: wrap;
  }

  .pin-image-list-item {
    position: relative;
    flex-basis: 32.5%;
    .margin-top(8);
    .margin-right(8);

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  .pin-action {
    display: flex;
    .margin(32, -48, 0, -48);
    .height(64);
    border-top: 1px solid #ebebeb;
    color: #8a93a0;
    .font-size(28);

    .good,
    .comment {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    }

    .good {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        .height(48);
        background-color: #ebebeb;
      }
    }

    .count {
      .margin-left(8);
    }
  }
</style>
