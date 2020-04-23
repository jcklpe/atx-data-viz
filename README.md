# ATX Data Viz

Originally this was started as a dev test for an application to the technology team at the City of Austin, but now it's become a little learning project that I am expanding on. I intend to keep this project entirely in Vanilla JS so as to practice my fundamentals outside of a React context. 

## Build System

The build system is gulp4. It's basically just a way to bundle/transpile all the ES6/SCSS.

You set the location of the local server for browsersync using the `localDevURL` in the gulpfile.

### Basic File Structure
- assets
  - src/ (these are the files you edit)
    - styles.scss (main scss file.)
    - general-styles/ (general site wide styles and utilities)
    - components/ (any new styles you write for individual UI parts go in here)
  - build/ (these are the files that gulp spits out)
  - vendor/ (any third party libs/frameworks etc go in here)
- index.html (the main file that runs the app)

### Build Commands

**`npm run scss`:** compiles scss
**`npm run js`:** compiles js
**`npm run dev`:** compiles scss/js and then runs a gulp watch on their source folders, rebuilding every time there is an update, and triggering a browsersync refresh.



## TODO:
- [ ] extend data viz features

  - [ ] convert value earned into a true live data node. 

- [ ] reorganize code so that app.js stuff is properly maintained in src/js folder rather than contaminating vendor files

- [ ] Look at switching over to parcel and moving to a proper vanilla SPA app

  