<template>
    <div class="time-box">
        <template v-if="!disabled">
            <span v-for="(item,index) in timeArr" :key="index" :class="{dot: index == 2}">{{item}}</span>
        </template>
        <template v-else>
            <div class="btn-jiezhi">截止投注</div>
        </template>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                maxSeconds: 60,
            }
        },
        props: {
            time: Number, //秒数
            disabled: Boolean,
        },
        computed: {
            timeArr(){
                let time = this.maxSeconds - this.time;
                if(time < 0){
                    time = 0;
                }
                let minus = parseInt( time / 60 ) + '';
                let seconds = time % 60 + '';
                minus = minus.padStart(2,'0');
                seconds = seconds.padStart(2,'0');
                return `${minus}:${seconds}`
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.time-box{
    display: flex;
    height: torem(36);
    line-height: torem(36);
    width: torem(128);
    justify-content: space-between;
    border-radius: torem(5);
    overflow: hidden;
    &>span{
        width: torem(24);
        height: 100%;
        background-color: #9703cb;
        font-size: torem(28);
        color: #fff;
        text-align: center;
    }
    .dot{
        line-height: torem(30);
    }
    .btn-jiezhi{
        width: torem(128);
        font-size: torem(28);
        color: #2f2162;
        text-align: center;
        background-color: #9703cb;
    }
}
</style>

