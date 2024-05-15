show databases;
use sideProject;
show tables;
select * from supermarket;



show databases;
use sideProject;
show tables;

CREATE TABLE Articles (
    id INT AUTO_INCREMENT primary key,
    _id varchar(255) null,
    title VARCHAR(255) null,
    content TEXT null,
    createdDate datetime DEFAULT CURRENT_TIMESTAMP null,
    publishedDate datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP null,
    updateDate datetime null,
    tag varchar(255) null,
    `like` bigint null,
    views bigint null,
    summary varchar(255) null,
    commment varchar(255)    
);

-- 新版articles
CREATE TABLE articles (
    id INT NOT NULL AUTO_INCREMENT,
    _id VARCHAR(255)null,
    title VARCHAR(255) null,
    content TEXT null,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP null,
    publishedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP null,
    updatedDate VARCHAR(255) null,
    tag VARCHAR(255) null,
    `like` BIGINT null,
    views BIGINT null,
    summary VARCHAR(255) null,
    comments VARCHAR(5000) null,
    author VARCHAR(255) null,
    status VARCHAR(255) null,
    PRIMARY KEY (id) 
);


-- bar-chart 語法
SELECT tag, SUM(`like`) as total_likes
FROM articles
GROUP BY tag
ORDER BY total_likes DESC
LIMIT 5;

-- line-chart 語法
SELECT DATE_FORMAT(publishedDate, "%Y-%m") as month, SUM(views) as total_views
FROM articles
GROUP BY DATE_FORMAT(publishedDate, "%Y-%m")
ORDER BY month;