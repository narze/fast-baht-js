const ONE = 'หนึ่ง';
const TWO = 'สอง';
const THREE_TO_NINE = ['สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
const ED = 'เอ็ด';
const YEE = 'ยี่';
const LAN = 'ล้าน';
const EMPTY = '';
const DIGIT = [EMPTY, 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน'];
const ONES = [EMPTY, ED, TWO, ...THREE_TO_NINE];
const TENS = [EMPTY, ...[EMPTY, YEE, ...THREE_TO_NINE].map(t => t + DIGIT[1])];
const SUB_HUNDRED = TENS.flatMap(t => ONES.map(o => t + o));
SUB_HUNDRED[1] = ONE;

function numberToWords(num: string): string {
  let output = EMPTY;
  const length = num.length;

  for (let i = 0; i < length; i++) {
    const d = num.charAt(i);
    const di = length - i - 1;
    const diMod = di % 6;

    switch (d) {
      case '0':
        break;
      case '1':
        if (diMod === 1) {
          output += DIGIT[diMod];
        } else if (diMod === 0 && i) {
          output += ED;
        } else {
          output += SUB_HUNDRED[1] + DIGIT[diMod];
        }
        break;
      case '2':
        if (diMod === 1) {
          output += YEE + DIGIT[diMod];
        } else {
          output += SUB_HUNDRED[2] + DIGIT[diMod];
        }
        break;
      default:
        output += SUB_HUNDRED[Number(d)] + DIGIT[diMod];
    }

    if (di && !diMod) {
      output += LAN;
    }
  }

  return output;
}

export function convert(input: number | string): string | false {
  let baht: number;
  let bahtStr: string;
  let satang: number;
  let satangStr: string | undefined;
  let isNegative = false;

  if (typeof input === 'number') {
    if (input < 0) {
      isNegative = true;
      input = 0 - input;
    }
    baht = Math.floor(input);
    satang = Number.isInteger(input)
      ? 0
      : Math.floor(((input + Number.EPSILON * (baht || 1)) * 100) % 100);
    bahtStr = '' + baht;
  } else if (typeof input === 'string') {
    let formattedInput = input.trim();

    if (formattedInput.startsWith('-')) {
      formattedInput = formattedInput.replace(/^-0+/, '-');
      if (formattedInput === '-') {
        formattedInput = '0';
      }
    } else {
      formattedInput = formattedInput.replace(/^0+/, '');
    }

    let inputNum = Number(formattedInput);

    if (isNaN(inputNum)) {
      return false;
    }

    if (inputNum < 0) {
      isNegative = true;
      inputNum = 0 - inputNum;
      formattedInput = formattedInput.slice(1);
    }

    const inputStr = formattedInput;

    let periodIdx;
    if (
      inputStr.includes('.') &&
      (periodIdx = inputStr.lastIndexOf('.')) !== -1
    ) {
      bahtStr = inputStr.slice(0, periodIdx);
      baht = +bahtStr;
      satangStr = inputStr.slice(periodIdx + 1);
      satang = satangStr
        ? Number(satangStr.slice(0, 2)) *
          (satangStr.length >= 2 ? 1 : [100, 10][satangStr.length])
        : 0;
    } else {
      baht = inputNum;
      bahtStr = inputStr;
      satang = 0;
    }
  } else {
    return false;
  }

  if (baht || satang) {
    return (
      (isNegative ? 'ลบ' : EMPTY) +
      numberToWords(bahtStr) +
      (satang
        ? (baht ? 'บาท' : EMPTY) + SUB_HUNDRED[satang] + 'สตางค์'
        : 'บาทถ้วน')
    );
  } else {
    return 'ศูนย์บาทถ้วน';
  }
}

export default { convert };
