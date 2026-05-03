/* ══════════════════════════════════════
   REAPER EDUCATION — script.js v3
   reaperbanana.xyz | terminal.reaperbanana.xyz
══════════════════════════════════════ */

/* ── DOMAIN ── */
const MAIN_DOMAIN = 'reaperbanana.xyz';
const TERM_DOMAIN = 'terminal.reaperbanana.xyz';

function getTerminalUrl() {
  const h = location.hostname;
  if (h === MAIN_DOMAIN || h === 'www.' + MAIN_DOMAIN || h === TERM_DOMAIN)
    return 'https://' + TERM_DOMAIN;
  return null; // use internal page
}

function goTerminal() {
  const url = getTerminalUrl();
  if (url) { window.location.href = url; }
  else { showPage('playground'); }
}

function pgGoHome() {
  const url = getTerminalUrl();
  if (url) { window.location.href = 'https://' + MAIN_DOMAIN; }
  else { showPage('home'); }
}

/* ── YEAR ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── NAV SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);
});

/* ── SMOOTH SCROLL ── */
function scrollSec(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── PAGE ROUTER ── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById('page-' + name);
  if (pg) pg.classList.add('active');
  document.getElementById('nav').style.display = name === 'playground' ? 'none' : '';
  window.scrollTo(0, 0);
}

