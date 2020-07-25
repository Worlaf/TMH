import MarkdownIt from "markdown-it";

const markdownParser = new MarkdownIt({
    linkify: true,
});

export default markdownParser;
