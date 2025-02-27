import "../app/globals.css";

export default function Footer() {
  return (
    <div>
      <footer id="footer__wrapper">
        <div id="footer__wrapper__desc">
          <p className="copyright">
            갤러리 웹사이트는 상업적 목적이 전혀 없습니다.
          </p>
          <p className="copyright">
            The gallery website has no commercial purpose at all.
          </p>
          <p className="copyright">
            Copyright 2025. The copyright of the prohibition of unauthorized
            reproduction of photographs is in Live of Fix.
          </p>
          <div id="footer__link">
            <p>
              <a href="https://frontdevpark.tistory.com/">Blog </a>
            </p>
            <p id="bar">|</p>
            <p>
              <a href="https://github.com/bp4sp4/">Github</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
