/**
 *
 * <div id="parent">
 *      <div id="child">
 *          <h1>Hello World</h1>
 *      </div>
 * </div>
 * 
 * ReactElement(Object) => HTML(Browser Understands)
 */

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", { id: "h1" }, "I am h1 tag"),
    React.createElement("h2", { id: "h2" }, "I am h2 tag"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", { id: "h1" }, "I am h1 tag"),
    React.createElement("h2", { id: "h2" }, "I am h2 tag"),
  ]),
]);

// const heading = React.createElement(
//   "h1",
//   {id: "heading"},
//   "Hello World from Namasthe React!!!!!!!!!"
// );

console.log(parent); //object
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
