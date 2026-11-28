function dummy(blogs = []) {
  return 1;
}

function totalLikes(blogs = []) {
  if (!blogs || blogs.length === 0) return 0;

  return blogs.reduce((res, current) => res + (current?.likes ?? 0), 0);
}

function favoriteBlog(blogs = []) {
  if (!blogs || blogs.length === 0) return {};

  let result = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > result.likes) result = blog;
  });

  return result;
}

function mostBlogs(blogs = []) {
  if (!blogs || blogs.length === 0) return {};

  let blogsCount = {};

  blogs.forEach((blog) => {
    if (Object.hasOwn(blogsCount, blog.author)) {
      blogsCount[blog.author] += 1;
    } else {
      blogsCount[blog.author] = 1;
    }
  });

  let mostBlogCount = {
    author: "",
    blogs: 0,
  };

  Object.entries(blogsCount).forEach(([author, blogs]) => {
    if (blogs > mostBlogCount.blogs)
      mostBlogCount = {
        author,
        blogs,
      };
  });

  return mostBlogCount;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
