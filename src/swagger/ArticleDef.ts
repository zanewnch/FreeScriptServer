export class ArticleDef {
  public static AddUser = {
    $name: "John Doe",
    $age: 29,
    about: "",
  };

  public static article: {
    code: number;
    msg: string | null;
    data: string | null;
  } = {
    code: 1,
    msg: null,
    data: null,
  };

  public static articleGet200 = {
    code: 1,
    msg: "null",
    data: {
      _id: "65c1a9b4fba17f733db61663",
      title: "New Article",
      content: "This is a new article.",
      author: "Author Name",
      createdDate: "2022-01-01T00:00:00.000Z",
      publishedDate: "2022-01-01T00:00:00.000Z",
      updatedDate: "2022-01-01T00:00:00.000Z",
      tag: "Tag",
      like: 0,
      views: 0,
      summary: "Summary",
      status: "Status",
      comments: [
        {
          username: "Commenter",
          content: "This is a comment.",
          createdDate: "2022-01-01T00:00:00.000Z",
          _id: "65c1a9b4fba17f733db61664",
        },
      ],
      __v: 0,
    },
  };

  public static staffPicksGet200 = [{
    code: 1,
    msg: "null",
    data: {
      _id: "65c1a9b4fba17f733db61663",
      title: "New Article",
      content: "This is a new article.",
      author: "Author Name",
      createdDate: "2022-01-01T00:00:00.000Z",
      publishedDate: "2022-01-01T00:00:00.000Z",
      updatedDate: "2022-01-01T00:00:00.000Z",
      tag: "Tag",
      like: 0,
      views: 0,
      summary: "Summary",
      status: "Status",
      comments: [
        {
          username: "Commenter",
          content: "This is a comment.",
          createdDate: "2022-01-01T00:00:00.000Z",
          _id: "65c1a9b4fba17f733db61664",
        },
      ],
      __v: 0,
    },
  },{
    code: 1,
    msg: "null",
    data: {
      _id: "65c1a9b4fba17f733db61663",
      title: "New Article",
      content: "This is a new article.",
      author: "Author Name",
      createdDate: "2022-01-01T00:00:00.000Z",
      publishedDate: "2022-01-01T00:00:00.000Z",
      updatedDate: "2022-01-01T00:00:00.000Z",
      tag: "Tag",
      like: 0,
      views: 0,
      summary: "Summary",
      status: "Status",
      comments: [
        {
          username: "Commenter",
          content: "This is a comment.",
          createdDate: "2022-01-01T00:00:00.000Z",
          _id: "65c1a9b4fba17f733db61664",
        },
      ],
      __v: 0,
    },
  }];

  public static articleCreate200 = {
    code: 1,
    msg: "null",
    data: {
      _id: "65c1a9b4fba17f733db61663",
      title: "New Article",
      content: "This is a new article.",
      author: "Author Name",
      createdDate: "2022-01-01T00:00:00.000Z",
      publishedDate: "2022-01-01T00:00:00.000Z",
      updatedDate: "2022-01-01T00:00:00.000Z",
      tag: "Tag",
      like: 0,
      views: 0,
      summary: "Summary",
      status: "Status",
      comments: [
        {
          username: "Commenter",
          content: "This is a comment.",
          createdDate: "2022-01-01T00:00:00.000Z",
          _id: "65c1a9b4fba17f733db61664",
        },
      ],
      __v: 0,
    },
  };

  public static articleCreateParam = {
    data: {
      title: "New Article",
      content: "This is a new article.",
      author: "Author Name",
      createdDate: "2022-01-01T00:00:00.000Z",
      publishedDate: "2022-01-01T00:00:00.000Z",
      updatedDate: "2022-01-01T00:00:00.000Z",
      tag: "Tag",
      like: 0,
      views: 0,
      summary: "Summary",
      status: "Status",
      comments: [
        {
          username: "Commenter",
          content: "This is a comment.",
          createdDate: "2022-01-01T00:00:00.000Z",
        },
      ],
    },
  };
}
