/* eslint id-length: 0 */
import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class ArticleNavigationItem extends React.Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      slug: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      publishedOn: PropTypes.string,
      activeArticleId: PropTypes.number,
      handleFocusChange: PropTypes.func,
    };
  }

  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleFocusChange } = this.props;
    handleFocusChange(false);
  }

  render() {
    const { title, text, slug, id, href, activeArticleId, publishedOn } = this.props;
    const isActive = Boolean(id) && id === activeArticleId;
    const isNotPublished = Boolean(publishedOn);
    const containerClasses = {
      'navigation__article--active': isActive,
      'navigation__article--unpublished': isNotPublished,
      'navigation__article--published': !isNotPublished,
    };
    const publishedStateClasses = {
      'navigation__article-published-state': true,
      'navigation__article-published-state--unpublished': isNotPublished,
      'navigation__article-published-state--published': !isNotPublished,
    };
    const slugClass = slug && [ 'navigation__article', slug ].filter((val) => val).join('-');
    const body = (
      <div className={classnames(this.props.className, 'navigation__article', slugClass, containerClasses)}>
        <h4 className="navigation__article-title">{title}</h4>
        <span className="navigation__article-text">{text}</span>
        <span className={classnames(publishedStateClasses)}>{isNotPublished ? 'Coming soon' : 'Published'}</span>
      </div>
    );
    if (isActive) {
      return body;
    }
    if (isNotPublished) {
      return body;
    }

    return (
      <a href={href} onClick={this.handleClick}>
        {body}
      </a>
    );
  }

}
