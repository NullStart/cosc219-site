# Lab 8 — Debugging worksheet

Fill one block in for each fault you find. **The reasoning is what is marked**,
not the fix — a one-line correction with no explanation earns very little.

Copy the block as many times as you need.

---

## Fault 1

**Symptom** — what did you see, or what did the checker say?
The checker reported that the heading levels were skipped.

**How I found it** — which tool, and what did it tell you?
in code, it skip 2 to 3.


**Cause** — why did that happen? Name the concept, not just the line.
skip h2

**Fix** — what you changed.
change to h2 form h3.

**Lecture** — which one covers this.
Lecture 2

---

## Fault 2

**Symptom**
The checker reported that not every form control had a label.

**How I found it**
read the code.

**Cause**
The placeholder may disappear before the user's input.

**Fix**
Added <label for="search">Search</label> before the search input in index.html.

**Lecture**

Lecture 3
---

## Fault 3

**Symptom**
The search input box has exceeded the available space in the small window.

**How I found it**
I discovered it while using the browser.

**Cause**
When using the default padding size, with width: 100%, only the content width is set. The top part will add padding and borders, resulting in the input box being wider than the container.

**Fix**
Added *, *::before, *::after { box-sizing: border-box; } near the top of styles.css.

**Lecture**
Lecture 4

---

## Fault 4

**Symptom**
Pressing Tab moved between form controls, but there was no visible focus indicator.

**How I found it**
I reviewed the form, and then checked the rules for input:focus, select:focus and button:focus in the style panel.

**Cause**
The CSS rule "none" removes the default focus indicator of the browser, but no alternative is provided. Keyboard users cannot see which control is in an active state.

**Fix**
Replaced outline: none with a visible outline using 2px solid var(--brand) and outline-offset: 2px in styles.css.

**Lecture**
Lecture 4

---

## Fault 5

**Symptom**
The checker reported that filtering did not compare without converting types.

**How I found it**
read the matches() function in app.js and found == in the rating comparison.

**Cause**
The operators perform type conversion before comparing values. The strict equality operator, on the other hand, compares both the type and the value without performing any type conversion.

**Fix**
change == to ====

**Lecture**
Lecture 8

---

## Fault 6

**Symptom**
The paths were not displayed in ascending order of distance. The inspector also tested whether the sorting had changed the original array.

**How I found it**
I checked the displayed distance and then read the sortByDistance() function in app.js. I found that it called the sort() method without using a comparator or an array copy.

**Cause**
If without a comparator, the sort() function will compare the elements as strings instead of sorting the Trail objects based on their numeric km attribute. Moreover, it will modify the original array in-place, which may lead to unexpected changes elsewhere.

**Fix**
Changed the return statement to return [...trails].sort((a, b) => a.km - b.km);.

**Lecture**
Lectures 9

---

## Fault 7

**Symptom**
The checker reported that a trail name was not inserted into the page as text.

**How I found it**
I read the code and found that it uses `trail.name` to construct an HTML string and assigns it to `innerHTML`.

**Cause**
The innerHTML method parses the string into HTML. If the trailing name contains tags or malicious input, the browser may interpret it as code rather than plain text, thereby posing an XSS security risk.

**Fix**
Created the two span elements using document.createElement(), assigned their classes, set their content using textContent, and appended them to the li.

**Lecture**
lecture 14

---

## Fault 8

**Symptom**
Pressing Apply caused the page to flash and reset instead of just updating the results.

**How I found it**
I pressed Apply the reload. Then I inspected the submit event listener in app.js.

**Cause**
Submitting the form will trigger the default submission behavior of the browser, which may cause the page to jump or reload. The called listener is named apply(), but it does not prevent this default operation.

**Fix**
Added event.preventDefault() before apply().

**Lecture**
Lecture 14

---

## One more thing

**Which fault took you longest, and why?**
The sorting error took the longest time because it had two related issues. Adding a comparator can solve the problem of distance order, but the sort() function still modifies the original array. I must simultaneously check the comparison method of the elements and whether the input array has been modified.

**Which one would you never have found without the checker?**

Since the path names on the page seemed normal, it was easy to overlook the issue with innerHTML. After reading the code and seeing the relevant checks, I realized that inserting data in HTML format could potentially lead to XSS risks.