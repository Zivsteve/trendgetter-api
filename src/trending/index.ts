import { UriOptions } from 'request';
import { RequestPromiseOptions } from 'request-promise-native';
import YoutubeTrending from './sites/youtube-trending';
import GoogleTrending from './sites/google-trending';
import TwitterTrending from './sites/twitter-trending';
import RedditTrending from './sites/reddit-trending';
import GithubTrending from './sites/github-trending';
import SnapchatTrending from './sites/snapchat-trending';
import TiktokTrending from './sites/tiktok-trending';

export declare type RequestOptions = UriOptions & RequestPromiseOptions;

/** Instance */
const github = new GithubTrending();

/** Instance */
const google = new GoogleTrending();

/** Instance */
const reddit = new RedditTrending();

/** Instance */
const snapchat = new SnapchatTrending();

/** Instance */
const twitter = new TwitterTrending();

/** Instance */
const youtube = new YoutubeTrending();

/** Instance */
const tiktok = new TiktokTrending();

export { github, google, reddit, snapchat, twitter, youtube, tiktok };
