#README: EMPHASIS DATABASE MVP

Emphasis AI builds solutions that improve human understanding. Our first product is a text editor that helps writers capture their readers' imaginations. It does this using a simple, four-color highlighting system. Based on ten years of research in the field of semiotics, our patent-pending systems are aligned with the latest neuroscience.

The Emphasis Database is a CRUD application that allows examples of emphasis to be archived. Users will be able to upload text from the web. The text will be of five content types: news articles, blog posts, marketing copy, technical documentation, and educational material. When creating an entry, users will select a content type from a drop-down menu. Then they will enter the title of the text, the author's name, and a link to the text.

Once this basic information has been entered, the user will be able to add the text. (There will be a size limit. Maximum size for an entry will be determined by the constraints of the server.) Once they add the text, an API call will be made to Emphasis AI's text editor. The editor will analyze the text and return information on the patterns of emphasis present in its sentences.

This information will be added to the user's entry. The categories that will be added include the number of sentences that match each pattern of emphasis, as well as the percentage of sentences in the text that match each pattern. Emphasis AI will also add a variability score, which may be called an engagement score. This score will show users how engaging Emphasis AI predicts the text will be for readers.

This description represents the MVP of the Emphasis Database. It will have two models: a user model and an entry model. It will have a login page. It will use Emphasis AI's API to analyze text and fill entries. It will have enough CSS to look pleasing to readers.

Additional features may include:
- A search bar that allows users to read the information in the database according to specific search parameters.
- A show page (probably the login page) that includes highlights from the database. A highlight may include a quote from a particular text, as well as pertinent stats. ("Text A got an engagement score of 99% and featured this sentence.")
- API calls from publishing platforms like Kindle and Forbes as well as publications like Medium and the New York Times.
- Extra Bonus: Data visualizations that show entire texts as a cognitive landscape. (Not as hard as it sounds. The trick would be to create a highlight view for text. At first, this would only feature sentence-level emphasis. The true value would appear when multiple modes of analysis were added.)

#User Stories
 1. The user opens the website and is prompted to login or register.
 2. After logging in (or registering) they will be brought to the entries page which will display:
     - A list of all of the entries with hyperlinks to their show pages
     - An option to create a new entry
     - A search bar to query data according to specific search parameters
     - A button that will send the user to their profile, which will contain
 3. When the user clicks on an entry link, they will be brought to a show page. There they can read all of the data associated with that entry.
 4. If the user is the owner of the entry, they will have the option to edit or delete the entry.
 5. The user will also have the ability to search the database in a search bar and to navigate back to the index page.
 6. If the user decides to edit their entry, they will be taken to an edit page.
 7. If they choose to delete the entry, it will be removed and the user will be redirected to the index page.
 8. If the user decides to create a new entry, they will be taken to a new entry page. They will enter all of the fields provided and submit their entry. The text data they provide will be sent to the Emphasis API. An analysis of the text will be returned. The analysis will appear in the data fields of the entry. Within the analysis,
 9. When the user creates a new entry, they will have the option to make it public or private. Private entries will be viewable only by the user. Public entries will be viewable by every user.
 10. If the user decides to go to their account, they will be sent to a user show page. The show page will have all of their user data, as well as a list of their entries.

#DIVISION OF LABOR:

   Main things that must be made:

   1. Translating the returned Analysis into usable Data. (We will make the functions in separate JS files) (Will)

   2. Translating the inputed string into the Array 0f 2000 characters each. (We will make the functions seperate JS files) (Will)

   3. Creating the pages and routes for each wireframe and creating the basic server page (Collin)
      1. This includes setting up the server
      2. Creating the Views
      3. Creating the DB
      4. Creating the Models
      5. Creating the (basic navigation at first) controllers
      6. Creating the login/register functions (encrypting passwords, etc…)

   4. Figuring out and making the actual API call (John)

   5. The statistics function that translates the color percentages into the actual engagement score (based on the optimal 33%:33%:33% ratio. (Bonus)

   7. Somebody should write an About This app page that describes what it's doing and what it might be used for. (John)

   8. Refine the look of the website in CSS (All)
