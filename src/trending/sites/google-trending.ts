import request from 'request-promise-native';
import { RequestOptions } from '..';

/**
 * Google Trending
 */
class GoogleTrending {
  /**
   * 
   * @param callback 
   */
  public async getAll(callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: process.env.GOOGLE_API_URL,
    };
    const body = await request(options).catch(err => console.error(err));
    const value = this._parseBody(body);
    if (callback) {
      callback(value);
    }
  }

  /**
   * 
   * @param body 
   */
  private _parseBody(body: string) {
    try {
      const jsonBody = JSON.parse(body.replace(")]}',", '')); // Request returns broken JSON (extra trailing characters).
      const allSearches: any[] = jsonBody.default.trendingSearchesDays[0].trendingSearches;
      allSearches.map((search, i) => {
        allSearches[i].url = `https://google.com/search?q=${search.title.query}`;
        allSearches[i].searchCount = this._toNumeric(search.formattedTraffic.replace('+', ''));
      });
      return allSearches;
    } catch (err) {
      return [];
    }
  }

  /**
   * 
   * @param num 
   */
  private _toNumeric(num: string) {
    const ab = [
      { v: 'K', n: '000' },
      { v: 'M', n: '000000' },
    ];
    ab.forEach(a => (num = num.replace(a.v, a.n)));
    return +num;
  }
}

export default GoogleTrending;
