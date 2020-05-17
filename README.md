# mysite-node

## 记录bug

- 每次前端刷新请求，需要skip前面已展现数据（相当于分页），后面数据都刷完了，能重新刷新页面时数据skip重回初值吗

- 点赞：TotalSentenceModel改cntLike is not defined

- 关于collection创建初始化，需要先在其他js里require引入这个collection，才可以创建并初始化

- homeSentences中再次写接口没有响应??

## 性能优化

- mongoDB建立索引
  + **MongoDB提供了一个explain命令， 用来查看查询的过程并且可以查看是否使用缩影**
  +  senSchema.index({createdAt: -1,cntLike:-1});组合索引
## mongoose语法

- $all:字段要包含里面所有; $in:字段只要柏涵其中一个Model.find({ age: { $in: [16, 18]} })：返回 age 字段等于 16 或者 18 的所有 document。

## 知识点：
+ CORS(Cross-origin resource sharing)，跨域资源共享，是一份浏览器技术的规范，用来避开浏览器的同源策略。简单来说就是解决跨域问题的除了jsonp外的另一种方法