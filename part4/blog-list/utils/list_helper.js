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

module.exports = { dummy, totalLikes, favoriteBlog };
