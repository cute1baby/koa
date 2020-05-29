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
		return queryInterface.bulkInsert('Comments', [
			{
				commentId: 1,
				content: '困龙得水好运交，不由喜气上眉梢，一切谋望皆如意，向后时运渐渐高。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 1,
				content: '乾卦是根据万物变通的道理，以“元、亨、利、贞”为卦辞，示吉祥如意，教导人遵守天道的德行。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 2,
				content: '肥羊失群入山岗，饿虎逢之把口张，适口充肠心欢喜，卦若占之大吉昌。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 2,
				content: '坤卦以雌马为象征，表明地道生育抚养万物，而又依天顺时，性情温顺。它以“先迷后得”证明“坤”顺从“乾”，依随“乾”，才能把握正确方向，遵循正道，获取吉利。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 3,
				content: '风刮乱丝不见头，颠三倒四犯忧愁，慢从款来左顺遂，急促反惹不自由。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 3,
				content: '万物始生，充满艰难险阻，然而顺时应运，必欣欣向荣。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 4,
				content: '卦中爻象犯小耗，君子占之运不高，婚姻合伙有琐碎，做事必然受苦劳。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 4,
				content: '坎是水的形象，喻险。卦形为山下有险，仍不停止前进，是为蒙昧，故称蒙卦。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 5,
				content: '明珠土埋日久深，无光无亮到如今，忽然大风吹土去，自然显露有重新。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 5,
				content: '这个卦是异卦（下乾上坎）相叠，下卦是乾，刚健之意；上卦是坎，险陷之意。以刚逢险，宜稳健之妥，不可冒失行动，观时待变，所往一定成功。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 6,
				content: '心中有事事难做，恰是二人争路走，雨下俱是要占先，谁肯让谁走一步。这个卦是异卦（下坎上乾）相叠。同需卦相反，互为“综卦”。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 6,
				content: '乾为刚健，坎为险陷。刚与险，健与险，彼此反对，定生争讼。争讼非善事，务必慎重戒惧。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 7,
				content: '将帅领旨去出征，骑着烈马拉硬弓，百步穿杨去得准，箭中金钱喜气生。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 7,
				content: '兵凶战危，用兵乃圣人不得已而为之，但它可以顺利无阻碍地解决矛盾，因为顺乎形势，师出有名，故能化凶为吉。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 8,
				content: '顺风行船撒起帆，上天又助一蓬风，不用费力逍遥去，任意而行大亨通。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 8,
				content: '此卦与师卦完全相反，互为综卦。它阐述的是相亲相辅，宽宏无私，精诚团结的道理。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 9,
				content: '苗逢旱天尽焦梢，水想云浓雨不浇，农人仰面长吁气，是从款来莫心高。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 9,
				content: '喻风调雨顺，谷物滋长，故卦名小畜（蓄）。力量有限，须待发展到一定程度，才可大有作为。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 10,
				content: '凤凰落在西岐山，长鸣几声出圣贤，天降文王开基业，富贵荣华八百年。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 10,
				content: '君上民下，各得其位。兑柔遇乾刚，所履危。履意为实践，卦义是脚踏实地的向前进取的意思。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 11,
				content: '学文满腹入场闱，三元及第得意回，从今解去愁和闷，喜庆平地一声雷。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 11,
				content: '万事万物，皆对立，转化，盛极必衰，衰而转盛，故应时而变者泰（通）。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 12,
				content: '虎落陷坑不堪言，进前容易退后难，谋望不遂自己便，疾病口舌事牵连。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 12,
				content: '泰极而否，否极泰来，互为因果。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 13,
				content: '心中有事犯猜疑，谋望从前不着实，幸遇明人来指引，诸般忧闷自消之。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 13,
				content: '这个卦是异卦（下离上乾）相叠，乾为天，为君；离为火，为臣民百姓，上天下火，火性上升，同于天，上下和同，同舟共济，人际关系和谐，天下大同。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 14,
				content: '砍树摸雀作事牢，是非口舌自然消，婚姻合伙不费力，若问走失未逃脱。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 14,
				content: '这个卦是异卦（下乾上离）相叠。上卦为离，为火；下卦为乾，为天。火在天上，普照万物，万民归顺，顺天依时，大有所成。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 15,
				content: '天赐贫人一封金，不争不抢两平分，彼此分得金到手，一切谋望皆遂心。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 16,
				content: '太公插下杏黄旗，收妖为徒归西岐，自此青龙得了位，一旦谋望百事宜。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 17,
				content: '泥里步踏这几年，推车靠崖在眼前，目下就该再使力，扒上崖去发财源。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 18,
				content: '卦中爻象如推磨，顺当为福反为祸，心中有益且迟迟，凡事尽从忙处错。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 19,
				content: '君王无道民倒悬，常想拨云见青天，幸逢明主施仁政，重又安居乐自然。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 20,
				content: '卦遇蓬花旱逢河，生意买卖利息多，婚姻自有人来助，出门永不受折磨。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 21,
				content: '运拙如同身受饥，幸得送饭又送食，适口充腹心欢喜，忧愁从此渐消移。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 22,
				content: '钟鼓乐之大吉庆，占者逢之喜临头。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 23,
				content: '鹊遇天晚宿林中，不知林内先有鹰，虽然同处心生恶，卦若逢之是非轻。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 24,
				content: '马氏太公不相合，世人占之忧疑多，恩人无义反为怨，是非平地起风波。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 25,
				content: '飞鸟失机落笼中，纵然奋飞不能腾，目下只宜守本分，妄想扒高万不能。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 26,
				content: '忧愁常锁两眉头，千头万绪挂心间，从今以后防开阵，任意行而不相干。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 27,
				content: '太公独钓渭水河，手执丝杆忧愁多，时来又遇文王访，自此永不受折磨。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 28,
				content: '夜晚梦里梦金银，醒来仍不见一文，目下只宜求本分，思想络是空劳神。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 29,
				content: '一轮明月照水中，只见影儿不见踪，愚夫当财下去取，摸来摸去一场空。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 30,
				content: '官人来占主高升，庄农人家产业增，生意买卖利息厚，匠艺占之大亨通。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 31,
				content: '运去黄金失色，时来棒槌发芽，月令极好无差，且喜心宽意大。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 32,
				content: '渔翁寻鱼运气好，鱼来撞网跑不了，别人使本挣不来，谁想一到就凑合。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 33,
				content: '浓云蔽日不光明，劝君且莫出远行，婚姻求财皆不利，提防口舌到门庭。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 34,
				content: '卦占工师得大木，眼前该着走上路，时来运转多顺当，有事自管放心宽。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 35,
				content: '锄地锄去苗里草，谁想财帛将人找，一锄锄出银子来，这个运气也算好。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 36,
				content: '时乖运拙走不着，急忙过河拆了桥，恩人无义反为怨，凡事无功枉受劳。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 37,
				content: '一朵鲜花镜中开，看着极好取不来，劝君休把镜花恋，卦若逢之主可怪。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 38,
				content: '此卦占来运气歹，如同太公作买卖，贩猪牛快贩羊迟，猪羊齐贩断了宰。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 39,
				content: '大雨倾地雪满天，路上行人苦又寒，拖泥带水费尽力，事不遂心且耐烦。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 40,
				content: '目下月令如过关，千辛万苦受熬煎，时来恰相有人救，任意所为不相干。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 41,
				content: '时运不至费心多，比作推车受折磨，山路崎岖吊下耳，左插右按按不着。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 42,
				content: '时来运转吉气发，多年枯木又开花，枝叶重生多茂盛，几人见了几人夸。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 43,
				content: '蜘蛛脱网赛天军，粘住游蜂翅翎毛，幸有大风吹破网，脱离灾难又逍遥。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 44,
				content: '他乡遇友喜气欢，须知运气福重添，自今交了顺当运，向后管保不相干。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 45,
				content: '游鱼戏水被网惊，跳过龙门身化龙，三尺杨柳垂金线，万朵桃花显你能。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 46,
				content: '士人来占必得名，生意买卖也兴隆，匠艺逢之交易好，农间庄稼亦收成。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 47,
				content: '时运不来好伤怀，撮上押去把梯抬，一筒虫翼无到手，转了上去下不来。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 48,
				content: '枯井破费已多年，一朝流泉出来鲜，资生济渴人称羡，时来运转喜自然。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 49,
				content: '苗逢旱天渐渐衰，幸得天恩降雨来，忧去喜来能变化，求谋干事遂心怀。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 50,
				content: '莺鹜蛤蜊落沙滩，蛤蜊莺鹜两翅扇，渔人进前双得利，失走行人却自在。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 51,
				content: '一口金钟在淤泥，人人拿着当玩石，忽然一日钟悬起，响亮一声天下知。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 52,
				content: '财帛常打心头走，可惜眼前难到手，不如意时且忍耐，逢着闲事休开口。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 53,
				content: '俊鸟幸得出笼中，脱离灾难显威风，一朝得意福力至，东西南北任意行。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 54,
				content: '求鱼须当向水中，树上求之不顺情，受尽爬揭难随意，劳而无功运平平。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 55,
				content: '古镜昏暗好几年，一朝磨明似月圆，君子谋事逢此卦，时来运转喜自然。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 56,
				content: '飞鸟树上垒窝巢，小人使计举火烧，君占此卦为不吉，一切谋望枉徒劳。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 57,
				content: '一叶孤舟落沙滩，有篙无水进退难，时逢大雨江湖溢，不用费力任往返。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 58,
				content: '这个卦象真可取，觉着做事不费力，休要错过这机关，事事觉得随心意。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 59,
				content: '隔河望见一锭金，欲取岸宽水又深，指望资财难到手，昼思夜想枉费心。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 60,
				content: '时来运转喜气生，登台封神姜太公，到此诸神皆退位，纵然有祸不成凶。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 61,
				content: '路上行人色匆匆，急忙无桥过薄冰，小心谨慎过得去，一步错了落水中。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 62,
				content: '行人路过独木桥，心内惶恐眼里瞧，爽利保你过得去，慢行一定不安牢。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 63,
				content: '金榜以上题姓名，不负当年苦用功，人逢此卦名吉庆，一切谋望大亨通。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentId: 64,
				content: '离地着人几丈深，是防偷营劫寨人，后封太岁为凶煞，时加谨慎祸不侵。',
				createdAt: new Date(),
				updatedAt: new Date()
			},
		], {});
	},

	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.

		  Example:
		  return queryInterface.bulkDelete('People', null, {});
		*/
		return queryInterface.bulkDelete('Comments', null, {});
	}
};
