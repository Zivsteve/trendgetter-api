import request from 'request-promise-native';
import { RequestOptions } from '..';

/**
 * Fixes expired certification. This should be removed if Snapchat fixes their certificate.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * Snapchat Trending
 */
class SnapchatTrending {
  /**
   * 
   * @param callback 
   */
  public async getAll(callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: process.env.SNAPCHAT_API_STORIES_URL,
    };
    const body = await request(options).catch(err => console.error(err));
    const value = this._parseBody(body);
    if (callback) {
      callback(value);
    }
  }

  /**
   * 
   * @param username 
   * @param callback 
   */
  public async getForUser(username: string, callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: process.env.SNAPCHAT_API_STORY_URL.replace('[:username]', username),
    };
    const body = await request(options).catch(err => console.error(err));
    const value = JSON.parse(body).story;
    value.snaps = value.snaps.filter((snap: any) => snap.media.type.startsWith('VIDEO'));
    if (callback) {
      callback(value);
    }
  }

  /**
   * 
   * @param body 
   */
  private _parseBody(body: string) {
    return (<any[]>JSON.parse(body).Cards).filter((c: any) => c.isPopular);
  }
}

export default SnapchatTrending;
