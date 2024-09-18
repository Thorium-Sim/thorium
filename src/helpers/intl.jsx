import React, {Component} from "react";
import {IntlProvider} from "react-intl";

import pkg from '../../package.json'

const languages = pkg.languages;

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

class Provider extends Component {
  state = {localeData: null};
  componentDidMount() {
    const localeData = languages.reduce((prev, next) => {
      return {...prev, [next]: require(`../locales/${next}.json`)};
    }, {});
    this.setState({localeData});
  }
  render() {
    const {localeData} = this.state;
    if (localeData) {
      const messages =
        localeData[languageWithoutRegionCode] ||
        localeData[language] ||
        localeData.en;
      return (
        <IntlProvider locale={language} messages={messages}>
          {this.props.children}
        </IntlProvider>
      );
    }
    return null;
  }
}

export default Provider;
