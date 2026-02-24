# Job Tracker Website with JS Functionallity
- Switching between tabs
- Add data to interview and rejected tab by clicking interview or rejected button
- Update status to interview or rejectedby clicking interview or rejected button
- Update job on dashboard
- Delete job

--

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
- 'getElementById': returns a single element associated to the given id.
- 'getElementsByClassName': returns all element or collection of element associated to the given class name.
- 'querySelector': returns the first element that matches the selector. Selector could be id, classes, tags, attribute etc.
- 'querySelectorAll': returns the all element or static nodelist that matches with the selector. Selector could be id, classes, tags, attribute etc.

### 2. How do you create and insert a new element into the DOM?
- create element: const div = document.createElement('div');
- For example we want to append the element to another element. then the element name will be added first and will use append child to attach to the element. For example: anotherElement.appendChild(div);

### 3. What is Event Bubbling? And how does it work?
- Event bubbling is a way to propagate the targeted element up to it's parent element.
- Example: we have 3 div one inside another with id #parent>#child>#childOfChild. Now, if we add any event to the childOfChild, it will traverse from childOfChild to child, then parent, then document and finally in window.

### 4. What is Event Delegation in JavaScript? Why is it useful?
- Event delegation is a way to attach single event to it's parent element to handle event for it's child element.
- It reduces repeated code and works dynamically.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
- preventDefault() stops any default action associated to the element.
- stopPropagation() stops event from bubbilng.

--

**Technology Stack:**
- HTML
- CSS (Vanilla/Tailwind/DaisyUI)
- JavaScript (Vanilla)