<template>
    <div class="operate-button default"  @click="clickHandle">
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
.operate-button{
    width: torem(325);
    height: torem(134);
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
        left: torem(20);
        top: torem(20);
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
            left: torem(10);
            z-index: 1;
            box-sizing: border-box;
            border-radius: torem(28);
            background-color: rgba(22, 9, 71, 0.502);
            font-size: torem(18);
            color: #fff;
            padding: 0 torem(20) 0 torem(40);
        }
    }

    /deep/ .text-top{
        font-size: torem(38);
        line-height: 1;
    }
    /deep/ .text-bottom{
        font-size: torem(28);
    }
    &:active{
        box-shadow: torem(0) torem(0) torem(10) #0c0423;
    }
    &.default{
        background-image: url('/static/images/btn-xiazhu-default.png');
        .text-top{
            text-shadow: 1px 1px 0px #2771d452;
            color: rgb(39, 113, 212);
        }
        .text-bottom{
            color: rgb(32, 102, 191);
        }
    }
    &.selected{
        background-image: url('/static/images/btn-xiazhu-select.png');
        .text-top{
            text-shadow: 1px 1px 0px #b3600c52;
            color: rgb(179, 96, 12);
        }
        .text-bottom{
            color: #b3600c;
        }
    }
    &.disabled{
        background-image: url('/static/images/btn-xiazhu-disabled.png');
        .text-top{
            color: #595959;
            text-shadow: 1px 1px 0px #b9b9b9;
        }
        .text-bottom{
            color: #595959;
        }
    }
    &.winner{
        background-image: url('/static/images/btn-xiazhu-winner.png');
        .text-top{
            text-shadow: 1px 1px 0px #b3600c52;
            color: rgb(179, 96, 12);
        }
        .text-bottom{
            color: #b3600c;
        }
    }
 }

</style>



