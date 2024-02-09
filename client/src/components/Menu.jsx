import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import Mountain1 from '../img/mountain1.jpg';
// import Mountain2 from '../img/mountain2.jpg';

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
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
  //     title: 'Lorem ipsum dolor sit amet.',
  //     desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quas natus incidunt vel harum voluptate sit quaerat facere totam optio? Error, ipsum iure fugit ea nemo repudiandae nam delectus eum iste ullam quaerat pariatur, vel, suscipit quis eligendi modi perspiciatis dolores a unde vitae tenetur placeat natus deserunt. Quas, deserunt.',
  //     img: Mountain1,
  //   },
  //   {
  //     id: 2,
  //     title: 'Lorem ipsum, dolor sit amet consectetur adipisicing.',
  //     desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quas natus incidunt vel harum voluptate sit quaerat facere totam optio? Error, ipsum iure fugit ea nemo repudiandae nam delectus eum iste ullam quaerat pariatur, vel, suscipit quis eligendi modi perspiciatis dolores a unde vitae tenetur placeat natus deserunt. Quas, deserunt.',
  //     img: Mountain2,
  //   },
  //   {
  //     id: 3,
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, id.',
  //     desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quas natus incidunt vel harum voluptate sit quaerat facere totam optio? Error, ipsum iure fugit ea nemo repudiandae nam delectus eum iste ullam quaerat pariatur, vel, suscipit quis eligendi modi perspiciatis dolores a unde vitae tenetur placeat natus deserunt. Quas, deserunt.',
  //     img: Mountain1,
  //   },
  // ];

  return (
    <div className="menu">
      <h1>Other posts you may like </h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
