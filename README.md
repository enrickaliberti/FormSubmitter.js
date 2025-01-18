# FormSubmitter

**FormSubmitter** is a lightweight and versatile JavaScript library designed to enhance form submissions on the web. It makes it easy to manage form data submission via both traditional (redirect) and modern (AJAX) methods, making it ideal for improving user interaction, accessibility, and SEO optimization.

## Why use **FormSubmitter**?

Managing form parameters dynamically and optimally is essential not only for the functionality of the website but also for improving user experience and SEO (Search Engine Optimization). **FormSubmitter** offers advanced features to optimize form submission smartly:

1. **Dynamic URL Management**: You can define a dynamic URL that automatically replaces form parameters, making the URL more readable and SEO-friendly. This improves your site's search engine visibility and helps with natural ranking.

2. **Flexible Submission Modes**: Choose whether to submit data via traditional redirect or AJAX, reducing wait times and enhancing page interactivity.

3. **Parameter Sanitization**: Form parameters are automatically sanitized, removing special characters, spaces, and normalizing letters to generate clean, SEO-compliant URLs.

4. **Easy Error and Success Management**: Easily customize actions to take upon success or failure, improving the responsiveness and reliability of your form submission system.

## Key Features

- **Dynamic URL**: Automatically replace form parameters to generate optimized, clean URLs without special characters.
- **"Passive" and "Active" Submission Modes**: Choose between traditional form submission (redirect) or AJAX submission without page reload.
- **SEO-Friendly Sanitization**: Parameters are cleaned and converted into SEO-optimized URLs, with hyphens replacing spaces and no problematic characters.
- **Flexible Error and Success Handling**: Offers options to manage the submission flow based on server responses.

## How to Use?

### Installation

Include the library in your project:

`<script src='path/to/FormSubmitter.js'></script>`

## Example Usage

```html
<form id="myForm" action="/search" method="POST">
  <input type="text" name="search" />
  <button type="submit">Search</button>
</form>

<script>
  const formSubmitter = new FormSubmitter('myForm', {
    urlFormat: '/search/{search}', // Dynamic URL
    submitMode: 'active', // AJAX mode
    onSuccess: (response) => { console.log('Success!', response); },
    onError: (error) => { console.log('Error!', error); }
  });
</script>
```

In this example, the username and email parameters are used to dynamically build an optimized URL, replacing the values in the URL format.

## Optional Parameters
**urlFormat**: URL format supporting dynamic parameters in the {parameter} format.

**submitMode**: Submission mode (options: passive for traditional submission, active for AJAX submission).

**method**: Submission method (GET or POST).

**onSuccess**: Callback function executed on success.

**onError**: Callback function executed on error.

Why is managing URL parameters important?
Proper management of form parameters is crucial for good SEO. Here's why:

Cleaner and more readable URLs: Search engines prefer clear and easily readable URLs. Using dynamic URLs with relevant parameters, free from special characters, helps improve ranking.

Better indexing: Search engines index pages with structured, well-formed URLs more effectively. FormSubmitter ensures parameters are properly replaced without compromising the accuracy of the URL.

Improved user experience: Clean and understandable URLs can increase user trust and website navigability, leading to longer time spent on the page and better conversion rates.

# Contributing
If you want to contribute to improving FormSubmitter, feel free to make a pull request or report any bugs!

# License
Distributed under the MIT License. See LICENSE for more details.

