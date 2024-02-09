import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Mountain1 from '../img/mountain1.jpg';
import Mountain2 from '../img/mountain2.jpg';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const cat = location.search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // const posts = [
  //   {
  //     id: 1,
  //     title: 'test1',
  //     desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quas natus incidunt vel harum voluptate sit quaerat facere totam optio? Error, ipsum iure fugit ea nemo repudiandae nam delectus eum iste ullam quaerat pariatur, vel, suscipit quis eligendi modi perspiciatis dolores a unde vitae tenetur placeat natus deserunt. Quas, deserunt.',
  //     img: Mountain1,
  //   },
  //   {
  //     id: 2,
  //     title: 'test2',
  //     desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quas natus incidunt vel harum voluptate sit quaerat facere totam optio? Error, ipsum iure fugit ea nemo repudiandae nam delectus eum iste ullam quaerat pariatur, vel, suscipit quis eligendi modi perspiciatis dolores a unde vitae tenetur placeat natus deserunt. Quas, deserunt.',
  //     img: Mountain2,
  //   },
  //   {
  //     id: 3,
  //     title: 'test3',
  //     desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quas natus incidunt vel harum voluptate sit quaerat facere totam optio? Error, ipsum iure fugit ea nemo repudiandae nam delectus eum iste ullam quaerat pariatur, vel, suscipit quis eligendi modi perspiciatis dolores a unde vitae tenetur placeat natus deserunt. Quas, deserunt.',
  //     img: Mountain1,
  //   },
  // ];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <Link to={`/post/${post.id}`}>
                <img src={`../upload/${post.img}`} alt="" />
              </Link>
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link to={`/post/${post.id}`}>
                <button>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
