function dummy(blogs = []) {
  return 1;
}

function totalLikes(blogs = []) {
  if (!blogs || blogs.length === 0) return 0;

  return blogs.reduce((res, current) => res + (current?.likes ?? 0), 0);
}

module.exports = { dummy, totalLikes };
