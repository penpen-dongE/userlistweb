const express = require('express');
const router = express.Router()
const mysql = require('mysql')
const dot = require('dotenv')

dot.config()
db = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})

router.get('/topic/add',(req, res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql , (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internel Sever Error")
        }
        console.log(result)
        res.render('add' ,{topics :result})
    })
})

router.post('/topic/add', (req, res)=>{
    console.log(req.body);
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = `INSERT INTO topic ( title, description,author ) VALUES (?, ?, ?)`;
    var params = [title, description ,author];
    db.query(sql,params, (err , result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Internel Sever Error")
        }

        console.log('성공적으로 저장 되었습니다.')
        res.redirect(`/topic/${result.insertId}`)
    })
})

router.get(['/topic/:id/edit'], function(req, res){// 수정기능
    var sql = 'SELECT id,title FROM topic';    // 일단, 글 목록을 불러온다.(edit페이지에도 글목록은 항상 존재)
    db.query(sql, function(err, results){
      var id = req.params.id; // request받은 id값
      if(id){
        var sql = 'SELECT * FROM topic WHERE id=?';// id값을 통하여 수정하려고 하는 특정 데이터만 불러온다.
        db.query(sql, [id], function(err, result){//[id] : 사용자로부터 받은 id
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('edit', {topics : results, topic : result[0] });//topic은 배열안에 담긴 객체로 들어오기 때문에, topic[0]으로 데이터를 객체만 전달한다.(전달한 데이터를 통해서 현재 수정하려고 하는 데이터를 화면에 뿌려준다.)
          }
        });
      } else {//id가 없을 경우 반환한다.
        console.log(err);
        res.send('There is no id.');
      }
    });
 });

 router.post('/topic/:id/edit', function(req, res){
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';//수정하는 쿼리문(where가 매우 중요! 없으면, 다 똑같이 수정됨 큰일남.)
    var title = req.body.title; // 사용자가 다시 입력한 title. req객체의 body객체의 title키로 접근가능
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;//url의 파라미터로 id 값을 얻을 수 있다.
    db.query(sql, [title, description, author, id], function(err, result){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect(`/topic/${id}/edit`)// 수정한 페이지로 이동
      }
    });
 });

 router.get('/topic/:id/delete', function(req, res){
    var sql = 'SELECT id,title FROM topic'; // 전체 글목록 보여주기
    var id = req.params.id;
    db.query(sql, function(err, results, fields){
      var sql = 'SELECT * FROM topic WHERE id=?'; // 선택한 글 보여주기(id값을 통하여 접근가능)
      db.query(sql, [id], function(err, result){
          if(err){
            console.log(err);
            res.status(500).send('Internal Sever Error');
          } else {
            if(topic.length === 0){// 선택한 글이 없다면 에러를 띄운다
              console.log('There is no record');
              res.status(500).send('Internal Sever Error');
            } else {
              res.render('delete', {topics:results, topic:result[0]});// delete페이지로 렌더해준다.(글 목록 객체와 삭제할 글을 넘겨줌)
            }
          }
      });
  });
});
router.post('/topic/:id/delete', function(req, res){ //form태그를 통하여 post 방식으로 데이터를 전달 받는다.
    var id = req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?'; //DELETE sql문. WHERE를 빠뜨리면 조용히 집에 가야한다.
    db.query(sql, [id], function(err, result){
      if(err) console.log(err);
      res.redirect('/topic');//데이터를 삭제한 후, 메인페이지로 리다이렉트 해준다.
    });
});
router.get(['/topic','/topic/:id'], function(req, res){//메인페이지(id값을 통하여 글 내용을 볼 수 있음)
    var sql = 'SELECT id,title FROM topic'; //전체 글목록 가져오기
    db.query(sql, function(err, results){
      var id = req.params.id; // request받은 id값
      if(id){// 글을 선택 했을때.
        var sql = 'SELECT * FROM topic WHERE id=?';
        db.query(sql, [id], function(err, result){//[id] : 사용자로부터 받은 id
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('view', {topics : results, topic : result[0] });
          }
        });
      } else {// 글을 선택하지 않았을때.(메인페이지만 보여준다.)
        res.render('view', {topics : results, topic : undefined })//topic의 데이터가 없어도 topic을 명시해 주지 않는다면 ejs가 오류를 낸다.
      }
    });
});


module.exports = router