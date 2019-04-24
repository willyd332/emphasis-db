# emphasis-db
README: EMPHASIS DATABASE

Emphasis AI builds solutions that improve human understanding. Our first product is a text editor that helps writers capture their readers' imaginations. It does this using a simple, four-color highlighting system. Based on nine years of research in the field of semiotics, our patent-pending systems are aligned with the latest neuroscience.

The Emphasis Database is a CRUD application that allows examples of emphasis to be archived. Users will be able to upload text from the web. The text will be of five content types: news articles, blog posts, marketing copy, technical documentation, and educational material. When creating an entry, users will select a content type from a drop-down menu. Then they will enter the title of the text, the author's name, and a link to the text.

Once this basic information has been entered, the user will be able to add the text. (There will be a size limit. Maximum size for an entry will be determined by the constraints of the server.) Once they add the text, an API call will be made to Emphasis AI's text editor. The editor will analyze the text and return information on the patterns of emphasis present in its sentences.

This information will be added to the user's entry. The categories that will be added include the number of sentences that match each pattern of emphasis, as well as the percentage of sentences in the text that match each pattern. Emphasis AI will also add a variability score, which may be called an engagement score. This score will show users how engaging Emphasis AI predicts the text will be for readers.

This description represents the MVP of the Emphasis Database. It will have two models: a user model and an entry model. It will have a login page. It will use Emphasis AI's API to analyze text and fill entries. It will have enough CSS to look pleasing to readers.

Additional features may include:
- A search bar that allows users to read the information in the database according to specific search parameters.
- A show page (probably the login page) that includes highlights from the database. A highlight may include a quote from a particular text, as well as pertinent stats. ("Text A got an engagement score of 99% and featured this sentence.")
- API calls from publishing platforms like Kindle and Forbes as well as publications like Medium and the New York Times.
- Extra Bonus: Data visualizations that show entire texts as a cognitive landscape. (Not as hard as it sounds. The trick would be to create a highlight view for text. At first, this would only feature sentence-level emphasis. The true value would appear when multiple modes of analysis were added.)
