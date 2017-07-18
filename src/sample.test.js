import { array1000, randomArray1000 } from './sample-array';
import { mergeSortAlt } from './sample';

test('mergeSortAlt', () => {

    expect(mergeSortAlt(randomArray1000)).toEqual(array1000);

});
