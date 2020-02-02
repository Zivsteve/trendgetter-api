import request from 'request-promise-native';
import { RequestOptions } from '..';

/**
 * TikTok Trending
 */
class TiktokTrending {
  /**
   *
   * @param callback
   */
  public async getAll(callback?: (value: any[]) => any) {
    let value = null;
    try {
      const options: RequestOptions = {
        method: 'GET',
        gzip: true,
        json: true,
        uri: process.env.TIKTOK_API_URL,
      };
      const body = await request(options);
      value = this._parseBody(body);
    } catch (err) {
      console.log(err);
    }
    if (callback) {
      callback(value);
    }
    return value;
  }

  /**
   *
   * @param body
   */
  private _parseBody(body: any) {
    let items = [];
    const filtered = body.body[1].exploreList.sort(
      (a: any, b: any) => b.cardItem.extraInfo.views - a.cardItem.extraInfo.views,
    );
    for (let i = 0; i < filtered.length; i++) {
      items[i] = filtered[i].cardItem;
      items[i].link = `https://www.tiktok.com${items[i].link}`;
    }
    return items;
  }
}

export default TiktokTrending;
