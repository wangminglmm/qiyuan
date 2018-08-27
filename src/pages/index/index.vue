<template>
  <div class="index-container">
    <section class="banner">
      <img src="@/assets/images/banner.jpg" alt="" class="banner-image">
      <div class="btn-left">猜比特币涨跌</div>
      <img src="/static/images/jilu-cion.png" alt="" class="icon-jilu icon-right">
      <img src="/static/images/help-icon.png" alt="" class="icon-help icon-right">
      <div class="banner-scroll">
        <div class="scroll-con">加送1%，多玩多送</div>
      </div>
      <div class="banner-bottom">
        <div class="left-text">虚拟指数【第0904期】</div>
        <div class="history-reward"></div>
        <div class="right-text">开奖点位</div>
      </div>
    </section>
    <section class="chart-container">
      <Chart :chartOptions="chartOptions" />
      <div class="time">
        <span class="left">19:00</span>
        <span class="right">19:01</span>
      </div>
    </section>
    <section class="game-container">
      <div class="size-game">
        <div class="game-title">
          <span class="text">[第1198期]猜指数19:58是否超过</span>
          <div class="time"><Time :time="timeIndex" :disabled="!canOperate" /></div>
        </div>
        <div class="button-box">
          <OButton 
              :class="[{winner: (winnerNubmer > median && winnerNubmer)},{disabled: !canOperate},{selected: sizeInfo.overtop.number > 0}]"
              :canOperate="canOperate"
              :allPrice="sizeInfo.overtop.allPrice"
              @click="buyClick(sizeInfo.overtop)">
            <div class="text-top">超过</div>
            <div class="text-bottom">奖励 x5.95</div>
          </OButton>
          <div class="icon-vs"><img src="/static/images/vs.png" alt=""></div>
          <OButton 
            :class="[{winner: (winnerNubmer <= median && winnerNubmer)},{disabled: !canOperate},{selected: sizeInfo.less.number > 0}]"
            :canOperate="canOperate"
            :allPrice="sizeInfo.less.allPrice"
            @click="buyClick(sizeInfo.less)">
            <div class="text-top">不超过</div>
            <div class="text-bottom">奖励 x5.95</div>
          </OButton>
        </div>
      </div>
      <div class="other-game">
        <div class="game-title">
          <span class="text">[第1198期]猜指数19:58是否超过</span>
          <div class="time"><Time :time="timeIndex" :disabled="!canOperate" /></div>
        </div>
        <div class="tab">
          <div class="tab-item" :class="{current: currentTabIndex == 1}" @click="currentTabIndex = 1">猜单双</div>
          <div class="tab-item" :class="{current: currentTabIndex == 2}" @click="currentTabIndex = 2">猜尾数</div>
        </div>
        <div class="tab-content">
          <div class="single-game" v-show="currentTabIndex==1">
            <div class="button-box">
              <OButton 
                :class="[{winner: lastNumber % 2 == 1},{disabled: !canOperate},{selected: singlePairInfo.odd.number > 0}]"
                :canOperate="canOperate"
                :allPrice="singlePairInfo.odd.allPrice"
                @click="buyClick(singlePairInfo.odd)">
                <div class="text-top">单数</div>
                <div class="text-bottom">奖励 x5.95</div>
              </OButton>
              <div class="icon-vs"><img src="/static/images/vs.png" alt=""></div>
              <OButton 
                :class="[{winner: lastNumber % 2 == 2},{disabled: !canOperate},{selected: singlePairInfo.even.number > 0}]"
                :canOperate="canOperate"
                :allPrice="singlePairInfo.even.allPrice"
                @click="buyClick(singlePairInfo.even)">
                <div class="text-top">双数</div>
                <div class="text-bottom">奖励 x5.95</div>
              </OButton>
            </div>
          </div>
          <div class="number-game" v-show="currentTabIndex==2">
            <div class="tip-text">任意数字 奖励x8.50</div>
            <div class="button-box">
              <NButton 
                v-for="(item,index) in numberList" 
                :key="index" 
                :class="[{winner: lastNumber == item.text},{disabled: !canOperate}]"
                :canOperate="canOperate"
                :allPrice="item.allPrice"
                @click="buyClick(item)">
                <div class="number">{{item.text}}</div>
              </NButton>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="footer-con">
          <div class="my-jifen">
            <img src="/static/images/icon-yazhu.png" alt="" class="icon-jifen">
            <span class="jifen">888</span>
            <img src="/static/images/add-icon.png" alt="" class="add-btn">
          </div>
          <div class="price-list">
            <div 
              class="price-item"
              v-for="(item,index) in priceList"
              :key="index"
              :class="{active: item == onePrice}"
              @click="onePrice = item"><span class="text-num">{{item}}</span></div>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>
