/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Post from './Post.jsx';
import { feedContext } from '../components/Feed.jsx';

export default function POSTS() {
  const object = useContext(feedContext);
  return (
    <>
      {object.feeds.map((e) => (
        <Post key={e._id} post={e} />
      ))}
      {' '}
    </>
  );
}
