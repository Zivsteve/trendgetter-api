import request from 'request-promise-native';
import { RequestOptions } from '..';

/**
 * YouTube Trending
 */
class YoutubeTrending {
  /**
   * 
   * @param callback 
   */
  public async getAll(callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: process.env.YOUTUBE_API_URL,
      qs: {
        key: process.env.YOUTUBE_API_KEY,
      },
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
      return JSON.parse(body).items.filter((item: any) => item.statistics.viewCount);
    } catch (e) {
      return '';
    }
  }
}

export default YoutubeTrending;
