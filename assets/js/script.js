let currentYearBox = document.querySelector("footer .currentYear");
let currentTimeBox = document.querySelector("footer .currentTime");

const currentDateAndTimeSetter = () => {
  // set current Year
  let currentDateObject = new Date();

  currentYearBox.innerText = currentDateObject.getFullYear();

  let currentTime = currentDateObject.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  //set current Time
  currentTimeBox.innerText = currentTime;
};

setInterval(() => {
  currentDateAndTimeSetter();
}, 1000);

//  ================================================== locomotive js
const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

// ====================================================circle on mousemove
let curserCircle = document.querySelector(".curserCircle");
let curserTimeOut;
const circleMouseFollower = () => {
  clearTimeout(curserTimeOut);
  let xprev = 0;
  let yprev = 0;
  window.addEventListener("mousemove", (e) => {
    
    let x = e.clientX;
    let y = e.clientY;

    // to get previous position value and it's differnece
    let xdiff = x - xprev;
    let ydiff = y - yprev;
    xprev = x;
    yprev = y;

    let xScale = gsap.utils.clamp(0.8, 1.2, Math.abs(xdiff));
    let yScale = gsap.utils.clamp(0.8, 1.2, Math.abs(ydiff));

    curserCircle.style.left = `${x}px`;
    curserCircle.style.top = `${y}px`;
    curserCircle.style.transform = `scale(${xScale},${yScale}) translate(-50%, -50%)`;
    
    // scale circleMouseFollower while hovering on link
    if(e.target.closest('a')){
      gsap.to('.curserCircle',{
        scale:2.4,
        ease: Power3,
      });
      clearTimeout(curserTimeOut);
      return
    }else{
      // make the circle in right position when cursor is not moving
      // it runs when the mousemove is over so it is work as mousemovestop
      setTimeout(() => {
        curserCircle.style.transform = `scale(1,1) translate(-50%, -50%)`;
      }, 100);
    }
  });
};
circleMouseFollower();

let aTags = [...document.querySelectorAll('a')];
aTags.forEach((a)=>{
  
  a.addEventListener('mousemove',()=>{
    gsap.to('.curserCircle',{
      scale:2.4,
      ease: Power3,
    });
  })

  a.addEventListener('mouseleave',()=>{
    gsap.to('.curserCircle',{
      scale:1,
      ease: Power3,
    });
  })

})

// ================================================projectBox js
let projectBox = [...document.querySelectorAll(".projectBox")];
projectBox.forEach((project) => {
  let xprv = 0;
  let yprv = 0;
  project.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
    let xrotDiff = x - xprv;
    let yrotDiff = y - yprv;
    xprv = x;
    yprv = y;

    let xRote = gsap.utils.clamp(-15,15, xrotDiff);
    let yRote = gsap.utils.clamp(-15,15, yrotDiff);

    let ydiff = y - project.getBoundingClientRect().top;
    let xdiff = x - project.getBoundingClientRect().left;
    gsap.to(project.querySelector(".imgBox"), {
      opacity: 1,
      ease: Power3,
      top: ydiff,
      left: xdiff,
      rotate:`${xRote} ${yRote}`
    });
  });

  project.addEventListener("mouseleave", (e) => {
    gsap.to(project.querySelector(".imgBox"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
});

// =================================================GSAP Animation
// header Animation
let tl = gsap.timeline();

const headerAnim = () => {
  tl.from("header", {
    y: "10",
    opacity: 0,
    duration: 0.5,
    ease: Expo.easeInOut,
  });
};
headerAnim();

// heroSection
const heroAnim = () => {
  tl.to(".boundingElm", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 1,
    stagger: 0.2,
    delay: -0.5,
  });

  tl.from([".heroBottom a", "heroBottomIconBox a"], {
    y: -10,
    opacity: 0,
    duration: 0.5,
    delay: -1,
    stagger: 0.2,
  });
};
heroAnim();
