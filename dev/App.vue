<template>
  <div id="app">
    <div class="calendarPanl">
      <vue-bimonthly-calendar
        :events="events"
        :selectedDay="selectedDay"
        @day-changed="handleDayChanged"
        @month-changed="handleMonthChanged"
      ></vue-bimonthly-calendar>
    </div>
    </div>
  </div>
</template>

<script>
let today = new Date()
export default {
  name: 'app',
  data () {
    return {
      events: [{
        date: `${today.getFullYear()}/${today.getMonth()}/6`,
        title: 'Title-2'
      },{
        date: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`,
        title: 'Title-1',
        desc: 'longlonglong description'
      },{
        date: `${today.getFullYear()}/${today.getMonth()}/15`,
        title: 'Title-1',
        desc: 'longlonglong description'
      },{
        date: `${today.getFullYear()}/${today.getMonth()}/24`,
        title: 'Title-2'
      }],
      selectedDay: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
    }
  },
  methods: {
    handleDayChanged (data) {
    },
    handleMonthChanged (data) {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}

h1, h2, h3 {
  font-weight: normal;
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.t-center{
  text-align: center;
  margin: 20px;
}
</style>
