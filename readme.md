#Formalize
###A jQuery plugin for intra-form navigation ([demo](http://violet.is/getting-formal/))

For setting up and navigating through forms divided up into separate sections. Woohoo!

##Requirements
All you need is [~~love~~](https://www.youtube.com/watch?v=CyIxZbsSBlA) [~~kill~~](http://en.wikipedia.org/wiki/All_You_Need_Is_Kill) [jQuery](http://jquery.com/download/).

##Usage
On any page, include a reference to `formalize.js`, and on any webform(s), call `$('#myForm').formalize()`.

But of course there's more to it than that.

##HTML Structure

Formalize assumes that you have broken your form up into fieldsets, and that within each fieldset, the stuff you want hidden will be put in `.form-section` wrappers (so that while a fieldset's content is collapsed, its legend can still be visible). It also assumes that your previous/next navigation elements are, respectively, `.form-nav-prev` and `.form-nav-next`.

```html
<form>
      <fieldset>
            <legend>Section 1</legend>
            <div class="form-section">
                  // some labels, inputs, etc.
                  <nav>
                        <span class="form-nav-prev">Prev</span>
                        <span class="form-nav-next">Next</span>
                  </nav>
            <div>
      </fieldset>
      // more fieldsets...
</form>
```

This can be changed by passing in options.

##Options: Choose Your Own Behavior

To use:

```javascript
$('#myForm').formalize({
      wrapper: '.dre',
      timing: 300
});
```

| Option  | Default | Type | Description |
| ------------- | ------------- | ------------- | ------------- |
| `section`  | `fieldset` | String | Each of these elements is a separate "step" in your form. Should be a class or type of DOM element. |
| `wrapper` | `.form-section` | String | Within each `section`, the `.form-section` is the element that is actually collapsed and expanded. |
| `navType` | `section` | String | `section` means that the form has one set of nav elements per section; the other option is `global`, for when there is one nav element that controls the entire form. |
| `prevNav` | `.form-nav-prev` | String | Element(s) that move you to previous form sections. |
| `nextNav` | `.form-nav-next` | String | Element(s) that move you to subsequent form sections. |
| `timing` | `0` | int | How long expanding/collapsing takes. |
| `nextCallback` | `null` | function | A function to be performed when you attempt to navigate to the next form section. **Any function that you use here must return `true` if you want to proceed; if `false`, the navigation will abort and you will not move to the next section.** |
| `prevCallback` | `null` | function | A function to be performed when you attempt to navigate to the previous form section. Same as with `nextCallback`, return `true` if you want the navigation to execute and `false` if you want it to abort. |

##Demo
[Here!](http://violet.is/getting-formal/) One demo form has navigation elements within each section; the other has one global set of navigation elements.

##Formalize &hearts;s Validation
One thing I really like about breaking up forms is that you can validate each section individually. Checking and correcting errors is a lot more manageable for 5-6 fields than for 20. You can use the `nextCallback` option to validate the currently open section. For any function called by `nextCallback` or `prevCallback`, the function **must return `true`** in order for the navigation to occur. If not, Formalize will assume that there was an issue and will not execute the navigation.

##License
Formalize is &copy; 2014 [Violet Pe&ntilde;a ](mailto:violetpena@gmail.com) under the [MIT License](http://opensource.org/licenses/MIT).

Let me know if you use it somewhere! :)