/* ═══════════════════════════════════════════════════
   QUIZ DATA — exact copy from quizzes.ts
═══════════════════════════════════════════════════ */
const QUIZZES = [
  {
    id:'python', language:'Python', icon:'🐍', color:'#3776AB', difficulty:'Beginner',
    description:'Test your Python fundamentals — syntax, data types, functions, and more.',
    questions:[
      {question:'What is the output of the following code?',code:'x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)',options:['[1, 2, 3]','[1, 2, 3, 4]','Error','[4]'],correct:1,explanation:'In Python, lists are assigned by reference, not by value. y and x point to the same list object, so modifying y also modifies x.'},
      {question:'Which of the following is NOT a valid Python data type?',options:['tuple','array','dict','set'],correct:1,explanation:'Python does not have a built-in "array" type. You use lists, or import array from the standard library, or use numpy arrays.'},
      {question:'What does this list comprehension return?',code:'[x**2 for x in range(5) if x % 2 == 0]',options:['[0, 4, 16]','[0, 1, 4, 9, 16]','[4, 16]','[1, 9, 25]'],correct:0,explanation:'range(5) gives [0,1,2,3,4]. Filtered by x % 2 == 0 gives [0,2,4]. Squaring gives [0,4,16].'},
      {question:'What keyword is used to handle exceptions in Python?',options:['catch','rescue','except','handle'],correct:2,explanation:'Python uses "except" in try/except blocks, unlike languages like Java and JavaScript which use "catch".'},
      {question:'What is the output of this code?',code:'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))',options:['Hello, Alice!','greeting, name!','Error','None'],correct:0,explanation:'"greeting" is a default parameter with value "Hello". When not provided, Python uses the default.'},
      {question:'Which built-in function returns the length of an object?',options:['size()','count()','len()','length()'],correct:2,explanation:'len() is the built-in Python function for getting the number of items in a sequence or collection.'},
      {question:'What does the "pass" statement do in Python?',options:['Returns None from a function','Skips to the next iteration','Does nothing — it is a placeholder','Exits the program'],correct:2,explanation:'"pass" is a null statement used as a placeholder where syntax requires a statement but no code needs to run.'},
      {question:'What is the output?',code:'print(type(1/2))',options:['<class "int">','<class "float">','<class "fraction">','Error'],correct:1,explanation:'In Python 3, dividing two integers with / always returns a float. Use // for integer (floor) division.'},
      {question:'Which method removes and returns the last element of a list?',options:['remove()','delete()','pop()','discard()'],correct:2,explanation:'list.pop() removes and returns the last item by default. You can also pop at a specific index: list.pop(0).'},
      {question:'What does *args do in a function definition?',options:['Unpacks a dictionary','Collects extra keyword arguments','Collects extra positional arguments into a tuple','Multiplies all arguments'],correct:2,explanation:'*args allows a function to accept any number of positional arguments, packed into a tuple inside the function.'},
    ],
  },
  {
    id:'javascript', language:'JavaScript', icon:'JS', color:'#F7DF1E', difficulty:'Beginner',
    description:'Core JS concepts: closures, scope, the event loop, prototypes, and async patterns.',
    questions:[
      {question:'What is the output?',code:'console.log(typeof null)',options:['"null"','"object"','"undefined"','"boolean"'],correct:1,explanation:'typeof null returns "object" — this is a well-known JavaScript bug that exists for historical reasons and cannot be fixed.'},
      {question:'What does "==" do differently from "==="?',options:['=== is faster','== checks value only, === checks value AND type','=== allows null comparisons','No difference'],correct:1,explanation:'== performs type coercion before comparing. === (strict equality) checks both value and type with no coercion. Always prefer ===.'},
      {question:'What is the output?',code:'var x = 1;\nfunction test() {\n  console.log(x);\n  var x = 2;\n}\ntest();',options:['1','2','undefined','ReferenceError'],correct:2,explanation:'var declarations are hoisted to the top of their scope but not their assignment. So "var x" is hoisted but x = 2 is not, giving undefined.'},
      {question:'Which method creates a new array with transformed elements?',options:['forEach()','filter()','map()','reduce()'],correct:2,explanation:'Array.map() creates a new array by applying a function to each element of the original array.'},
      {question:'What does this arrow function return?',code:'const add = (a, b) => a + b;\nconsole.log(add(3, 4));',options:['undefined','"34"','7','Error'],correct:2,explanation:'Arrow functions with a single expression body (no braces) implicitly return that expression. add(3,4) returns 3 + 4 = 7.'},
      {question:'What is a closure in JavaScript?',options:['A way to close the browser tab','A function that has access to variables from its outer scope even after that scope has closed','A method to end a for loop','A sealed object that cannot be modified'],correct:1,explanation:'A closure is a function bundled with its surrounding lexical environment, allowing it to access variables from an outer function even after that function returns.'},
      {question:'What does Promise.all() do?',options:['Runs promises one by one in sequence','Returns the first promise to resolve','Runs all promises in parallel and resolves when ALL resolve (or rejects if any reject)','Ignores rejected promises'],correct:2,explanation:'Promise.all() takes an array of promises, runs them concurrently, and returns a single promise that resolves with an array of results when all input promises resolve.'},
      {question:'What is the output?',code:'const obj = { a: 1 };\nconst { a, b = 10 } = obj;\nconsole.log(a, b);',options:['1 undefined','1 10','Error','undefined 10'],correct:1,explanation:'Destructuring with defaults: a gets obj.a (1), and b uses its default value 10 because obj.b is undefined.'},
      {question:'What does the "event loop" do in JavaScript?',options:['Handles DOM click events only','Monitors for syntax errors','Processes the callback queue when the call stack is empty, enabling async behavior','Loops through all variables'],correct:2,explanation:'The event loop continuously checks if the call stack is empty and, if so, pushes callbacks from the task queue onto the stack — this is how JS handles async operations.'},
      {question:'What will this log?',code:'console.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);',options:['1 2 3','2 1 3','1 3 2','3 1 2'],correct:2,explanation:'setTimeout callbacks are placed in the task queue and only run after the current synchronous code finishes. So 1 and 3 log first, then 2.'},
    ],
  },
  {
    id:'typescript', language:'TypeScript', icon:'TS', color:'#3178C6', difficulty:'Intermediate',
    description:'Types, interfaces, generics, utility types, and the TypeScript compiler.',
    questions:[
      {question:'What does the "?" after a property name mean in a TypeScript interface?',code:'interface User {\n  name: string;\n  age?: number;\n}',options:['age is required and can be null','age is optional (may be undefined)','age is a nullable type','Syntax error'],correct:1,explanation:'The ? marks a property as optional. A User object is valid with or without an "age" property. Its type becomes number | undefined.'},
      {question:'What is a TypeScript Generic?',options:['A type that is always "any"','A reusable type placeholder that works with different types while preserving type safety','A class with no methods','A built-in type for numbers'],correct:1,explanation:'Generics let you write reusable components that work with any type while keeping type information. Example: function identity<T>(arg: T): T returns the same type it receives.'},
      {question:'What does Partial<T> do?',options:['Makes all properties of T required','Makes all properties of T optional','Picks only some properties from T','Makes T readonly'],correct:1,explanation:'Partial<T> is a utility type that constructs a type with all properties of T set to optional. Useful for update/patch operations.'},
      {question:'What is the difference between "type" and "interface" in TypeScript?',options:['They are identical','interface can be extended and merged; type aliases are more flexible and can represent unions/intersections','type is for primitives, interface is for objects','interface is deprecated'],correct:1,explanation:'Interfaces support declaration merging and are preferred for object shapes. Types are more flexible and can express unions, intersections, tuples, and mapped types.'},
      {question:'What does this code mean?',code:'function getLength(arg: string | string[]): number {\n  return arg.length;\n}',options:['Error — you cannot use length on a union type','arg can be either a string or an array of strings, both of which have .length','arg will always be converted to a string','Returns the number of arguments'],correct:1,explanation:'Union types allow a variable to be one of several types. Both string and string[] have a .length property, so this compiles fine.'},
      {question:'What is a "type assertion" in TypeScript?',options:['A runtime check that throws if the type is wrong','Telling the TypeScript compiler to treat a value as a specific type — no runtime effect','A way to define a new type','An automatic type conversion'],correct:1,explanation:'Type assertions (as Type or <Type>) tell the compiler you know more about the type than it can infer. They have zero effect at runtime — it\'s a compile-time directive only.'},
      {question:'What does the "readonly" modifier do?',code:'interface Point {\n  readonly x: number;\n  readonly y: number;\n}',options:['Prevents the property from being serialized to JSON','Makes the property undefined by default','Prevents the property from being reassigned after initialization','Makes the property optional'],correct:2,explanation:'readonly properties can be set once (during object creation) but not modified afterwards. TypeScript will give a compile error if you try to reassign them.'},
      {question:'What does the "never" type represent?',options:['A value that can be anything','A value that is always null','A type for values that never occur — like a function that always throws or loops forever','An empty object type'],correct:2,explanation:'never represents values that never exist. A function throwing an error or an infinite loop has return type never. It is used in exhaustive checks and the bottom of type hierarchies.'},
      {question:'What is the output type of this function?',code:'function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}',options:['T','T | undefined','undefined','any'],correct:1,explanation:'The function returns the first element which may not exist (empty array), so the return type is T | undefined, correctly representing both cases.'},
      {question:'What does keyof T produce?',options:['All values of type T','A union of all property names (keys) of type T','The number of properties in T','A copy of T with no properties'],correct:1,explanation:'keyof T creates a union type of all the keys (property names) of type T. For { a: number; b: string }, keyof gives "a" | "b".'},
    ],
  },
  {
    id:'html-css', language:'HTML & CSS', icon:'🎨', color:'#E34F26', difficulty:'Beginner',
    description:'Document structure, semantic HTML, selectors, flexbox, grid, and the box model.',
    questions:[
      {question:'What does the "alt" attribute on an <img> tag do?',options:['Sets the image title shown on hover','Provides alternative text for accessibility and when the image fails to load','Adjusts the image alignment','It is purely decorative and has no function'],correct:1,explanation:'The alt attribute provides a text description for screen readers and displays when the image cannot load. It\'s critical for accessibility.'},
      {question:'Which CSS property controls the space INSIDE an element, between its content and its border?',options:['margin','padding','border-spacing','gap'],correct:1,explanation:'padding is the space between an element\'s content and its border. margin is the space OUTSIDE the border, between elements.'},
      {question:'What does "display: flex" do?',options:['Makes the element invisible','Turns the element into a block-level flex container, enabling flexbox layout for its children','Makes the element float left','Adds a flexible border'],correct:1,explanation:'display: flex establishes a flex formatting context. The element itself becomes block-level, and its direct children become flex items controlled by flexbox properties.'},
      {question:'Which HTML element is the correct semantic choice for the main navigation of a page?',options:['<div>','<menu>','<nav>','<header>'],correct:2,explanation:'<nav> is the semantic HTML5 element specifically for navigation links. Screen readers and search engines use it to identify navigation regions.'},
      {question:'What does "position: absolute" do?',options:['Fixes the element relative to the viewport','Removes the element from the normal document flow and positions it relative to its nearest positioned ancestor','Makes the element take up the full page','Positions the element at the very bottom of the page'],correct:1,explanation:'position: absolute removes the element from normal flow and positions it relative to the nearest ancestor with position: relative, absolute, or fixed.'},
      {question:'What does this CSS selector target?',code:'.container > p',options:['All <p> elements anywhere inside .container','Only direct child <p> elements of .container','The first <p> inside .container','.container elements inside <p> elements'],correct:1,explanation:'The > is the direct child combinator. .container > p targets only <p> elements that are direct children of .container, not nested ones.'},
      {question:'Which CSS property would you use to make text not wrap onto the next line?',options:['word-break: break-all','overflow: hidden','white-space: nowrap','text-overflow: ellipsis'],correct:2,explanation:'white-space: nowrap prevents text from wrapping. Often combined with overflow: hidden and text-overflow: ellipsis to truncate overflowing text with "...".'},
      {question:'In CSS Grid, what does "grid-template-columns: repeat(3, 1fr)" do?',options:['Creates 3 rows of equal height','Creates 3 equal-width columns that share the available space','Repeats the grid 3 times','Sets the column gap to 3 units'],correct:1,explanation:'repeat(3, 1fr) creates 3 columns, each taking 1 fraction unit (1fr) of the available space — so they each get 1/3 of the container width.'},
      {question:'What is the specificity order from lowest to highest?',options:['element → class → ID → inline style','inline style → ID → class → element','ID → class → element → inline style','class → ID → element → inline style'],correct:0,explanation:'CSS specificity hierarchy: element/pseudo-element (0,0,1) < class/attribute/pseudo-class (0,1,0) < ID (1,0,0) < inline styles (overrides everything). !important beats all.'},
      {question:'What does the HTML5 <main> element represent?',options:['The largest section of the page','The dominant, unique content of the page body — should be used once per page','The main navigation bar','The header section of the page'],correct:1,explanation:'<main> wraps the central, unique content of the document — excluding repeated elements like headers, footers, and sidebars. Only one <main> should appear per page.'},
    ],
  },
  {
    id:'sql', language:'SQL', icon:'🗄', color:'#4479A1', difficulty:'Intermediate',
    description:'Queries, joins, aggregation, indexing, and relational database fundamentals.',
    questions:[
      {question:'What does this query return?',code:'SELECT name\nFROM users\nWHERE age > 18\nORDER BY name ASC\nLIMIT 5;',options:['All users older than 18','The first 5 names of users older than 18, sorted A–Z','The oldest 5 users','Users named "name" aged over 18'],correct:1,explanation:'This selects the "name" column from users where age > 18, sorts results alphabetically ascending, and returns only the first 5 rows.'},
      {question:'What is the difference between INNER JOIN and LEFT JOIN?',options:['No difference','INNER JOIN returns only matching rows from both tables; LEFT JOIN returns all rows from the left table plus matches from the right','LEFT JOIN is faster','INNER JOIN works on strings, LEFT JOIN on numbers'],correct:1,explanation:'INNER JOIN returns rows where there is a match in both tables. LEFT JOIN returns all rows from the left table, with NULL values for non-matching right table columns.'},
      {question:'Which aggregate function returns the number of rows?',options:['SUM()','AVG()','COUNT()','MAX()'],correct:2,explanation:'COUNT() counts the number of rows. COUNT(*) counts all rows, COUNT(column) counts non-NULL values in that column.'},
      {question:'What does GROUP BY do?',options:['Sorts results in descending order','Groups rows with the same values in specified columns so aggregate functions can be applied per group','Removes duplicate rows','Joins two tables'],correct:1,explanation:'GROUP BY collapses rows with the same values into groups. Aggregate functions like COUNT, SUM, AVG then operate on each group independently.'},
      {question:'What is a PRIMARY KEY?',options:['The first column in a table','A column that uniquely identifies each row and cannot be NULL','A foreign key that links tables','An index on the most queried column'],correct:1,explanation:'A PRIMARY KEY uniquely identifies each record in a table. It enforces uniqueness and non-nullability, and usually has an index automatically created for performance.'},
      {question:'What does HAVING do that WHERE cannot?',options:['Filter rows before grouping','Filter groups after aggregation (filter on aggregate function results)','Sort the results','Join tables'],correct:1,explanation:'WHERE filters rows before grouping and cannot reference aggregate functions. HAVING filters after GROUP BY and can reference aggregates like COUNT(*) > 5.'},
      {question:'What does the DISTINCT keyword do?',options:['Sorts results in alphabetical order','Removes duplicate rows from the result set','Returns only NULL values','Renames a column'],correct:1,explanation:'SELECT DISTINCT removes duplicate rows from the result. Only unique combinations of the selected columns are returned.'},
      {question:'What does a database INDEX do?',options:['Creates a backup of the table','Enforces uniqueness on a column','Creates a data structure that speeds up reads on a column at the cost of slower writes and more storage','Organizes rows by insertion order'],correct:2,explanation:'Indexes speed up SELECT queries on indexed columns by allowing the database to find rows without scanning the entire table. The trade-off is slower INSERT/UPDATE/DELETE and more disk space.'},
      {question:'What is a FOREIGN KEY?',options:['A key from a different database engine','A column that references the PRIMARY KEY of another table, enforcing referential integrity','An encrypted primary key','A key used only for international data'],correct:1,explanation:'A FOREIGN KEY links a column in one table to the PRIMARY KEY of another, ensuring that the referenced record exists (referential integrity). It prevents orphaned records.'},
      {question:'What does this query do?',code:'SELECT department, COUNT(*) as total\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 10;',options:['Returns all employees in departments with more than 10 people','Returns department names and employee counts only for departments with more than 10 employees','Returns the 10 largest departments','Counts all employees across all departments'],correct:1,explanation:'GROUP BY groups by department, COUNT(*) counts employees per department, HAVING filters to only departments where that count exceeds 10.'},
    ],
  },
  {
    id:'react', language:'React', icon:'⚛', color:'#61DAFB', difficulty:'Intermediate',
    description:'Components, hooks, state management, rendering, and React patterns.',
    questions:[
      {question:'When does a React component re-render?',options:['Only when you call render() manually','When its state or props change, or when its parent re-renders','Only on page load','Every 60 frames per second'],correct:1,explanation:'React re-renders a component when its state changes (useState), when it receives new props, or when its parent re-renders (unless optimized with React.memo).'},
      {question:'What is wrong with this code?',code:'function Counter() {\n  let count = 0;\n  return (\n    <button onClick={() => count++}>\n      Count: {count}\n    </button>\n  );\n}',options:['Nothing is wrong','count++ mutates a local variable — the component will not re-render and the UI will not update','The onClick handler has the wrong syntax','Buttons cannot have onClick handlers'],correct:1,explanation:'Local variables are recreated every render and do not trigger re-renders. You must use useState: const [count, setCount] = useState(0), then call setCount(count + 1).'},
      {question:'What does useEffect(() => { ... }, []) do?',options:['Runs on every render','Runs once after the first render (like componentDidMount)','Runs before every render','Cleans up when the component unmounts only'],correct:1,explanation:'An empty dependency array [] means the effect runs once after the initial render and never again. This is equivalent to componentDidMount in class components.'},
      {question:'What is the "key" prop used for in lists?',code:'items.map(item => <li key={item.id}>{item.name}</li>)',options:['Sorting the list','Helping React identify which items changed, were added, or removed for efficient DOM updates','Styling list items','Accessing the item in event handlers'],correct:1,explanation:'Keys help React\'s reconciliation algorithm efficiently update the DOM. Without unique keys, React may re-render the entire list instead of only changed items.'},
      {question:'What does useMemo do?',options:['Memoizes the component so it never re-renders','Caches a computed value and only recomputes it when its dependencies change','Stores data in localStorage','Prevents useEffect from running'],correct:1,explanation:'useMemo caches an expensive computation and returns the cached result unless its dependency array changes. Prevents unnecessary recalculations on every render.'},
      {question:'What is "prop drilling"?',options:['Passing props down through many nested components that do not use the props themselves','Destructuring props in a component','Passing functions as props','Using the spread operator on props'],correct:0,explanation:'Prop drilling is the pattern of passing props through many intermediate components just to reach a deeply nested child. Solutions include Context API, state management libraries, or component composition.'},
      {question:'What does useCallback do?',options:['Calls a function after a delay','Memoizes a function reference so it doesn\'t change between renders unless dependencies change','Runs a callback on component unmount','Converts a class method into a hook'],correct:1,explanation:'useCallback memoizes a function. Without it, a new function reference is created every render. This matters when passing callbacks to child components wrapped in React.memo.'},
      {question:'What is the correct way to update state based on the previous state value?',options:['setCount(count + 1)','setCount(prev => prev + 1)','count++','setState(count + 1)'],correct:1,explanation:'When the new state depends on the previous state, always use the functional form setCount(prev => prev + 1). This avoids stale closures in async scenarios.'},
      {question:'What does React.memo do?',options:['Stores data in memory','Prevents a component from re-rendering if its props have not changed','Creates a memoized state value','Caches API responses'],correct:1,explanation:'React.memo is a higher-order component that wraps a component. If the component\'s props haven\'t changed (shallow comparison), React skips re-rendering and reuses the last result.'},
      {question:'What is the Context API used for?',options:['Making API calls','Sharing state across the component tree without prop drilling','Managing side effects','Lazy loading components'],correct:1,explanation:'Context provides a way to pass data through the component tree without manually passing props at every level. Useful for global data like themes, auth state, and locale.'},
    ],
  },
  {
    id:'java', language:'Java', icon:'☕', color:'#F89820', difficulty:'Intermediate',
    description:'OOP principles, the JVM, generics, collections, and core Java patterns.',
    questions:[
      {question:'What are the four pillars of Object-Oriented Programming?',options:['Classes, Objects, Methods, Fields','Encapsulation, Inheritance, Polymorphism, Abstraction','Public, Private, Protected, Static','Compile, Run, Debug, Deploy'],correct:1,explanation:'The four OOP pillars are: Encapsulation (hiding internal state), Inheritance (extending classes), Polymorphism (one interface, multiple forms), and Abstraction (hiding complexity).'},
      {question:'What is the output?',code:'int x = 5;\nSystem.out.println(x++ + " " + ++x);',options:['5 6','5 7','6 7','6 6'],correct:1,explanation:'x++ returns 5 then increments to 6. ++x increments first (to 7) then returns 7. Output: "5 7".'},
      {question:'What does the "final" keyword mean when applied to a variable?',options:['The variable is private','The variable can only be assigned once and cannot be reassigned','The variable is deleted at the end of the method','The variable is shared across all instances'],correct:1,explanation:'final on a variable makes it a constant — it can only be assigned once. For object references, the reference is constant but the object\'s internal state can still change.'},
      {question:'What is the difference between an abstract class and an interface in Java?',options:['No difference in modern Java','Abstract classes can have state and constructors; interfaces define a contract (primarily method signatures) with no state','Interfaces are faster','Abstract classes can only be used once'],correct:1,explanation:'Abstract classes can have fields, constructors, and both abstract and concrete methods. Interfaces define a contract (abstract methods) and since Java 8, can have default methods. A class can implement multiple interfaces but only extend one class.'},
      {question:'What does "static" mean for a method?',options:['The method cannot be called','The method belongs to the class, not instances — it can be called without creating an object','The method is thread-safe','The method is inherited by all subclasses'],correct:1,explanation:'Static methods belong to the class itself, not any instance. They can be called via ClassName.methodName() without creating an object, but cannot access instance variables.'},
      {question:'What is autoboxing in Java?',options:['Automatic memory allocation','The automatic conversion between primitive types (int, double) and their wrapper classes (Integer, Double)','Packaging a Java application into a JAR','Casting one object type to another'],correct:1,explanation:'Autoboxing automatically converts primitives to wrapper objects (int→Integer) and unboxing does the reverse. This lets primitives work with collections like ArrayList<Integer>.'},
      {question:'Which collection should you use for fast key-value lookups in Java?',options:['ArrayList','LinkedList','HashMap','TreeSet'],correct:2,explanation:'HashMap provides O(1) average time complexity for get() and put() operations using a hash table internally. TreeMap also works but is O(log n) and keeps keys sorted.'},
      {question:'What does "throws" do in a method signature?',code:'public void readFile(String path) throws IOException {',options:['The method catches the exception internally','Declares that the method may throw this checked exception, requiring callers to handle or propagate it','The method always throws this exception','Converts the exception to a RuntimeException'],correct:1,explanation:'throws declares checked exceptions a method might throw. Callers must either catch the exception or declare it in their own throws clause — this is Java\'s checked exception system.'},
      {question:'What is method overloading?',options:['Overriding a method from a parent class','Defining multiple methods with the same name but different parameter lists in the same class','Making a method run multiple times','Adding extra parameters to a method call'],correct:1,explanation:'Overloading allows multiple methods with the same name as long as their parameter types or count differ. Java decides which to call at compile time based on the arguments.'},
      {question:'What does the equals() method do vs ==?',options:['They are identical for all types','== checks reference equality (same object in memory); equals() checks value/logical equality','== is for strings, equals() is for numbers','equals() is faster than =='],correct:1,explanation:'== on objects checks if they are the exact same object in memory. equals() checks logical equality — e.g., two different String objects with the same characters are equals() true but == false.'},
    ],
  },
  {
    id:'go', language:'Go', icon:'Go', color:'#00ADD8', difficulty:'Advanced',
    description:'Goroutines, channels, interfaces, error handling, and Go idioms.',
    questions:[
      {question:'What is a goroutine?',options:['A function that returns multiple values','A lightweight thread managed by the Go runtime — started with the "go" keyword','A Go error type','A loop that runs concurrently with the main function'],correct:1,explanation:'Goroutines are lightweight concurrent functions managed by the Go runtime. They\'re much cheaper than OS threads. Start one with: go myFunction(). The runtime multiplexes them onto OS threads.'},
      {question:'How does Go handle errors idiomatically?',options:['With try/catch blocks','By returning error as the last return value and checking it explicitly','With panic() for all errors','By throwing exceptions'],correct:1,explanation:'Go functions return errors as a value: func doThing() (Result, error). Callers check: if err != nil { return err }. This makes error handling explicit and visible.'},
      {question:'What is a channel in Go?',options:['A network connection object','A typed conduit for safely sending and receiving values between goroutines','A goroutine that waits for input','A read-only variable'],correct:1,explanation:'Channels are Go\'s primary mechanism for goroutine communication. ch := make(chan int) creates an integer channel. Send with ch <- value, receive with value := <-ch.'},
      {question:'How are interfaces defined in Go?',options:['By explicitly declaring "implements InterfaceName"','Implicitly — any type that has all the interface\'s methods automatically satisfies it','Using the "implements" keyword','Through class inheritance'],correct:1,explanation:'Go uses structural (duck) typing for interfaces. You don\'t declare that a type implements an interface — if it has all the required methods, it automatically satisfies the interface.'},
      {question:'What does "defer" do?',code:'func readFile(path string) error {\n    f, err := os.Open(path)\n    if err != nil { return err }\n    defer f.Close()\n    // ... use f\n}',options:['Runs f.Close() immediately','Schedules f.Close() to run after the surrounding function returns','Pauses execution for one second','Runs f.Close() in a new goroutine'],correct:1,explanation:'defer schedules a function call to run when the surrounding function returns, regardless of how it returns (normal return or panic). Perfect for cleanup like closing files.'},
      {question:'What is the zero value for a pointer in Go?',options:['0','false','nil','""'],correct:2,explanation:'In Go, all variables are initialized to their zero value. For pointers, the zero value is nil. Dereferencing a nil pointer causes a panic.'},
      {question:'What does make() do in Go?',options:['Creates a new struct','Allocates and initializes slices, maps, and channels','Creates a new goroutine','Imports a package'],correct:1,explanation:'make() is for creating slices, maps, and channels — these built-in types require initialization before use. For structs, use new() or a struct literal.'},
      {question:'What is the purpose of the "select" statement in Go?',options:['Selects a random goroutine to run','Chooses which of multiple channel operations to execute — whichever is ready first','Selects elements from a slice','Works like a switch for string comparison'],correct:1,explanation:'select lets a goroutine wait on multiple channel operations simultaneously. It picks whichever channel is ready. If multiple are ready, it picks one at random.'},
      {question:'What does a WaitGroup do?',options:['Limits the number of goroutines','Waits for a collection of goroutines to finish before continuing','Creates a group of channels','Shares memory between goroutines'],correct:1,explanation:'sync.WaitGroup tracks goroutines: Add(n) to add, Done() in each goroutine when finished, Wait() to block until all goroutines call Done(). Essential for synchronizing concurrent work.'},
      {question:'In Go, what is a slice vs an array?',options:['They are identical','Arrays have a fixed length defined at compile time; slices are dynamic, reference a backing array, and have a length and capacity','Slices are immutable, arrays are mutable','Arrays can hold multiple types, slices cannot'],correct:1,explanation:'Arrays in Go are fixed-size and value types. Slices are dynamic, reference a portion of an underlying array, and are reference types. Most Go code uses slices.'},
    ],
  },
  {
    id:'rust', language:'Rust', icon:'Rs', color:'#CE412B', difficulty:'Advanced',
    description:'Ownership, borrowing, lifetimes, enums, pattern matching, and the Rust type system.',
    questions:[
      {question:'What is Rust\'s ownership system?',options:['A garbage collection algorithm','A compile-time memory management system where each value has exactly one owner, and memory is freed when the owner goes out of scope','A runtime reference counting mechanism','A way to share data between threads'],correct:1,explanation:'Rust\'s ownership rules: 1) Each value has one owner, 2) there can only be one owner at a time, 3) value is dropped when owner goes out of scope. This enables memory safety without GC.'},
      {question:'What does "borrowing" mean in Rust?',options:['Taking ownership of a value','Creating a reference to a value without taking ownership — the original owner keeps the value','Copying a value','Moving a value to the heap'],correct:1,explanation:'Borrowing creates a reference (&T) to a value. You can have many immutable references OR one mutable reference — never both simultaneously. The borrow checker enforces this at compile time.'},
      {question:'What happens when you "move" a value in Rust?',code:'let s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1); // ?',options:['s1 is copied and both are valid','Compile error — s1 was moved into s2, so s1 is no longer valid','Runtime error','s1 becomes an empty string'],correct:1,explanation:'String does not implement Copy, so assigning to s2 moves ownership. s1 is then invalid — the compiler prevents using it, eliminating double-free bugs.'},
      {question:'What is the Option<T> type?',options:['An optional function parameter','A type representing either Some(T) (a value exists) or None (no value) — Rust\'s null-safe alternative','A type for optional imports','A configuration option type'],correct:1,explanation:'Option<T> replaces null. Instead of crashing on null, Rust forces you to handle both cases explicitly: Some(value) or None. Pattern matching ensures you never forget to handle the "no value" case.'},
      {question:'What does the "match" expression guarantee?',options:['It runs faster than if/else','Exhaustive matching — the compiler errors if you don\'t handle all possible cases','The first matching arm always runs','It works only on integers'],correct:1,explanation:'Rust\'s match must be exhaustive — you must handle every possible value. The compiler errors if any case is missing. This prevents bugs from unhandled states.'},
      {question:'What is the Result<T, E> type?',options:['The return type of all functions','A type representing either Ok(T) (success with value) or Err(E) (failure with error) — Rust\'s error handling type','The output of a calculation','A type for test results'],correct:1,explanation:'Result<T, E> is used for operations that can fail. Functions return Ok(value) on success or Err(error) on failure. Callers must handle both cases, preventing silent error swallowing.'},
      {question:'What does the ? operator do?',code:'fn read_file(path: &str) -> Result<String, io::Error> {\n    let content = fs::read_to_string(path)?;\n    Ok(content)\n}',options:['It\'s a ternary operator','Unwraps Ok(T) or returns Err early from the current function if the result is Err','Marks a function as optional','Converts the error to a panic'],correct:1,explanation:'The ? operator is shorthand: if Ok, unwrap the value; if Err, return the error from the current function. It propagates errors up the call stack without verbose match arms.'},
      {question:'What is a lifetime in Rust?',options:['How long a program runs','An annotation telling the compiler how long references are valid relative to each other, preventing dangling references','The duration of a goroutine','A timer for garbage collection'],correct:1,explanation:'Lifetimes (\'a) are annotations the borrow checker uses to ensure references don\'t outlive the data they point to. Most lifetimes are inferred; you annotate explicitly when the compiler can\'t.'},
      {question:'What is a Rust trait?',options:['A class with private fields','A collection of method signatures that types can implement — similar to interfaces in other languages','A special variable type','A compile-time constant'],correct:1,explanation:'Traits define shared behavior. Types implement traits to gain functionality. Rust\'s standard library is built on traits like Clone, Display, Iterator, and From.'},
      {question:'What is the difference between String and &str in Rust?',options:['They are identical','String is a heap-allocated, owned, growable string; &str is a borrowed reference to a string slice (often stack or static)','String is immutable, &str is mutable','&str is longer than String'],correct:1,explanation:'String is an owned, heap-allocated, resizable string. &str is a reference to a string slice — lightweight and borrowed. Functions usually take &str for flexibility; return String when ownership is needed.'},
    ],
  },
  {
    id:'cpp', language:'C++', icon:'C++', color:'#00599C', difficulty:'Advanced',
    description:'Memory management, pointers, STL, OOP, templates, and modern C++ features.',
    questions:[
      {question:'What is a pointer in C++?',options:['A variable that points to the next function to call','A variable that stores the memory address of another variable','A reference to a class','A function parameter keyword'],correct:1,explanation:'A pointer stores the memory address of another variable. int* p = &x stores the address of x. *p dereferences the pointer to access the value at that address.'},
      {question:'What is the difference between new and malloc()?',options:['No difference','new calls constructors and throws exceptions; malloc() just allocates raw memory and returns nullptr on failure','malloc() is for arrays only','new is slower'],correct:1,explanation:'new allocates memory AND calls the constructor for objects, throwing std::bad_alloc on failure. malloc() only allocates raw memory bytes and returns nullptr on failure — no constructors called.'},
      {question:'What is a memory leak?',options:['When memory runs out on the system','When heap-allocated memory is never freed, accumulating over time and wasting resources','When a pointer is set to null','When a stack overflow occurs'],correct:1,explanation:'A memory leak occurs when memory is allocated with new but never deallocated with delete. Modern C++ uses RAII and smart pointers (unique_ptr, shared_ptr) to prevent leaks automatically.'},
      {question:'What does a destructor do?',options:['Prevents an object from being created','Automatically runs when an object goes out of scope, used to release resources like memory or file handles','Deletes a class definition','Reverses the constructor\'s actions'],correct:1,explanation:'The destructor (~ClassName()) is called automatically when an object is destroyed. It\'s used to release resources. This is the foundation of RAII (Resource Acquisition Is Initialization).'},
      {question:'What is a reference in C++ vs a pointer?',options:['They are identical','A reference is an alias for an existing variable — it must be initialized and cannot be null or reassigned to refer to something else','References are slower than pointers','Pointers are compile-time only'],correct:1,explanation:'References (int& ref = x) must be initialized at declaration and always refer to the same object. They cannot be null. Pointers are more flexible but more dangerous.'},
      {question:'What does "virtual" do in C++?',options:['Makes a function run in a virtual machine','Enables runtime polymorphism — the correct overridden function is called based on the actual object type, not the pointer type','Makes a function private','Creates a copy of the function for each derived class'],correct:1,explanation:'virtual enables dynamic dispatch. Without it, calling a method through a base class pointer calls the base implementation. With virtual, the derived class override is called.'},
      {question:'What is a template in C++?',options:['A pre-written class you can copy','A compile-time generic mechanism to write type-independent code — the compiler generates a specific version for each type used','A runtime code generator','A design pattern'],correct:1,explanation:'Templates are C++\'s generics. template<typename T> lets you write code once and the compiler instantiates it for each type. This is how std::vector<int>, std::vector<string>, etc., are generated.'},
      {question:'What does std::unique_ptr do?',options:['Creates a unique integer identifier','A smart pointer with exclusive ownership — it automatically deletes the managed object when it goes out of scope','A thread-safe pointer','A pointer that can be shared'],correct:1,explanation:'unique_ptr enforces single ownership. When the unique_ptr goes out of scope, delete is automatically called. It cannot be copied (only moved), preventing double-free bugs.'},
      {question:'What is the STL?',options:['Standard Template Language','Standard Template Library — C++\'s collection of generic data structures (vector, map, set) and algorithms (sort, find)','A threading library','A graphics framework'],correct:1,explanation:'The Standard Template Library provides containers (vector, list, map, set, unordered_map), algorithms (sort, find, transform), and iterators — the foundation of modern C++ programming.'},
      {question:'What is the difference between stack and heap memory?',options:['No difference in modern C++','Stack memory is automatically managed with fast allocation/deallocation but limited size; heap memory is manually managed with unlimited size but slower allocation','Heap is for fixed-size arrays only','Stack is for objects, heap is for primitives'],correct:1,explanation:'Stack: automatic, fast, limited size (typically MBs), LIFO allocation. Heap: manual (or via smart pointers), larger, but slower allocation and potential fragmentation.'},
    ],
  },
];

