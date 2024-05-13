import React from "react";

const MyPortfolioPage = () => {
  return (
    <article className="md:px-24 px-5 md:my-20 my-10 text-secondary">
      <div className="border lg:p-8 p-2 mb-3">
        <div className="flex items-center flex-col gap-10 leading-7">
          <img className="md:w-[40rem] w-full" src="https://i.postimg.cc/15ttMB4w/profile.jpg" alt="" />
          <div>
            <h1 className="text-4xl font-bold">Hi! My name is Labib Ahmed </h1>
            <h2 className="py-2 text-2xl font-semibold">
              <span className=" text-xl"> My E-mail :-</span>
              <a
                className="hover:link"
                target="_blank"
                rel="noreferrer"
                href="https://mail.google.com/mail/u/0/#inbox?compose=new"
              >
                labib.ahmed.372@gmail.com
              </a>
            </h2>
            <h2 className="text-2xl font-semibold">
              <span className=" text-xl">Educational Background :-</span> I'm currently studying on
              Electronics & Communiation Engineering (ECE) at Institute Of Science & Technology (IST)
              Dhaka,Bangladesh.
            </h2>

            <section className="space-y-3 py-10">
              <h1 className="text-center py-3 text-3xl font-bold">Three of my last projects</h1>

              <h2 className="lg:text-2xl text-xl font-semibold">
                Cologne Perfume Shop -
                <a className="hover:link" href="https://cologne-perfume-auth-6e250.web.app/">
                  Link here
                </a>
              </h2>
              <h2 className="lg:text-2xl text-xl font-semibold">
                Talking Minds -
                <a className="hover:link" href="https://talkingminds-d1263.web.app/home">
                  Link here
                </a>
              </h2>
              <h2 className="lg:text-2xl text-xl font-semibold">
                The Shop Creative -
                <a className="hover:link" href="https://the-shop-creative.netlify.app/">
                  Link here
                </a>
              </h2>
            </section>

            <section>
              <h1 className="text-center py-3 text-3xl font-bold">List Of Technologies I Skilled</h1>
              <div className="flex flex-col">
                <label className="label font-semibold">HTML 5</label>
                <progress class="progress progress-primary" value="90" max="100"></progress>
                <label className="label font-semibold">CSS</label>
                <progress class="progress progress-primary" value="90" max="100"></progress>
                <label className="label font-semibold">Javascript</label>
                <progress class="progress progress-primary" value="85" max="100"></progress>
                <label className="label font-semibold">Tailwind CSS</label>
                <progress class="progress progress-primary" value="97" max="100"></progress>
                <label className="label font-semibold">Bootsrap 5</label>
                <progress class="progress progress-primary" value="85" max="100"></progress>
                <label className="label font-semibold">React</label>
                <progress class="progress progress-primary" value="90" max="100"></progress>
                <label className="label font-semibold">Firebae Authentication</label>
                <progress class="progress progress-primary" value="90" max="100"></progress>
                <label className="label font-semibold">Node Js</label>
                <progress class="progress progress-primary" value="70" max="100"></progress>
                <label className="label font-semibold">Express Js</label>
                <progress class="progress progress-primary" value="75" max="100"></progress>
                <label className="label font-semibold">MongoDB</label>
                <progress class="progress progress-primary" value="75" max="100"></progress>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyPortfolioPage;
