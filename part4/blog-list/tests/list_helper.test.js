const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("Calc total likes of blogs", () => {
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
  ];

  test("When list has only one, equals the like of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("When got multiple blogs, must calc correct sum of likes", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 20);
  });
});