/* ── RENDER GRIDS ── */
function diffClass(d) { return d==='Beginner'?'diff-b':d==='Intermediate'?'diff-i':'diff-a'; }

function renderHomeGrid() {
  document.getElementById('home-quiz-grid').innerHTML = QUIZZES.map(q => `
    <div class="quiz-card" onclick="startQuiz('${q.id}')">
      <div class="qc-icon-sm" style="color:${q.color}">${q.icon}</div>
      <div class="qc-lang">${q.language}</div>
      <div class="diff-badge ${diffClass(q.difficulty)}">${q.difficulty}</div>
      <div class="qc-footer" style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(220,20,60,.1)">
        <span class="qc-count">${q.questions.length} questions</span>
        <span class="qc-arrow">→</span>
      </div>
    </div>`).join('');
}

function renderHubGrid() {
  document.getElementById('hub-quiz-grid').innerHTML = QUIZZES.map(q => `
    <div class="quiz-card" style="display:flex;flex-direction:column" onclick="startQuiz('${q.id}')">
      <div class="qc-icon-box" style="color:${q.color}">${q.icon}</div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px">
        <div class="qc-lang-lg">${q.language}</div>
        <div class="diff-badge ${diffClass(q.difficulty)}">${q.difficulty}</div>
      </div>
      <p class="qc-desc">${q.description}</p>
      <div class="qc-footer">
        <span class="qc-count">${q.questions.length} questions</span>
        <span class="qc-start">Start →</span>
      </div>
    </div>`).join('');
}

