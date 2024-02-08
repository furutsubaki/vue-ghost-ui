export const hira2Kata = (str: string) => {
    // ひら→カタ
    return str.replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
};

export const kata2Hira = (str: string) => {
    // カタ→ひら
    return str.replace(/[\u30A1-\u30FA]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
};

export const kataFull2Half = (str: string) => {
    // 全角カタ→半角ｶﾀ
    const kanaMap: { [key: string]: string } = {
        ガ: 'ｶﾞ',
        ギ: 'ｷﾞ',
        グ: 'ｸﾞ',
        ゲ: 'ｹﾞ',
        ゴ: 'ｺﾞ',
        ザ: 'ｻﾞ',
        ジ: 'ｼﾞ',
        ズ: 'ｽﾞ',
        ゼ: 'ｾﾞ',
        ゾ: 'ｿﾞ',
        ダ: 'ﾀﾞ',
        ヂ: 'ﾁﾞ',
        ヅ: 'ﾂﾞ',
        デ: 'ﾃﾞ',
        ド: 'ﾄﾞ',
        バ: 'ﾊﾞ',
        ビ: 'ﾋﾞ',
        ブ: 'ﾌﾞ',
        ベ: 'ﾍﾞ',
        ボ: 'ﾎﾞ',
        パ: 'ﾊﾟ',
        ピ: 'ﾋﾟ',
        プ: 'ﾌﾟ',
        ペ: 'ﾍﾟ',
        ポ: 'ﾎﾟ',
        ヴ: 'ｳﾞ',
        ヷ: 'ﾜﾞ',
        ヺ: 'ｦﾞ',
        ア: 'ｱ',
        イ: 'ｲ',
        ウ: 'ｳ',
        エ: 'ｴ',
        オ: 'ｵ',
        カ: 'ｶ',
        キ: 'ｷ',
        ク: 'ｸ',
        ケ: 'ｹ',
        コ: 'ｺ',
        サ: 'ｻ',
        シ: 'ｼ',
        ス: 'ｽ',
        セ: 'ｾ',
        ソ: 'ｿ',
        タ: 'ﾀ',
        チ: 'ﾁ',
        ツ: 'ﾂ',
        テ: 'ﾃ',
        ト: 'ﾄ',
        ナ: 'ﾅ',
        ニ: 'ﾆ',
        ヌ: 'ﾇ',
        ネ: 'ﾈ',
        ノ: 'ﾉ',
        ハ: 'ﾊ',
        ヒ: 'ﾋ',
        フ: 'ﾌ',
        ヘ: 'ﾍ',
        ホ: 'ﾎ',
        マ: 'ﾏ',
        ミ: 'ﾐ',
        ム: 'ﾑ',
        メ: 'ﾒ',
        モ: 'ﾓ',
        ヤ: 'ﾔ',
        ユ: 'ﾕ',
        ヨ: 'ﾖ',
        ラ: 'ﾗ',
        リ: 'ﾘ',
        ル: 'ﾙ',
        レ: 'ﾚ',
        ロ: 'ﾛ',
        ワ: 'ﾜ',
        ヲ: 'ｦ',
        ン: 'ﾝ',
        ァ: 'ｧ',
        ィ: 'ｨ',
        ゥ: 'ｩ',
        ェ: 'ｪ',
        ォ: 'ｫ',
        ッ: 'ｯ',
        ャ: 'ｬ',
        ュ: 'ｭ',
        ョ: 'ｮ',
        '。': '｡',
        '、': '､',
        ー: 'ｰ',
        '「': '｢',
        '」': '｣',
        '・': '･',
        '　': ' '
    };
    const reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
        .replace(reg, function (s) {
            return kanaMap[s];
        })
        .replace(/゛/g, 'ﾞ')
        .replace(/゜/g, 'ﾟ');
};

export const kanaHalf2Full = (str: string) => {
    // 半角ｶﾀ→全角カタ
    const kanaMap: { [key: string]: string } = {
        ｶﾞ: 'ガ',
        ｷﾞ: 'ギ',
        ｸﾞ: 'グ',
        ｹﾞ: 'ゲ',
        ｺﾞ: 'ゴ',
        ｻﾞ: 'ザ',
        ｼﾞ: 'ジ',
        ｽﾞ: 'ズ',
        ｾﾞ: 'ゼ',
        ｿﾞ: 'ゾ',
        ﾀﾞ: 'ダ',
        ﾁﾞ: 'ヂ',
        ﾂﾞ: 'ヅ',
        ﾃﾞ: 'デ',
        ﾄﾞ: 'ド',
        ﾊﾞ: 'バ',
        ﾋﾞ: 'ビ',
        ﾌﾞ: 'ブ',
        ﾍﾞ: 'ベ',
        ﾎﾞ: 'ボ',
        ﾊﾟ: 'パ',
        ﾋﾟ: 'ピ',
        ﾌﾟ: 'プ',
        ﾍﾟ: 'ペ',
        ﾎﾟ: 'ポ',
        ｳﾞ: 'ヴ',
        ﾜﾞ: 'ヷ',
        ｦﾞ: 'ヺ',
        ｱ: 'ア',
        ｲ: 'イ',
        ｳ: 'ウ',
        ｴ: 'エ',
        ｵ: 'オ',
        ｶ: 'カ',
        ｷ: 'キ',
        ｸ: 'ク',
        ｹ: 'ケ',
        ｺ: 'コ',
        ｻ: 'サ',
        ｼ: 'シ',
        ｽ: 'ス',
        ｾ: 'セ',
        ｿ: 'ソ',
        ﾀ: 'タ',
        ﾁ: 'チ',
        ﾂ: 'ツ',
        ﾃ: 'テ',
        ﾄ: 'ト',
        ﾅ: 'ナ',
        ﾆ: 'ニ',
        ﾇ: 'ヌ',
        ﾈ: 'ネ',
        ﾉ: 'ノ',
        ﾊ: 'ハ',
        ﾋ: 'ヒ',
        ﾌ: 'フ',
        ﾍ: 'ヘ',
        ﾎ: 'ホ',
        ﾏ: 'マ',
        ﾐ: 'ミ',
        ﾑ: 'ム',
        ﾒ: 'メ',
        ﾓ: 'モ',
        ﾔ: 'ヤ',
        ﾕ: 'ユ',
        ﾖ: 'ヨ',
        ﾗ: 'ラ',
        ﾘ: 'リ',
        ﾙ: 'ル',
        ﾚ: 'レ',
        ﾛ: 'ロ',
        ﾜ: 'ワ',
        ｦ: 'ヲ',
        ﾝ: 'ン',
        ｧ: 'ァ',
        ｨ: 'ィ',
        ｩ: 'ゥ',
        ｪ: 'ェ',
        ｫ: 'ォ',
        ｯ: 'ッ',
        ｬ: 'ャ',
        ｭ: 'ュ',
        ｮ: 'ョ',
        '｡': '。',
        '､': '、',
        ｰ: 'ー',
        '｢': '「',
        '｣': '」',
        '･': '・'
    };

    const reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
        .replace(reg, function (match) {
            return kanaMap[match];
        })
        .replace(/ﾞ/g, '゛')
        .replace(/ﾟ/g, '゜');
};

export const alphanumericFull2Half = (str: string) => {
    // 全角英数字→半角英数字
    str = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
    return str;
};
export const alphanumericHalf2Full = (str: string) => {
    // 半角英数字→全角英数字
    str = str.replace(/[A-Za-z0-9]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
    });
    return str;
};
