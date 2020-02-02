# Trendgetter Official API

![GitHub package.json version](https://img.shields.io/github/package-json/v/Zivsteve/trendgetter-api?style=flat-square)
![GitHub](https://img.shields.io/github/license/Zivsteve/trendgetter-api?style=flat-square)

**Check it out in action!**

> [Trendgetter App](https://github.com/Zivsteve/trendgetter)

---

An API for getting trending content from various sites: YouTube, Google, Twitter, Reddit, GitHub and Snapchat.

### Available Routes & Explanations:

---

<details>
  <summary>Index</summary>

> The index page displaying help for the API.

</details>

`/`

---

<details>
  <summary>Google</summary>
  
**Google Trends API**

> Google allows users to view trends via Google Trends. On the daily page, there is an official RSS feed button. The feed can be easily parsed but if we inspect the page's source code, we find the following link which provides the data in JSON:
> https://trends.google.com/trends/trendingsearches/daily

</details>

`/google`

---

<details>
  <summary>YouTube</summary>

**YouTube Videos API**

> YouTube has an official API for retrieving videos from the trending page:
> https://developers.google.com/youtube/v3/docs/videos/list

</details>

`/youtube`

---

<details>
  <summary>Twitter</summary>

**Twitter API**

> Twitter has an official API for retrieving trending hashtags:
> https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place

</details>

`/twitter`

---

<details>
  <summary>Reddit</summary>

**Reddit API**

> Reddit has an amazing API. You can add .json to almost any page to get it's posts.
> For example, the top posts of r/popular:
> https://www.reddit.com/r/popular/top.json

</details>

`/reddit`

---

<details>
  <summary>GitHub</summary>

> GitHub doesn't have an official API, but it has a trending page which we can parse:
> https://github.com/trending

> We can also get trending developers:
> https://github.com/trending/developers

</details>

`/github`

`/github/developers`

---

<details>
  <summary>Snapchat</summary>

> Snapchat doesn't have an official API or a dedicated trending page, but they have a stories page and a map page:
> https://story.snapchat.com/ > https://map.snapchat.com/

> The story page used to display popular and celebrity stories but now displayed random promotional ones.
> Older versions of this API used this as "trending" content because the map version wasn't readable.
> When Snapchat updated their site, they allowed the map to be read. The map showcases playlists of trending events.

> URL to get the trending playlists:
> https://ms.sc-jpl.com/web/getSearchCards  
> URL to get playlist's content:
> https://ms.sc-jpl.com/web/getPoiPlaylist

</details>

`/snapchat`

`/snapchat/:id`

---

<details>
  <summary>TikTok</summary>

> TikTok doesn't have an official API but it has a trending page (https://www.tiktok.com/trending) although the content isn't fixed, every time you refresh, it changes.
> One thing that doesn't change are the trending hashtags:
> https://m.tiktok.com/node/share/discover

</details>

`/tiktok`

---

### Donate

Help me improve this project! Any amount is much appreciated :)

<a href="https://www.buymeacoffee.com/YkncqEs" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/default-blue.png" alt="Buy Me A Coffee" width="217" height="51">
</a>

---

## License

> Copyright (C) 2020-present Zivsteve.  
> Licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/Zivsteve/trendgetter-api/blob/master/LICENSE) file for the whole license text.)
