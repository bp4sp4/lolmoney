## 24/02/04 CSS grid 연습 - 미니 프로젝트 완성 놀지마라 매일 공부하라

## 작업환경 : macOS, 작업툴 : VSCode

## 작업기간 - 25/02/24

- 홈페이지 - <a href="https://lolmoney.vercel.app/">Gallery</a>

<h2>📌 프로젝트 진행이유</h2>

- Unsplash API 사용해 기존에있던 gallery 프로젝트를 Next.js 사용해서 이미지 로딩이 빠르게 되었다. 그리고 맨밑에 로딩하기를 통해 무한 이미지를 가져올수 있게 되었다.

- CSS Grid를 사용해 본 적이 없어서 이를 학습하고 실제 프로젝트에서 활용해 보기 위해서 진행했다. CSS Grid는 레이아웃을 구성하는 데 매우 강력한 도구로, 그동안 많이 사용해본 flexbox와는 다른 방식으로 레이아웃을 조정할 수 있다. 이를 통해 더 다양한 레이아웃을 구현할 수 있으며, CSS Grid의 구조적인 장점과 편리함을 직접 체험하고 싶었다. 또한, CSS Grid의 레이아웃 방식을 이해하고 활용하는 경험을 쌓는 것이 나의 퍼블리싱 능력을 더욱 향상시킬 수 있다고 생각했다.

- 시간이 지남에 따라 이를 유지하고 발전시키는 것이 중요하다. 웹 디자인과 사용자 경험을 고려한 실용적인 레이아웃을 구현하며 이를 통해 클라이언트나 회사에 나의 능력을 잘 어필할 수 있는 포트폴리오를 만들고자 했다.

<h2>✈ 프로젝트 진행</h2>

- 기본목표 시멘틱코드 진행
- 사진은 Unsplash API를 통해 가져오게 되었다.
- 헤더
  - Gallery 라는 홈페이지 타이틀로 시작해야하기 때문에 폰트선정에 시간을 조금 투자했다 여러 폰트 적용후 영어로 작성했을때 가잠 느낌있는 신라문화체로 결정
- 메인

  - 이미지가 로딩되는 부분은 포인트가 두가지가 있다.

    - 처음 로딩되는 이미지들의 css grid 랜덤 클래스 부여

      ```
      // api 가져오기

      const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

       fetch(
      `https://api.unsplash.com/photos/random?count=${count}&client_id=${ACCESS_KEY}`
      )
      .then((res) => res.json())
      .then((data: UnsplashImage[]) => {
        setImages((prevImages) => [
          ...prevImages,
          ...data.map((img) => img.urls.regular), // img의 타입이 UnsplashImage로 지정되어 있음
        ]);
      })

      items.forEach((item) => {
        const randomClass = classes[Math.floor(Math.random() * classes.length)];
        item.classList.add(randomClass);
      });
      ```

    - 스크롤 시 이미지 로딩 (Intersection Observer) 사용했다.

      ```
          const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
              }
            });
          },
          {
            threshold: 0.1,
          }
        );

        items.forEach((item) => observer.observe(item));

        // in-view" 클래스에 들어오면 보이는 효과
        .grid__wrapper>div.in-view {
            opacity: 1;
            transform: scale(1);
        }

      ```

- 클래스 big, wide, tall로 flex에서 할수없는 grid만의 각기다른 위치의 레이아웃으로 사용자 눈을 즐겁게하는 효과가 있다.

  ```
  .grid__wrapper .wide {
      grid-column: span 2;
  }

  .grid__wrapper .tall {
      grid-row: span 2;
  }

  .grid__wrapper .big {
      grid-column: span 2;
      grid-row: span 2;
  }

  ```

- 푸터
  - 푸터는 무난하게 위에 구분선과 블로그, 깃허브 링크를 줬다.

<h2>❗ 어려웠던점</h2>

- 어려웠던 점은 주로 CSS Grid와 CSS Flex의 차이점에서 나왔다 CSS Grid는 Flexbox와는 다른 레이아웃 방식을 제공하기 때문에, 처음에 기본적인 개념을 충분히 이해하는 것이 매우 중요했다. CSS Grid의 레이아웃을 처음 다루다 보니, 그 구조와 사용법에 대한 이해가 부족했기 때문에 초반에는 구현이 매우 어려웠습니다. 특히, CSS 자체가 완전히 코드화되어 있어 각 속성들이 어떻게 상호작용하는지에 대한 개념을 확실히 익히지 않으면 원하는 레이아웃을 만들기가 힘들었다.

- 다양한 예제들을 보고, 그 안에서 기본적인 레이아웃 설정을 어떻게 해야 하는지 배워 나갔다. 그럼에도 불구하고 여전히 내가 원하는 디자인을 정확히 구현하는 데는 시간이 걸렸다. 원하는 결과물이 나오지 않아서 많이 애먹었다.

<h2>🌐&nbsp; 참고사이트</h2>

- <a href="https://studiomeal.com/archives/533">1분코딩 - grid</a>

<h2>📎 아쉬운점</h2>

- 아쉬운 점은 이미지가 많고, 특히 큰 이미지들이 로딩될 때 시간이 길어지면 사용자 경험에 영향을 줄 수 있는데, 이를 처리하는 방법에 대해 고민이 많았습니다. 스켈레톤 UI를 HTML과 CSS만으로 구현하는 데에는 한계가 있어, 스켈레톤 UI가 완벽하게 동작하도록 구현하는 데 어려움이 있었다.

- HTML과 CSS만으로는 로딩 중인 이미지를 효과적으로 처리하거나, 이미지가 로딩되기 전에 대체 콘텐츠를 보여주는 등의 동적 처리가 어렵다 보니 하드 코딩 방식으로 이를 구현해야 했습니다. 이런 방식은 코드가 길어지고 관리하기 어려워졌으며, 실제 프로젝트에서 효율적으로 적용하기 어려운 점이 많았습니다.

<h2>24/01/06</h2>

- 이미지 호버시 다운로드 버튼 활성화
- 디자인 벨류업

<h2>24/01/05</h2>

- 조금 더 기능적인 고도화 생각

<h2>24/01/03</h2>

- css grid 연습
- 이미지추가
- 아직 어렵다 많이 써봐야 감을 잡을거 같다.
- 이미지 랜덤 클래스 부여

- 고도화 목표
  - 이미지 클릭시 팝업창열림
  - 다운로드 가능하게 만듬

```
 grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
 auto-fill: 여유 공간이 있으면 빈 열을 채우고, 콘텐츠 크기에 맞춰 열이 추가됩니다.
 auto-fit: 여유 공간이 있으면 빈 열을 없애고, 나머지 열이 최대한 공간을 차지합니다.
 auto: 그리드 아이템에 맞춰 열의 크기가 자동으로 조정됩니다.
 minmax(): 열이나 행의 크기를 최소와 최대 값으로 지정하여, 아이템의 크기를 그 범위 내에서 조정합니다.

 grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
 grid-column: span 2;  아이템은 2개의 열을 차지 */
 grid-row: 1 / 3; /* 1번째 행에서 시작해서 3번째 행까지 차지 */
 grid-row: span 2; /* 2개의 행을 차지 */

```
