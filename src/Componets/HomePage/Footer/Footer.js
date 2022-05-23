import React from "react";
import logo from "../../../images/logo.png";
const Footer = () => {
  return (
    <footer className="lg:p-10 px-5 bg-neutral">
      <div className="flex justify-between items-center md:flex-row flex-col lg:px-20 mb-5">
        <img className="w-48" src={logo} alt="" />
        <div>
          <span className="footer-title">Newsletter</span>
          <div className="form-control lg:w-[28rem] w-[21rem]">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="relative">
              <input type="text" placeholder="your@email.com" className="input input-bordered w-full pr-16" />
              <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer lg:place-items-center  text-lg font-semibold lg:pb-0 pb-5">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
          <a className="link link-hover">Jobs</a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-5">
            <img className="w-10" src="https://i.ibb.co/88MxT7N/Vector.png" alt="" />
            <img className="w-10" src="https://i.ibb.co/VQh9C0q/Vector-1.png" alt="" />
            <img className="w-10" src="https://i.ibb.co/KGfV8bX/Vector-2.png" alt="" />
            <img className="w-10" src="https://i.ibb.co/NST26Y0/Vector-3.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
