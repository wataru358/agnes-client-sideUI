
/*
  normal array, length 100
*/
export const array100 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99];

/*
  just randomized array, length 100
*/
export const randomArray100 = [87,86,98,24,55,77,70,13,48,61,22,11,78,0,37,9,19,40,58,75,34,88,31,51,71,18,63,79,89,28,64,67,2,57,1,47,50,66,81,41,99,44,84,56,16,26,60,46,35,29,96,33,30,20,82,7,49,85,12,83,53,6,4,62,5,95,25,32,97,69,72,90,42,10,76,73,68,74,54,38,65,17,36,52,21,93,27,91,39,8,59,23,43,3,94,45,14,92,80,15];

/*
  normal array, length 1000
*/
export const array1000 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,684,685,686,687,688,689,690,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999];
/*
  just randomized array, length 1000
*/
export const randomArray1000 =  [830,765,918,759,966,810,492,147,44,85,874,990,619,325,588,347,469,493,633,968,275,927,978,52,878,996,931,80,895,125,235,523,858,168,247,36,955,109,676,360,198,164,353,382,41,439,786,542,124,711,47,892,240,266,404,685,355,162,16,600,850,219,452,413,722,1,700,122,95,511,707,826,242,158,461,181,209,64,504,916,628,494,314,343,107,761,861,241,572,867,799,591,841,904,790,729,567,730,986,714,126,344,535,425,331,793,537,359,53,203,621,482,337,577,120,4,87,908,750,598,149,300,112,401,398,383,920,952,204,296,739,12,945,311,92,864,804,545,11,852,62,201,74,503,692,965,748,83,141,25,791,819,3,712,226,463,475,581,468,829,720,190,606,939,262,863,683,135,960,903,801,73,914,805,586,156,551,332,738,596,521,144,831,554,840,225,640,601,754,55,556,315,771,741,174,752,755,862,389,255,285,346,71,942,782,223,22,278,217,299,947,838,971,236,373,560,29,969,579,462,238,58,470,351,179,445,982,489,177,851,873,435,222,368,231,814,151,962,477,376,131,61,327,780,438,915,549,258,859,972,474,946,54,388,704,272,719,519,970,639,919,60,19,849,887,697,310,744,882,856,569,626,108,306,268,292,305,116,167,834,923,630,295,99,608,656,500,876,623,70,98,200,72,812,800,260,833,396,679,559,512,667,417,317,973,590,645,408,797,81,194,625,823,836,350,737,995,213,584,817,169,785,188,997,338,753,340,440,51,616,629,924,171,860,703,651,77,736,13,933,675,717,319,152,961,865,670,564,886,646,528,128,686,367,68,457,418,847,293,654,2,379,46,476,911,399,550,508,239,450,460,320,529,32,431,369,33,132,796,949,184,356,130,913,56,781,825,513,402,370,725,721,467,555,283,277,218,328,243,406,27,954,989,270,687,221,394,998,329,380,40,888,742,267,414,180,522,187,354,96,279,609,421,385,733,885,102,392,957,835,691,256,898,614,246,485,409,520,593,0,533,665,88,979,647,333,429,604,649,713,689,371,605,684,86,574,517,142,562,891,578,481,140,650,410,161,15,526,287,76,176,642,358,280,446,115,157,202,307,364,274,7,610,123,603,698,907,345,35,430,967,902,565,538,743,384,928,632,172,514,264,866,304,792,416,883,827,987,963,178,807,456,403,775,732,763,163,34,352,612,525,653,548,374,890,432,539,745,974,459,788,832,820,641,129,664,57,443,427,411,323,746,259,688,43,254,751,870,815,726,848,944,540,921,587,313,534,901,879,67,615,988,772,419,308,30,377,121,220,981,170,764,518,342,426,757,9,361,674,699,766,436,486,192,563,702,434,893,276,395,153,779,273,480,372,339,197,740,20,706,821,420,302,661,289,133,490,594,724,100,17,45,905,491,844,718,758,611,582,195,816,868,631,795,809,423,787,207,507,769,910,82,42,762,723,366,589,75,18,546,708,671,568,175,290,524,391,271,442,789,778,205,261,871,316,932,269,716,922,166,845,842,926,672,455,992,776,433,607,454,655,8,984,138,312,897,980,393,510,387,189,145,884,660,28,484,215,637,424,134,627,330,422,558,925,843,940,509,444,10,498,663,224,735,930,680,983,727,774,818,66,570,937,806,244,950,783,701,618,896,994,573,652,828,728,233,111,951,544,448,106,620,715,710,613,405,496,26,284,668,183,505,206,695,375,617,252,336,341,191,69,282,794,877,50,837,666,21,104,93,999,659,991,318,530,212,298,451,869,143,502,575,811,541,592,731,303,478,527,257,5,662,227,381,934,118,956,48,159,211,348,571,658,959,993,678,234,65,561,622,906,497,165,767,357,499,363,597,139,182,397,822,196,214,483,407,186,324,400,854,137,875,899,977,576,173,690,547,14,634,294,265,326,465,441,447,37,985,250,624,693,543,105,160,784,636,747,136,501,415,936,23,532,110,768,281,362,857,495,263,349,248,935,669,709,677,734,49,900,464,756,853,682,643,291,245,390,773,488,90,6,824,288,880,777,602,78,84,912,378,453,536,943,953,155,148,798,472,117,89,580,154,412,322,335,557,466,929,694,210,230,251,193,872,506,79,958,199,38,553,909,321,681,479,150,948,696,516,228,808,185,437,237,803,964,301,24,638,458,566,127,941,208,103,39,487,644,119,515,386,635,839,846,286,101,365,473,749,531,813,31,334,309,648,770,889,91,802,146,894,428,232,59,249,705,113,471,583,760,881,552,114,938,449,216,673,94,917,599,97,595,229,975,657,855,585,63,976,297,253];
