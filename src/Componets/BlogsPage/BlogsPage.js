import React from "react";

const BlogsPage = () => {
  return (
    <article className="md:px-28 px-5 md:my-20 my-10 text-secondary">
      <div className="border p-4 mb-3">
        <h1 className="text-center py-4 text-3xl font-semibold md:md-0 mb-3">
          How will you improve the performance of a React Application?
        </h1>
        <div className="flex md:flex-row flex-col items-center gap-10 leading-7">
          <img
            className="md:w-1/2 "
            src="https://www.techlifediary.com/wp-content/uploads/2020/06/react-js.png"
            alt=""
          />
          <p>
            There are many ways to improve the performance of a react application.we have to make sure the
            components recieve only necessary props which will control the CPU consumption and avoid over
            rendering.Sometimes excessive CSS animation might make the application slower so have to work on
            that way.We have to use optimized images means lesser in size images cause this will help load the
            application faster.While using useEffect and others we must have to use proper dependencies and
            that will help the appliation run faster.
          </p>
        </div>
      </div>
      <div className="border p-4 mb-3">
        <h1 className="text-center py-4 text-3xl font-semibold  md:md-0 mb-3">
          What are the different ways to manage a state in a React application?
        </h1>
        <div className="flex md:flex-row flex-col items-center gap-10 leading-7">
          <img
            className="md:w-1/2"
            src="https://www.loginradius.com/blog/static/878d2cde053633bfea88a8bfcfc28e89/29007/image1.png"
            alt=""
          />

          <p className="text-xl text-justify">
            There are four main types of state that we need to manaage in our react application.They are --
            <br />
            <span className="font-semibold">1. Local State - </span>Local State is data we manage in one or
            another component and it is mostly used to manage using useState hook. <br />
            <span className="font-semibold">2. Global state - </span>Global state is data we manage across
            multiple components. <br />
            <span className="font-semibold">3. Server state - </span>Data that comes from an external server
            that must be integrated with our UI state. <br />
            <span className="font-semibold">4. URL state - </span>Data that exists on our URLs, including the
            pathname and query parameters. <br />
          </p>
        </div>
      </div>
      <div className="border p-4 mb-3">
        <h1 className="text-center py-4 text-3xl font-semibold md:md-0 mb-3">
          How does prototypical inheritance work?
        </h1>
        <div className="flex md:flex-row flex-col items-center gap-10 leading-7">
          <img
            className="md:w-1/2 "
            src="https://www.javascripttutorial.net/wp-content/uploads/2022/01/JavaScript-prototypal-inheritance-inherits-from-Object.svg"
            alt=""
          />
          <p>
            The prototypical inheritace in JS is a feature used to add methods and properties in objects.In
            this method an object can inherit the properties and methods of another obect.We use a javascript
            prototype to add new properties and methods to and existing object constructor.JavaScript is the
            most common of the prototype-capable languages, and its capabilities are relatively unique. When
            used appropriately, prototypical inheritance in JavaScript is a powerful tool that can save hours
            of coding.
          </p>
        </div>
      </div>
      <div className="border p-4 mb-3">
        <h1 className="text-center py-4 text-3xl font-semibold  md:md-0 mb-3">
          Why you do not set the state directly in React. For example, if you have const [products,
          setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts?
        </h1>
        <div className="flex md:flex-row flex-col items-center gap-10 leading-7">
          <img className="md:w-1/2" src="https://daveceddia.com/images/useState-hook-twitter.png" alt="" />

          <p className="text-xl text-justify">
            In React, the state is immutable. In simple terms it means that we should not modify it
            directly.React state is a plain JavaScript object that holds information that influences the
            output of a render.If we try to set Products = [...] like this and not setProducts([...]) like
            this it will not re-render the component.When state changes the component reponds by re-rendering
            and the updates can be possible by using setProducts() and it will not disturb the process of
            rendering.
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogsPage;
