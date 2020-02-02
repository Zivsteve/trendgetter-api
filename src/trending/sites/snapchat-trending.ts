import request from 'request-promise-native';
import { RequestOptions } from '..';

/**
 * Snapchat Trending
 */
class SnapchatTrending {
  /**
   *
   * @param callback
   */
  public async getAll(callback?: (value: any) => any) {
    let value = null;
    try {
      const options: RequestOptions = {
        method: 'POST',
        gzip: true,
        json: true,
        uri: process.env.SNAPCHAT_API_STORIES_URL,
        body: {
          mapLocation: { lat: 50, lng: -100 },
          zoom: 2,
          query: '',
          viewport: {
            geoBottomLeft: { lat: -30, lon: -200 },
            geoTopRight: { lat: 100, lon: 0 },
          },
        },
      };
      const body = await request(options);
      const items = body.searchCards.sections[2].rows;
      for (let i = 0; i < items.length; i++) {
        items[i] = items[i].poiRow;
        items[i].title = items[i].titleFmt;
        items[i].subtitle = items[i].subtitleFmt;
        delete items[i].titleFmt;
        delete items[i].subtitleFmt;
        delete items[i].manifest;
      }
      value = items;
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
   * @param id
   * @param callback
   */
  public async getPlaylist(id: string, callback?: (value: any[]) => any) {
    let value;
    try {
      const options: RequestOptions = {
        method: 'POST',
        gzip: true,
        json: true,
        uri: process.env.SNAPCHAT_API_PLAYLIST_URL,
        body: {
          id: id,
          allowLatestTilesetFallback: true,
        },
      };
      const body = await request(options);
      value = body.manifest;
      value.title = value.title.fallback.trim();
    } catch (err) {
      console.log(err);
    }
    if (callback) {
      callback(value);
    }
    return value;
  }
}

export default SnapchatTrending;
