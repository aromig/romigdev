---
title: JavaScript Frameworks and the Developer Experience
description: Frameworks are great to build new sites with but if you don't keep
  up with updates, it can be a real headache
date: 2025-10-03T00:00:00.000Z
cover: /images/blog/js-on-yellow.png
---

# JavaScript frameworks are great

Frameworks such as Vue, Angular, and React have been wonderful since their inception. They enforce structure to a project allowing scalability, help manage state cleanly and predictably, and speed up development with components and library integrations. Manual DOM manipulation is a thing of the past. These frameworks have huge communities which means a ton of support, tutorials, plugins, and third-party tools/extensions. Having each page's and component's script logic separated into their own individual scope makes testing and debugging easier. It's about the developer experience.

![Spongebob Squarepants holding JavaScript and CSS logos with the caption: It's basically magic](/images/blog/js-basically-magic.jpg)

I've used Vue off and on over the years, creating most of my sites with it. It was a lot of fun putting in the time to build them and doing slight updates soon after. And then I get busy with life and haven't touched the project in a while. And that's where I run into issues.

# JavaScript frameworks are a headache

If you're like me and leave a project dormant for a year or so and come back to it, you'll find that you can't even install it straight from a `git clone`. So many dependencies are out of date, some are considered end-of-life. And when you do update them, there are numerous vulnerabilities that cannot be fixed with an `npm audit fix`. There are version conflicts and complex dependency trees that makes it difficult to untangle the mess. A much newer version of a module may break your code in some way.

![Picture of iceberg with text: Lightweight syntax in your JS Framework above sea-level; and Compiler below sea-level with huge amounts of ice](/images/blog/js-framework-compiler-meme.png)

Now this is understandable if you neglect old projects like I have done. Keep things updated and there shouldn't be \[this many] problems. Sometimes though, if it isn't broke \[yet], why fix it?

Because of the build system itself, you cannot troubleshoot a production site easily because of how the HTML, CSS, and JavaScript is bundled together. No more looking at *View Source*. Instead you need to consult the dev environment. But honestly, I do get it. The developer experience is important. What does the code looking nice underneath in production have any bearing on the user experience as long as it works?

# Moving to Vite

So for my projects, I used [Vue CLI](https://cli.vuejs.org/) and [Gridsome](https://gridsome.org/) both of which are no longer maintained some time ago. Even updating node modules wouldn't help because the frameworks require the older deprecated versions. I decided to either migrate or start over a few projects using more modern tooling. I had heard good things about [Vite](https://vite.dev/), created by Evan You (who also created Vue.js). It is built on modern standards like native ES modules (ESM) and uses [Rollup](https://rollupjs.org/) for its build tool instead of [Webpack](https://webpack.js.org/). This makes the dependency tree smaller (via tree-shaking) and flatter compared to before, which makes overriding a vulnerable dependency more straightfoward. Vite will also pre-bundle dependencies that are not ESM-compatible, resolving potential issues upfront. And even though Evan You had created Vue prior to Vite, it is framework agnostic so it be used with others like React, Svelte, Angular, etc. Since I have more experience with Vue, I kept it as my framework of choice.

![Vite logo](/images/blog/vite.png)

So I searched and found this [guide to migrating from Vue CLI to Vite](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/) and it was fairly easy to follow. For example, my [cakes web site](https://cakes.romig.dev/) is now running on Vite + Vue. Although for this site where it was previously run on Gridsome, I completely started over with Vite + [Nuxt](https://nuxt.com/). Learning a more maintained framework was enjoyable and I learned different ways of retrieving content like [@nuxt/content](https://content.nuxt.com/) and through Github's APIs. I'm even using [Nuxt Studio](https://nuxt.studio/) to write blog posts as a CMS.

# It's not over

The struggle with dependency updates and vulnerabilities isn't long gone. Despite Vite's advantages, it doesn't manage them for me. Dependency creep still exists and I will need to be careful still. Things I can try to keep up on:

- Be more deliberate about what packages I introduce into my projects. See if I can implement a feature out of the box first and then find a small library if needed.
- Regularly update my dependencies, i.e. `npm outdated`. Stop ignoring Github's dependabot scanning service.
- Run `npm audit` on a schedule to find vulnerabilities without it being a total and breaking surprise.

While Vite will help in minimizing my dependency tree, I still need to be vigilant and proactive with managing them. I will hope for less of a headache later on and still embrace JavaScript frameworks for the developer experience. Happy coders = happy code.