function renderFooter() {
  document.getElementById('footer-col-1').innerHTML = QUIZZES.slice(0,5).map(q =>
    `<li><button onclick="startQuiz('${q.id}')">${q.language}</button></li>`).join('');
  document.getElementById('footer-col-2').innerHTML = QUIZZES.slice(5).map(q =>
    `<li><button onclick="startQuiz('${q.id}')">${q.language}</button></li>`).join('');
}

renderHomeGrid();
renderHubGrid();
renderFooter();

/* ═══════════════════════════════════════
   QUIZ ENGINE
═══════════════════════════════════════ */
let AQ = null;   // active quiz
let AQI = 0;     // current question index
let ASEL = null; // selected option
let ACONF = false;
let AANS = [];   // answers array

function startQuiz(id) {
  AQ = QUIZZES.find(q => q.id === id);
  if (!AQ) return;
  AQI = 0; ASEL = null; ACONF = false;
  AANS = new Array(AQ.questions.length).fill(null);
  showPage('quiz');
  renderQ();
}

function renderQ() {
  const q = AQ.questions[AQI];
  const total = AQ.questions.length;

  // Progress
  document.getElementById('q-progress-fill').style.width = ((AQI / total) * 100) + '%';
  document.getElementById('q-progress-lbl').textContent = (AQI + 1) + ' / ' + total;
  document.getElementById('q-lang-nav').textContent = AQ.language;
  document.getElementById('q-num').textContent = 'Question ' + (AQI + 1);
  document.getElementById('q-lang-tag').textContent = AQ.language;
  document.getElementById('q-text').textContent = q.question;

  // Code block
  const cb = document.getElementById('q-code-block');
  if (q.code) {
    cb.classList.remove('hidden');
    document.getElementById('q-code-lang').textContent = AQ.language.toLowerCase();
    document.getElementById('q-code-pre').textContent = q.code;
  } else {
    cb.classList.add('hidden');
  }

  // Options
  ASEL = null; ACONF = false;
  document.getElementById('q-options').innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" id="opt${i}" onclick="selectOpt(${i})">
      <span class="opt-letter">${String.fromCharCode(65+i)}</span>
      <span class="opt-text">${opt}</span>
      <span class="opt-icon" id="opticon${i}"></span>
    </button>`).join('');

  const bc = document.getElementById('btn-confirm');
  bc.className = 'btn-confirm wait'; bc.textContent = 'Confirm Answer'; bc.style.display = '';
  const bn = document.getElementById('btn-next');
  bn.style.display = 'none';
  const eb = document.getElementById('expl-box');
  eb.style.display = 'none';

  renderDots();
}

function renderDots() {
  document.getElementById('q-dots').innerHTML = AQ.questions.map((_, i) => {
    let cls = 'qdot';
    if (i === AQI) cls += ' current';
    else if (AANS[i] !== null)
      cls += AANS[i] === AQ.questions[i].correct ? ' correct-d' : ' wrong-d';
    return `<div class="${cls}"></div>`;
  }).join('');
}

function selectOpt(idx) {
  if (ACONF) return;
  ASEL = idx;
  for (let i = 0; i < AQ.questions[AQI].options.length; i++) {
    const el = document.getElementById('opt' + i);
    if (el) el.className = 'quiz-option' + (i === idx ? ' selected' : '');
  }
  document.getElementById('btn-confirm').className = 'btn-confirm ready';
}

function confirmAns() {
  if (ASEL === null || ACONF) return;
  ACONF = true;
  const q = AQ.questions[AQI];
  AANS[AQI] = ASEL;
  const ok = ASEL === q.correct;

  for (let i = 0; i < q.options.length; i++) {
    const el = document.getElementById('opt' + i);
    const ic = document.getElementById('opticon' + i);
    if (!el) continue;
    if (i === q.correct) { el.className = 'quiz-option correct'; ic.textContent = '✓'; }
    else if (i === ASEL && !ok) { el.className = 'quiz-option wrong'; ic.textContent = '✗'; }
    else { el.className = 'quiz-option faded'; }
  }

  const eb = document.getElementById('expl-box');
  eb.className = 'expl-box ' + (ok ? 'correct' : 'wrong');
  eb.style.display = 'block';
  document.getElementById('expl-icon').textContent = ok ? '✓' : '✗';
  const el2 = document.getElementById('expl-label');
  el2.className = 'expl-label ' + (ok ? 'correct' : 'wrong');
  el2.textContent = ok ? 'Correct!' : 'Not quite.';
  document.getElementById('expl-text').textContent = q.explanation;

  document.getElementById('q-progress-fill').style.width = (((AQI+1)/AQ.questions.length)*100)+'%';
  document.getElementById('btn-confirm').style.display = 'none';
  const bn = document.getElementById('btn-next');
  bn.style.display = '';
  bn.textContent = AQI < AQ.questions.length - 1 ? 'Next Question →' : 'See Results 🏆';
  renderDots();
}

function nextQ() {
  if (AQI < AQ.questions.length - 1) { AQI++; renderQ(); }
  else { showResults(); }
}

function restartQuiz() { if (AQ) startQuiz(AQ.id); }

/* ── RESULTS ── */
function showResults() {
  showPage('results');
  const total = AQ.questions.length;
  const score = AANS.filter((a,i) => a === AQ.questions[i].correct).length;
  const pct = Math.round((score/total)*100);
  const [label, cls] = pct>=90?['Master','g-master']:pct>=70?['Proficient','g-prof']:pct>=50?['Developing','g-dev']:['Needs Practice','g-needs'];

  document.getElementById('r-score').textContent = pct + '%';
  document.getElementById('r-score').className = 'results-score ' + cls;
  document.getElementById('r-grade').textContent = label;
  document.getElementById('r-grade').className = 'results-grade ' + cls;
  document.getElementById('r-sub').textContent =
    'You scored ' + score + ' out of ' + total + ' on the ' + AQ.language + ' quiz.';

  document.getElementById('r-review').innerHTML = AQ.questions.map((q, i) => {
    const ua = AANS[i];
    const ok = ua === q.correct;
    return `<div class="review-item ${ok?'ri-correct':'ri-wrong'}">
      <div class="ri-inner">
        <div class="ri-icon">${ok?'✓':'✗'}</div>
        <div style="flex:1">
          <div class="ri-num">Question ${i+1}</div>
          <div class="ri-q">${q.question}</div>
          ${!ok?`<div class="ri-wrong-ans">Your answer: ${ua!==null?q.options[ua]:'Not answered'}</div>
          <div class="ri-correct-ans">Correct: ${q.options[q.correct]}</div>`:''}
          <div class="ri-expl">${q.explanation}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ── FORMS ── */
function submitSchool() {
  const n = document.getElementById('school-name').value.trim();
  const e = document.getElementById('school-email').value.trim();
  if (!n || !e) return;
  document.getElementById('school-form').style.display = 'none';
  document.getElementById('school-success').style.display = 'block';
}

function submitEnroll(ev) {
  ev.preventDefault();
  const e = document.getElementById('enroll-email').value.trim();
  if (!e) return;
  ev.target.style.display = 'none';
  document.getElementById('enroll-success').classList.remove('hidden');
}

/* ═══════════════════════════════════════
   PLAYGROUND / CODE TERMINAL
═══════════════════════════════════════ */
const RUNTIMES = [
  { id:'python',     label:'Python',     language:'python',     version:'3.10.0', ext:'py',   starter:`# Python Playground — Reaper Education\n# Edit this code and press Run\n\ndef greet(name: str) -> str:\n    return f"Hello, {name}! Welcome to Reaper Education."\n\nnames = ["Alice", "Bob", "Charlie"]\n\nfor name in names:\n    print(greet(name))\n\n# Try: list comprehension\nsquares = [x**2 for x in range(1, 11)]\nprint(f"\\nSquares 1-10: {squares}")\n\n# Try: dictionary\nscores = {"Alice": 95, "Bob": 87, "Charlie": 92}\ntop = max(scores, key=scores.get)\nprint(f"Top scorer: {top} with {scores[top]}%")` },
  { id:'javascript', label:'JavaScript', language:'javascript', version:'18.15.0',ext:'js',   starter:`// JavaScript Playground — Reaper Education\n// Edit this code and press Run\n\n// Arrow functions and closures\nconst makeCounter = (start = 0) => {\n  let count = start;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    value: () => count,\n  };\n};\n\nconst counter = makeCounter(10);\nconsole.log("Counter:", counter.increment(), counter.increment(), counter.value());\n\n// Array methods\nconst students = [\n  { name: "Alice", score: 95 },\n  { name: "Bob", score: 72 },\n  { name: "Charlie", score: 88 },\n];\n\nconst passing = students\n  .filter(s => s.score >= 80)\n  .map(s => \`\${s.name}: \${s.score}%\`)\n  .join(", ");\n\nconsole.log("Passing students:", passing);\n\n// Async/await with Promise\nconst delay = ms => new Promise(resolve => setTimeout(resolve, ms));\nasync function fetchData() {\n  await delay(10);\n  return { status: "ok", data: [1, 2, 3] };\n}\nfetchData().then(result => console.log("Fetched:", JSON.stringify(result)));` },
  { id:'typescript', label:'TypeScript', language:'typescript', version:'5.0.3',  ext:'ts',   starter:`// TypeScript Playground — Reaper Education\n\ninterface Student {\n  name: string;\n  scores: number[];\n}\n\nfunction average(nums: number[]): number {\n  return nums.reduce((a, b) => a + b, 0) / nums.length;\n}\n\nfunction grade(avg: number): string {\n  if (avg >= 90) return "A";\n  if (avg >= 80) return "B";\n  if (avg >= 70) return "C";\n  return "F";\n}\n\nconst students: Student[] = [\n  { name: "Alice", scores: [92, 95, 88, 97] },\n  { name: "Bob", scores: [75, 68, 80, 72] },\n  { name: "Charlie", scores: [85, 90, 88, 92] },\n];\n\nstudents.forEach(student => {\n  const avg = average(student.scores);\n  console.log(\`\${student.name}: avg=\${avg.toFixed(1)} grade=\${grade(avg)}\`);\n});\n\nfunction first<T>(arr: T[]): T | undefined { return arr[0]; }\nconsole.log("First student:", first(students)?.name);` },
  { id:'java',       label:'Java',       language:'java',       version:'15.0.2', ext:'java', starter:`// Java Playground — Reaper Education\nimport java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    static class Stack<T> {\n        private List<T> data = new ArrayList<>();\n        public void push(T item) { data.add(item); }\n        public T pop() {\n            if (data.isEmpty()) throw new RuntimeException("Stack underflow");\n            return data.remove(data.size() - 1);\n        }\n        public int size() { return data.size(); }\n        public boolean isEmpty() { return data.isEmpty(); }\n    }\n\n    public static void main(String[] args) {\n        Stack<Integer> stack = new Stack<>();\n        for (int i = 1; i <= 5; i++) stack.push(i * 10);\n        System.out.print("Popped: ");\n        while (!stack.isEmpty()) System.out.print(stack.pop() + " ");\n        System.out.println();\n\n        List<String> words = Arrays.asList("reaper", "education", "code", "forge", "learn");\n        String result = words.stream()\n            .filter(w -> w.length() > 4)\n            .map(String::toUpperCase)\n            .collect(Collectors.joining(", "));\n        System.out.println("Long words: " + result);\n\n        List<Integer> nums = Arrays.asList(5, 2, 8, 1, 9, 3);\n        nums.sort(Comparator.reverseOrder());\n        System.out.println("Sorted desc: " + nums);\n    }\n}` },
  { id:'cpp',        label:'C++',        language:'c++',        version:'10.2.0', ext:'cpp',  starter:`// C++ Playground — Reaper Education\n#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <map>\nusing namespace std;\n\ntemplate<typename T>\nT sum(vector<T>& v) {\n    T total = T{};\n    for (auto& x : v) total += x;\n    return total;\n}\n\nclass Timer {\n    string name;\npublic:\n    Timer(string n) : name(n) { cout << "[" << name << "] started" << endl; }\n    ~Timer() { cout << "[" << name << "] finished" << endl; }\n};\n\nint main() {\n    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6};\n    cout << "Sum: " << sum(nums) << endl;\n    sort(nums.begin(), nums.end());\n    cout << "Sorted: ";\n    for (int n : nums) cout << n << " ";\n    cout << endl;\n    map<string, int> scores = {{"Alice", 95}, {"Bob", 87}, {"Charlie", 92}};\n    auto best = max_element(scores.begin(), scores.end(),\n        [](auto& a, auto& b){ return a.second < b.second; });\n    cout << "Top: " << best->first << " (" << best->second << ")" << endl;\n    { Timer t("block"); }\n    return 0;\n}` },
  { id:'go',         label:'Go',         language:'go',         version:'1.16.2', ext:'go',   starter:`// Go Playground — Reaper Education\npackage main\n\nimport (\n\t"fmt"\n\t"strings"\n\t"sort"\n)\n\ntype Shape interface {\n\tArea() float64\n\tName() string\n}\n\ntype Circle struct{ Radius float64 }\ntype Rectangle struct{ Width, Height float64 }\n\nfunc (c Circle) Area() float64    { return 3.14159 * c.Radius * c.Radius }\nfunc (c Circle) Name() string     { return "Circle" }\nfunc (r Rectangle) Area() float64 { return r.Width * r.Height }\nfunc (r Rectangle) Name() string  { return "Rectangle" }\n\nfunc worker(id int, results chan<- string) {\n\tresults <- fmt.Sprintf("worker %d done", id)\n}\n\nfunc main() {\n\tshapes := []Shape{Circle{5}, Rectangle{4, 6}, Circle{3}}\n\tfor _, s := range shapes {\n\t\tfmt.Printf("%s area: %.2f\\n", s.Name(), s.Area())\n\t}\n\n\tresults := make(chan string, 3)\n\tfor i := 1; i <= 3; i++ { go worker(i, results) }\n\tmsgs := make([]string, 3)\n\tfor i := range msgs { msgs[i] = <-results }\n\tsort.Strings(msgs)\n\tfmt.Println("\\n" + strings.Join(msgs, "\\n"))\n}` },
  { id:'rust',       label:'Rust',       language:'rust',       version:'1.68.2', ext:'rs',   starter:`// Rust Playground — Reaper Education\nuse std::collections::HashMap;\n\n#[derive(Debug)]\nenum Shape {\n    Circle(f64),\n    Rectangle(f64, f64),\n    Triangle(f64, f64, f64),\n}\n\nimpl Shape {\n    fn area(&self) -> f64 {\n        match self {\n            Shape::Circle(r) => std::f64::consts::PI * r * r,\n            Shape::Rectangle(w, h) => w * h,\n            Shape::Triangle(a, b, c) => {\n                let s = (a + b + c) / 2.0;\n                (s * (s-a) * (s-b) * (s-c)).sqrt()\n            }\n        }\n    }\n}\n\nfn main() {\n    let shapes = vec![Shape::Circle(5.0), Shape::Rectangle(4.0,6.0), Shape::Triangle(3.0,4.0,5.0)];\n    for shape in &shapes { println!("{:?} => area: {:.2}", shape, shape.area()); }\n\n    let words = vec!["reaper", "education", "code", "forge"];\n    let long: Vec<&str> = words.iter().filter(|&&w| w.len() > 4).copied().collect();\n    println!("\\nLong words: {:?}", long);\n\n    let mut scores: HashMap<&str, u32> = HashMap::new();\n    scores.insert("Alice", 95); scores.insert("Bob", 87); scores.insert("Charlie", 92);\n    if let Some((&top, &score)) = scores.iter().max_by_key(|(_,&v)| v) {\n        println!("Top scorer: {} with {}%", top, score);\n    }\n}` },
  { id:'c',          label:'C',          language:'c',          version:'10.2.0', ext:'c',    starter:`// C Playground — Reaper Education\n#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\ntypedef struct Node { int value; struct Node* next; } Node;\n\nNode* push(Node* head, int val) {\n    Node* node = malloc(sizeof(Node));\n    node->value = val; node->next = head;\n    return node;\n}\n\nvoid print_list(Node* head) {\n    printf("[");\n    while (head) { printf("%d", head->value); if (head->next) printf(", "); head = head->next; }\n    printf("]\\n");\n}\n\nvoid bubble_sort(int arr[], int n) {\n    for (int i=0;i<n-1;i++)\n        for (int j=0;j<n-i-1;j++)\n            if (arr[j]>arr[j+1]) { int t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t; }\n}\n\nint main() {\n    Node* list = NULL;\n    for (int i=1;i<=5;i++) list = push(list, i*10);\n    printf("Linked list: "); print_list(list);\n\n    int arr[] = {64,34,25,12,22,11,90};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    bubble_sort(arr, n);\n    printf("Sorted: ");\n    for (int i=0;i<n;i++) printf("%d ", arr[i]);\n    printf("\\n");\n\n    char msg[] = "reaper education";\n    printf("Length of '%s': %zu\\n", msg, strlen(msg));\n    return 0;\n}` },
  { id:'bash',       label:'Bash',       language:'bash',       version:'5.2.0',  ext:'sh',   starter:`#!/bin/bash\n# Bash Playground — Reaper Education\n\necho "=== Reaper Education Bash Demo ==="\n\nlanguages=("Python" "JavaScript" "TypeScript" "Go" "Rust" "C++")\necho "Languages we teach:"\nfor lang in "\${languages[@]}"; do echo "  - $lang"; done\n\ngreet() { local name=$1; local level=$2; echo "Welcome $name! Your level: $level"; }\ngreet "Alice" "Advanced"\ngreet "Bob" "Beginner"\n\ntext="Reaper Education"\necho "\\nOriginal: $text"\necho "Upper: \${text^^}"\necho "Length: \${#text}"\n\nfor i in {1..5}; do echo "2^$i = $((2**i))"; done\n\nscore=87\nif [ $score -ge 90 ]; then echo "Grade: A"\nelif [ $score -ge 80 ]; then echo "Grade: B"\nelse echo "Grade: C"\nfi` },
  { id:'ruby',       label:'Ruby',       language:'ruby',       version:'3.0.1',  ext:'rb',   starter:`# Ruby Playground — Reaper Education\n\nputs "Squares:"\n(1..5).map { |n| n**2 }.each { |n| puts "  #{n}" }\n\nmodule Greetable\n  def greet\n    "Hello, I'm #{name} (#{role})"\n  end\nend\n\nclass Student\n  include Greetable\n  attr_reader :name, :role, :scores\n  def initialize(name, scores)\n    @name = name; @role = "Student"; @scores = scores\n  end\n  def average; scores.sum.to_f / scores.length; end\n  def grade\n    avg = average\n    avg >= 90 ? "A" : avg >= 80 ? "B" : avg >= 70 ? "C" : "F"\n  end\nend\n\nstudents = [\n  Student.new("Alice", [92, 95, 88, 97]),\n  Student.new("Bob", [75, 68, 80, 72]),\n  Student.new("Charlie", [85, 90, 88, 92]),\n]\n\nputs "\\nStudent Report:"\nstudents.each { |s| puts "  #{s.greet} | avg=#{s.average.round(1)} | grade=#{s.grade}" }\ntop = students.max_by(&:average)\nputs "\\nTop student: #{top.name} (#{top.average.round(1)})"` },
  { id:'php',        label:'PHP',        language:'php',        version:'8.2.3',  ext:'php',  starter:`<?php\n// PHP Playground — Reaper Education\n\ninterface Scorable {\n    public function getScore(): float;\n    public function getGrade(): string;\n}\n\nclass Student implements Scorable {\n    public function __construct(\n        private string $name,\n        private array $scores\n    ) {}\n    public function getScore(): float { return array_sum($this->scores) / count($this->scores); }\n    public function getGrade(): string {\n        $avg = $this->getScore();\n        return match(true) {\n            $avg >= 90 => 'A', $avg >= 80 => 'B', $avg >= 70 => 'C', default => 'F',\n        };\n    }\n    public function getName(): string { return $this->name; }\n}\n\n$students = [\n    new Student("Alice", [92, 95, 88, 97]),\n    new Student("Bob", [75, 68, 80, 72]),\n    new Student("Charlie", [85, 90, 88, 92]),\n];\n\necho "Student Report:\\n";\nforeach ($students as $student) {\n    printf("  %s: %.1f (%s)\\n", $student->getName(), $student->getScore(), $student->getGrade());\n}\n\n$scores = array_map(fn($s) => $s->getScore(), $students);\necho sprintf("\\nClass average: %.1f\\n", array_sum($scores) / count($scores));\n$top = array_reduce($students, fn($c,$s) => $c===null||$s->getScore()>$c->getScore()?$s:$c);\necho "Top student: " . $top->getName() . "\\n";` },
];

let PGrt = RUNTIMES[0];
let PGrunning = false;

function pgInit() {
  // Build lang dropdown
  document.getElementById('lang-dd').innerHTML = RUNTIMES.map(rt =>
    `<button class="lang-opt ${rt.id===PGrt.id?'active':''}" onclick="pgSelectLang('${rt.id}')">${rt.label}</button>`
  ).join('');

  const ta = document.getElementById('editor-ta');
  ta.value = PGrt.starter;
  pgUpdateLines();

  ta.addEventListener('input', pgUpdateLines);
  ta.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = ta.selectionStart;
      ta.value = ta.value.substring(0,s) + '    ' + ta.value.substring(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = s + 4;
      pgUpdateLines();
    }
    if ((e.ctrlKey||e.metaKey) && e.key==='Enter') { e.preventDefault(); pgRun(); }
  });

  pgAddOut('info', 'Welcome to Reaper Code Terminal.');
  pgAddOut('info', 'Select a language, write your code, and press Run.');
  pgSetLangUI();
}

