/* eslint-disable no-mixed-operators */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import React, {
  createContext, useState, useEffect, useContext,
} from 'react';
import AddFeed from './AddFeed';
import POSTS from '../pages/POSTS';
import Pagination from './Pagination';
import { userContext } from '../pages/Home';

const feedContext = createContext();
export { feedContext };

const pageLimit = 10;

function Feed() {
  const [feedCount, setFeedCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const currentuser = useContext(userContext);
  const addfeed = () => {
    postload(1);
  };
  const updatefeed = (updatedfeed) => {
    feeds.map((feed) => {
      if (feed._id === updatedfeed._id) {
        feed.flagCount = updatedfeed.flagCount;
        feed.likeCount = updatedfeed.likeCount;
        feed.status = updatedfeed.status;
      }
    });
  };
  const deletefeed = (pageNo) => {
    if (pageCount % pageLimit === 1 && feedCount - 1 !== 0) {
      pageNo -= 1;
      setPageIndex(pageNo);
    }
    postload(pageNo);
  };

  useEffect(() => {
    postload(1);
  }, [currentuser.user]);
  const postload = async (pageNumber) => {
    try {
      console.log(currentuser.user.is_Admin);
      const response = await fetch(`http://localhost:3000/api/${currentuser.user.is_Admin && ('moderator/getFeeds') || ('feed')}/?pageNumber=${pageNumber}&pageLimit=${pageLimit}`);
      const postsdata = await response.json();
      setFeeds(postsdata.feeds);
      setPageCount(postsdata.pageCount);
      setFeedCount(postsdata.feedCount);
    } catch (err) {
      console.log('Error loading posts');
    }
  };
  const getFeeds = (pageNumber) => {
    setPageIndex(pageNumber);
    postload(pageNumber);
  };
  return (
    <feedContext.Provider
      value={{
        feeds,
        addfeed,
        deletefeed,
        updatefeed,
        feedCount,
        pageLimit,
        getFeeds,
        pageIndex,
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center ">
        {pageIndex === 1 && <AddFeed />}
        <POSTS />
        <Pagination />
      </div>
    </feedContext.Provider>
  );
}

export default Feed;
