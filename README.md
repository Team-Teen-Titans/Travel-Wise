# Covid-Sentinel

## Project Status
In development

## Instalation and setup options
Clone down this repository. You will need `git`, `node` and `npm` installed globally on your machine.

### Installation
`npm install`

### Bundle assets
`npm run build`

### Bundle assets and watch for changes
`npm run build:dev`
After this command you can open the project by opening or running on a live server the `index.html` file under the `build` folder.
### Run webpack dev server
`npm run build:server`

### CSS Configuration
`npm run build:css` This command reads the `tailwind.config.js` file and `styles.css` template file, transpiles the CSS and exports a `styles.css` file to the `build` folder.

### Environment configuration
`dotenv` library added to gitignore 
`example.env` file added as template
