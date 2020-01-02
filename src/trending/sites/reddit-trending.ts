import request from 'request-promise-native';
import { RequestOptions } from '..';

/**
 * Reddit Trending
 */
class RedditTrending {
  /**
   * 
   * @param callback 
   */
  public async getAll(callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: process.env.REDDIT_API_URL,
      qs: {
        limit: 10,
        sr_detail: true,
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
    return JSON.parse(body).data.children;
  }
}

export default RedditTrending;
