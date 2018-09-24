var randomuser = new Vue({
  el: '#randuser',
  data: {
    results: []
  },
  computed: {

  },
  methods: {
    age: function (d) {
      return moment().diff(moment(d), 'years');
    },
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
      fetch('https://randomuser.me/api')
        .then(response => response.json())
        .then(json => {
            this.results = json.results;
        })
        .catch((err) => {
            console.log("fetch error");
            console.log('*** ', err);
        });
    },
    refreshButton: function(){
      this.fetchData();
    }
  },
  created () {
    this.fetchData();
  }
})
