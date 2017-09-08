<template>
  <div>
    <div class="cal-wrapper">
      <div class="cal-header">
        <div class="l" @click="preMonth"><div class="arrow-left icon">&nbsp</div></div>
        <div class="title">{{lastYearMonth}}</div>
      </div>
      <div class="cal-body">
        <div class="weeks">
          <span
            v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames"
            class="item">
            {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
          </span>
        </div>
        <div class="dates" >
          <div v-for="date in lastDayList" class="item"
            :class="{
              event: date.status ? (date.title != undefined) : false,
              [calendar.options.className] : (date.date == selectedDay)
            }">
            <p class="date-num"
              @click="handleChangeCurday(date)"
              :style="{color: date.title != undefined ? ((date.date == selectedDay) ? '#fff' : customColor) : 'inherit'}">
              {{date.status ? ((today == date.date) ? '今天' : ((startDay == date.date) ? '首次' : date.date.split('/')[2])) : '&nbsp'}}</p>
            <span v-if="date.status ? (date.title != undefined) : false" class="is-event"
              :style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="cal-wrapper">
      <div class="cal-header">
        <div class="title">{{curYearMonth}}</div>
        <div class="r" @click="nextMonth"><div class="arrow-right icon">&nbsp</div></div>
      </div>
      <div class="cal-body">
        <div class="weeks">
          <span
            v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames"
            class="item">
            {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
          </span>
        </div>
        <div class="dates" >
          <div v-for="date in dayList" class="item"
            :class="{
              event: date.status ? (date.title != undefined) : false,
              [calendar.options.className] : (date.date == selectedDay)
            }">
            <p class="date-num"
              @click="handleChangeCurday(date)"
              :style="{color: date.title != undefined ? ((date.date == selectedDay) ? '#fff' : customColor) : 'inherit'}">
              {{date.status ? ((today == date.date) ? '今天' : ((startDay == date.date) ? '首次' : date.date.split('/')[2])) : '&nbsp'}}</p>
            <span v-if="date.status ? (date.title != undefined) : false" class="is-event"
              :style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n.js'
import { dateTimeFormatter, isEqualDateStr} from '../tools.js'

const inBrowser = typeof window !== 'undefined'
export default {
  name: 'cal-panel',
  data () {
    console.log(this.events)
    return {
      i18n
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: String,
      required: false
    }
  },
  computed: {
    dayList () {
        let firstDay = new Date(this.calendar.params.curYear, this.calendar.params.curMonth, 0)
        let startDate = new Date(firstDay)
        startDate.setDate(firstDay.getDate() - firstDay.getDay() + this.calendar.options.weekStartOn)

        let item, status, tempArr = [], tempItem
        for (let i = 0 ; i < 42 ; i++) {
            item = new Date(startDate);
            item.setDate(startDate.getDate() + i);

            if (this.calendar.params.curMonth === item.getMonth()) {
              status = 1
            } else {
              status = 0
            }
            tempItem = {
              date: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
              status: status
            }
            this.events.forEach((event) => {
              if (isEqualDateStr(event.date, tempItem.date)) {
                tempItem.title = event.title
                tempItem.desc = event.desc || ''
              }
            })
            tempArr.push(tempItem)
        }
        return tempArr
    },
    lastDayList () {
        let firstDay = new Date(this.calendar.params.lastYear, this.calendar.params.lastMonth, 0)
        let startDate = new Date(firstDay)
        startDate.setDate(firstDay.getDate() - firstDay.getDay() + this.calendar.options.weekStartOn)

        let item, status, tempArr = [], tempItem
        for (let i = 0 ; i < 42 ; i++) {
            item = new Date(startDate);
            item.setDate(startDate.getDate() + i);

            if (this.calendar.params.lastMonth === item.getMonth()) {
              status = 1
            } else {
              status = 0
            }
            tempItem = {
              date: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
              status: status
            }
            this.events.forEach((event) => {
              if (isEqualDateStr(event.date, tempItem.date)) {
                tempItem.title = event.title
                tempItem.desc = event.desc || ''
              }
            })
            tempArr.push(tempItem)
        }
        return tempArr
    },
    startDay () {
      let dateObj = new Date(this.events[0].date)
      return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
    },
    today () {
      let dateObj = new Date()
      return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
    },
    curYearMonth () {
      let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth+1}/01`))
      return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
    },
    lastYearMonth () {
      let tempDate = Date.parse(new Date(`${this.calendar.params.lastYear}/${this.calendar.params.lastMonth+1}/01`))
      return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
    },
    customColor () {
      return this.calendar.options.color
    }
  },
  methods: {
    nextMonth () {
      this.$EventCalendar.nextMonth()
      this.$emit('month-changed', this.curYearMonth)
    },
    preMonth () {
      this.$EventCalendar.preMonth()
      this.$emit('month-changed', this.lastYearMonth)
    },
    handleChangeCurday (date) {
      if (date.status) {
        this.$emit('cur-day-changed', date.date)
      }
    }
  }
}
</script>
