/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import { feedContext } from './Feed';

function Pagination() {
  const arr = [];
  const feedcontext = useContext(feedContext);
  const [active, setActive] = useState(feedcontext.pageIndex);
  let countPage = feedcontext.feedCount / feedcontext.pageLimit;
  const remPagePost = feedcontext.feedCount % feedcontext.pageLimit;
  if (remPagePost !== 0) countPage += 1;

  for (let i = 1; i <= countPage; i++) {
    arr.push(
      <li
        className={(active === i && 'page-item active') || 'page-item'}
        key={i}
        onClick={() => {
          feedcontext.getFeeds(i);
          setActive(i);
        }}
      >
        <div className="page-link">{i}</div>
      </li>,
    );
  }
  useEffect(() => {
    setActive(feedcontext.pageIndex);
  }, [feedcontext.pageIndex]);
  return (
    <div className=" m-3">
      <nav aria-label="Page navigation example">
        <ul className="pagination">{arr}</ul>
      </nav>
    </div>
  );
}

export default Pagination;
