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

export const globalOptions = {
  roundSatangs: false,
};

export function config(options: { roundSatangs?: boolean } = {}): void {
  globalOptions.roundSatangs = !!options.roundSatangs;
}

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

export function convert(
  input: number | string,
  options: { roundSatangs?: boolean } = {}
): string | false {
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

    if (options.roundSatangs ?? globalOptions.roundSatangs) {
      if (input * 100 < Number.MAX_SAFE_INTEGER) {
        const rounded = Math.round(input * 100);
        baht = Math.floor(rounded / 100);
        satang = +String(Math.floor(rounded)).slice(-2);
      } else {
        const [b, s] = String(input).split('.');
        satang = Math.round(Number(s) * 100);
        baht = Number(b);
      }
    } else {
      baht = Math.floor(input);
      satang = Number.isInteger(input)
        ? 0
        : Math.floor(((input + Number.EPSILON * (baht || 1)) * 100) % 100);
    }

    bahtStr = String(baht);
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

    if (Number.isNaN(inputNum)) {
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
    const prefix = isNegative ? 'ลบ' : EMPTY;
    const currency = baht ? `${numberToWords(bahtStr)}บาท` : EMPTY;
    const subCurrency = satang ? `${SUB_HUNDRED[satang]}สตางค์` : 'ถ้วน';
    return `${prefix}${currency}${subCurrency}`;
  }
  return 'ศูนย์บาทถ้วน';
}

export default { convert };
