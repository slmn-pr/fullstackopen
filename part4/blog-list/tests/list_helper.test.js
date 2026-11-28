const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    title: "Blog 1",
    author: "Salman",
    likes: 5,
  },
  {
    title: "Blog 2",
    author: "Ali",
    likes: 12,
  },
  {
    title: "Blog 3",
    author: "Reza",
    likes: 3,
  },
  {
    title: "Blog 4",
    author: "Salman",
    likes: 5,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("Calc total likes of blogs", () => {
  test("When list has only one, equals the like of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("When got multiple blogs, must calc correct sum of likes", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 25);
  });
});

describe("Favorite blog", () => {
  test("When blogs is empty, return empty object", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, {});
  });

  test("When blogs have single blog, return a single record", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("Show the favorite blog properly", () => {
    const result = listHelper.favoriteBlog(blogs); // expect blogs[1] (Blog 2)
    assert.strictEqual(result.title, blogs[1].title);
  });
});

describe("Most blogs", () => {
  test("When blogs are empty", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, {});
  });

  test("When has a single blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("When multiple blogs coming!", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Salman",
      blogs: 2,
    });
  });
});
