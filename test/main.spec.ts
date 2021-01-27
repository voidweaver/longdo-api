import { search } from '../src/main';
import { clean_2d_array } from '../src/helper';
import * as assert from 'assert';

describe('#search', () => {
    it('should return empty object when word not found', async () => {
        const result = await search('efk rtklrccp r nfiu');
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(Object.keys(result).length, 0);
    });
    it('should return the definitions when the query matches anything', async () => {
        const result = await search('fandango');
        assert.deepStrictEqual(result, {
            'NECTEC Lexitron Dictionary EN-TH': [
                ['fandango', '[N] การเต้นระบำสเปนแบบสามจังหวะ, See also: ดนตรีสามจังหวะสำหรับเต้นระบำสเปน'],
            ],
            'ตัวอย่างประโยคจาก Open Subtitles ** ระวัง คำแปลอาจมีข้อผิดพลาด **': [
                ['# Scaramouch, scaramouch Will you do the fandango #', '# เจ้าคนชั่ว, เจ้าคนชั่ว เจ้าเต้นรำได้มั้ย?'],
                [
                    'We must do something before they fandango themselves into oblivion!',
                    'เราต้องทำอะไรซักอย่าง ก่อนที่พวกเขาจะเต้นจนหายเข้าไปในป่า',
                ],
                ['- Hey. - Christ Fandango!', 'เฮ้ คริสตร์ แฟนเดโก'],
            ],
            'CMU Pronouncing Dictionary': [['FANDANGO', 'F AE0 N D AE1 NG G OW2']],
            'Oxford Advanced Learners Dictionary': [
                ['fandango', '(n) fˌændˈæŋgou'],
                ['fandangos', '(n) fˌændˈæŋgouz'],
            ],
            'EDICT JP-EN Dictionary': [['ファンダンゴ', '[, fandango] (n) fandango (spa']],
        });
    });
});

describe('helper', () => {
    describe('#clean_2d_array', () => {
        it('should return 2d arry with empty columns removed', async () => {
            const result = clean_2d_array(
                [
                    ['', '2', '3', '', ''],
                    ['', '3', '', '', '2'],
                    ['', '5', '7', '', '9'],
                ],
                5
            );
            assert.deepStrictEqual(result, [
                ['2', '3', ''],
                ['3', '', '2'],
                ['5', '7', '9'],
            ]);
        });
    });
});
