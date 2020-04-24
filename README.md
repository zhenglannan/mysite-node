# mysite-node

## 记录bug

- 每次前端刷新请求，需要skip前面已展现数据（相当于分页），后面数据都刷完了，能重新刷新页面时数据skip重回初值吗

## 性能优化

- mongoDB建立索引
  + **MongoDB提供了一个explain命令， 用来查看查询的过程并且可以查看是否使用缩影**
  +  senSchema.index({createdAt: -1,cntLike:-1});组合索引
