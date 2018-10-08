<?php

require '../app/common.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'commentPost.php';
  exit;
}


// 1. Go to the database and get all ids
$comments = Comment::getAllComment($id);
// 2. Convert to JSON
$json = json_encode($comments, JSON_PRETTY_PRINT);
// 3. Print

echo $json;
