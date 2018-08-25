import React from "react";
import { Container, Row, Col } from "reactstrap";
// We'll import the stuff that we need up here. Have you ever used Bootstrap?
//A couple of time. I use the documentated stuff a lot
// Me too. We use Reactstrap, which is react components that link to Bootstrap.
// So, we'll use the components for container, Row, and column
// Now we can use those down in our component below.

// SO, not much here. Just a 'Hello world'.
// We should get this layed out first. Nothing too fancy, just
// a rough approximation of how the page will look.

// I'll actually leave most of that to you. However, there are
// a few things I want to point out first.a

// Data is being passed from the top component to this one. We can grab it in
// the arguments list of this function.a

// If you look at the '<Environment ...' line 84 on the other file, you'll see
// that a bunch of stuff, through the `{...this.props}` call is be  ing passed.
// You can look at that by doing a console.log. Like so:
// If you load up this component, you'll be able to see
// In your dev console all of the stuff being passed as props.

// Any questions so far? (I'm going to clean this up while you ask.)
//So i guess I don't fully understand whats happening on line 84. Is it passing or calling? or Neither
// Good question. So, when you have a <div></div> or whatever, that's a React component. It looks like an HTML tag, and behaves similarly
//Whatever is between the brackets is considered a 'child' of the parent component. So with <div><p>Hello</p></div>,
// <p> is a child of <div>, and 'Hello' is a child of <p>
// In React, if you have a component that starts with an upper-case letter, it is not a DOM element, like <div>
// It is a React component, which is a function.
// This 'Environment' function below is a React Component.
// Components take 'Props' as their arguments.
// Before I go any further, any questions?
//No, continue
// Props are a JavaScript object of all the attributes on the parent componet
// So, if i have a <Face /> component, I could give it a prop
// <Face emotion="happy" />
// Or a <Counter number={10} />

// Notice, I have to do some interesting things depending on the type of value
// I put in for the prop. Strings can just go in like in normal HTML. Any other type,
// Like arrays, or objects, or Numbers, or Booleans, have to be surrounded in brackets.
// So far so good? Mhm
// So, the `props` variable for the <Face></Face> component is {emotion: "Happy"}
// There's a bit of magic going on with the <Environment></Environment> component though
// It has <Environment {...this.props} decks={decks} />
// The decks part is easy enough to figure out. {decks:[(our list of decks)]}
// What about the {...this.props}?
// Well, that's just a bit of React magic that takes all of the stuff in `this.props` and
// "spreads" it out into the props of the child component
// That's what the `...` is called - the 'spread operator'
// So, if `this.props = {a:1,b:2}` then the props of our <Environment></Environment> component
// is {a:1,b:2,decks:[(our deck list)]}
// Make sense? And does that answer your question from line 20 (wow. 30 lines to answer a question :P)
//OK, yeah, makes sense. Continue
// Great.

// So, we've got our props. I'm just going to pull out the decks, because that's all we care about right now
// That just creates a variable called 'decks' from the 'props' variable above.

// We're going to need two thigns on this page
// 1) A deck selector
// 2) A place to change the environment.$

// We should lay that out using a grid system of some kind.
// Fortunately, I have a package for that. Lets scroll back up to the top

// Okay, lets throw those in. Do you want ot do the honors, or do you
// want to watch me do it?
//I would do it if I could remember what I was doing. Could you give me like 5 minutes?
// Go for it.
// https://reactstrap.github.io/
// That might help
//So just to help me out, where would I put the container. After the return?
// Yep. Replace the <div></div> with <Container></Container>
//Where would I add the prop type for fluid?
// Booleans are nice, since you can just add the prop for 'true' and leave
// the prop off for 'false'
// See what I did below?
//Yeah. I understand
// Now add the rows and columns
//Should I nest each one inside the container?
// Yep! Rows inside Containers, Cols inside Rows
// And use props to define the width
// Close. Your close tags are off. That's right.
// now you can add props for the column width
//How would I do that? I feel like I should know this
// It's all good. Watch.... I forgot how to do it too. One sec.

// Remember, you can look at other cards to see how they do it.
// That's a 3-column. I typically just default to doing 'sm' instead of 'md' or 'lg'.
//K, that looks right
//What next
// Lay out the entire card. Where will the deck selector go? How will the deck selector
// work? Will it be a dropdown menu? A scrolling list? Something else?

// What will the Environment control area look like? How will you see the different aspects
// of the environment? How will you adjust them?

// Do you know the answers to those questions yet?
//I drew it out like a couple months ago, let me go brush the dust off the drawing :D
// Great. Send me a message on discord when you have the page layed out. Remember, you can
// Make edits to this code. Any time you save it, if you have Thorium running,
// it will refresh the page with your changes.

// But you have to be on teh page. Let me see if you can get to the page yet.
// Go to the 'views/index.js' file Line 74

// Now, you can use the sidebar in the main Thorium welcome page to go to the 'Debug'
// page, where it will list all of the cards. You can pick 'Environment' from there.
//Everythings there. But Environment. Weird.
// Try shutting it down and starting it up again.
// If I don't respond to you, ping me on Discord. I'm multi-tasking right now.
const Environment = props => {
  const { decks } = props;
  console.log(props);
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>Hello World</Col>
      </Row>
    </Container>
  );
};
export default Environment;
