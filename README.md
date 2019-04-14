# trello-tasks-extension

A Chrome Extension to improve your task management in Trello when working in a Trello team.

#### How to use?

- Install Chrome Extenstion from web store
- Open [Trello](https://trello.com) and click on any Trello teams you belong to
- Click the "Authorize" button to enable the extension to view your Trello data

Now, everytime you access a Trello team overview page (eg. https://trello.com/[team name]/home), you will see a list of your active tasks

#### How does the extension know what tasks to show?

All tasks that meet the following criteria will be displayed:

- You are an assigned member on the card
- The card is not in a "Completed" state
  - The extension filters out cards that are completed based on the card's list name
  - Lists that are considered "Completed" contain one of the following case insensitive strings:
    - Complete
    - Finished
    - Done
    - Archive
    - #d

# Chrome extension structure:

Courtesy of [this blog post](http://rubberduck.io/blog/browser-extensions-react). At the end of the post, we will have a browser extension that is:

- Built on create-react-app, without [ejecting](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject)
- Development mode with near-hot reloading on `npm start`
- Production builds with `npm run build`
