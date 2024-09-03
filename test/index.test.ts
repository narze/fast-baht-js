import { config, convert } from '../src';
import ThaiBahtText from 'thai-baht-text';

describe('convert', () => {
  beforeEach(() => {
    config({ strictEt: true });
  });

  it('should be a function', () => {
    expect(convert).toEqual(expect.any(Function));
  });

  describe('IEEE 754', () => {
    it('IEEE 754 Case String', () => {
      expect(convert(('283798.29' as unknown) as number)).toBe(
        'สองแสนแปดหมื่นสามพันเจ็ดร้อยเก้าสิบแปดบาทยี่สิบเก้าสตางค์'
      );

      expect(convert(('486293.57' as unknown) as number)).toBe(
        'สี่แสนแปดหมื่นหกพันสองร้อยเก้าสิบสามบาทห้าสิบเจ็ดสตางค์'
      );

      expect(convert(('552164.58' as unknown) as number)).toBe(
        'ห้าแสนห้าหมื่นสองพันหนึ่งร้อยหกสิบสี่บาทห้าสิบแปดสตางค์'
      );
    });

    it('IEEE 754 Case Small Number (<1000)', () => {
      expect(convert(0.29)).toBe('ยี่สิบเก้าสตางค์');

      expect(convert(553.57)).toBe('ห้าร้อยห้าสิบสามบาทห้าสิบเจ็ดสตางค์');

      expect(convert(790.58)).toBe('เจ็ดร้อยเก้าสิบบาทห้าสิบแปดสตางค์');
    });

    it('IEEE 754 Case Big Number (>100000)', () => {
      expect(convert(283798.29)).toBe(
        'สองแสนแปดหมื่นสามพันเจ็ดร้อยเก้าสิบแปดบาทยี่สิบเก้าสตางค์'
      );

      expect(convert(486293.57)).toBe(
        'สี่แสนแปดหมื่นหกพันสองร้อยเก้าสิบสามบาทห้าสิบเจ็ดสตางค์'
      );

      expect(convert(874552164.58)).toBe(
        'แปดร้อยเจ็ดสิบสี่ล้านห้าแสนห้าหมื่นสองพันหนึ่งร้อยหกสิบสี่บาทห้าสิบแปดสตางค์'
      );

      expect(convert(5143289600432.29)).toBe(
        'ห้าล้านหนึ่งแสนสี่หมื่นสามพันสองร้อยแปดสิบเก้าล้านหกแสนสี่ร้อยสามสิบสองบาทยี่สิบเก้าสตางค์'
      );
    });
  });

  describe('integer Baht inputs', () => {
    it('works', () => {
      expect(convert(0)).toBe('ศูนย์บาทถ้วน');
      expect(convert(1)).toBe('หนึ่งบาทถ้วน');
      expect(convert(2)).toBe('สองบาทถ้วน');
      expect(convert(5)).toBe('ห้าบาทถ้วน');
      expect(convert(9)).toBe('เก้าบาทถ้วน');

      expect(convert(10)).toBe('สิบบาทถ้วน');
      expect(convert(20)).toBe('ยี่สิบบาทถ้วน');

      expect(convert(30)).toBe('สามสิบบาทถ้วน');
      expect(convert(45)).toBe('สี่สิบห้าบาทถ้วน');

      expect(convert(100)).toBe('หนึ่งร้อยบาทถ้วน');
      expect(convert(122)).toBe('หนึ่งร้อยยี่สิบสองบาทถ้วน');
      expect(convert(190)).toBe('หนึ่งร้อยเก้าสิบบาทถ้วน');

      expect(convert(290)).toBe('สองร้อยเก้าสิบบาทถ้วน');

      expect(convert(1000)).toBe('หนึ่งพันบาทถ้วน');
      expect(convert(10000)).toBe('หนึ่งหมื่นบาทถ้วน');
      expect(convert(100000)).toBe('หนึ่งแสนบาทถ้วน');
      expect(convert(100001)).toBe('หนึ่งแสนเอ็ดบาทถ้วน');
      expect(convert(100005)).toBe('หนึ่งแสนห้าบาทถ้วน');
      expect(convert(100021)).toBe('หนึ่งแสนยี่สิบเอ็ดบาทถ้วน');

      expect(convert(1000000)).toBe('หนึ่งล้านบาทถ้วน');
      expect(convert(1002000)).toBe('หนึ่งล้านสองพันบาทถ้วน');

      expect(convert(10000000)).toBe('สิบล้านบาทถ้วน');
      expect(convert(10002000)).toBe('สิบล้านสองพันบาทถ้วน');
    });

    it('should convert big number to Baht', () => {
      expect(convert(1000000)).toEqual('หนึ่งล้านบาทถ้วน');
      expect(convert(1000001)).toEqual('หนึ่งล้านเอ็ดบาทถ้วน');
      expect(convert(11000001)).toEqual('สิบเอ็ดล้านเอ็ดบาทถ้วน');
      expect(convert(11000000)).toEqual('สิบเอ็ดล้านบาทถ้วน');
      expect(convert(21000000)).toEqual('ยี่สิบเอ็ดล้านบาทถ้วน');
      expect(convert(21000010)).toEqual('ยี่สิบเอ็ดล้านสิบบาทถ้วน');
      expect(convert(21000011)).toEqual('ยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน');
      expect(convert(121000011)).toEqual(
        'หนึ่งร้อยยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน'
      );
    });

    it('convert to 0', () => {
      expect(convert(-0)).toEqual('ศูนย์บาทถ้วน');
      expect(convert(0)).toEqual('ศูนย์บาทถ้วน');
      expect(convert(0.0)).toEqual('ศูนย์บาทถ้วน');
      expect(convert(0.0001)).toEqual('ศูนย์บาทถ้วน');
      expect(convert(0.001)).toEqual('ศูนย์บาทถ้วน');
      expect(convert(0.009)).toEqual('ศูนย์บาทถ้วน');
    });

    it('should convert complex number to Baht', () => {
      expect(convert(6321298)).toEqual(
        'หกล้านสามแสนสองหมื่นหนึ่งพันสองร้อยเก้าสิบแปดบาทถ้วน'
      );
      expect(convert(10034567)).toEqual(
        'สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
      );
      expect(convert(20034567)).toEqual(
        'ยี่สิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
      );
      expect(convert(30034567.0)).toEqual(
        'สามสิบล้านสามหมื่นสี่พันห้าร้อยหกสิบเจ็ดบาทถ้วน'
      );
      expect(convert(1534325986.4336942)).toEqual(
        'หนึ่งพันห้าร้อยสามสิบสี่ล้านสามแสนสองหมื่นห้าพันเก้าร้อยแปดสิบหกบาทสี่สิบสามสตางค์'
      );
    });

    it('should convert to Baht', () => {
      expect(convert(1)).toEqual('หนึ่งบาทถ้วน');
      expect(convert(10)).toEqual('สิบบาทถ้วน');
      expect(convert(11)).toEqual('สิบเอ็ดบาทถ้วน');
      expect(convert(12)).toEqual('สิบสองบาทถ้วน');
      expect(convert(20)).toEqual('ยี่สิบบาทถ้วน');
      expect(convert(21)).toEqual('ยี่สิบเอ็ดบาทถ้วน');
      expect(convert(22)).toEqual('ยี่สิบสองบาทถ้วน');
      expect(convert(100)).toEqual('หนึ่งร้อยบาทถ้วน');
      expect(convert(101)).toEqual('หนึ่งร้อยเอ็ดบาทถ้วน');
      expect(convert(111)).toEqual('หนึ่งร้อยสิบเอ็ดบาทถ้วน');
      expect(convert(121)).toEqual('หนึ่งร้อยยี่สิบเอ็ดบาทถ้วน');
    });

    it('should convert multiple million round to Baht', () => {
      expect(convert(1000000000000000000)).toEqual('หนึ่งล้านล้านล้านบาทถ้วน');
      expect(convert(1000000000001)).toEqual('หนึ่งล้านล้านเอ็ดบาทถ้วน');
      expect(convert(1000000000000)).toEqual('หนึ่งล้านล้านบาทถ้วน');
      expect(convert(1001000000001)).toEqual(
        'หนึ่งล้านหนึ่งพันล้านเอ็ดบาทถ้วน'
      );
      expect(convert(1001000001001)).toEqual(
        'หนึ่งล้านหนึ่งพันล้านหนึ่งพันเอ็ดบาทถ้วน'
      );
      expect(convert(1001000000000)).toEqual('หนึ่งล้านหนึ่งพันล้านบาทถ้วน');
      expect(convert(1000000000)).toEqual('หนึ่งพันล้านบาทถ้วน');
      expect(convert(10000000)).toEqual('สิบล้านบาทถ้วน');
      expect(convert(100000000)).toEqual('หนึ่งร้อยล้านบาทถ้วน');

      // Safe integer
      expect(convert(9007199254740991)).toEqual(
        'เก้าพันเจ็ดล้านหนึ่งแสนเก้าหมื่นเก้าพันสองร้อยห้าสิบสี่ล้านเจ็ดแสนสี่หมื่นเก้าร้อยเก้าสิบเอ็ดบาทถ้วน'
      );
    });
  });

  describe('integer Satang inputs', () => {
    it('should convert to Satang', () => {
      expect(convert(0.01)).toEqual('หนึ่งสตางค์');
      expect(convert(0.1)).toEqual('สิบสตางค์');
      expect(convert(0.1)).toEqual('สิบสตางค์');
      expect(convert(0.11)).toEqual('สิบเอ็ดสตางค์');
      expect(convert(0.12)).toEqual('สิบสองสตางค์');
      expect(convert(0.123)).toEqual('สิบสองสตางค์');
      expect(convert(0.2)).toEqual('ยี่สิบสตางค์');
      expect(convert(0.2)).toEqual('ยี่สิบสตางค์');
      expect(convert(0.21)).toEqual('ยี่สิบเอ็ดสตางค์');
      expect(convert(0.25)).toEqual('ยี่สิบห้าสตางค์');
      expect(convert(0.255)).toEqual('ยี่สิบห้าสตางค์');
      expect(convert(0.5)).toEqual('ห้าสิบสตางค์');
      expect(convert(0.75)).toEqual('เจ็ดสิบห้าสตางค์');
      expect(convert(0.99)).toEqual('เก้าสิบเก้าสตางค์');
      expect(convert(0.999)).toEqual('เก้าสิบเก้าสตางค์');
      expect(convert(1.004)).toEqual('หนึ่งบาทถ้วน');
      expect(convert(1.005)).toEqual('หนึ่งบาทถ้วน');
      expect(convert(2.005)).toEqual('สองบาทถ้วน');
      expect(convert(3.005)).toEqual('สามบาทถ้วน');
    });

    it('should convert 1-99 satangs correctly compared to baht', () => {
      const bahtArray = [];
      const satangArray = [];

      for (let i = 1; i < 100; i++) {
        bahtArray.push((convert(i) as string).replace('บาทถ้วน', ''));
        satangArray.push(
          (convert(+`0.${i.toString().padStart(2, '0')}`) as string).replace(
            'สตางค์',
            ''
          )
        );
      }

      expect(bahtArray).toEqual(satangArray);
    });
  });

  describe('roundSatangs mode', () => {
    it('rounds satangs to the nearest 2 digits', () => {
      expect(convert(0.12, { roundSatangs: true })).toEqual('สิบสองสตางค์');
      expect(convert(0.123, { roundSatangs: true })).toEqual('สิบสองสตางค์');
      expect(convert(0.124, { roundSatangs: true })).toEqual('สิบสองสตางค์');
      expect(convert(0.125, { roundSatangs: true })).toEqual('สิบสามสตางค์');
      expect(convert(0.126, { roundSatangs: true })).toEqual('สิบสามสตางค์');

      expect(convert(0.254, { roundSatangs: true })).toEqual('ยี่สิบห้าสตางค์');
      expect(convert(0.255, { roundSatangs: true })).toEqual('ยี่สิบหกสตางค์');
      expect(convert(0.256, { roundSatangs: true })).toEqual('ยี่สิบหกสตางค์');

      expect(convert(0.994, { roundSatangs: true })).toEqual(
        'เก้าสิบเก้าสตางค์'
      );
      expect(convert(0.995, { roundSatangs: true })).toEqual('หนึ่งบาทถ้วน');
      expect(convert(0.996, { roundSatangs: true })).toEqual('หนึ่งบาทถ้วน');

      expect(convert(1.004, { roundSatangs: true })).toEqual('หนึ่งบาทถ้วน');
      expect(convert(1.005, { roundSatangs: true })).toEqual(
        'หนึ่งบาทหนึ่งสตางค์'
      );
      expect(convert(2.004, { roundSatangs: true })).toEqual('สองบาทถ้วน');

      expect(convert(2.005, { roundSatangs: true })).toEqual(
        'สองบาทหนึ่งสตางค์'
      );
      expect(convert(3.004, { roundSatangs: true })).toEqual('สามบาทถ้วน');

      expect(convert(3.005, { roundSatangs: true })).toEqual(
        'สามบาทหนึ่งสตางค์'
      );
    });

    it('rounds satangs to the nearest 2 digits with string input', () => {
      expect(convert('0.12', { roundSatangs: true })).toEqual('สิบสองสตางค์');
      expect(convert('0.123', { roundSatangs: true })).toEqual('สิบสองสตางค์');
      expect(convert('0.124', { roundSatangs: true })).toEqual('สิบสองสตางค์');
      expect(convert('0.125', { roundSatangs: true })).toEqual('สิบสามสตางค์');
      expect(convert('0.126', { roundSatangs: true })).toEqual('สิบสามสตางค์');

      expect(convert('0.254', { roundSatangs: true })).toEqual(
        'ยี่สิบห้าสตางค์'
      );
      expect(convert('0.255', { roundSatangs: true })).toEqual(
        'ยี่สิบหกสตางค์'
      );
      expect(convert('0.256', { roundSatangs: true })).toEqual(
        'ยี่สิบหกสตางค์'
      );

      expect(convert('0.994', { roundSatangs: true })).toEqual(
        'เก้าสิบเก้าสตางค์'
      );
      expect(convert('0.995', { roundSatangs: true })).toEqual('หนึ่งบาทถ้วน');
      expect(convert('0.996', { roundSatangs: true })).toEqual('หนึ่งบาทถ้วน');

      expect(convert('1.004', { roundSatangs: true })).toEqual('หนึ่งบาทถ้วน');
      expect(convert('1.005', { roundSatangs: true })).toEqual(
        'หนึ่งบาทหนึ่งสตางค์'
      );
      expect(convert('2.004', { roundSatangs: true })).toEqual('สองบาทถ้วน');

      expect(convert('2.005', { roundSatangs: true })).toEqual(
        'สองบาทหนึ่งสตางค์'
      );
      expect(convert('3.004', { roundSatangs: true })).toEqual('สามบาทถ้วน');

      expect(convert('3.005', { roundSatangs: true })).toEqual(
        'สามบาทหนึ่งสตางค์'
      );
    });

    it('rounds satangs with config function', () => {
      config({ roundSatangs: true });

      expect(convert(0.12)).toEqual('สิบสองสตางค์');
      expect(convert(0.123)).toEqual('สิบสองสตางค์');
      expect(convert(0.124)).toEqual('สิบสองสตางค์');
      expect(convert(0.125)).toEqual('สิบสามสตางค์');
      expect(convert(0.126)).toEqual('สิบสามสตางค์');

      expect(convert(0.254)).toEqual('ยี่สิบห้าสตางค์');
      expect(convert(0.255)).toEqual('ยี่สิบหกสตางค์');
      expect(convert(0.256)).toEqual('ยี่สิบหกสตางค์');

      expect(convert(0.994)).toEqual('เก้าสิบเก้าสตางค์');
      expect(convert(0.995)).toEqual('หนึ่งบาทถ้วน');
      expect(convert(0.996)).toEqual('หนึ่งบาทถ้วน');

      expect(convert(0.12, { roundSatangs: false })).toEqual('สิบสองสตางค์');
      expect(convert(0.123, { roundSatangs: false })).toEqual('สิบสองสตางค์');
      expect(convert(0.124, { roundSatangs: false })).toEqual('สิบสองสตางค์');
      expect(convert(0.125, { roundSatangs: false })).toEqual('สิบสองสตางค์');
      expect(convert(0.126, { roundSatangs: false })).toEqual('สิบสองสตางค์');

      expect(convert(0.254, { roundSatangs: false })).toEqual(
        'ยี่สิบห้าสตางค์'
      );
      expect(convert(0.255, { roundSatangs: false })).toEqual(
        'ยี่สิบห้าสตางค์'
      );
      expect(convert(0.256, { roundSatangs: false })).toEqual(
        'ยี่สิบห้าสตางค์'
      );

      expect(convert(0.994, { roundSatangs: false })).toEqual(
        'เก้าสิบเก้าสตางค์'
      );
      expect(convert(0.995, { roundSatangs: false })).toEqual(
        'เก้าสิบเก้าสตางค์'
      );
      expect(convert(0.996, { roundSatangs: false })).toEqual(
        'เก้าสิบเก้าสตางค์'
      );

      config({ roundSatangs: false });
    });
  });

  describe('negative integer case', () => {
    it('should convert to negative baht', () => {
      expect(convert(-1)).toEqual('ลบหนึ่งบาทถ้วน');
      expect(convert(-10)).toEqual('ลบสิบบาทถ้วน');
      expect(convert(-11)).toEqual('ลบสิบเอ็ดบาทถ้วน');
      expect(convert(-12)).toEqual('ลบสิบสองบาทถ้วน');
      expect(convert(-20)).toEqual('ลบยี่สิบบาทถ้วน');
      expect(convert(-21)).toEqual('ลบยี่สิบเอ็ดบาทถ้วน');
      expect(convert(-22)).toEqual('ลบยี่สิบสองบาทถ้วน');
      expect(convert(-100)).toEqual('ลบหนึ่งร้อยบาทถ้วน');
      expect(convert(-101)).toEqual('ลบหนึ่งร้อยเอ็ดบาทถ้วน');
      expect(convert(-111)).toEqual('ลบหนึ่งร้อยสิบเอ็ดบาทถ้วน');
      expect(convert(-121)).toEqual('ลบหนึ่งร้อยยี่สิบเอ็ดบาทถ้วน');
    });
  });

  describe('bad inputs', () => {
    it('returns false for bad inputs', () => {
      expect(convert('hello')).toBe(false);
      expect(convert((false as unknown) as number)).toBe(false);
      expect(convert((true as unknown) as number)).toBe(false);
      expect(convert(({} as unknown) as number)).toBe(false);
      expect(convert(([] as unknown) as number)).toBe(false);
      expect(convert(('155233.4b6' as unknown) as number)).toBe(false);
      expect(convert(('155233.476a85' as unknown) as number)).toBe(false);
    });
  });

  describe('string inputs', () => {
    it('should convert number to Baht with Satang', () => {
      expect(convert(11.25)).toEqual('สิบเอ็ดบาทยี่สิบห้าสตางค์');
      expect(convert(100.5)).toEqual('หนึ่งร้อยบาทห้าสิบสตางค์');
      expect(convert(567.01)).toEqual('ห้าร้อยหกสิบเจ็ดบาทหนึ่งสตางค์');
      expect(convert(123456789.999)).toEqual(
        'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์'
      );
    });

    it('should convert number in string format', () => {
      expect(convert(('1234' as unknown) as number)).toBe(
        'หนึ่งพันสองร้อยสามสิบสี่บาทถ้วน'
      );
      expect(convert(('-1' as unknown) as number)).toBe('ลบหนึ่งบาทถ้วน');
      expect(convert(('-30' as unknown) as number)).toBe('ลบสามสิบบาทถ้วน');
      expect(convert(('123456789.999' as unknown) as number)).toEqual(
        'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์'
      );
      expect(convert(('4123001998830750501' as unknown) as number)).toBe(
        'สี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
      );
      expect(convert(('-4123001998830750501' as unknown) as number)).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
      );
      expect(convert(('-4123001998830750501.21' as unknown) as number)).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert(('-1654321.21' as unknown) as number)).toBe(
        'ลบหนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert(('152555.4' as unknown) as number)).toBe(
        'หนึ่งแสนห้าหมื่นสองพันห้าร้อยห้าสิบห้าบาทสี่สิบสตางค์'
      );
      expect((convert('535.') as unknown) as number).toBe(
        'ห้าร้อยสามสิบห้าบาทถ้วน'
      );
    });

    it('should convert looping string numbers correctly', () => {
      for (let i = 100; i >= 0; i--) {
        const loopingNumber = Array(i)
          .fill('654321028761')
          .join('');

        const loopingText = Array(i)
          .fill(
            'ล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดล้านสองหมื่นแปดพันเจ็ดร้อยหกสิบเอ็ด'
          )
          .join('');

        expect(
          convert((`-1${loopingNumber}.21${555555}` as unknown) as number)
        ).toBe(`ลบหนึ่ง${loopingText}บาทยี่สิบเอ็ดสตางค์`);
      }
    });

    it('should convert spaces as 0', () => {
      expect(convert(('' as unknown) as number)).toBe('ศูนย์บาทถ้วน');
      expect(convert((' ' as unknown) as number)).toBe('ศูนย์บาทถ้วน');
      expect(convert(('  ' as unknown) as number)).toBe('ศูนย์บาทถ้วน');
    });
  });

  describe('zero with number inputs', () => {
    it('should convert number surrounding with spaces or zeros correctly', () => {
      const generateSpaceTest = (
        input: string,
        output: string,
        negativeOutput = ''
      ) => {
        const neg_output = negativeOutput || 'ลบ' + output;

        const int_tests = [
          [` ${input}`, output],
          [`${input} `, output],
          [` ${input} `, output],
          [` 0${input}`, output],
          [`0${input} `, output],
          [` 0${input} `, output],
          [` 00${input}`, output],
          [`00${input} `, output],
          [` 00${input} `, output],
          [` -${input}`, neg_output],
          [`-${input} `, neg_output],
          [` -${input} `, neg_output],
          [` -0${input}`, neg_output],
          [`-0${input} `, neg_output],
          [` -0${input} `, neg_output],
          [` -00${input}`, neg_output],
          [`-00${input} `, neg_output],
          [` -00${input} `, neg_output],
        ];

        const float_tests = [
          [` ${input}0`, output],
          [`${input}0 `, output],
          [` ${input}0 `, output],
          [` ${input}00`, output],
          [`${input}00 `, output],
          [` ${input}00 `, output],
          [` 0${input}0`, output],
          [`0${input}0 `, output],
          [` 0${input}0 `, output],
          [` 0${input}00`, output],
          [`0${input}00 `, output],
          [` 0${input}00 `, output],
          [` 00${input}0`, output],
          [`00${input}0 `, output],
          [` 00${input}0 `, output],
          [` 00${input}00`, output],
          [`00${input}00 `, output],
          [` 00${input}00 `, output],
          [` -${input}0`, neg_output],
          [`-${input}0 `, neg_output],
          [` -${input}0 `, neg_output],
          [` -${input}00`, neg_output],
          [`-${input}00 `, neg_output],
          [` -${input}00 `, neg_output],
          [` -0${input}0`, neg_output],
          [`-0${input}0 `, neg_output],
          [` -0${input}0 `, neg_output],
          [` -0${input}00`, neg_output],
          [`-0${input}00 `, neg_output],
          [` -0${input}00 `, neg_output],
          [` -00${input}0`, neg_output],
          [`-00${input}0 `, neg_output],
          [` -00${input}0 `, neg_output],
          [` -00${input}00`, neg_output],
          [`-00${input}00 `, neg_output],
          [` -00${input}00 `, neg_output],
        ];

        const tests = input.includes('.')
          ? int_tests.concat(float_tests)
          : int_tests;

        tests.forEach(([input, expected]) => {
          expect(convert((input as unknown) as number)).toBe(expected);
        });
      };

      // Normal Test
      generateSpaceTest('0', 'ศูนย์บาทถ้วน', 'ศูนย์บาทถ้วน'); // -0 is same as 0
      generateSpaceTest('0.0', 'ศูนย์บาทถ้วน', 'ศูนย์บาทถ้วน'); // -0.0 is same as 0.0
      generateSpaceTest('0.5', 'ห้าสิบสตางค์');
      generateSpaceTest('0.00', 'ศูนย์บาทถ้วน', 'ศูนย์บาทถ้วน'); // -0.00 is same as 0.00
      generateSpaceTest('0.50', 'ห้าสิบสตางค์');
      generateSpaceTest('0.55', 'ห้าสิบห้าสตางค์');

      generateSpaceTest('1', 'หนึ่งบาทถ้วน');
      generateSpaceTest('1.0', 'หนึ่งบาทถ้วน');
      generateSpaceTest('9.5', 'เก้าบาทห้าสิบสตางค์');
      generateSpaceTest('9.00', 'เก้าบาทถ้วน');
      generateSpaceTest('9.50', 'เก้าบาทห้าสิบสตางค์');
      generateSpaceTest('9.55', 'เก้าบาทห้าสิบห้าสตางค์');

      generateSpaceTest('11', 'สิบเอ็ดบาทถ้วน');
      generateSpaceTest('11.0', 'สิบเอ็ดบาทถ้วน');
      generateSpaceTest('11.5', 'สิบเอ็ดบาทห้าสิบสตางค์');
      generateSpaceTest('11.00', 'สิบเอ็ดบาทถ้วน');
      generateSpaceTest('11.50', 'สิบเอ็ดบาทห้าสิบสตางค์');
      generateSpaceTest('12.34', 'สิบสองบาทสามสิบสี่สตางค์');

      // From other tests
      generateSpaceTest(
        '123456789.999',
        'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์'
      );
      generateSpaceTest(
        '4123001998830750501',
        'สี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
      );
      generateSpaceTest(
        '4123001998830750501.21',
        'สี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      generateSpaceTest(
        '1654321.21',
        'หนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );

      // IEEE Test
      generateSpaceTest('0.29', 'ยี่สิบเก้าสตางค์');
      generateSpaceTest('553.57', 'ห้าร้อยห้าสิบสามบาทห้าสิบเจ็ดสตางค์');
      generateSpaceTest('790.58', 'เจ็ดร้อยเก้าสิบบาทห้าสิบแปดสตางค์');
      generateSpaceTest(
        '283798.29',
        'สองแสนแปดหมื่นสามพันเจ็ดร้อยเก้าสิบแปดบาทยี่สิบเก้าสตางค์'
      );
      generateSpaceTest(
        '486293.57',
        'สี่แสนแปดหมื่นหกพันสองร้อยเก้าสิบสามบาทห้าสิบเจ็ดสตางค์'
      );
      generateSpaceTest(
        '874552164.58',
        'แปดร้อยเจ็ดสิบสี่ล้านห้าแสนห้าหมื่นสองพันหนึ่งร้อยหกสิบสี่บาทห้าสิบแปดสตางค์'
      );
      generateSpaceTest(
        '5143289600432.29',
        'ห้าล้านหนึ่งแสนสี่หมื่นสามพันสองร้อยแปดสิบเก้าล้านหกแสนสี่ร้อยสามสิบสองบาทยี่สิบเก้าสตางค์'
      );
    });

    it('should convert with leading zero before the decimal point in string format.', () => {
      expect(convert(('0' as unknown) as number)).toBe('ศูนย์บาทถ้วน');
      expect(convert(('-0' as unknown) as number)).toBe('ศูนย์บาทถ้วน');
      expect(convert(('09.05' as unknown) as number)).toBe('เก้าบาทห้าสตางค์');
      expect(convert(('11' as unknown) as number)).toBe('สิบเอ็ดบาทถ้วน');
      expect(convert(('01234' as unknown) as number)).toBe(
        'หนึ่งพันสองร้อยสามสิบสี่บาทถ้วน'
      );
      expect(convert(('-01' as unknown) as number)).toBe('ลบหนึ่งบาทถ้วน');
      expect(convert(('-011' as unknown) as number)).toBe('ลบสิบเอ็ดบาทถ้วน');
      expect(convert(('-021' as unknown) as number)).toBe(
        'ลบยี่สิบเอ็ดบาทถ้วน'
      );
      expect(convert(('-030' as unknown) as number)).toBe('ลบสามสิบบาทถ้วน');
      expect(convert(('0123456789.999' as unknown) as number)).toEqual(
        'หนึ่งร้อยยี่สิบสามล้านสี่แสนห้าหมื่นหกพันเจ็ดร้อยแปดสิบเก้าบาทเก้าสิบเก้าสตางค์'
      );
      expect(convert(('04123001998830750501' as unknown) as number)).toBe(
        'สี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
      );
      expect(convert(('-04123001998830750501' as unknown) as number)).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
      );
      expect(convert(('-04123001998830750501.21' as unknown) as number)).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert(('-01654321.21' as unknown) as number)).toBe(
        'ลบหนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
    });
  });

  describe('with strictEt cases', () => {
    it('passes strictEt: true & false', () => {
      expect(convert(1.21, { strictEt: false })).toBe(
        'หนึ่งบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert(1.21, { strictEt: true })).toBe(
        'หนึ่งบาทยี่สิบเอ็ดสตางค์'
      );

      expect(convert(101.01, { strictEt: false })).toBe(
        'หนึ่งร้อยหนึ่งบาทหนึ่งสตางค์'
      );
      expect(convert(101.01, { strictEt: true })).toBe(
        'หนึ่งร้อยเอ็ดบาทหนึ่งสตางค์'
      );

      expect(convert(100001, { strictEt: false })).toBe('หนึ่งแสนหนึ่งบาทถ้วน');
      expect(convert(100001, { strictEt: true })).toBe('หนึ่งแสนเอ็ดบาทถ้วน');

      expect(convert(100021, { strictEt: false })).toBe(
        'หนึ่งแสนยี่สิบเอ็ดบาทถ้วน'
      );
      expect(convert(100021, { strictEt: true })).toBe(
        'หนึ่งแสนยี่สิบเอ็ดบาทถ้วน'
      );

      expect(convert(1000001, { strictEt: false })).toEqual(
        'หนึ่งล้านหนึ่งบาทถ้วน'
      );
      expect(convert(1000001, { strictEt: true })).toEqual(
        'หนึ่งล้านเอ็ดบาทถ้วน'
      );

      expect(convert(11000001, { strictEt: false })).toEqual(
        'สิบเอ็ดล้านหนึ่งบาทถ้วน'
      );
      expect(convert(11000001, { strictEt: true })).toEqual(
        'สิบเอ็ดล้านเอ็ดบาทถ้วน'
      );

      expect(convert(11000000, { strictEt: false })).toEqual(
        'สิบเอ็ดล้านบาทถ้วน'
      );
      expect(convert(11000000, { strictEt: true })).toEqual(
        'สิบเอ็ดล้านบาทถ้วน'
      );

      expect(convert(21000000, { strictEt: false })).toEqual(
        'ยี่สิบเอ็ดล้านบาทถ้วน'
      );
      expect(convert(21000000, { strictEt: true })).toEqual(
        'ยี่สิบเอ็ดล้านบาทถ้วน'
      );

      expect(convert(21000010, { strictEt: false })).toEqual(
        'ยี่สิบเอ็ดล้านสิบบาทถ้วน'
      );
      expect(convert(21000010, { strictEt: true })).toEqual(
        'ยี่สิบเอ็ดล้านสิบบาทถ้วน'
      );

      expect(convert(21000011, { strictEt: false })).toEqual(
        'ยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน'
      );
      expect(convert(21000011, { strictEt: true })).toEqual(
        'ยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน'
      );

      expect(convert(121000011, { strictEt: false })).toEqual(
        'หนึ่งร้อยยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน'
      );
      expect(convert(121000011, { strictEt: true })).toEqual(
        'หนึ่งร้อยยี่สิบเอ็ดล้านสิบเอ็ดบาทถ้วน'
      );

      expect(convert(111, { strictEt: false })).toEqual(
        'หนึ่งร้อยสิบเอ็ดบาทถ้วน'
      );
      expect(convert(111, { strictEt: true })).toEqual(
        'หนึ่งร้อยสิบเอ็ดบาทถ้วน'
      );

      expect(convert(121, { strictEt: false })).toEqual(
        'หนึ่งร้อยยี่สิบเอ็ดบาทถ้วน'
      );
      expect(convert(121, { strictEt: true })).toEqual(
        'หนึ่งร้อยยี่สิบเอ็ดบาทถ้วน'
      );

      expect(convert(1000000000001, { strictEt: false })).toEqual(
        'หนึ่งล้านล้านหนึ่งบาทถ้วน'
      );
      expect(convert(1000000000001, { strictEt: true })).toEqual(
        'หนึ่งล้านล้านเอ็ดบาทถ้วน'
      );

      expect(convert(1001000000001, { strictEt: false })).toEqual(
        'หนึ่งล้านหนึ่งพันล้านหนึ่งบาทถ้วน'
      );
      expect(convert(1001000000001, { strictEt: true })).toEqual(
        'หนึ่งล้านหนึ่งพันล้านเอ็ดบาทถ้วน'
      );

      expect(convert(1001000001001, { strictEt: false })).toEqual(
        'หนึ่งล้านหนึ่งพันล้านหนึ่งพันหนึ่งบาทถ้วน'
      );
      expect(convert(1001000001001, { strictEt: true })).toEqual(
        'หนึ่งล้านหนึ่งพันล้านหนึ่งพันเอ็ดบาทถ้วน'
      );

      expect(convert(1001001001001, { strictEt: false })).toEqual(
        'หนึ่งล้านหนึ่งพันหนึ่งล้านหนึ่งพันหนึ่งบาทถ้วน'
      );
      expect(convert(1001001001001, { strictEt: true })).toEqual(
        'หนึ่งล้านหนึ่งพันเอ็ดล้านหนึ่งพันเอ็ดบาทถ้วน'
      );

      expect(convert(1001011001001, { strictEt: false })).toEqual(
        'หนึ่งล้านหนึ่งพันสิบเอ็ดล้านหนึ่งพันหนึ่งบาทถ้วน'
      );
      expect(convert(1001011001001, { strictEt: true })).toEqual(
        'หนึ่งล้านหนึ่งพันสิบเอ็ดล้านหนึ่งพันเอ็ดบาทถ้วน'
      );

      expect(convert(9007199254740991, { strictEt: false })).toEqual(
        'เก้าพันเจ็ดล้านหนึ่งแสนเก้าหมื่นเก้าพันสองร้อยห้าสิบสี่ล้านเจ็ดแสนสี่หมื่นเก้าร้อยเก้าสิบเอ็ดบาทถ้วน'
      );
      expect(convert(9007199254740991, { strictEt: true })).toEqual(
        'เก้าพันเจ็ดล้านหนึ่งแสนเก้าหมื่นเก้าพันสองร้อยห้าสิบสี่ล้านเจ็ดแสนสี่หมื่นเก้าร้อยเก้าสิบเอ็ดบาทถ้วน'
      );

      expect(convert(-21, { strictEt: false })).toEqual('ลบยี่สิบเอ็ดบาทถ้วน');
      expect(convert(-21, { strictEt: true })).toEqual('ลบยี่สิบเอ็ดบาทถ้วน');

      expect(convert(-101, { strictEt: false })).toEqual(
        'ลบหนึ่งร้อยหนึ่งบาทถ้วน'
      );
      expect(convert(-101, { strictEt: true })).toEqual(
        'ลบหนึ่งร้อยเอ็ดบาทถ้วน'
      );

      expect(convert(-111, { strictEt: false })).toEqual(
        'ลบหนึ่งร้อยสิบเอ็ดบาทถ้วน'
      );
      expect(convert(-111, { strictEt: true })).toEqual(
        'ลบหนึ่งร้อยสิบเอ็ดบาทถ้วน'
      );

      expect(convert(-121, { strictEt: false })).toEqual(
        'ลบหนึ่งร้อยยี่สิบเอ็ดบาทถ้วน'
      );
      expect(convert(-121, { strictEt: true })).toEqual(
        'ลบหนึ่งร้อยยี่สิบเอ็ดบาทถ้วน'
      );

      expect(convert('4123001998830750501', { strictEt: false })).toBe(
        'สี่ล้านหนึ่งแสนสองหมื่นสามพันหนึ่งล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยหนึ่งบาทถ้วน'
      );
      expect(convert('4123001998830750501', { strictEt: true })).toBe(
        'สี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
      );
      expect(convert('-4123001998830750501', { strictEt: false })).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันหนึ่งล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยหนึ่งบาทถ้วน'
      );
      expect(convert('-4123001998830750501', { strictEt: true })).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทถ้วน'
      );
      expect(convert('-4123001998830750501.21', { strictEt: false })).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันหนึ่งล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยหนึ่งบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert('-4123001998830750501.21', { strictEt: true })).toBe(
        'ลบสี่ล้านหนึ่งแสนสองหมื่นสามพันเอ็ดล้านเก้าแสนเก้าหมื่นแปดพันแปดร้อยสามสิบล้านเจ็ดแสนห้าหมื่นห้าร้อยเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert('-1654321.21', { strictEt: false })).toBe(
        'ลบหนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert('-1654321.21', { strictEt: true })).toBe(
        'ลบหนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert('-01654321.21', { strictEt: false })).toBe(
        'ลบหนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
      expect(convert('-01654321.21', { strictEt: true })).toBe(
        'ลบหนึ่งล้านหกแสนห้าหมื่นสี่พันสามร้อยยี่สิบเอ็ดบาทยี่สิบเอ็ดสตางค์'
      );
    });
  });

  // it('equals to value from other library (STRESS TEST)', () => {
  //   for (let i = 1; i < 20000000; i += 1) {
  //     expect(convert(i)).toEqual(convert(i));
  //     expect(convert(i)).toEqual(ThaiBahtText(i));
  //   }
  // });
});
