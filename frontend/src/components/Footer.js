import React from 'react'
import './Index.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div>
      <section className="contact-area mt-5" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="contact-content text-center">
                <div className="hr"></div>
                <h6>Srinagar, Jammu and Kashmir (JK)</h6>
                <h6>
                  +91 78895 26854<span>|</span>zahidgul107@gmail.com
                </h6>
                <div className="contact-social">
                  <ul>
                    <li>
                      <a
                        className="hover-target"
                        href="https://www.linkedin.com/in/zahid-gul-9056671b2/"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="hover-target"
                        href="https://github.com/zahidgul107"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="hover-target"
                        href="https://www.instagram.com/zahidgul107/"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
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
