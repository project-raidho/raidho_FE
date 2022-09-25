import imagesLoaded from "imagesloaded";

// ::: masorny 레이아웃 구현
const MasornyLayout = function () {
  const items = document.querySelectorAll(".gridItem");
  items.forEach((item) => {
    imagesLoaded(item, (instance) => {
      const item = instance.elements[0];
      const grid = document.querySelector(".gridContainer");
      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );
      const rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      );
      const rowSpan = Math.floor(
        (item.querySelector(".content").offsetHeight + rowGap) /
          (rowHeight + rowGap)
      );
      item.style.gridRowEnd = "span " + rowSpan;
    });
  });
  const gallery = document.querySelector(".gridContainer");
  imagesLoaded(gallery, () => {
    document
      .querySelectorAll(".gridItem")
      .forEach((item) => (item.style.visibility = "visible"));
  });
};

export default MasornyLayout;
