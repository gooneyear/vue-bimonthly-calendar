# vue-bimonthly-calendar

> vue-bimonthly-calendar是一款双月显示的日历组件，针对Vue2开发。样式美观，且响应式。

![](https://raw.githubusercontent.com/gooneyear/vue-bimonthly-calendar/master/src/img/vue-bimonthly-calendar.png)

[![npm](https://img.shields.io/badge/npm-v2.0.0-green.svg)](https://github.com/gooneyear/vue-bimonthly-calendar)

## 依赖
- vue: ^2.0.0

## 使用方法
#### 安装

``` sh
 npm install vue-bimonthly-calendar --save
```

#### 入口 Main.js

```javascript
import 'vue-bimonthly-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueBimonthlyCalendar from 'vue-bimonthly-calendar'
Vue.use(vueBimonthlyCalendar, {locale: 'en'}) //可以设置语言，支持中文和英文
```

#### 用法示例
  ==注意:demoDay的值要用‘/’分割，且月和日不能加前缀‘0==’
```vue
<template>
  <vue-bimonthly-calendar :events="demoEvents" :selectedDay="demoDay" @monthChanged="" @dayChanged=""></vue-bimonthly-calendar>
</template>

<script>
export default {
  data () {
    return {
      demoEvents: [{
        date: '2017/8/15',
        title: 'eat'
      },{
        date: '2017/9/12',
        title: 'this is a title'
      }],
      demoDay: '2017/8/15'
    }
  },
  methods: {
    monthChange (month) {
      console.log(month)
    },
    dayChange (day) {
      console.log(day)
    }
  }
}
</script>
```

## 组件事件
可以监听的事件有两个，选择了哪天和当月是哪月，当发生改变时，会触发监听函数。函数中的回调参数为改变后的日期。
```
<template>
  <vue-event-calendar
    @day-changed="handleDayChanged"
    @month-changed="handleMonthChanged">
  </vue-event-calendar>
</template>
```

## Options

```
  // 当 Vue.use时, 可以设置的参数
  {
    locale: 'en',
    color: 'black', //Set main color
    className: 'Custom className for current clicked date', // (default: 'selected-day')
    weekStartOn: 'week Start on which day'  // Can be: 1, 2, 3, 4, 5, 6, 0 (default: 0)
  }
```

## 开发
可以在github直接clone我的项目然后执行如下命令继续二次开发或发版，欢迎star&&issue
```
npm run dev  //develop
npm run build //production
```
