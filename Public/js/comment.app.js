var commentApp = new Vue({
  el: '#commentMainVue',
  data: {
    comment: [ ],
    commentForm: { },
  },

  methods: {
    handleCommentForm(e) {
      e.preventDefault();

      const s = JSON.stringify(this.commentForm);

      fetch('api/comment.php', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s
      })
      .then( response => response.json() )
      .then( json => {this.comment.push(json)})
      .catch( err => {
        console.error('POST ERROR:');
        console.error(err);
      })

      this.commentForm = this.getEmptyCommentForm();
    },

    getEmptyCommentForm() {
      return {
        comment: null
        }
      },
    },


  created() {

    this.commentForm = this.getEmptyCommentForm();

    fetch('api/comment.php')
    .then( response => response.json() )
    .then( json => {commentApp.comment = json} )
    .catch( err => {
      console.log('ERROR WITH FETCH');
      console.log(err);
    })
  }
})
