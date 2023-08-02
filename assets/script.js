let cursurFollower = document.querySelector(".cursurFollower");

const curserFollowMouse = () => {
  let xprv = 0;
  let yprv = 0;
  window.addEventListener("mousemove", (e) => {
    let { clientX, clientY } = e;

    let xdiff = clientX - xprv;
    let ydiff = clientY - yprv;

    let xScale = gsap.utils.clamp(0.8, 1.2, xdiff);
    let yScale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprv = clientX;
    yprv = clientY;
    gsap.to(cursurFollower, {
      left: clientX,
      top: clientY,
      duration: 0.3,
    });

    if (e.target.closest("a")) {
      // skew the circle
      gsap.to(cursurFollower, {
        scaleX: 2,
        scaleY: 2,
      });
      return;
    } else {
      // skew the circle
      gsap.to(cursurFollower, {
        scaleX: xScale,
        scaleY: yScale,
      });
    }
    //making cursur back to its shape while there has not mousmove
    setTimeout(() => {
      gsap.to(cursurFollower, {
        scaleX: 1,
        scaleY: 1,
      });
    }, 100);
  });
};
curserFollowMouse();

// projcect section image movement
let projectBoxes = [...document.querySelectorAll(".projectBox")];

projectBoxes.forEach((projectBox) => {
    let xprv=0;
    let yprv=0;
  projectBox.addEventListener("mousemove", (e) => {
    let { clientX, clientY } = e;
    let xdiff = clientX - projectBox.getBoundingClientRect().left;
    let ydiff = clientY - projectBox.getBoundingClientRect().top;

    let xrotDiff = clientX - xprv;
    let yrotDiff = clientY - yprv;

    xprv = clientX;
    yprv = clientY;

    let xRote = gsap.utils.clamp(-15,15, xrotDiff);
    let yRote = gsap.utils.clamp(-15,15, yrotDiff);
    gsap.to(projectBox.querySelector(".imgBox"), {
      left: xdiff,
      top: ydiff,
      rotate:`${xRote} ${yRote}`,
      opacity: 1,
      visibility: "visible",
    });
  });
//   on mouse out from the project box
  projectBox.addEventListener("mouseleave", (e) => {
    gsap.to(projectBox.querySelector(".imgBox"), {
      opacity: 0,
      visibility: "hidden",
      ease: Power3,
      
    });
  });
});

// animation using GSAP

let tl = gsap.timeline();

// header animation
tl.from("header", {
  y: -50,
  opacity: 0,
  duration: 1,
});

// heroSEction Animation
tl.from(".boundElem", {
  y: 150,
  duration: 1,
  stagger: 0.2,
  delay: -0.5,
});

// heroBottom Anim
tl.from(".heroBottom a", {
  y: -20,
  duration: 1,
  opacity: 0,
  stagger: 0.2,
  delay: -0.5,
});
