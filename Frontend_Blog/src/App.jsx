import React, { useEffect, useState } from "react";

function App() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [deleteId, setDeleteId] = useState('');

    // Fetch Blogs function
    const fetchBlogs = async () => {
        try {
            const response = await fetch("http://localhost:3000/blogs");
            const data = await response.json();
            console.log("Fetched blogs:", data);  // Log the response to check
            setBlogs(data);
        } catch (err) {
            console.error("Fetch error:", err.message);
        }
    };
    useEffect(() => {
        fetchBlogs();
    }, []);
    

    // Post Blog
    const postBlog = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/blog/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, author, content }),
            });

            if (!response.ok) {
                throw new Error("Failed to post blog");
            }

            const newBlog = await response.json();
            setBlogs([...blogs, newBlog]);
            setTitle('');
            setAuthor('');
            setContent('');
        } catch (err) {
            console.error("Post error:", err.message);
        }
    };

    // Delete Blog
    const deletePost = async (id) => {
        console.log(`Id passed in frontend ${id}`)
        try{
            const response = await fetch(`http://localhost:3000/blog/delete/${id}`,{
                method:'Delete'
            });
            if(!response.ok){
                throw new Error('Failed to delete blog.');
            }
            console.log(`Blog with ID ${id} has been deleted.`);
            // this will delete the blog and pass all other blogs to the function setBlogs()
            setBlogs((Blogs) => Blogs.filter((blog) => blog.id !== id));
            await fetchBlogs();
        }
        catch{
            console.error('Error deleting blog:', error);
        }
    
    }
    return (
        <div>
            <h1>All the Blogs</h1>
            <ul>
                {Array.isArray(blogs) &&
                    blogs.map((blog) => (
                        <li key={blog._id}>
                            <h3>{blog.title}</h3>
                            
                            <p><strong>Author:</strong> {blog.author}</p>
                            <p>{blog.content}</p>
                            <button onClick={() => deletePost(blog._id)}>Delete Blog</button>
                        </li>
                    ))
                }
            </ul>

            {/* Add a New Blog */}
            <h2>Add a New Blog</h2>
            <form onSubmit={postBlog}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Post Blog</button>
            </form>

            
        </div>
    );
}

export default App;
