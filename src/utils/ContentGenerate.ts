import { faker } from "@faker-js/faker";
import * as path from "path";
import * as fs from "fs/promises";
import { Article } from "interface/ArticleInterface";

interface Topics {
  keywords: string[];
}

class GenerateFakeData {
  private filePath: string;
  private topics: Topics | {};
  private keywordArray: string[];

  constructor() {
    this.filePath = path.join(__dirname, "../public/ArticleKeyword.json");
    this.topics = {};
    this.keywordArray = [];
  }

  public paragraphs = (
    paragraphCount: number | { max: number; min: number } = { min: 1, max: 3 },
    separator: string = "<br/>\n"
  ): string => {
    if (typeof paragraphCount === "number") {
      return faker.lorem.paragraphs(paragraphCount, separator);
    } else {
      const count =
        Math.floor(
          Math.random() * (paragraphCount.max - paragraphCount.min + 1)
        ) + paragraphCount.min;
      return faker.lorem.paragraphs(count, separator);
    }
  };

  public paragraphsTest = () => {
    // console.log(this.paragraphs(2)); // prints 2 paragraphs separated by '<br/>\n'
    console.log(this.paragraphs({ min: 3, max: 5 })); // prints a random number of paragraphs between 1 and 3 separated by '<br/>\n'
  };

  public lines = (
    lineCount: number | { max: number; min: number } = { min: 1, max: 5 }
  ): string => {
    if (typeof lineCount === "number") {
      return faker.lorem.lines(lineCount);
    } else {
      const count =
        Math.floor(Math.random() * (lineCount.max - lineCount.min + 1)) +
        lineCount.min;
      return faker.lorem.lines(count);
    }
  };

  lineTest = () => {
    // console.log(this.lines(2)); // prints 2 lines
    console.log(this.lines({ min: 1, max: 3 })); // prints a random number of lines between 1 and 3
  };

  fullName = (options?: {
    firstName?: string;
    lastName?: string;
    sex?: "female" | "male";
  }): string => {
    return faker.person.fullName(options);
  };

  fullNameTest = () => {
    console.log(this.fullName()); // prints 'John Doe'
  };

  dateGenerate = () => {
    return faker.date.anytime();
  };

  dateTest = () => {
    console.log(this.dateGenerate());
  };

  public getRandomElements = (arr: any[], count: number) => {
    let result = [];
    let copiedArray = [...arr]; // Create a copy of the array
    for (let i = 0; i < count; i++) {
      if (copiedArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * copiedArray.length);
        const element = copiedArray[randomIndex];
        result.push(element);
      }
    }
    return result;
  };

  topicGenerate = async () => {
    try {
      const data: string = await fs.readFile(this.filePath, "utf-8");
      this.topics = JSON.parse(data);
      if ("keywords" in this.topics) {
        this.keywordArray = this.topics["keywords"];
      }
    } catch (err) {
      console.log(err);
    }
  };

  public getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  public randomTags = async (): Promise<string> => {
    await this.topicGenerate();
    let result: string[] = this.getRandomElements(this.keywordArray, 1);
    return result[0];
  };

  public generateComment = (): object[] => {
    let amount = this.getRandomNumber(1, 3);
    let result = [];

    for (let i = 0; i < amount; i++) {
      result.push({
        username: generateFakeData.fullName(),
        content: generateFakeData.paragraphs({ min: 1, max: 2 }),
      });
    }

    return result;
  };
}

const generateFakeData = new GenerateFakeData();

const article: Article = {};
const assignArticle = async () => {
  try {
    article["title"] = generateFakeData.lines(1);
    article["content"] = generateFakeData.paragraphs({ min: 3, max: 5 });
    article["author"] = generateFakeData.fullName();
    article["createdDate"] = generateFakeData.dateGenerate();
    article["publishedDate"] = generateFakeData.dateGenerate();
    article["updatedDate"] = generateFakeData.dateGenerate();
    article["tag"] = await generateFakeData.randomTags();
    article["like"] = generateFakeData.getRandomNumber(500, 10000);
    article["views"] = generateFakeData.getRandomNumber(500, 10000);
    article["summary"] = generateFakeData.lines(1);
    article["status"] = "Published";
    article["comments"] = generateFakeData.generateComment();
  } catch (e) {
    console.log(e);
  }
};

const main = async () => {
  await assignArticle();
  console.log(article);
};

main();
