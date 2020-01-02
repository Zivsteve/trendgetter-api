import request from 'request-promise-native';
import { RequestOptions } from '..';

/**
 * Twitter Trending
 */
class TwitterTrending {
  /**
   *
   * @param callback
   */
  public async getAll(callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: process.env.TWITTER_API_URL,
      qs: { id: '1' },
      headers: { Authorization: `Bearer ${process.env.TWITTER_API_AUTHTOKEN}` },
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
      const jsonBody = JSON.parse(body);
      const allTags: any[] = jsonBody[0].trends;
      const filteredTags = allTags
        .filter(r => r.tweet_volume) // Tweet volume must be present.
        .sort((a, b) => (a.tweet_volume < b.tweet_volume ? 1 : -1)); // Order by number of tweets.
      return filteredTags;
    } catch (err) {
      return null;
    }
  }
}

export default TwitterTrending;
