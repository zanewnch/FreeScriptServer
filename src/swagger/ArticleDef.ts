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
}