function pgUpdateLines() {
  const ta = document.getElementById('editor-ta');
  const n = ta.value.split('\n').length;
  document.getElementById('line-nums').innerHTML = Array.from({length:n},(_,i)=>`<div>${i+1}</div>`).join('');
}

function pgSetLangUI() {
  document.getElementById('lang-btn-label').textContent = PGrt.label;
  document.getElementById('editor-filename').textContent = 'main.' + PGrt.ext;
  document.getElementById('pg-runtime-lbl').textContent = PGrt.label + ' ' + PGrt.version;
}

function toggleLangDD() { document.getElementById('lang-dd').classList.toggle('open'); }

document.addEventListener('click', e => {
  const btn = document.getElementById('lang-btn');
  const dd  = document.getElementById('lang-dd');
  if (btn && dd && !btn.contains(e.target) && !dd.contains(e.target))
    dd.classList.remove('open');
});

function pgSelectLang(id) {
  PGrt = RUNTIMES.find(r => r.id===id);
  pgSetLangUI();
  document.getElementById('editor-ta').value = PGrt.starter;
  pgUpdateLines();
  document.getElementById('lang-dd').classList.remove('open');
  document.querySelectorAll('.lang-opt').forEach(el => el.classList.toggle('active', el.textContent===PGrt.label));
  document.getElementById('output-body').innerHTML = '';
  pgAddOut('info', 'Switched to ' + PGrt.label + ' ' + PGrt.version);
  pgAddOut('info', 'Starter code loaded. Press Run to execute.');
}

