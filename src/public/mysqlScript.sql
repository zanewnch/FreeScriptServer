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




-- bar-chart 語法
SELECT tag, SUM(`like`) as total_likes
FROM articles
GROUP BY tag
ORDER BY total_likes DESC
LIMIT 5;