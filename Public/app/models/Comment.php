<?php

class Comment
{
  public $id;
  public $comment;

  public function __construct($comment_row) {
    $this->id = isset($comment_row['id']) ? intval($comment_row['id']) : null;

    $this->comment = $comment_row['comment'];

  }

  public function create() {
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

//TODO edit insert query to reflect comment api
      $sql = 'INSERT INTO comment(comment) VALUES (?)';
      $statement = $db->prepare($sql);

      $success = $statement->execute([
        $this->comment
      ]);

      $this->id = $db->lastInsertId();
    }

    public static function getAllComment() {
      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

      // 2. Prepare the query
      $sql = 'SELECT * FROM comment ';

      $statement = $db->prepare($sql);

      // 3. Run the query
      $success = $statement->execute(

      );

      // 4. Handle the results
      $arr = [];
      while ($comment_row = $statement->fetch(PDO::FETCH_ASSOC)) {
        // 4.a. For each row, make a new comment object
        $commentItem =  new Comment($comment_row);

        array_push($arr, $commentItem);
      }

      // 4.b. return the array of comment objects

      return $arr;
    }
  }
