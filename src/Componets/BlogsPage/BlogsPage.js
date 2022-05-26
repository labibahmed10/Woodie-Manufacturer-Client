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
          <img
            className="md:w-1/2"
            src="https://www.loginradius.com/blog/static/878d2cde053633bfea88a8bfcfc28e89/29007/image1.png"
            alt=""
          />
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
          <p className="text-xl text-justify">
            In React, the state is immutable. In simple terms it means that we should not modify it
            directly.React state is a plain JavaScript object that holds information that influences the
            output of a render.If we try to set Products = [...] like this and not setProducts([...]) like
            this it will not re-render the component.When state changes the component reponds by re-rendering
            and the updates can be possible by using setProducts() and it will not disturb the process of
            rendering.
          </p>
          <img className="md:w-1/2" src="https://daveceddia.com/images/useState-hook-twitter.png" alt="" />
        </div>
      </div>
      <div className="border p-4 mb-3">
        <h1 className="text-center py-4 text-3xl font-semibold md:md-0 mb-3">
          You have an array of products. Each product has a name, price, description, etc. How will you
          implement a search to find products by name?
        </h1>
        <div className="flex md:flex-row flex-col items-center gap-10 leading-7">
          <img
            className="md:w-1/3"
            src="https://velocitybytes.com/uploads/images/2021/07/image_750x_60f31070e6f3a.jpg"
            alt=""
          />
          <img className="lg:w-1/2 mx-auto" src="https://i.postimg.cc/mg9jKbJ3/ans-5.jpg" alt="" />
        </div>
      </div>
      <div className="border p-4 mb-3">
        <h1 className="text-center py-4 text-3xl font-semibold  md:md-0 mb-3">
          What is a unit test? Why should write unit tests?
        </h1>
        <div className="flex md:flex-row flex-col items-center gap-10 leading-7">
          <img
            className="md:w-1/2"
            src="https://blog.autify.com/static/84ac8b56a04924ac3a0f6a5dd94b3df3/3b2f8/unit-testing-life-cycle.png"
            alt=""
          />

          <p className="text-xl text-justify">
            Unit testing is an important process of web developement.While building large application
            developers isolate some written codes to test whether they running perfectly or not.It is
            important because after making the whole application and if any error occurs it will difficult to
            find those bugs and may waste time.Also unit testing ensures that all code meets quality standards
            before it's being published.
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogsPage;
