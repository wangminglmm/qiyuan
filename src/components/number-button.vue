<template>
    <div class="number-button default" @click="clickHandle">
        <slot></slot>
        <div class="yazhu" v-if="allPrice">
            <img src="/static/images/icon-yazhu.png" alt="">
            <span class="number">{{allPrice}}</span>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        props: {
            allPrice: {
                type: Number,
                default: 0
            },
            canOperate: Boolean,
        },
        methods: {
            clickHandle(){
                if(!this.canOperate) return;
                this.$emit('click')
            }
        }
    }
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.number-button{
    width: torem(124);
    height: torem(62);
    line-height: torem(62);
    font-size: torem(28);
    text-align: center;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "PingFangSC";
    position: relative;
    .yazhu{
        position: absolute;
        left: torem(30);
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        img{
            width: torem(38);
            position: relative;
            z-index: 2;
            display: block;
        }
        .number{
            position: absolute;
            height: torem(28);
            line-height: torem(28);
            top: 50%;
            margin-top: torem(-14);
            left: torem(0);
            z-index: 1;
            box-sizing: border-box;
            border-radius: torem(28);
            background-color: rgba(22, 9, 71, 0.502);
            font-size: torem(18);
            color: #fff !important;
            padding: 0 torem(20) 0 torem(40);
        }
    }
    &:active{
        box-shadow: torem(0) torem(0) torem(10) #0c0423;
    }
    &.default{
        background-image: url('/static/images/btn-number-default.png');
        .number{
            color: #b3600c;
            text-shadow: 1px 1.732px 0px rgba(255, 255, 255, 0.2);
        }
    }
    &.selected{
        background-image: url('/static/images/btn-number-default.png');
        .text-top{
            text-shadow: 1px 1px 0px #b3600c52;
            color: rgb(179, 96, 12);
        }
        .text-bottom{
            color: #b3600c;
        }
    }
    &.disabled{
        background-image: url('/static/images/btn-number-disabled.png');
        .number{
            color: #5b5b5b;
            text-shadow: 1px 1.732px 0px rgba(255, 255, 255, 0.2);
        }
    }
    &.winner{
        background-image: url('/static/images/btn-number-winner.png');
        .number{
            color: #b3600c;
            text-shadow: 1px 1.732px 0px rgba(255, 255, 255, 0.2);
        }
    }
 }

</style>



