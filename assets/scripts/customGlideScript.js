new Glide('.glide',{
    type: 'carousel',
    hoverpause: true,
    autoplay: 2000,
    perView: 3,
    peek: {
          before: 300,
          after: 300
    },
    breakpoints: {
          1200: {
                perView: 2,
                peek: {
                      before: 150,
                      after: 150
                }
          },
          670: {
                perView: 1,
                peek: {
                      before: 100,
                      after: 100
                }
          }
    }
}).mount();