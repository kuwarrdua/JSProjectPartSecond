//run some code after everything has rendered and other to update code when different states have changed
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
//to fetch something
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

    //Just passing in an empty array and it is used to store the blogs in useState
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        (async () => {
            await getBlogs();
        })();
    }, []);
// () implicit return {} explicit return
    const getBlogs = async () => {
        const blogsResp = await Axios.get('/blogs');
        if(blogsResp.status === 200) setBlogs(blogsResp.data);
    };

    const deleteBlog = async blog => {
        try{
            const resp = await Axios.post('/blogs/delete',{
                id: blog._id});
            
            if(resp.status === 200) toast("the blog was deleted successfully", {
                type: toast.TYPE.SUCCESS});
                await getBlogs();
            }
            

            catch(error) {
                toast("The blog was not deleted", {
                    type: toast.TYPE.ERROR
                }); 
            }
        };
    return(
        <Container className ="my-5">
            <header>
                <h1>Archieve</h1>
            </header>
            <hr/>
        
            <div className='content'>
                {blogs && blogs.map((blog, i) => (
                    <div key={i} className="card my-3">
                        <div className="card-header clearfix">
                            <div className="float-left">
                                <h5 className="card-title">
                                    {blog.title}
                                </h5>
                                {blog.user ? (
                  <small>~{blog.user.fullname}</small>
                ) : null}
              </div>
                  
              <div className="float-right">
                <small>{blog.updatedAt}</small>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">
                {blog.synopsis}
              </p>
            </div>

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/blogs/edit",
                  state: {
                    id: blog._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteBlog(blog)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
            </div>
        </Container>
    );
};

export default Index;