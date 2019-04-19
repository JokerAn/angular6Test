  <pre>
  anInput:
     <app-an-input 
      [searchTopLeft]='[4,20]'
      [ClsoeTopRight]='[4,30]'
      [searchKey]="'默认'"
      [anInutStyle]="{'border':'1px solid blue'}"
      (outer)='getUserInfo()'
       ></app-an-input>
//[searchTopLeft]='[4,20]'[ClsoeTopRight]='[4,30]' [searchKey]="'默认' "[anInutStyle]="{'border':'1px solid blue'}" 可以不写
  var myobj = {
    scholl: {
      id: 'ambow',
      name: '安博',
      className: {
        id: 'ambow01',
        name: '一年级',
        teacherName: '老师姓名',
        students: [
          {
            id: 'ambow01001',
            me: {
              name: '李四',
              age: 18,
              sex: 1,
              fatherName: '李世民',
              phoneNumber: 18511111111,
              birthday: '2012-03-04'
            },
            vipCard: {
              id: 'vipCard01',
              name: '系统赠送卡',
              baseInfo: {
                amont: 1000,//总额
                endTime: '20190202',//到期时间              
              },
              changeInfos: [
                { id: 'RechargeMoney01', RechargeTime: '20180202', money: 50, remark: '第一次充值' },
                { id: 'RechargeMoney02', RechargeTime: '20180203', money: 60, remark: '第二次充值' },
              ]
            },

            learnCurriculum: [//正在学习的课程
              { id: 'shuxue01', name: '数学', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 10, hours: 45, section: 20 }
            ],
            buyCurriculum: [//购买过的课程
              { id: 'shuxue01', name: '数学', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 10, hours: 45, section: 20 },
              { id: 'shuxue02', name: '语文', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 40, hours: 45, section: 30 }
            ]
          },
          {
            id: 'ambow01002',
            me: {
              name: '张三',
              age: 18,
              sex: 1,
              fatherName: '张天师',
              phoneNumber: 18511111111,
              birthday: '2012-03-04'
            },
            vipCard: {
              id: 'vipCard02',
              name: '系统赠送卡',
              baseInfo: {
                amont: 1000,//总额
                endTime: '20190202',//到期时间              
              },
              changeInfos: [
                { id: 'RechargeMoney012', RechargeTime: '20180202', money: 50, remark: '第一次充值' },
                { id: 'RechargeMoney023', RechargeTime: '20180203', money: 60, remark: '第二次充值' },
              ]
            },

            learnCurriculum: [//正在学习的课程
              { id: 'shuxue02', name: '语文', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 40, hours: 45, section: 30 }
            ],
            buyCurriculum: [//购买过的课程
              { id: 'shuxue01', name: '数学', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 10, hours: 45, section: 20 }
            ]
          }
        ]
      },
      shops: {//商品
        curriculums: {//课程商品
          id: 'shop001',
          curriculumsList: [
            { id: 'shuxue01', name: '数学', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 10, hours: 45, section: 20 },
            { id: 'shuxue02', name: '语文', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 40, hours: 45, section: 30 },
            { id: 'shuxue03', name: '英语', startLearnTime: '20180203', endLearnTime: '20180203', buyTime: '20180101', priceOne: 50, hours: 45, section: 15 }
          ],
          clothesList: [
            { id: 'clothes01', name: '上衣', createTime: '20180203', price: 100 },
            { id: 'clothes02', name: '下衣', createTime: '20180203', price: 300 },
            { id: 'clothes03', name: '白球鞋', createTime: '20180203', price: 200 }
          ]
        }
      }
    }
  };

asdf