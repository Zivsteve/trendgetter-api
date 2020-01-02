import request from 'request-promise-native';
import cheerio from 'cheerio';
import { RequestOptions } from '..';

/**
 * 
 */
type Since = 'daily' | 'weekly' | 'monthly';

/**
 * GitHub Trending
 */
class GithubTrending {
  /**
   * 
   * @param lang 
   * @param since 
   * @param callback 
   */
  public async getAll(lang = '', since: Since = 'daily', callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: `${process.env.GITHUB_API_URL}/${lang}`,
      qs: { since: since },
    };
    const body = await request(options).catch(err => console.error(err));
    const value = this._parseBody(body);
    if (callback) {
      callback(value);
    }
  }

  /**
   * @todo
   * @param lang 
   * @param since 
   * @param callback 
   */
  public async getDevelopers(lang = '', since: Since = 'daily', callback?: (value: any[]) => any) {
    const options: RequestOptions = {
      method: 'GET',
      gzip: true,
      uri: `${process.env.GITHUB_API_URL}/developers/${lang}`,
      qs: { since: since },
    };
    const body = await request(options).catch(err => console.error(err));
    const value = this._parseBodyDevelopers(body);
    if (callback) {
      callback(value);
    }
  }

  /**
   * 
   * @param body 
   */
  private _parseBody(body: string) {
    var $ = cheerio.load(body);
    var items: any[] = [];
    $('article.Box-row').each((i, elem) => {
      try {
        var item = $(elem);
        var divs = item.children('div');
        var repo = this._getRepoInformation(item.children('h1').first(), item.children('p').first());

        var metaRow = divs.last();
        var metaLinks = metaRow.children('a');

        var stars = this._toNumeric(metaLinks.first());
        var forks = this._toNumeric(metaLinks.eq(1));

        var todayStars = parseInt(
          metaRow
            .children('span')
            .last()
            .text()
            .trim()
            .split(' ')[0]
            .replace(/,/g, ''),
        );

        var language = metaRow.find('[itemprop="programmingLanguage"]').first();
        var languageFound = language && language.text().trim() !== '';
        var languageColor = languageFound ? language.siblings('.repo-language-color').first() : null;

        var resultObject = {
          repo,
          stars: {
            count: stars,
            link: metaLinks
              .first()
              .attr('href')
              .trim(),
          },
          forks: {
            count: isNaN(forks) ? 0 : forks,
            link: metaLinks.eq(1).attr('href')
              ? metaLinks
                  .eq(1)
                  .attr('href')
                  .trim()
              : '',
          },
          todayStars,
          ...(languageFound && {
            language: {
              name: language && language.text().trim() !== '' ? language.text().trim() : null,
              color: languageColor ? languageColor.css('background-color') : null,
            },
          }),
        };

        items[i] = resultObject;
      } catch (error) {
        console.error(error);
      }
    });
    return items;
  }

  /**
   * 
   * @param body 
   */
  private _parseBodyDevelopers(body: string) {
    return <any>null;
  }

  /**
   * 
   * @param item 
   */
  private _toNumeric(item: Cheerio) {
    return parseInt(
      item
        .text()
        .trim()
        .replace(/,/g, ''),
    );
  }

  /**
   * 
   * @param repo 
   * @param descriptionDiv 
   */
  private _getRepoInformation(repo: Cheerio, descriptionDiv: Cheerio) {
    var repoName = this._removeExtraSpaces(repo.text().trim());
    var owner = repoName.split(' / ')[0].trim();
    var name = repoName.split(' / ')[1].trim();

    return {
      rawName: repoName,
      owner,
      name,
      link: repo
        .find('a')
        .first()
        .attr('href'),
      description: this._removeExtraSpaces(descriptionDiv.text().trim()),
    };
  }

  /**
   * 
   * @param str 
   */
  private _removeExtraSpaces(str = '') {
    return str.replace(/\s\s+/g, ' ');
  }
}

export default GithubTrending;
