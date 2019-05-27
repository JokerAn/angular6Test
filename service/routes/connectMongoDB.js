const MongoClient = require('mongodb').MongoClient;

class MongoDBZSGC {
  constructor(url) {
    this.url = url;
  }
  //链接数据库
  _connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, { useNewUrlParser: true }, (err, db) => {
        if (err) return reject(err);
        return resolve(db);
      })
    })
  }
  //查询数据库
  /**
   * @param {dbName} 数据库名称
   * @param {tableNmae} 数据表名称
   * @param {condition} 查询条件
   */
  _query(dbName, tableNmae, condition) {
    return new Promise((resolve, reject) => {
      this._connect().then((MongoDBData) => {
        console.log({ 'condition': condition });
        if (Object.keys(condition).length > 0) {
          console.log(dbName, tableNmae, 1);
          MongoDBData.db(dbName).collection(tableNmae).find(condition).toArray(function (err, result) { // 返回集合中所有数据
            if (err) return reject(err);
            return resolve(result);
          })
        } else {
          console.log(dbName, tableNmae, 2);
          MongoDBData.db(dbName).collection(tableNmae).find().toArray(function (err, result) { // 返回集合中所有数据
            if (err) return reject(err);
            return resolve(result);
          })
        }
      }).catch((err) => {
        console.log('错误1' + __dirname);
      })
    })
  }
  //修改数据
  /**
   * @param {dbName} 数据库名称
   * @param {tableNmae} 数据表名称
   * @param {searchOldValueQuery} 要更新数据中的信息 根据这个信息查出所有的信息 oldData=查出的旧数据
   * @param {newData} 新的数据
   */
  _update(dbName, tableNmae, searchOldValueQuery, newData) {
    return new Promise((resolve, reject) => {
      let oldData;
      this._query(dbName, tableNmae, searchOldValueQuery).then((result) => { 
        console.log({ '更新先根据这个调价查询': { dbName, tableNmae, searchOldValueQuery } });
        console.log({ '查询结果': result});
        if (result.length > 0) {
          oldData = result[0];
          delete oldData['_id'];
          this._connect().then((MongoDBData) => {
            MongoDBData.db(dbName).collection(tableNmae).updateOne(oldData
              , { $set: newData }, function (err, result) {
                if (err) return reject(err);
                return resolve(result);
              });
          })
        } else { 
          resolve(result);
        }
      }).catch((error) => { 
        console.log('错误_update' + __dirname);
        // reject(error);
      })
      
    })
  }
  //新增数据
  /**
   * @param {dbName} 数据库名称
   * @param {tableNmae} 数据表名称
   * @param {addData} 新增数据集合
   */
  _add(dbName, tableNmae, addData) {
    return new Promise((resolve, reject) => {
      this._connect().then((MongoDBData) => {
        if (Object.prototype.toString.call(addData) == "[object Array]") {
          MongoDBData.db(dbName).collection(tableNmae).insertMany(addData, function (err, res) {
            if (err) return reject(err);
            console.log("文档插入成功，多条数据");
            return resolve(true);
          });
        } else {
          MongoDBData.db(dbName).collection(tableNmae).insertOne(addData, function (err, res) {
            if (err) return reject(err);
            console.log("文档插入成功，一条数据");
            return resolve(true);
          });
        }
      }).catch((err) => {
        console.log('错误2' + __dirname);
      })
    })
  }
  //删除数据
  /**
   * @param {dbName} 数据库名称
   * @param {tableNmae} 数据表名称
   * @param {delData} 要删除的数据中的信息
   */
  _remove(dbName, tableNmae, delData) {
    let me = this;
    return new Promise((resolve, reject) => {
      console.log({ 'delData': delData });
      this._query(dbName, tableNmae, delData).then(function (result) {
        console.log({ '删除前先查询是否有这个数据': result});
        if (result.length > 0) {
          me._connect().then((MongoDBData) => {
            MongoDBData.db(dbName).collection(tableNmae).remove(delData, function (err, result2) { // 返回集合中所有数据
              if (err) return reject(err);
              console.log({ '将该数据删除数据成功': result2 });
              return resolve(result2);
            })
          })          
        } else { 
          resolve(result);
        } 
      })
    })
  }
}
module.exports = MongoDBZSGC