# userlistweb

**MySQL**

Mysql 접속 : mysql -uroot -p

db만들기 : create database something;

```
ex) CREATE DATABASE o2 CHARACTER SET utf8 COLLATE utf8_general_ci;
```

db보기 : show databases;

db사용하기 : use something;

현재 사용중이 db 확인하기 :  select database();

table 보기 : show tables;

**table 생성 : create table**

```mysql
ex) CREATE TABLE `topic` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`author` varchar(30) NOT NULL,
	PRIMARY KEY (id)
	) ENGINE=innoDB DEFAULT CHARSET=utf8;
```

id : 각 행들을 식별할 수 있게하는 식별자

Auto_increment : id를 따로 설정해주지 않으면, 자동으로 숫자가 1씩 늘어나는 방식



**데이터 추가 : INSERT**

```mysql
INSERT INTO topic (title, description, author) VALUES('JavaScript', 'Computer language for web.', 'abel');
//topic 이라는 테이블에 title, description, author정보를 추가한다.
//topic의 순서와, values의 값의 순서는 일치해야한다.

``` 

**파일을 다운로드 받는다**

```javascripts
git clone ps://github.com/TaeKyoungKim/userlistweb

```
**폴더로 이동**
<code><pre>
cd userlistweb
</pre></code>

관련 모듈을 설치한다.
<code><pre>
npm install
</pre></code>


## .env 파일을 생성후

<code><pre>
DB_HOST = [host 주소]
DB_USER = [mysql login user]
DB_PASSWORD =[mysql login password]
DB_DATABASE = [mysql db name]
  
PORT =<사용하고자 하는 포트>
</pre></code>
## .gitignore 파일 생성후

<code><pre>
.env
/node_modudles 
</pre></code>

#### 등록

웹페이지를 실행시켜 본다.
<code><pre>
node app.js
</pre></code>
