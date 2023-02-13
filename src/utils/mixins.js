import Vue from 'vue';
export const CommonMixins = {
    methods: {
        /**
         * 禁止浏览器下拉回弹(处理ios弹性拉动)
         */
        stopDrop() {
            let _this = this;
            let lastY; //最后一次y坐标点
            document.body.addEventListener('touchstart', function (event) {
                lastY = event.changedTouches[0].clientY; //点击屏幕时记录最后一次Y度坐标。
            });
            document.body.addEventListener('touchmove', function (event) {
                let y = event.changedTouches[0].clientY;
                let st = _this.$refs.container.scrollTop; //滚动条高度
                if (y >= lastY && st <= 0) {
                    //如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
                    lastY = y;
                    event.preventDefault();
                }
                lastY = y;
            });
        },
        /**
         * 兼容ios在输入框失去焦点键盘收起时界面无法回落问题
         */
        scrollToView() {
            // Toast(`blur1026 11:50:${window.body.height},${this.$refs.container.scrollHeight}`);
            // this.$refs.container.scrollTop = 0;
            let scrollHeight =
                this.$refs.container.scrollHeight || 0;
            this.$refs.container.scrollTop = Math.max(scrollHeight - 1, 0);
            document.activeElement.scrollIntoViewIfNeeded(true);
            document.scrollingElement.scrollTo(0, 0);
        }
    },
}