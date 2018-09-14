var randomuser = new Vue({
  el: '#randuser',
  data: {

userdata: [
{
gender: "",
name: {
title: "",
first: "",
last: ""
},
location: {
street: "",
city: "",
state: "",
postcode: "",
},
email: "",
dob: {
date: ""
},

phone: "",

picture: {
large: "",
medium: "",
thumbnail: ""
},

}
]
},
  computed: {
    age: function () {
      const age=moment(this.userdata.dob.date).diff(moment(), 'years');
      return Math.abs(age);
    }
  },
  methods: {
    pretty_date: function (d) {
      return moment(d).format('l')
    },
    pretty_currency: function (val) {
      if (val < 1e3) {
        return '$ ' + val
      }

      if (val < 1e6) {
        return '$ ' + (val/1e3).toFixed(1) + ' k'
      }

      return '$ ' + (val/1e6).toFixed(1) + ' M'
    },
    completeClass: function(task) {
      if (task.perc_complete == 100 ) {
        return 'alert-success'
      }
      if (task.current_sprint && task.hours_worked == 0 ) {
        return 'alert-warning'
      }
    },
    fetchData () {
      fetch('https://randomuser.me/api/')
      .then( response => response.json() )
      // ^ This is the same as .then( function(response) {return response.json()} )
      .then( json => {randomuser.userdata = json.results[0];
        console.log(json.results);
      } )
      .catch( err => {
        console.log('TASK FETCH ERROR:');
        console.log(err);
      })
    }
  },
  created () {
    this.fetchData();
  }
})
