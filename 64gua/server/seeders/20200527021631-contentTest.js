'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Contents', [
        {
            "name": "一、乾卦",
            "contentId": 1,
            "contentList": "1,1,1,1,1,1",
            "desc": "乾为天",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "二、坤卦",
            "contentId": 2,
            "contentList": "2,2,2,2,2,2",
            "desc": "坤为地",
            "likeCount": 99,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "三、屯卦",
            "contentId": 3,
            "contentList": "2,1,2,2,2,1",
            "desc": "水雷屯",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "四、蒙卦",
            "contentId": 4,
            "contentList": "1,2,2,2,1,2",
            "desc": "山水蒙",
            "likeCount": 99,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "五、需卦",
            "contentId": 5,
            "contentList": "2,1,2,1,1,1",
            "desc": "水天需",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "六、讼卦",
            "contentId": 6,
            "contentList": "1,1,1,2,1,2",
            "desc": "天水讼",
            "likeCount": 99,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "七、师卦",
            "contentId": 7,
            "contentList": "2,2,2,2,1,2",
            "desc": "地水师",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "八、比卦",
            "contentId": 8,
            "contentList": "2,1,2,2,2,2",
            "desc": "水地比",
            "likeCount": 99,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "九、小畜卦",
            "contentId": 9,
            "contentList": "1,1,2,1,1,1",
            "desc": "风天小畜",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "十、履卦",
            "contentId": 10,
            "contentList": "1,1,1,2,1,1",
            "desc": "天泽履",
            "likeCount": 99,
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "name": "十一、泰卦",
            "contentList": "2,2,2,1,1,1",
            "desc": "地天泰",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 11
        },
        {
            "name": "十二、否卦",
            "contentList": "1,1,1,2,2,2",
            "desc": "天地否",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 12
        },
        {
            "name": "十三、同人卦",
            "contentList": "1,1,1,1,2,1",
            "desc": "天火同人",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 13
        },
        {
            "name": "十四、大有卦",
            "contentList": "1,2,1,1,1,1",
            "desc": "火天大有",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 14
        },
        {
            "name": "十五、谦卦",
            "contentList": "2,2,2,1,2,2",
            "desc": "地山谦",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 15
        },
        {
            "name": "十六、豫卦",
            "contentList": "2,2,1,2,2,2",
            "desc": "雷地豫",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 16
        },
        {
            "name": "十七、随卦",
            "contentList": "2,1,1,2,2,1",
            "desc": "泽雷随",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 17
        },
        {
            "name": "十八、蛊卦",
            "contentList": "1,2,2,1,1,2",
            "desc": "山风蛊",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 18
        },
        {
            "name": "十九、临卦",
            "contentList": "2,2,2,2,1,1",
            "desc": "地泽临",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 19
        },
        {
            "name": "二十、观卦",
            "contentList": "1,1,2,2,2,2",
            "desc": "风地观",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 20
        },
        {
            "name": "二十一、噬嗑卦",
            "contentList": "1,2,1,2,2,1",
            "desc": "火雷噬嗑",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 21
        },
        {
            "name": "二十二、贲卦",
            "contentList": "1,2,2,1,2,1",
            "desc": "山火贲",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 22
        },
        {
            "name": "二十三、剥卦",
            "contentList": "1,2,2,2,2,2",
            "desc": "山地剥",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 23
        },
        {
            "name": "二十四、复卦",
            "contentList": "2,2,2,2,2,1",
            "desc": "地雷复",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 24
        },
        {
            "name": "二十五、无妄卦",
            "contentList": "1,1,1,2,2,1",
            "desc": "天雷无妄",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 25
        },
        {
            "name": "二十六、大畜卦",
            "contentList": "1,2,2,1,1,1",
            "desc": "山天大畜",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 26
        },
        {
            "name": "二十七、颐卦",
            "contentList": "1,2,2,2,2,1",
            "desc": "山雷颐",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 27
        },
        {
            "name": "二十八、大过卦",
            "contentList": "2,1,1,1,1,2",
            "desc": "泽风大过",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 28
        },
        {
            "name": "二十九、坎卦",
            "contentList": "2,1,2,2,1,2",
            "desc": "坎为水",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 29
        },
        {
            "name": "三十、离卦",
            "contentList": "1,2,1,1,2,1",
            "desc": "离为火",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 30
        },
        {
            "name": "三十一、咸卦",
            "contentList": "2,1,1,1,2,2",
            "desc": "泽山咸",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 31
        },
        {
            "name": "三十二、恒卦",
            "contentList": "2,2,1,1,1,2",
            "desc": "雷风恒",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 32
        },
        {
            "name": "三十三、遁卦",
            "contentList": "1,1,1,1,2,2",
            "desc": "天山遁",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 33
        },
        {
            "name": "三十四、大壮卦",
            "contentList": "2,2,1,1,1,1",
            "desc": "雷天大壮",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 34
        },
        {
            "name": "三十五、晋卦",
            "contentList": "1,2,1,2,2,2",
            "desc": "火地晋",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 35
        },
        {
            "name": "三十六、明夷卦",
            "contentList": "2,2,2,1,2,1",
            "desc": "地火明夷",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 36
        },
        {
            "name": "三十七、家人卦",
            "contentList": "1,1,2,1,2,1",
            "desc": "风火家人",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 37
        },
        {
            "name": "三十八、睽卦",
            "contentList": "1,2,1,2,1,1",
            "desc": "火泽睽",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 38
        },
        {
            "name": "三十九、蹇卦",
            "contentList": "2,1,2,1,2,2",
            "desc": "水山蹇",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 39
        },
        {
            "name": "四十、解卦",
            "contentList": "2,2,1,2,1,2",
            "desc": "雷水解",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 40
        },
        {
            "name": "四十一、损卦",
            "contentList": "1,2,2,2,1,1",
            "desc": "山泽损",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 41
        },
        {
            "name": "四十二、益卦",
            "contentList": "1,1,2,2,2,1",
            "desc": "风雷益",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 42
        },
        {
            "name": "四十三、夬卦",
            "contentList": "2,1,1,1,1,1",
            "desc": "泽天夬",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 43
        },
        {
            "name": "四十四、姤卦",
            "contentList": "1,1,1,1,1,2",
            "desc": "天风姤",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 44
        },
        {
            "name": "四十五、萃卦",
            "contentList": "2,1,1,2,2,2",
            "desc": "泽地萃",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 45
        },
        {
            "name": "四十六、升卦",
            "contentList": "2,2,2,1,1,2",
            "desc": "地风升",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 46
        },
        {
            "name": "四十七、困卦",
            "contentList": "2,1,1,2,1,2",
            "desc": "泽水困",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 47
        },
        {
            "name": "四十八、井卦",
            "contentList": "2,1,2,1,1,2",
            "desc": "水风井",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 48
        },
        {
            "name": "四十九、革卦",
            "contentList": "2,1,1,1,2,1",
            "desc": "泽火革",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 49
        },
        {
            "name": "五十、鼎卦",
            "contentList": "1,2,1,1,1,2",
            "desc": "火风鼎",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 50
        },
        {
            "name": "五十一、雷卦",
            "contentList": "2,2,1,2,2,1",
            "desc": "震为雷",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 51
        },
        {
            "name": "五十二、艮卦",
            "contentList": "1,2,2,1,2,2",
            "desc": "艮为山",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 52
        },
        {
            "name": "五十三、渐卦",
            "contentList": "1,1,2,1,2,2",
            "desc": "风山渐",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 53
        },
        {
            "name": "五十四、归妹卦",
            "contentList": "2,2,1,2,1,1",
            "desc": "雷泽归妹",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 54
        },
        {
            "name": "五十五、丰卦",
            "contentList": "2,2,1,1,2,1",
            "desc": "雷火丰",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 55
        },
        {
            "name": "五十六、旅卦",
            "contentList": "1,2,1,1,2,2",
            "desc": "火山旅",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 56
        },
        {
            "name": "五十七、巽卦",
            "contentList": "1,1,2,1,1,2",
            "desc": "巽为风",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 57
        },
        {
            "name": "五十八、兑卦",
            "contentList": "2,1,1,2,1,1",
            "desc": "兑为泽",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 58
        },
        {
            "name": "五十九、涣卦",
            "contentList": "1,1,2,2,1,2",
            "desc": "风水涣",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 59
        },
        {
            "name": "六十、节卦",
            "contentList": "2,1,2,2,1,1",
            "desc": "水泽节",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 60
        },
        {
            "name": "六十一、中孚卦",
            "contentList": "1,1,2,2,1,1",
            "desc": "风泽中孚",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 61
        },
        {
            "name": "六十二、小过卦",
            "contentList": "2,2,1,1,2,2",
            "desc": "雷山小过",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 62
        },
        {
            "name": "六十三、既济卦",
            "contentList": "2,1,2,1,2,1",
            "desc": "水火既济",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 63
        },
        {
            "name": "六十四、未济卦",
            "contentList": "1,2,1,2,1,2",
            "desc": "火水未济",
            "likeCount": 106,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "contentId": 64
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Contents', null, {});
  }
};
