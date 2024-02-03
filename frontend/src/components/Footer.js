import React from 'react'
import './Index.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div>
      <section class="contact-area mt-5" id="contact">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="contact-content text-center">
                {/* <a href="#">
                  <img src="https://i.ibb.co/QDy827D/ak-logo.png" alt="logo" />
                </a> */}
                {/* <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum{' '}
                </p> */}
                <div class="hr"></div>
                <h6>Srinagar, Jammu and Kashmir (JK)</h6>
                <h6>
                  +91 78895 26854<span>|</span>zahidgul107@gmail.com
                </h6>
                <div class="contact-social">
                  <ul>
                    <li>
                      <a
                        class="hover-target"
                        href="https://www.linkedin.com/in/zahid-gul-9056671b2/"
                      >
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        class="hover-target"
                        href="https://github.com/zahidgul107"
                      >
                        <i class="fab fa-github"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        class="hover-target"
                        href="https://www.instagram.com/zahidgul107/"
                      >
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                    {/* <li>
                      <a class="hover-target" href="">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a class="hover-target" href="">
                        <i class="fab fa-pinterest-p"></i>
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        {/* <p>
          Copyright &copy; 2024{' '}
          <img src="https://i.ibb.co/QDy827D/ak-logo.png" alt="logo" /> All
          Rights Reserved.
        </p> */}
        <p>
          &copy; <span>Copyright</span>{' '}
          <strong className="px-1">{currentYear}</strong>{' '}
          <span>All Rights Reserved</span>
        </p>
        <p className="credits">
          Made with ❤️ by{' '}
          <a
            href="https://portfolio-zahidgul107.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="decoration"
          >
            Zahid Gul
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Footer