<script>
  import Chart from '@/components/chart'
  import Time from '@/components/time'
  import OButton from '@/components/operate-button'
  import NButton from '@/components/number-button'
  const reference = 8000; //基准
  const median = 8288; //分割值，相比较的值
  const winnerNubmer = 8233 // 开奖值
  const xAxisData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16,17] //横坐标 60秒投注时间，没5秒走一次，需要12次，走边2个固定
  let seriesData = [{
      value: 0.6,
    },
    {
      value: 3.7,
      label: {
        show: true,
      },
      itemStyle: {
        opacity: 1,
      }
    },
  ]
  export default {
    data() {
      return {
        timeIndex: 0,
        reference: 8000, //基准
        median: 8288, //分割值，相比较的值
        winnerNubmer: null, //开奖结果
        canOperate: true, //是否可操作
        currentTabIndex: 1, //玩法切换，1表示单双,2表示猜位数
        onePrice: 100, //每一注价格
        priceList: [
          100,
          500,
          5000
        ],
        numberList: [ //猜尾数
          {
            text: 0, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 1, //显示的数字
            number: 0, //下注的数量number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 2, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 3, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 4, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 5, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 6, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 7, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 8, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          },
          {
            text: 9, //显示的数字
            number: 0, //下注的数量,
            allPrice: 0,
          }
        ],
        sizeInfo: { //猜超过的信息
          overtop: { //超过
            number: 0, //下注数量
            multiple: 6.3, //赔率,
            allPrice: 0,
          },
          less: { //不超过
            number: 0,
            multiple: 8,
            allPrice: 0,
          }
        },
        singlePairInfo: {
          odd: {
            number: 0, //下注数量
            multiple: 6.3, //赔率,
            allPrice: 0,
          },
          even: {
            number: 0, //下注数量
            multiple: 7.3, //赔率,
            allPrice: 0,
          }
        },
        chartOptions: {
          title: {
            show: false
          },
          legend: {
            data: ['line']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#f0c949',
                    type: 'dotted'
                }
            },
            formatter: (data) => {
              return this.precentToValue(data[0].value, this.reference)
            }
          },
          grid: {
            show: true,
            left: '3%',
            top: 10,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff0eb',
            containLabel: true,
            borderColor: '#fff0eb'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            show: true,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#ccc']
              }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
            name: '涨幅（%）',
            min: -20,
            max: 20,
            interval: 10,
            nameTextStyle: {
              color: '#ccc',
              lineHeight: 22,
              verticalAlign: 'middle',
              align: 'right',
            },
            nameRotate: 90,
            nameGap: -64,
            axisLine: {
              show: false, //纵向坐标线
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false, //纵向坐标刻度
            }
          },
          series: [{
            name: '同比',
            type: 'line',
            stack: '总量',
            data: seriesData,
            color: "transparent",
            symbol: 'circle',
            lineStyle: {
              color: '#67c9e2',
            },
            label: {
              formatter: (data) => {
                return this.precentToValue(data.data.value, this.reference)
              }
            },
            itemStyle: {
              normal: {
                symbol: 'rect',
                color: '#67c9e2',
                borderColor: '#67c9e2',
                borderWidth: 5,
                opacity: 0,
                shadowBlur: 5,
                shadowColor: '#67c9e2',
              }
            },
            markLine: {
              symbol: ['none', 'rect'],
              symbolSize: [10, 20],
              itemStyle: {
                normal: {
                  lineStyle: {
                    type: 'solid',
                    color: '#f3c945',
                  },
                  label: {
                    show: true,
                    position: 'middle',
                    formatter: (data) => {
                      return this.precentToValue(data.data.value, this.reference)
                    }
                  }
                }
              },
              data: [{
                name: '参考值',
                yAxis: this.valueToPrecent(median, reference),
              }]
            },
          }],
          animationDuration: 1000
        }
      }
    },
    computed: {
      medianYAxis() {
        return this.valueToPrecent(this.median, this.reference)
      },
      lastNumber: function(){//开奖的最后一位数字
        let lastNumber = (this.winnerNubmer + '').substr(-1);
        console.log(lastNumber)
        return lastNumber;
      }, 
    },
    created() {
      this.setTimer();
    },
    methods: {
      buyClick(item){
        console.log(item)
        item.allPrice = item.allPrice + this.onePrice;
        item.number ++ ;
      },
      setTimer(){
        this.timeIndex = 0;
        this.timer = setInterval(()=>{
          this.timeIndex += 1;
          console.log(this.timeIndex)
          if(this.timeIndex % 5 != 0) return;
          if(this.timeIndex <= 60){
            this.canOperate = true;
            let dataItem = this.getSeriesData();
            this.setSeriesData(dataItem);
            if(this.timeIndex == 60){
              this.canOperate = false;
            }
          }else if(this.timeIndex < 90){
            this.canOperate = false;
          }else if(this.timeIndex == 90){
            clearInterval(this.timer)
            this.winnerNubmer = winnerNubmer;
            let value = this.valueToPrecent(this.winnerNubmer,reference)
            let dataItem = {
              value,
              label: {
                show: true,
              },
              itemStyle: {
                opacity: 1
              }
            }
            this.setSeriesData(dataItem);
          }
        },1000)
      },
      getSeriesData() {
        let value = (Math.random() * 10 - 5).toFixed(1);
        return {
          value,
          label: {
            show: true,
          },
          itemStyle: {
            opacity: 1
          }
        }
      },
      setSeriesData(dataItem) {
        seriesData.forEach((item) => {
          try {
            item.label.show = false;
            item.itemStyle.opacity = 0;
          } catch (e) {

          }

        })
        seriesData.push(dataItem)
      },
      precentToValue(precent, reference) {
        return reference + precent / 100 * reference
      },
      valueToPrecent(value = this.median, reference = this.reference) {
        return (value - reference) / reference * 100
      }
    },
    components: {
      Chart,
      Time,
      OButton,
      NButton
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/variable.scss';
  .index-container {
    background-color: #332162;
    min-height: 100vh;
    .banner{
      position: relative;
      .banner-image{
        display: block;
        width: 100%;
      }
      .btn-left{
        position: absolute;
        width: torem(219);
        height: torem(60);
        line-height: torem(60);
        background: url('/static/images/banner-left-btn.png') no-repeat center center;
        background-size: cover;
        left:  0;
        z-index: 10;
        top: torem(10);
        font-size: torem(24);
        color: #433185;
        padding-left: torem(60);
        box-sizing: border-box;
      }
      .icon-right{
        width: torem(66);
        position: absolute;
        top: torem(10);
      }
      .icon-help{
        right: torem(32);
      }
      .icon-jilu{
        right: torem(115);
      }
      .banner-scroll{
        width: torem(288);
        height: torem(54);
        line-height: torem(54);
        border-color: rgb(26, 80, 210);
        background-color: rgb(67, 49, 133);
        top: torem(10);
        left: 50%;
        margin-left: torem(-144);
        position: absolute;
        border-radius: torem(54);
        color: #fff;
        font-size: torem(24);
        box-sizing: border-box;
        overflow: hidden;
        padding: 0 torem(30);
        .scroll-con{
          text-align: center;
        }
      }
      .banner-bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .left-text{
          font-size: torem(24);
          color: #743bd9;
          padding-left: torem(32);
          padding-bottom: torem(15);
        }
        .history-reward{
          width: torem(128);
          height: torem(56);
          background: url('/static/images/history-icon.png') no-repeat center center;
          background-size: cover;
          position: absolute;
          left: 50%;
          bottom: torem(8);
          margin-left: torem(-64);
        }
        .right-text{
          width: torem(160);
          height: torem(44);
          line-height: torem(44);
          border-radius: torem(44) 0 0 torem(44);
          background-color: #743bd9;
          color: #433185;
          font-size: torem(24);
          position: absolute;
          right: 0;
          bottom: torem(8);
          box-sizing: border-box;
          padding-left: torem(30);
        }
      }
    }
    .chart-container {
      position: relative;
      background-color: #fff;
      .time {
        position: absolute;
        width: 100%;
        bottom: torem(0);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 8% 0 2.5rem;
        height: torem(50);
        line-height: torem(50);
        background-color: #473188;
        color: #743bd9;
        font-size: torem(24);
      }
    }
    .game-container{
      .size-game{
        padding-top: torem(8);
      }
      .game-title{
        display: flex;
        padding: torem(27) torem(32) torem(17);
        .text{
          font-size: torem(28);
          color: #fff;
          flex: 1;
        }
        .time{

        }
      }
      .button-box{
        display: flex;
        padding: 0 torem(30);
        justify-content: space-between;
        align-items: center;
        .icon-vs{
          img{
            width: torem(30);
          }
        }
      }
      .tab{
        display: flex;
        height: torem(50);
        line-height: torem(50);
        text-align: center;
        font-size: torem(28);
        color: #fff;
        padding: 0 torem(30);
        .tab-item{
          flex: 1;
          background-color: #433185;
          &.current{
            background-color: #9703cb;
          }
        }
      }
      .single-game{
        margin-top: torem(20);
      }
      .number-game{
        .button-box{
          flex-wrap: wrap;
          .number-button{
            margin-top: torem(10);
          }
        }
        .tip-text{
          text-align: center;
          font-size: torem(24);
          color: #9703cb;
          margin-top: torem(5);
        }
      }
    }
    .footer{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: torem(112);
      background: url('/static/images/index-footer.png') no-repeat center center;
      background-size: cover;
      .footer-con{
        display: flex;
        padding: 0 torem(32);
        height: 100%;
        align-items: center;
        justify-content: space-between;
        .my-jifen{
          height: torem(66);
          border-radius: torem(66);
          background-color: #fff;
          background-color: rgb(112, 37, 131);
          box-shadow: inset 1px 1.732px 0px 0px rgba(112, 37, 131, 0.078);
          display: flex;
          align-items: center;
          padding-left: torem(12);
          .icon-jifen{
            width: torem(38);
            height: torem(38);
          }
          .add-btn{
            width: torem(66);
            height: torem(66)
          }
          .jifen{
            min-width: torem(110);
            font-size: torem(28);
            color: #ffd426;
            box-sizing: border-box;
            padding: 0 torem(10);
          }
        }
        .price-list{
          display: flex;
          .price-item{
            width: torem(124);
            height: torem(82);
            background: url('/static/images/item-price-icon.png') no-repeat center center;
            background-size: cover;
            margin-left: torem(14);
            font-size: torem(32);
            color: #433185;
            position: relative;
            .text-num{
              bottom: torem(10);
              right: torem(15);
              position: absolute;
            }
            &.active{
              background-image: url('/static/images/item-price-icon-select.png');
            }
          }
        }
      }
    }
  }


</style>
