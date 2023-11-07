# Orri Dev Test

This project has been built based on the requirements in the [Orri technical assessment README](https://github.com/OrriClinic/technical-assessment/blob/main/README.md).

## Technologies Used

### Vite

I chose to use vite as the core framework. It's a low config and **very** performant solution for building modern, single page apps using React.

### MUI

From a design perspective, I wanted to focus on the experience so used MUI to accelerate the development of the interface. Where possible I themed it to look like the Orri brand, taking some styles and fonts from the website. With extra time I would customise this more extensively, to make it feel less like a generic material app.

## Recoil

As this is a development task I didn't feel it required a large state management library so chose to use recoil. It's lightweight and minimalist/atomic so great for sharing small amounts of state and keeping the code clean.

### Moment.js and Moment Timezone

As the task called for a lot of date manipulation and comparison, I decided to use Moment as it's one of the most comprehensive third party libraries. There are smaller, more performant libraries (eg date-fns) that I'd probably use in a production app.

### React Router

Industry standard for client side routing. From an experience perspective I wanted to have 3 routes.

- A list of schedules
- A dialog for adding new schedules
- The main weekly calendar that shows appointments in a selected timezone

## Development

### Requirements

- Node v20 (current lts)

### Running the server

```
# install dependencies
yarn

# run dev server
yarn dev
```

Then navigate to [localhost:5173](http://localhost:5173/) in your web browser.

## Future Development

If I had more time on the task I would tackle some of the following.

### Testing

The task didn't ask for any tests so I haven't included any yet. If I were to add some I'd likely start with the logic of the calendar selector, as that's where a lot of the complexity within the app lies.

After that I'd test some of the user journeys, such as adding a schedule and viewing the appointments calendar, amending the display filters.

To do this I'd either use jest or vitest with react testing library.

### UI

As previously said, I themed MUI but not extensively. I would work on making fit better with Orri's brand and design language.

### Accessibility

I've added some accessiblity attributes already, and with MUI we get some accesible functionality out-of-the-box. I'd want to spend time on the calendar as it would probably need some improvement to make it better for screen reader users.
