/**
 * @private
 * Provide multi-language and i18n support in your app. Translate works by
 * mapping full strings to language translated ones. That means that you don't
 * need to provide strings for your default language, just new languages.
 *
 * Note: The Angular team will be building an
 * [Localization/Internationalization](https://docs.google.com/document/d/1mwyOFsAD-bPoXTk3Hthq0CAcGXCUw-BtTJMR4nGTY-0/view#heading=h.ixg45w3363q)
 * provider, so this Translation provider may not be further developed.
 *
 * @usage
 * ```js
 * Translate.translations({
 *   'de': {
 *     'Welcome to MyApp': 'Willkommen auf'
 *   }
 * })
 *
 * Changing the default language:
 *
 * Translate.setLanguage('de');
 * ```
 *
 * Usage in a template:
 *
 * ```js
 * <span>{{ 'Welcome to MyApp' | translate }}
 * ```
 */
export class Translate {
  private _transMap: any = {};
  private _language: any = {};

  translations(lang, map) {
    this._transMap[lang] = map;
  }

  setLanguage(lang) {
    this._language = lang;
  }

  getTranslations(lang) {
    return this._transMap[lang];
  }

  translate(key, lang) {
    // If the language isn't specified and we have no overridden one, return the string passed.
    if (!lang && !this._language) {
      return key;
    }

    let setLanguage = lang || this._language;

    let map = this.getTranslations(setLanguage);

    if (!map) {
      console.warn('I18N: No translation for key', key, 'using language', setLanguage);
      return '';
    }
    return this._getTranslation(map, key);
  }

  _getTranslation(map, key) {
    return map && map[key] || '';
  }
}
