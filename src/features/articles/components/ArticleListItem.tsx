import { Article } from 'MyModels';
import React from 'react';
import areEqual from 'fast-deep-equal';
import { connect } from 'react-redux';

import { deleteArticleAsync } from '../actions';
import { getPath } from '../../../router-paths';
import { Link } from 'react-router-dom';

const dispatchProps = {
  deleteArticle: deleteArticleAsync.request,
};

type Props = typeof dispatchProps & {
  article: Article;
};

const ArticleListItem = React.memo<Props>(({ article, deleteArticle }) => {
  return (
    <>
      <div style={getStyle()}>{article.title}</div>
      <Link to={getPath('viewArticle', article.id)}>View</Link>
      <Link to={getPath('editArticle', article.id)}>Edit</Link>
      <div
        className="link"
        onClick={() => deleteArticle(article)}
        style={{ color: 'darkred' }}
      >
        Delete
      </div>
    </>
  );
}, areEqual);

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  width: '300px',
});

export default connect(
  null,
  dispatchProps
)(ArticleListItem);