function pgAddOut(type, text) {
  const body = document.getElementById('output-body');
  const div = document.createElement('div');
  div.className = 'out out-' + type;
  div.textContent = text === '' ? '\u00A0' : (text || '\u00A0');
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function pgClearOutput() {
  document.getElementById('output-body').innerHTML = '';
  pgAddOut('info', 'Output cleared.');
}

function pgCopy() {
  const code = document.getElementById('editor-ta').value;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('.pg-icon-btn[onclick="pgCopy()"]');
    const prev = btn.textContent; btn.textContent = '✓';
    setTimeout(() => btn.textContent = prev, 2000);
  });
}

function pgReset() {
  document.getElementById('editor-ta').value = PGrt.starter;
  pgUpdateLines();
}

async function pgRun() {
  if (PGrunning) return;
  const code = document.getElementById('editor-ta').value.trim();
  if (!code) return;
  PGrunning = true;
  const runBtn = document.getElementById('btn-run');
  runBtn.disabled = true; runBtn.textContent = '⏳ Running';

  pgAddOut('info', '');
  pgAddOut('info', '$ run ' + PGrt.label);
  pgAddOut('info', 'Executing...');

  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: PGrt.language,
        version: PGrt.version,
        files: [{ name: 'main.' + PGrt.ext, content: code }],
      }),
    });
    if (!res.ok) throw new Error('API error: ' + res.status);
    const data = await res.json();

    if (data.compile?.stderr)
      data.compile.stderr.split('\n').filter(Boolean).forEach(l => pgAddOut('stderr', l));

    if (data.run?.stdout)
      data.run.stdout.split('\n').forEach(l => pgAddOut('stdout', l));

    if (data.run?.stderr)
      data.run.stderr.split('\n').filter(Boolean).forEach(l => pgAddOut('stderr', l));

    const ec = data.run?.code ?? 0;
    pgAddOut(ec===0?'info':'error', 'Process exited with code ' + ec);

  } catch (err) {
    pgAddOut('error', 'Error: ' + err.message);
    pgAddOut('info', 'Check your connection and try again.');
  } finally {
    PGrunning = false;
    runBtn.disabled = false; runBtn.textContent = '▶ Run';
  }
}

pgInit();

/* ── TERMINAL SUBDOMAIN AUTO-ROUTE ── */
if (location.hostname === TERM_DOMAIN) {
  showPage('playground');
}
